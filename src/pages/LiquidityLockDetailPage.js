import { useParams } from 'react-router-dom';
import {
  Stack,
  Typography,
  Button,
  Card,
  Divider,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getLiquidity } from 'redux/slices/liquidityLocks';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { formatUnits, commify } from '@ethersproject/units';
import { useSnackbar } from 'notistack';
import HashLoader from 'react-spinners/HashLoader';
import { useLockContract } from 'hooks/useContract';
import Moment from 'react-moment';

// const SERVER_URL = "https://mintwall.io/uploads"; // was http://localhost:5000/uploads

export default function LiquidityLockDetail() {
  const params = useParams();
  const liquidity = useSelector((state) => state.liquidityLocks.liquidity);
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const lockContract = useLockContract();

  useEffect(() => {
    try {
    dispatch(getLiquidity(network, params.token, params.owner));
      
    } catch (error) {
      console.log("LiquidityLockDetail useEffect" , error)
    }
  }, [account, dispatch, params, network]);

  // const handleLiquidityAddress = async (e) => {
  //   setIsParsing(true);
  //   dispatch(setAddress(e.target.value));
  // };
  const handleUnlock = async () => {
    if (!isUnlocking) {
      setIsUnlocking(true);
      try {
        const tx = await lockContract.unlockLiquidity(params.token);
        await tx.wait();
        dispatch(getLiquidity(network, params.token, params.owner));
        enqueueSnackbar('Unlocked successufully!', {
          variant: 'success'
        });
        setIsUnlocking(false);
      } catch (err) {
        enqueueSnackbar('Unlocked failed!', {
          variant: 'error'
        });
        setIsUnlocking(false);
        return;
      }
    }
  };
  if (liquidity === null || Object.keys(liquidity).length === 0)
    return (
      <Container maxWidth="lg">
        <Card
          sx={{
            width: 1,
            p: 3,
            transition: 'all .3s',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z24
            }
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Fetching!
          </Typography>
          <Divider />

          <Stack sx={{ mt: 5 }}></Stack>
        </Card>
      </Container>
    );
  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          width: 1,
          p: 3,
          transition: 'all .3s',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z24
          }
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Lock info
        </Typography>
        <Divider />

        <Stack sx={{ mt: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <Typography>Total Amount Locked</Typography>
            <Typography>
              {liquidity.amount
                ? parseFloat(formatUnits(liquidity?.amount, liquidity?.decimals)).toLocaleString('en')
                : ''}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <Typography>Total Values Locked</Typography>
            <Typography>{liquidity?.price ? commify(liquidity?.price) : ""}$</Typography>
          </Stack> */}
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <Typography>Token Address</Typography>
            <Typography>{params.token}</Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <Typography>Pair Name</Typography>
            <Typography>
              {liquidity?.token0_symbol}/{liquidity?.token1_symbol}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <Typography>Dex</Typography>
            <Typography>{liquidity?.name}</Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <Typography>Token Decimals</Typography>
            <Typography>{liquidity?.decimals}</Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} /> */}
        </Stack>
      </Card>

      <Card
        sx={{
          mt: 2,
          width: 1,
          p: 3,
          transition: 'all .3s',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z24
          }
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Lock records
        </Typography>
        <Divider />

        <Stack direction="row" sx={{ mt: 4 }}>
          <Typography fontWeight="bold" sx={{ width: 0.3 }}>
            Wallet address
          </Typography>
          <Typography fontWeight="bold" sx={{ width: 0.3 }}>
            Amount
          </Typography>
          <Typography fontWeight="bold" sx={{ width: 0.3 }}>
            Locked time
          </Typography>
          <Typography fontWeight="bold" sx={{ width: 0.3 }}>
            Unlock time
          </Typography>
          {account === liquidity?.owner ? (
            <Typography fontWeight="bold" sx={{ width: 0.3 }}>
              Unlock
            </Typography>
          ) : (
            ''
          )}
        </Stack>

        <Stack sx={{ mt: 2 }}>
          {liquidity?.amounts?.map((ele, key) => (
            <Stack direction="row" alignItems="center" fontSize="0.85rem" key={key}>
              <Typography sx={{ width: 0.3 }}>
                {params.owner.substring(0, 5) + '...' + params.owner.substring(params.owner.length - 3)}
              </Typography>
              <Typography sx={{ width: 0.3 }}>
                {ele.amount ? commify(formatUnits(ele.amount, liquidity?.decimals)) : ''}
              </Typography>
              <Typography sx={{ width: 0.3 }}>
                <Moment format="YYYY-MM-DD HH:mm">{new Date(ele.startDateTime).toISOString()}</Moment>
              </Typography>
              <Typography sx={{ width: 0.3 }}>
                <Moment format="YYYY-MM-DD HH:mm">{new Date(ele.endDateTime).toISOString()}</Moment>
              </Typography>
              {account === liquidity?.owner ? (
                ele.endDateTime <= Date.now() ? (
                  <Typography sx={{ width: 0.3 }}>
                    <Button variant="outline" sx={{ bgcolor: 'primary.dark' }} onClick={handleUnlock}>
                      {isUnlocking ? <HashLoader color="#59f1f6" size={30} /> : 'Unlock'}
                    </Button>
                  </Typography>
                ) : (
                  <Typography sx={{ width: 0.3 }}>
                    <Button variant="outline" disabled>
                      Unlock
                    </Button>
                  </Typography>
                )
              ) : (
                ''
              )}
              {/* <Link component={RouterLink} to="/lock-detail/0x32342323423234234">
                  View
                </Link> */}
            </Stack>
          ))}

          <Divider sx={{ my: 1.5 }} />
        </Stack>
      </Card>
    </Container>
  );
}
