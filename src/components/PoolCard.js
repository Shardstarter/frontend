import {
  Box,
  Stack,
  Typography,
  Button,
  Link,
  Card,
  Divider,
  LinearProgress,
  linearProgressClasses
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import countDown from 'utils/countDown';
import axios from '../utils/axios';
import { setAlarmPool } from 'redux/slices/pools';
import { setAlarm } from 'redux/slices/alarms';

import Label from 'components/Label';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { formatUnits } from '@ethersproject/units';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPoolStatusChanged } from '../redux/slices/pools';
import { BigNumber } from 'ethers';
import { useSnackbar } from 'notistack';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { CURRENCY_SYMBOL } from 'config/constants';

const TitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
}));

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 8,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: "#2c595a",
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
//   }
// }));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 1,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#59f1f65a'
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#59f1f6',
    borderRadius: 1
  }
}));

// const SERVER_URL = "https://mintwall.io/uploads"; // was http://localhost:5000/uploads

function PromotionCardWrapper({ type, children }) {
  let border;
  switch (type) {
    case '3':
      border = '5px solid #ab4bff';
      break;
    case '2':
      border = '5px solid #49f0ff';
      break;
    case '1':
      border = '5px solid #fcd316';
      break;
    default:
      border = 'none';
      break;
  }
  return (
    <Box
      sx={{
        border: border,
        borderRadius: 3,
        position: 'relative'
      }}
    >
      {type != '0' && (
        <Box
          component="img"
          src={`/promotions/${type}.png`}
          sx={{
            position: 'absolute',
            top: 0,
            width: 60,
            marginLeft: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        />
      )}
      {children}
    </Box>
  );
}

export default function PoolCard({ pool, account }) {
  const { account, chainId } = useActiveWeb3React();
  const [alarmMode, setAlarmMode] = useState(false);
  const navigate = useNavigate();
  const network = useSelector((state) => state.network.chainId);
  const dispatch = useDispatch();
  const rate = pool.presaleRate;
  const softCap = pool.softCap;
  const hardCap = pool.hardCap;
  const progressHard = (100 * pool.weiRaised) / pool.hardCap;
  const progressSoft = (100 * pool.weiRaised) / pool.softCap;
  const raised = pool.weiRaised;
  const [status, setStatus] = useState('presale');
  const { enqueueSnackbar } = useSnackbar();
  // const startCountDown =0;
  // const endCountDown =0;
  const [startCountDown, setStartCountDown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [endCountDown, setEndCountDown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  useEffect(() => {
    let interval;
    if (pool)
      interval = setInterval(() => {
        const start = new Date(pool?.startDateTime).getTime() - Date.now();
        const end = new Date(pool?.endDateTime).getTime() - Date.now();

        setStartCountDown(countDown(start));
        setEndCountDown(countDown(end));
      }, 1000);
    return () => clearInterval(interval);
  }, [pool]);
  const postAlarm = async (time) => {
    if (!account) {
      enqueueSnackbar('Please login with your wallet to set the alarm!', {
        variant: 'error'
      });
      return;
    }
    try {
      const response = await axios.post(`/webpush`, {
        network: network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc',
        pool: {
          address: pool.address,
          status,
          time
        },
        wallet: account,
        subscription: global.subscription
      });
      let message = response.data.message;
      if (message == 'time error') {
        enqueueSnackbar("Alarm can't be set for a finished presale!", {
          variant: 'error'
        });
      } else {
        enqueueSnackbar('Alarm set successfully!', {
          variant: 'success'
        });
        dispatch(setAlarmPool({
          address: pool.address,
          wallet: account,
          status,
          time
        }));
        dispatch(setAlarm({
          extraData: pool.extraData,
          name: pool.name,
          symbol: pool.symbol,
          address: pool.address,
          status,
          time,
          startDateTime: pool.startDateTime,
          listDateTime: pool.listDateTime
        }))
      }
      // try {
      //   let response_ipfs;
      //   const extraData = pool.extraData;
      //   response_ipfs = await fetch(`https://ipfs.infura.io/ipfs/${extraData}`);
      //   pool.ipfs = await response_ipfs.json();
      // } catch (error) {
      //   console.log(error);
      // }
      // dispatch(slice.actions.setPool(pool));
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Oops, Something went wrong!', {
        variant: 'error'
      });
    }
  };
  const deleteAlarm = async (time) => {
    if (!account)
      return;
    try {
      const response = await axios.delete(`/webpush`, {
        data: {
          network: network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc',
          pool: {
            address: pool.address,
            status,
            time
          },
          wallet: account,
          subscription: global.subscription
        }
      });
      let message = response.data.message;
      if (message == 'no existed') {
        enqueueSnackbar('No alarm existed!', {
          variant: 'error'
        });
      } else {
        enqueueSnackbar('Alarm removed successfully!', {
          variant: 'success'
        });
        dispatch(setAlarmPool({
          address: pool.address,
          wallet: account,
          status,
          time
        }));
        dispatch(setAlarm({
          address: pool.address,
          status,
          time
        }))
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Oops, Something went wrong!', {
        variant: 'error'
      });
    }
  }
  return (
    <PromotionCardWrapper type={pool.tier}>
      <Card
        sx={{
          position: 'relative',
          width: 1,
          p: 3,
          transition: 'all .3s',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z24
          }
        }}
      >
        <Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
            <Box component="img" src={pool.ipfs?.logo} sx={{ width: 50, height: 50 }} />
            <Stack direction="row" justifyContent="flex-end" flexWrap="wrap" spacing={0.5}>
              {pool.kyc && (
                <Link
                  href="https://gem-pad.gitbook.io/the-gempad/guide-for-project-owners/kyc-at-gempad"
                  target="_blank"
                  color="white"
                >
                  <Label color="info">
                    <b>KYC</b>
                  </Label>
                </Link>
              )}
              {pool.audit && (
                <Link href={pool.auditLink} target="_blank" color="white">
                  <Label color="info">
                    <b>Audit</b>
                  </Label>
                </Link>
              )}
              {Number(pool.status) === 0 ? (
                new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                  pool.softCap <= pool.weiRaised ? (
                  <Label color="success">Cancelled</Label>
                ) : new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                  pool.softCap > pool.weiRaised ? (
                  <Label color="success">Sale Failed</Label>
                ) : pool.hardCap === pool.weiRaised ? (
                  <Label color="success">Sale Finished</Label>
                ) : new Date(pool.endDateTime).getTime() < Date.now() &&
                  pool.softCap <= pool.weiRaised ? (
                  <Label color="success">Sale Ended</Label>
                ) : new Date(pool.endDateTime).getTime() < Date.now() &&
                  pool.softCap > pool.weiRaised ? (
                  <Label color="error">Sale Failed</Label>
                ) : new Date(pool.startDateTime).getTime() < Date.now() ? (
                  <Label color="success">Sale Live</Label>
                ) : (
                  <Label color="warning">Upcoming</Label>
                )
              ) : Number(pool.status) === 2 ? (
                <Label color="info">Cancelled</Label>
              ) : new Date(pool.listDateTime).getTime() + pool.dexLockup * 86400 * 1000 < Date.now() ? (
                <Label color="error">LIQ Unlocked</Label>
              ) : (
                <Label color="primary" >Listed on DEX</Label>
              )}
            </Stack>
          </Stack>

          <Stack sx={{ mt: 2 }}>
            <Typography variant="h4">{pool.name}</Typography>
            <Typography>
              Max Contribution: {pool.maxAllocationPerUser}
              {CURRENCY_SYMBOL[chainId]}
            </Typography>
          </Stack>

          <Stack sx={{ mt: 1 }}>
            <Typography color="text.secondary">Progress ({progressHard.toFixed(2)}%)</Typography>
            <BorderLinearProgress
              variant="determinate"
              value={progressHard}
              valueBuffer={progressSoft}
              sx={{ my: '2px' }}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="span" fontSize="0.8rem" color="text.secondary">
                {raised} {CURRENCY_SYMBOL[chainId]}
              </Typography>
              <Typography variant="span" fontSize="0.8rem" color="text.secondary">
                {hardCap} {CURRENCY_SYMBOL[chainId]}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="h5">Hard Cap:</Typography>
            <Typography variant="span" color="primary.main" fontWeight="bold">
              {hardCap} {CURRENCY_SYMBOL[chainId]}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="h5">Liquidity:</Typography>
            <Typography variant="span" color="primary.main" fontWeight="bold">
              {pool.dexCapPercent} %
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Lock Time:</Typography>
            <Typography variant="span" color="primary.main" fontWeight="bold">
              {pool.dexLockup} days
            </Typography>
          </Stack>

          <Divider color="" sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack>
              {Number(pool.status) === 0 ? (
                new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                  pool.softCap <= pool.weiRaised ? (
                  <Typography variant="span" fontSize="0.7rem">
                    Cancelled
                  </Typography>
                ) : new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                  pool.softCap > pool.weiRaised ? (
                  <Typography variant="span" fontSize="0.7rem">
                    Sale Failed
                  </Typography>
                ) : pool.hardCap === pool.weiRaised ? (
                  <Typography variant="span" fontSize="0.7rem">
                    Sale Finished
                  </Typography>
                ) : new Date(pool.endDateTime).getTime() < Date.now() &&
                  pool.softCap <= pool.weiRaised ? (
                  <Typography variant="span" fontSize="0.7rem">
                    Sale Ended
                  </Typography>
                ) : new Date(pool.endDateTime).getTime() < Date.now() &&
                  pool.softCap > pool.weiRaised ? (
                  <Typography variant="span" fontSize="0.7rem">
                    Sale Failed
                  </Typography>
                ) : new Date(pool.startDateTime).getTime() < Date.now() ? (
                  <>
                    <Typography variant="span" fontSize="0.7rem">
                      Sale Ends In:
                    </Typography>

                    <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                      {endCountDown.days}:{endCountDown.hours}:{endCountDown.minutes}:{endCountDown.seconds}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="span" fontSize="0.7rem">
                      Sale Starts In:
                    </Typography>

                    <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                      {startCountDown.days}:{startCountDown.hours}:{startCountDown.minutes}:{startCountDown.seconds}
                    </Typography>
                  </>
                )
              ) : Number(pool.status) === 2 ? (
                <Typography variant="span" fontSize="0.7rem">
                  Cancelled
                </Typography>
              ) : new Date(pool.listDateTime).getTime() + pool.dexLockup * 86400 * 1000 < Date.now() ? (
                <Typography variant="span" fontSize="0.7rem">
                  LIQ Unlocked
                </Typography>
              ) : (
                <Typography variant="span" fontSize="0.7rem">
                  Listed on DEX
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                sx={{ color: 'primary.dark', borderColor: 'primary.dark' }}
                onClick={() => setAlarmMode(true)}
              // startIcon={<NotificationsActiveIcon />}
              >
                <NotificationsActiveIcon />
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: 'primary.dark' }}
                onClick={() => navigate(`/presale/${pool.address}`)}
              >
                View Pool
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            p: 3,
            position: 'absolute',
            top: 0,
            left: 0,
            bgcolor: 'background.paper',
            // visibility: alarmMode ? 'visible' : 'hidden',
            transition: 'all 0.5s',
            transform: alarmMode ? 'translateX(0)' : 'translateX(100%)',
            width: 1,
            height: 1
          }}
        >
          <Stack direction="row" justifyContent="flex-start">
            <Button startIcon={<ArrowBackIcon />} onClick={() => setAlarmMode(false)}>
              Back
            </Button>
          </Stack>
          <Typography variant="h5" align="center" sx={{ mt: 2 }}>
            SET NOTIFICATION ALARM FOR:
          </Typography>
          <Stack direction="row" spacing={3} sx={{ my: 2 }}>
            {
              status === 'presale' ? (
                <>
                  <Button fullWidth variant="contained" sx={{ bgcolor: 'primary.dark' }}>
                    Presale
                  </Button>
                  <Button fullWidth variant="outlined" onClick={() => setStatus('listing')}>
                    Dex Listing
                  </Button>
                </>
              ) : (
                <>
                  <Button fullWidth variant="outlined" onClick={() => setStatus('presale')}>
                    Presale
                  </Button>
                  <Button fullWidth variant="contained" sx={{ bgcolor: 'primary.dark' }}>
                    Dex Listing
                  </Button>
                </>
              )
            }
          </Stack>
          <Typography variant="h4" align="center">
            SELECT THE NOTIFICATION TIME BEFORE EVENT:
          </Typography>
          <Stack direction="row" spacing={3} sx={{ my: 2 }}>
            {
              pool.alarms.find(ele => ele.status === status && ele.time === '30' && ele.wallet === account) ? (
                <Button fullWidth variant="contained" sx={{ bgcolor: 'primary.dark' }} onClick={() => deleteAlarm('30')}>
                  30min
                </Button>
              ) : (
                <Button fullWidth variant="outlined" onClick={() => postAlarm('30')}>
                  30min
                </Button>
              )
            }
            {
              pool.alarms.find(ele => ele.status === status && ele.time === '15' && ele.wallet === account) ? (
                <Button fullWidth variant="contained" sx={{ bgcolor: 'primary.dark' }} onClick={() => deleteAlarm('15')}>
                  15min
                </Button>
              ) : (
                <Button fullWidth variant="outlined" onClick={() => postAlarm('15')}>
                  15min
                </Button>
              )
            }
            {
              pool.alarms.find(ele => ele.status === status && ele.time === '5' && ele.wallet === account) ? (
                <Button fullWidth variant="contained" sx={{ bgcolor: 'primary.dark' }} onClick={() => deleteAlarm('5')}>
                  5min
                </Button>
              ) : (
                <Button fullWidth variant="outlined" onClick={() => postAlarm('5')}>
                  5min
                </Button>
              )
            }
          </Stack>
          {/* <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Button variant="contained" sx={{ width: 0.5, bgcolor: '#54D62C' }}>
              SET
            </Button>
          </Stack> */}
        </Stack>
      </Card>
    </PromotionCardWrapper>
  );
}
