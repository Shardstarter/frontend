import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Typography,
  Stack,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  InputAdornment,
  Container,
  Alert as MuiAlert,
  TextField,
  Divider,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Card,
  linearProgressClasses,
  Link,
  Hidden
} from '@mui/material';
import { useIDOContract, usePoolContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import countDown from 'utils/countDown';
import { SCAN_URL, SWAP_URL, DEXTOOL_URL } from 'config/constants';
import { ImTwitter, ImTelegram, ImSphere, ImFacebook, ImGithub, ImInstagram, ImReddit } from 'react-icons/im';
import { IoLogoDiscord } from 'react-icons/io5';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Loader from 'react-loader-spinner';
import HashLoader from 'react-spinners/HashLoader';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import { formatEther, commify, parseEther } from '@ethersproject/units';
import { getPool, setPoolStatusChanged } from 'redux/slices/pools';
import { create } from 'ipfs-http-client';
import Label from 'components/Label';
import { useSnackbar } from 'notistack';
import ConfirmDialog from 'components/ConfirmDialog';
import UpdateDialog from 'pages/update/UpdateDialog';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import { ADMIN_ADDRESS } from 'config/constants';
import Moment from 'react-moment';
import CopyClipboard from 'components/CopyToClipboard';
import minAddress from 'utils/addressHelper';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CURRENCY_SYMBOL } from 'config/constants';

ChartJS.register(ArcElement, Tooltip, Legend);
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

const CardContainer = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  transition: 'all .5s',
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column'
}));

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ----------------------------------------------------------------------

export default function DetailPage() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params = useParams();
  const { account, library , chainId} = useActiveWeb3React();
  //amount to deposit
  const [amountToDeposit, setAmountToDeposit] = useState(0);
  const [maxAmountDeposit, setMaxAmountDeposit] = useState(0);
  const network = useSelector((state) => state.network.chainId);
  const [teamVesting, setTeamVesting] = useState([]);
  const pool = useSelector((state) => state.pools.pool);
  const poolContract = usePoolContract(pool?.address);
  const idoContract = useIDOContract();
  const [isDepositing, setIsDepositing] = useState(false);
  const [whiteList, setWhiteList] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  //amount to be deposit already
  const [depositedAmount, setDepositedAmount] = useState('0');
  const [didRefund, setDidRefund] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isWhiteListing, setIsWhiteListing] = useState(false);
  // const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  // const [isRemoving, setIsRemoving] = useState(false);
  const [isKYCing, setIsKYCing] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLink, setAuditLink] = useState('');
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
  const [listCountDown, setListCountDown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [publicCountDown, setPublicCountDown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlockingTeamToken, setIsUnlockingTeamToken] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [isUpdatingWhitelistable, setIsUpdatingWhitelistable] = useState(false);
  const [isUpdatingTier, setIsUpdatingTier] = useState(false);
  const [marketCap, setMarketCap] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;
    let unmounted = false;
    if (pool.hasOwnProperty('address')) {
      (async () => {
        try {
          const response = await axios.get(`https://api.1inch.exchange/v3.0/${network}/quote?fromTokenAddress=` +
            `${network == process.env.REACT_APP_BSC_CHAINID ? '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' : '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'}` +
            `&toTokenAddress=${network == process.env.REACT_APP_BSC_CHAINID ? '0xe9e7cea3dedca5984780bafc599bd69add087d56' : '0xdac17f958d2ee523a2206206994597c13d831ec7'}` +
            `&amount=${parseEther(String(pool.totalSupply / pool.dexRate))}`);
             console.log("pool?.totalSupply", (pool.totalSupply).toString())

          let tmp = Number(formatEther(response.data.toTokenAmount)).toFixed(0);
          if (!unmounted) setMarketCap(tmp);
        } catch (error) {
          console.log(error);
        }
      })();

      interval = setInterval(() => {
        const start = new Date(pool?.startDateTime).getTime() - Date.now();
        const end = new Date(pool?.endDateTime).getTime() - Date.now();
        const list = new Date(pool?.listDateTime).getTime() - Date.now();
        const publicTime = new Date(pool?.startDateTime).getTime() + 600 * 1000 - Date.now();
        setStartCountDown(countDown(start));
        setEndCountDown(countDown(end));
        setListCountDown(countDown(list));
        setPublicCountDown(countDown(publicTime));
      }, 1000);
      const tmp = {},
        tmps = [];
      let tmp_unlocked = 0;

      if (pool.teamVesting_amount > 0) {
        tmp.amount = (pool.teamVesting_amount * pool.teamVesting_first_percent) / 100;

        tmp.period = new Date(pool?.listDateTime).getTime() + pool.teamVesting_first_period * 24 * 3600 * 1000;
        tmps.push(JSON.parse(JSON.stringify(tmp)));
        tmp_unlocked += tmp.amount;
        while (true) {
          tmp.period = tmp.period + pool.teamVesting_each_period * 24 * 3600 * 1000;
          tmp.amount = (pool.teamVesting_amount * pool.teamVesting_each_percent) / 100;
          tmp_unlocked += tmp.amount;
          if (tmp_unlocked >= pool.teamVesting_amount) {
            tmp.amount -= tmp_unlocked - pool.teamVesting_amount;
            tmps.push(JSON.parse(JSON.stringify(tmp)));
            break;
          } else tmps.push(JSON.parse(JSON.stringify(tmp)));
        }
        setTeamVesting(JSON.parse(JSON.stringify(tmps)));
      }
    }
    return () => { unmounted = true; clearInterval(interval); }
  }, [pool.startDateTime, pool.endDateTime, pool.listDateTime, pool.teamVesting_amount, poolContract]);

  useEffect(() => {
    let unmounted = false;
    setIsLoading(true);
    (async () => {
      await dispatch(getPool(network, params.address));
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;

  }, [dispatch, network, params.address, poolContract, account]);

  useEffect(() => {
    let unmounted = false;
    console.log(pool.address);
    console.log('xxx');
    (async () => {
      try {
        const collaborated = await poolContract.collaborations(account);
        console.log('hhhhhhhhhhh', collaborated)
        const _didRefund = await poolContract._didRefund(account);
        if (!unmounted) {
          setDepositedAmount(ethers.utils.formatEther(collaborated));
          setDidRefund(_didRefund);
          console.log(ethers.utils.formatEther(collaborated));
        }
      } catch (err) { 
        console.log('hhhhh', err.message)
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [pool.weiRaised, poolContract, account]);
  useEffect(() => {
    let unmounted = false;
    console.log('max');
    (async () => {
      try {
        if (!unmounted) {
          let { maxAllocationPerUser, weiRaised, hardCap } = pool;
          console.log({ maxAllocationPerUser, weiRaised, hardCap });
          let remain_from_hardCap = parseEther(String(hardCap)).sub(parseEther(String(weiRaised)));
          let remain_from_maxAllocationPerUser = parseEther(String(maxAllocationPerUser)).sub(parseEther(String(depositedAmount)));
          console.log(remain_from_hardCap);
          console.log(remain_from_maxAllocationPerUser);
          setMaxAmountDeposit(remain_from_hardCap.lt(remain_from_maxAllocationPerUser) ? formatEther(remain_from_hardCap) : formatEther(remain_from_maxAllocationPerUser));


        }
      } catch (err) { 
        console.log("DETAIL PAGE",err)
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [depositedAmount, poolContract]);

  const handleAmountMAXDeposit = async () => {
    setAmountToDeposit(maxAmountDeposit);
  };

  const deposit = async () => {
    if (!isDepositing) {
      setIsDepositing(true);
      try {
        let max, min;
        let { minAllocationPerUser, weiRaised, hardCap } = pool;
        if (
          parseEther(String(depositedAmount))
            .add(parseEther(String(amountToDeposit)))
            .lt(parseEther(String(minAllocationPerUser))) &&
          parseEther(String(hardCap))
            .sub(parseEther(String(weiRaised)))
            .gte(parseEther(String(minAllocationPerUser)))
        ) {
          enqueueSnackbar(
            `Please contribute more than ${minAllocationPerUser} ${CURRENCY_SYMBOL[chainId]
            }!`,
            {
              variant: 'error'
            }
          );
          setIsDepositing(false);
          return;
        }
        if (
          parseEther(String(amountToDeposit))
            .gt(parseEther(String(maxAmountDeposit)))
        ) {
          enqueueSnackbar(
            `Please contribute less than ${maxAmountDeposit} ${CURRENCY_SYMBOL[chainId]
            }!`,
            {
              variant: 'error'
            }
          );
          setIsDepositing(false);
          return;
        }

        const tx = await idoContract.deposit(pool?.address, {
          value: ethers.utils.parseEther(String(amountToDeposit))
        });
        await tx.wait();
        //should fix
        const collaborated = await poolContract.collaborations(account);
        const _didRefund = await poolContract._didRefund(account);
        setDepositedAmount(ethers.utils.formatEther(collaborated));
        setDidRefund(_didRefund);
        console.log(ethers.utils.formatEther(collaborated));
        enqueueSnackbar('Contributed Successfully!', {
          variant: 'success'
        });

        setIsDepositing(false);
      } catch (err) {
        enqueueSnackbar('Oops, Something went wrong, Failed to contribute!', {
          variant: 'error'
        });
        setIsDepositing(false);
      }
    }
  };

  const onCopy = () => {
    enqueueSnackbar('Copied', { variant: 'success' });
  };

  const handleCancelDialog = async (val) => {
    setCancelDialogOpen(false);
    if (val && !isCancelling) {
      setIsCancelling(true);
      try {
        const tx = await idoContract.cancelPool(pool?.address);

        await tx.wait();
        enqueueSnackbar('The pool is cancelled!', {
          variant: 'success'
        });
        setIsCancelling(false);
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`already cancelled!`) || err?.message?.includes(`already cancelled!`))
          enqueueSnackbar('Upcoming, Live & Finished pools can be cancelled only!', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in cancelling!', {
            variant: 'error'
          });
        setIsCancelling(false);
      }
    }
  };
  const handleUpdateDialog = async (val) => {
    setUpdateDialogOpen(false);
    if (val && !isUpdating) {
      setIsUpdating(true);
      try {
        const cid = await client.add(JSON.stringify(val));
        const tx = await idoContract.updateExtraData(pool?.address, cid.path);

        await tx.wait();
        enqueueSnackbar('Presale information updated', {
          variant: 'success'
        });
        setIsUpdating(false);
      } catch (err) {
        if (err?.data?.message?.includes(`already cancelled!`) || err?.message?.includes(`already cancelled!`))
          enqueueSnackbar('Only Upcoming and Live sales can be updated', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in updating!', {
            variant: 'error'
          });
        setIsUpdating(false);
      }
    }
  };

  const handleUpdateWhitelistable = async () => {
    if (!isUpdatingWhitelistable) {
      setIsUpdatingWhitelistable(true);
      try {
        const tx = await idoContract.updateWhitelistable(pool?.address, !pool?.whitelistable);
        await tx.wait();
        enqueueSnackbar('Whitelist updated!', {
          variant: 'success'
        });
        setIsUpdatingWhitelistable(false);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Oops, failed in updating the whitelist!', {
          variant: 'error'
        });
        setIsUpdatingWhitelistable(false);
      }
    }
  };
  // const handleRemoveDialog = async (val) => {
  //   setRemoveDialogOpen(false);
  //   if (val && !isRemoving) {
  //     setIsRemoving(true);
  //     try {
  //       const tx = await idoContract.removePool(pool?.address);

  //       await tx.wait();
  //       enqueueSnackbar('Pool removed!', {
  //         variant: 'success'
  //       });
  //       setIsRemoving(false);
  //     } catch (err) {
  //       enqueueSnackbar('Oops, failed in removing the pool!', {
  //         variant: 'error'
  //       });
  //       setIsRemoving(false);
  //     }
  //   }
  // };
  const addWhiteList = async () => {
    if (whiteList && !isWhiteListing) {
      let whiteList_array = whiteList.split(',');
      whiteList_array = whiteList_array.map((ele) => `${ele.trim()}`);
      setIsWhiteListing(true);
      try {
        const tx = await idoContract.addAddressesToWhitelist(pool?.address, whiteList_array);

        await tx.wait();
        setIsWhiteListing(false);
        enqueueSnackbar('Whitelist updated!', {
          variant: 'success'
        });
        setWhiteList('');
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`already cancelled!`) || err?.message?.includes(`already cancelled!`))
          enqueueSnackbar('Only Upcoming and Live sales can update the whitelist!', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in whitelisting!', {
            variant: 'error'
          });
        setIsWhiteListing(false);
      }
    }
  };
  const handleUpdateTier = async (event) => {
    if (!isUpdatingTier) {
      setIsUpdatingTier(true);
      try {
        const tx = await idoContract.updateTierStatus(pool?.address, event.target.value);
        await tx.wait();
        enqueueSnackbar('Tier updated!', {
          variant: 'success'
        });
        setIsUpdatingTier(false);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Oops, failed in updating the tier!', {
          variant: 'error'
        });
        setIsUpdatingTier(false);
      }
    }
  };
  const setKYC = async () => {
    if (!isKYCing) {
      setIsKYCing(true);
      try {
        const tx = await idoContract.updateKYCStatus(pool?.address, !pool?.kyc);
        await tx.wait();
        enqueueSnackbar('KYC Status Updated!', {
          variant: 'success'
        });
        setIsKYCing(false);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Oops, failed in updating the KYC status!', {
          variant: 'error'
        });
        setIsKYCing(false);
      }
    }
  };
  const setAudit = async () => {
    if (!isAuditing) {
      setIsAuditing(true);
      try {
        const tx = await idoContract.updateAuditStatus(pool?.address, !pool?.audit, auditLink);
        await tx.wait();
        enqueueSnackbar('Audit Status Updated!', {
          variant: 'success'
        });
        setIsAuditing(false);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Oops, failed in updating the Audit status!', {
          variant: 'error'
        });
        setIsAuditing(false);
      }
    }
  };
  const handleFinalize = async () => {
    if (!isFinalizing) {
      setIsFinalizing(true);
      try {
        const tx = await idoContract.endPool(pool?.address);
        await tx.wait();
        enqueueSnackbar('Successfully Finalized!', {
          variant: 'success'
        });
        setIsFinalizing(false);
      } catch (err) {
        console.log(err?.message);
        if (err?.data?.message?.includes(`already existed!`) || err?.message?.includes(`already existed!`))
          enqueueSnackbar('Already listed on DEX!', {
            variant: 'error'
          });
        else if (err?.data?.message?.includes(`not finalized!`) || err?.message?.includes(`not finalized!`))
          enqueueSnackbar('Not ready to finalize the pool!', {
            variant: 'error'
          });
        else if (err?.data?.message?.includes(`remove tax`) || err?.message?.includes(`remove tax`))
          enqueueSnackbar('You should remove the tax for the IDO and Presale address! Check Docs', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in Finalizing!', {
            variant: 'error'
          });
        setIsFinalizing(false);
      }
    }
  };
  const handleUnlock = async () => {
    if (!isUnlocking) {
      setIsUnlocking(true);
      try {
        const tx = await idoContract.unlockLiquidityDex(pool?.address);
        await tx.wait();
        enqueueSnackbar('Successfully unlocked!', {
          variant: 'success'
        });
        setIsUnlocking(false);
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`lockup!`) || err?.message?.includes(`lockup!`))
          enqueueSnackbar('Sorry, It is not time to unlock yet!', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in unlocking!', {
            variant: 'error'
          });
        setIsUnlocking(false);
      }
    }
  };
  const handleClaimToken = async () => {
    if (!isClaiming) {
      setIsClaiming(true);
      try {
        const tx = await idoContract.claimToken(pool?.address);
        await tx.wait();
        enqueueSnackbar('Tokens Claimed!', {
          variant: 'success'
        });
        setDidRefund(true);
        setIsClaiming(false);
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`not finalized!`) || err?.message?.includes(`not finalized!`))
          enqueueSnackbar('The Sale has not ended yet!', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in claiming!', {
            variant: 'error'
          });
        setIsClaiming(false);
      }
    }
  };
  const handleRefund = async () => {
    if (!isRefunding) {
      setIsRefunding(true);
      try {
        const tx = await idoContract.refund(pool?.address);
        await tx.wait();
        enqueueSnackbar('Successfully Refunded!', {
          variant: 'success'
        });
        setDidRefund(true);
        setIsRefunding(false);
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`not cancelled!`) || err?.message?.includes(`not cancelled!`))
          enqueueSnackbar('The pool is not cancelled!', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in transferring!', {
            variant: 'error'
          });
        setIsRefunding(false);
      }
    }
  };
  const handleUnlockTeamToken = async () => {
    if (!isUnlockingTeamToken) {
      setIsUnlockingTeamToken(true);
      try {
        const tx = await idoContract.unlockVestingToken(pool?.address);
        await tx.wait();
        enqueueSnackbar('Successfully unlocked the vesting token!', {
          variant: 'success'
        });
        setIsUnlockingTeamToken(false);
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`lockup!`) || err?.message?.includes(`lockup!`))
          enqueueSnackbar('Sorry, It is not time to unlock yet!', {
            variant: 'error'
          });
        else
          enqueueSnackbar('Oops, Something went wrong, Failed in unlocking!', {
            variant: 'error'
          });
        setIsUnlockingTeamToken(false);
      }
    }
  };
  return (
    <Page title={pool?.name}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
          <IconButton component={RouterLink} to="/">
            <ArrowBackIcon />
          </IconButton>
          <Typography>Back</Typography>
        </Stack>

        {isLoading ? (
          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
        ) : pool === null || Object.keys(pool).length === 0 ? (
          <Typography>No Data</Typography>
        ) : (
          <Grid container spacing={2}>
            {account === pool?.owner ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Alert variant="outlined" severity="warning" sx={{ mt: 2, fontWeight: 'bold', wordWrap: 'break-word' }}>
                  If your token has tax or max transaction, make sure to whitelist/exclude presale address
                  <b>{pool.address}</b> <CopyClipboard value={pool.address} /> from Tax, Rewards and Max Transaction.
                  Check
                  <Link
                    href="https://gem-pad.gitbook.io/the-gempad/guide-for-project-owners/create-and-manage-a-presale"
                    target="_blank"
                    color="white"
                  >
                    
                    Docs
                  </Link>
                  for more information.
                </Alert>
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <CardContainer>
                <Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center">
                      <Box
                        component="img"
                        src={pool?.ipfs?.logo}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '100%'
                        }}
                      />
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                          marginLeft: '10px'
                        }}
                      >
                        <Typography variant="h3">{pool?.name}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ marginTop: '8px !important' }}>
                          {pool?.ipfs?.website && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.website}
                              color="white"
                            >
                              <ImSphere />
                            </Link>
                          )}
                          {pool?.ipfs?.facebook && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.facebook}
                              color="white"
                            >
                              <ImFacebook />
                            </Link>
                          )}
                          {pool?.ipfs?.twitter && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.twitter}
                              color="white"
                            >
                              <ImTwitter />
                            </Link>
                          )}
                          {pool?.ipfs?.github && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.github}
                              color="white"
                            >
                              <ImGithub />
                            </Link>
                          )}
                          {pool?.ipfs?.telegram && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.telegram}
                              color="white"
                            >
                              <ImTelegram />
                            </Link>
                          )}
                          {pool?.ipfs?.instagram && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.instagram}
                              color="white"
                            >
                              <ImInstagram />
                            </Link>
                          )}
                          {pool?.ipfs?.discord && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.discord}
                              color="white"
                            >
                              <IoLogoDiscord />
                            </Link>
                          )}
                          {pool?.ipfs?.reddit && (
                            <Link
                              target="_blank"
                              sx={{ fontSize: 20, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2)' } }}
                              href={pool?.ipfs.reddit}
                              color="white"
                            >
                              <ImReddit />
                            </Link>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {pool?.kyc && (
                        <Chip
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                          label={
                            <Link
                              href="https://gem-pad.gitbook.io/the-gempad/guide-for-project-owners/kyc-at-gempad"
                              target="_blank"
                              color="white"
                            >
                              KYC
                            </Link>
                          }
                          color="secondary"
                          variant="filled"
                        />
                      )}
                      {pool?.audit && (
                        <Chip
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                          label={
                            <Link href={pool?.auditLink} target="_blank" color="white">
                              Audit
                            </Link>
                          }
                          color="secondary"
                          variant="filled"
                        />
                      )}
                      {Number(pool?.status) === 0 ? (
                        new Date(pool?.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                          pool?.softCap <= pool?.weiRaised ? (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}
                            label="Cancelled"
                            // icon={<MdRemoveDone />}
                            color="error"
                            variant="filled"
                          />
                        ) : new Date(pool?.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                          pool?.softCap > pool?.weiRaised ? (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}
                            label="Sale Failed"
                            // icon={<MdRemoveDone />}
                            color="error"
                            variant="filled"
                          />
                        ) : pool?.hardCap === pool?.weiRaised ? (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}
                            label="Finished"
                            // icon={<MdDone />}
                            color="success"
                            variant="filled"
                          />
                        ) : new Date(pool?.endDateTime).getTime() < Date.now() && pool?.softCap <= pool?.weiRaised ? (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}
                            label="Sale Ended"
                            // icon={<MdDone />}
                            color="success"
                            variant="filled"
                          />
                        ) : new Date(pool?.endDateTime).getTime() < Date.now() && pool?.softCap > pool?.weiRaised ? (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}
                            label="Sale Failed"
                            // icon={<MdRemoveDone />}
                            color="error"
                            variant="filled"
                          />
                        ) : new Date(pool?.startDateTime).getTime() < Date.now() ? (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white',
                              bgcolor: 'primary.dark'
                            }}
                            label="Sale Live"
                            // icon={<MdSend />}
                            // color="primary"
                            variant="filled"
                          />
                        ) : (
                          <Chip
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}
                            label="Upcoming"
                            // icon={<MdUpcoming />}
                            color="warning"
                            variant="filled"
                          />
                        )
                      ) : Number(pool?.status) === 2 ? (
                        <Chip
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                          label="Cancelled"
                          // icon={<MdRemoveDone />}
                          color="error"
                          variant="filled"
                        />
                      ) : new Date(pool?.listDateTime).getTime() + pool?.dexLockup * 86400 * 1000 < Date.now() ? (
                        <Chip
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                          label="LIQ Unlocked"
                          // icon={<MdDone />}
                          color="info"
                          variant="filled"
                        />
                      ) : (
                        <Chip
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'white',
                            bgcolor: 'primary.dark'
                          }}
                          label="Listed on DEX"
                          // icon={<MdDone />}
                          color="info"
                          variant="filled"
                        />
                      )}
                    </Stack>
                  </Stack>
                  <Stack component="span" marginLeft="60px">
                    <Typography variant="div" sx={{ whiteSpace: 'break-spaces' }} >{pool?.ipfs?.description}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop="30px"
                    fontSize="0.85rem"
                  >
                    <Typography>Presale Address</Typography>
                    <Hidden smDown>
                      <Link
                        href={`${SCAN_URL[network]}/address/${pool?.address}`}
                        color="primary"
                        fontSize={16}
                        target="_blank"
                      >
                        {pool?.address}
                      </Link>
                    </Hidden>
                    <Hidden smUp>
                      <Link
                        href={`${SCAN_URL[network]}/address/${pool?.address}`}
                        color="primary"
                        fontSize={16}
                        target="_blank"
                      >
                        {minAddress(pool?.address)}
                      </Link>
                    </Hidden>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Token Name</Typography>
                    <Typography>{pool?.name}</Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Token Symbol</Typography>
                    <Typography>{pool?.symbol}</Typography>
                  </Stack>
                  {/* <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Token Decimals</Typography>
                    <Typography>{pool?.decimals}</Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Token Address</Typography>
                    <Link href={`${SCAN_URL[network]}/${pool?.projectTokenAddress}`} color="primary" fontSize={16}>
                      {pool?.projectTokenAddress}
                    </Link>
                  </Stack> */}
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Total Supply</Typography>
                    {/* <Typography>{commify((pool?.totalSupply))}</Typography> */}
                    <Typography>1000000000000000</Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Tokens For Presale</Typography>
                    <Typography>{commify(pool?.hardCap * pool?.presaleRate)} </Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Tokens For Liquidity</Typography>
                    <Typography>{commify((pool?.hardCap * pool?.presaleRate * pool?.dexCapPercent) / 100)} </Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Soft Cap</Typography>
                    <Typography>
                      {commify(pool?.softCap)}
                      {CURRENCY_SYMBOL[chainId]}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Hard Cap</Typography>
                    <Typography>
                      {commify(pool?.hardCap)}
                      {CURRENCY_SYMBOL[chainId]}
                    </Typography>
                  </Stack>
                  {/* <Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.1)" }} /> */}
                  {/* <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="0.85rem"
                    >
                      <Typography>Unsold Tokens</Typography>
                      <Typography>{pool?.refund ? "Refund" : "Burn"}</Typography>
                    </Stack> */}
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Presale Start Time</Typography>
                    <Typography>
                      <Moment format="YYYY-MM-DD HH:mm">{pool?.startDateTime}</Moment>
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Presale End Time</Typography>
                    <Typography>
                      <Moment format="YYYY-MM-DD HH:mm">{pool?.endDateTime}</Moment>
                    </Typography>
                  </Stack>
                  {/* <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Listing On</Typography>
                    <Link href={`${SWAP_URL[network]}/${pool?.projectTokenAddress}`} color="primary" fontSize={16}>
                      {network === Number(process.env.REACT_APP_BSC_CHAINID) ? 'Pancakeswap' : 'Uniswap'}
                    </Link>
                  </Stack> */}
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Liquidity Percent</Typography>
                    <Typography>{pool?.dexCapPercent} %</Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <Typography>Liquidity Lock Time Period</Typography>
                    <Typography>{pool?.dexLockup} days after presale ends</Typography>
                  </Stack>
                </Stack>
              </CardContainer>
              {pool.whitelistable && Number(pool.status) === 0 && new Date(pool.startDateTime).getTime() > Date.now() && (
                <Alert
                  variant="outlined"
                  severity="info"
                  sx={{  display: { sm: 'block', md: 'none' },mt: 2, fontWeight: 'bold', bgcolor: 'primary.dark', color: 'white', textAlign: 'center' }}
                >
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h6">Whitelist Sale Starts In:</Typography>
                    <Typography variant="h6" letterSpacing={1}>
                      {startCountDown.days}:{startCountDown.hours}:{startCountDown.minutes}:{startCountDown.seconds}
                    </Typography>
                  </Stack>
                </Alert>
              )}
              {pool.whitelistable &&
                Number(pool.status) === 0 &&
                new Date(pool.startDateTime).getTime() < Date.now() &&
                (Number(publicCountDown.minutes) > 0 || Number(publicCountDown.seconds) > 0) && (
                  <Alert
                    variant="outlined"
                    severity="info"
                    sx={{  display: { sm: 'block', md: 'none' },mt: 2, fontWeight: 'bold', bgcolor: 'primary.dark', color: 'white', textAlign: 'center' }}
                  >
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Typography variant="h6">Public Sale Starts In:</Typography>
                      <Typography variant="h6" letterSpacing={1}>
                        {publicCountDown.minutes}:{publicCountDown.seconds}
                      </Typography>
                    </Stack>
                  </Alert>
                )}
              <CardContainer sx={{ display: { sm: 'block', md: 'none' }}}>
                <Stack textAlign="center">
                  {Number(pool.status) === 0 ? (
                    new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                      pool.softCap <= pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Presale Cancelled
                      </Stack>
                    ) : new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                      pool.softCap > pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Failed
                      </Stack>
                    ) : pool.hardCap == pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Presale Finished
                      </Stack>
                    ) : new Date(pool.endDateTime).getTime() < Date.now() && pool.softCap <= pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Ended
                      </Stack>
                    ) : new Date(pool.endDateTime).getTime() < Date.now() && pool.softCap > pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Failed
                      </Stack>
                    ) : new Date(pool.startDateTime).getTime() < Date.now() ? (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Sale Ends In:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {endCountDown.days}:{endCountDown.hours}:{endCountDown.minutes}:{endCountDown.seconds}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Sale Starts In:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {startCountDown.days}:{startCountDown.hours}:{startCountDown.minutes}:{startCountDown.seconds}
                        </Typography>
                      </>
                    )
                  ) : Number(pool.status) === 2 ? (
                    <Stack component="span" fontSize="1rem">
                      Presale Cancelled
                    </Stack>
                  ) : new Date(pool.listDateTime).getTime() + pool.dexLockup * 86400 * 1000 < Date.now() ? (
                    <Stack component="span" fontSize="1rem">
                      LIQ Unlocked
                    </Stack>
                  ) : (
                    <Stack component="span" fontSize="1rem">
                      Listed on DEX
                    </Stack>
                  )}

                  <Stack marginTop="10px">
                    <BorderLinearProgress
                      variant="determinate"
                      value={(100 * pool?.weiRaised) / pool?.hardCap}
                      valueBuffer={100 * pool?.weiRaised < pool?.softCap ? pool?.weiRaised / pool?.softCap : 1}
                      sx={{ my: '2px' }}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" marginTop="5px" padding="0 10px">
                    <Stack component="span" fontSize="0.7rem">
                      {commify(pool?.weiRaised)}
                      {CURRENCY_SYMBOL[chainId]}
                    </Stack>
                    <Stack component="span" fontSize="0.7rem">
                      {commify(pool?.hardCap)}
                      {CURRENCY_SYMBOL[chainId]}
                    </Stack>
                  </Stack>
                  {/* <Stack marginTop="10px">
                    <Alert severity="warning" fontSize="0.85rem" variant="outlined">
                      Make sure the website is pinksale.finance!
                    </Alert>
                  </Stack> */}
                  <Stack component="div" fontSize="0.85rem">
                    {pool?.status === '2' ||
                      (pool?.status === '0' &&
                        new Date(pool?.listDateTime).getTime() + 86400 * 1000 * 21 <= Date.now()) ||
                      (pool?.status === '0' &&
                        new Date(pool?.endDateTime).getTime() <= Date.now() &&
                        pool?.softCap > pool?.weiRaised) ? (
                      <Stack marginTop="10px">
                        {Number(depositedAmount) > 0 ? (
                          !didRefund ? (
                            <Button
                              variant="contained"
                              color="warning"
                              style={{ marginTop: 20 }}
                              onClick={handleRefund}
                            >
                              {isRefunding ? (
                                // <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                                <HashLoader color="#59f1f6" size={30} />
                              ) : (
                                'Refund'
                              )}
                            </Button>
                          ) : (
                            <Button variant="contained" disabled style={{ marginTop: 20 }}>
                              Refunded ({depositedAmount} / {depositedAmount} {pool?.symbol}
                              {CURRENCY_SYMBOL[chainId]})
                            </Button>
                          )
                        ) : (
                          ''
                        )}
                      </Stack>
                    ) : pool?.status == '1' ? (
                      <Stack marginTop="10px">
                        {Number(depositedAmount) > 0 ? (
                          !didRefund ? (
                            <Button
                              variant="contained"
                              color="success"
                              style={{ marginTop: 20 }}
                              onClick={handleClaimToken}
                            >
                              {isClaiming ? (
                                <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                              ) : (
                                'Claim Token'
                              )}
                            </Button>
                          ) : (
                            <Button variant="contained" disabled style={{ marginTop: 20 }}>
                              Claimed ({commify(pool?.presaleRate * depositedAmount)} /
                              {commify(pool?.presaleRate * depositedAmount)} {pool?.symbol})
                            </Button>
                          )
                        ) : (
                          ''
                        )}
                      </Stack>
                    ) : pool?.status == '0' &&
                      new Date(pool?.startDateTime).getTime() < Date.now() &&
                      new Date(pool?.endDateTime).getTime() >= Date.now() &&
                      pool.hardCap !== pool.weiRaised ? (
                      <>
                        <Stack marginTop="10px">
                          <h3>Contribute</h3>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                          <FormControl variant="outlined" sx={{ width: 0.5 }}>
                            <InputLabel htmlFor="amount-deposit">Amount</InputLabel>
                            <OutlinedInput
                              id="amount-deposit"
                              type="number"
                              value={amountToDeposit}
                              onChange={(e) => {
                                setAmountToDeposit(e.target.value);
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Button
                                    color="primary"
                                    aria-label="toggle password visibility"
                                    onClick={handleAmountMAXDeposit}
                                    // onMouseDown={(event) => {event.preventDefault();}}
                                    edge="end"
                                    sx={{ fontSize: 16, p: 0, minWidth: 30, px: 1 }}
                                  >
                                    MAX
                                  </Button>
                                </InputAdornment>
                              }
                              label="Amount"
                            />
                          </FormControl>
                          {!isDepositing ? (
                            <Button
                              sx={{ fontSize: 20, width: 0.5 }}
                              color="success"
                              variant="contained"
                              onClick={deposit}
                            >
                              Buy
                            </Button>
                          ) : (
                            <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                          )}
                        </Stack>
                      </>
                    ) : (
                      ''
                    )}
                  </Stack>
                </Stack>
                <Stack>
                  {/* <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Status</span>
                    <Stack componenet="span" color="error.main">
                      {POOL_STATUS[pool?.status]}
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Sale type</span>
                    <Stack componenet="span" color="error.main">
                      {pool?.whitelistable ? 'White Listed only' : 'Public'}
                    </Stack>
                  </Stack> */}
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Minimum Buy</span>
                    <span>
                      {commify(pool?.minAllocationPerUser)}
                      {CURRENCY_SYMBOL[chainId]}
                    </span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Maximum Buy</span>
                    <span>
                      {commify(pool?.maxAllocationPerUser)}
                      {CURRENCY_SYMBOL[chainId]}
                    </span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Total Contributors</span>
                    <span>{pool?.participantsAddresses ? pool?.participantsAddresses.length : 0}</span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>My Contribution</span>
                    <Typography color={Number(depositedAmount) > 0 && 'primary'}>
                      {depositedAmount} {CURRENCY_SYMBOL[chainId]}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>My Reserved Token</span>
                    <Typography color={Number(depositedAmount) > 0 && 'primary'}>
                      {depositedAmount * pool?.presaleRate} {pool?.symbol}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Presale Rate</span>
                    <span>
                      {commify(pool?.presaleRate)} {pool?.symbol}
                    </span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Dex Rate</span>
                    <span>
                      {commify(pool?.dexRate)} {pool?.symbol}
                    </span>
                  </Stack>
                </Stack>
              </CardContainer>
              {pool.holders ? (
                <CardContainer>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
                    <h3>Tokenomics</h3>
                    <span> Initial Market Cap Estimation: {commify(marketCap)} $</span>
                  </Stack>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  {teamVesting ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack>
                          <h5>Team Token Vesting Schedule:</h5>
                          {teamVesting ? (
                            <Stack sx={{ padding: '10px 10px' }}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                fontSize="0.85rem"
                              >
                                <Typography>Release Date</Typography>
                                <Typography>Amount</Typography>
                              </Stack>
                              <Stack sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {teamVesting?.map((ele, key) => (
                                  <React.Fragment key={key}>
                                    <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      fontSize="0.85rem"
                                    >
                                      <Typography>
                                        <Moment format="YYYY-MM-DD HH:mm">{ele.period}</Moment>
                                      </Typography>
                                      <Typography>
                                        {commify(ele.amount)} {pool.symbol}
                                      </Typography>
                                    </Stack>
                                  </React.Fragment>
                                ))}
                              </Stack>
                            </Stack>
                          ) : (
                            'No Team Token'
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack maxWidth="300px" marginLeft="auto" marginRight="auto">
                          <Doughnut
                            data={{
                              labels: ['Presale', 'Liquidity', 'Locked', 'Unlocked'],
                              datasets: [
                                {
                                  label: '%',
                                  data: [
                                    pool.holders['presale'] ? pool.holders['presale'] : 0,
                                    pool.holders['liquidity'] ? pool.holders['liquidity'] : 0,
                                    pool.holders['lock'] ? pool.holders['lock'] : 0,
                                    pool.holders['unlock'] ? pool.holders['unlock'] : 0
                                  ],
                                  backgroundColor: ['#59f1f65a', '#08adb3', '#A74AF9', '#FF4842']
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                tooltip: {
                                  callbacks: {
                                    label: (tooltipItem) => {
                                      return tooltipItem.label + ' : ' + tooltipItem.formattedValue + '%';
                                    }
                                  }
                                },
                                legend: {
                                  position: 'right'
                                },
                                title: {
                                  display: true,
                                  text: 'Chart.js Doughnut Chart'
                                }
                              }
                            }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <Stack maxWidth="450px" marginLeft="auto" marginRight="auto">
                          <Doughnut
                            data={{
                              labels: ['Presale', 'Liquidity', 'Locked', 'Unlocked'],
                              datasets: [
                                {
                                  label: '%',
                                  data: [
                                    pool.holders['presale'] ? pool.holders['presale'] : 0,
                                    pool.holders['liquidity'] ? pool.holders['liquidity'] : 0,
                                    pool.holders['lock'] ? pool.holders['lock'] : 0,
                                    pool.holders['unlock'] ? pool.holders['unlock'] : 0
                                  ],
                                  backgroundColor: ['#59f1f65a', '#08adb3', '#A74AF9', '#7A4F01']
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                tooltip: {
                                  callbacks: {
                                    label: (tooltipItem) => {
                                      return tooltipItem.label + ' : ' + tooltipItem.formattedValue + '%';
                                    }
                                  }
                                },
                                legend: {
                                  position: 'right'
                                },
                                title: {
                                  display: true,
                                  text: 'Chart.js Doughnut Chart'
                                }
                              }
                            }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  )}
                </CardContainer>
              ) : (
                ''
              )}
              {pool?.whitelistable && account === pool?.owner ? (
                <CardContainer sx={{ display: { xs: 'none', md: 'block' } }}>
                  <h3>Whitelisted Addresses</h3>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack maxHeight="350px" component={'div'} overflow="auto">
                    {pool?.whiteLists.map((ele, key) => (
                      <React.Fragment key={key}>
                        <Stack>{ele}</Stack>
                        <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                      </React.Fragment>
                    ))}
                  </Stack>
                </CardContainer>
              ) : pool?.whitelistable && account !== pool?.owner ? (
                <CardContainer sx={{ display: { xs: 'none', md: 'block' } }}>
                  <h3>
                    {pool?.whiteLists.find((ele) => ele == account)
                      ? 'Congratulations! You are whitelisted.'
                      : "You aren't whitelisted."}
                  </h3>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack maxHeight="350px" component={'div'} overflow="auto">
                    {pool?.whiteLists.length} addresses are whitelisted.
                  </Stack>
                </CardContainer>
              ) : (
                ''
              )}
              {account === pool?.owner && (
                <CardContainer>
                  <h3>Contributors</h3>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack maxHeight="350px" component={'div'} overflow="auto">
                    {pool?.participantsAddresses.length > 0
                      ? pool?.participantsAddresses.map((ele, key) => (
                        <React.Fragment key={key}>
                          <Stack>{ele}</Stack>
                          <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                        </React.Fragment>
                      ))
                      : ''}
                  </Stack>
                </CardContainer>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              {pool.whitelistable && Number(pool.status) === 0 && new Date(pool.startDateTime).getTime() > Date.now() && (
                <Alert
                  variant="outlined"
                  severity="info"
                  sx={{  display: { xs: 'none', md: 'block' }, mt: 2, fontWeight: 'bold', bgcolor: 'primary.dark', color: 'white', textAlign: 'center' }}
                >
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h6">Whitelist Sale Starts In:</Typography>
                    <Typography variant="h6" letterSpacing={1}>
                      {startCountDown.days}:{startCountDown.hours}:{startCountDown.minutes}:{startCountDown.seconds}
                    </Typography>
                  </Stack>
                </Alert>
              )}
              {pool.whitelistable &&
                Number(pool.status) === 0 &&
                new Date(pool.startDateTime).getTime() < Date.now() &&
                (Number(publicCountDown.minutes) > 0 || Number(publicCountDown.seconds) > 0) && (
                  <Alert
                    variant="outlined"
                    severity="info"
                    sx={{  display: { xs: 'none', md: 'block' }, mt: 2, fontWeight: 'bold', bgcolor: 'primary.dark', color: 'white', textAlign: 'center' }}
                  >
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Typography variant="h6">Public Sale Starts In:</Typography>
                      <Typography variant="h6" letterSpacing={1}>
                        {publicCountDown.minutes}:{publicCountDown.seconds}
                      </Typography>
                    </Stack>
                  </Alert>
                )}
              <CardContainer sx={{ display: { xs: 'none', md: 'block' }}}>
                <Stack textAlign="center">
                  {Number(pool.status) === 0 ? (
                    new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                      pool.softCap <= pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Presale Cancelled
                      </Stack>
                    ) : new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                      pool.softCap > pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Failed
                      </Stack>
                    ) : pool.hardCap == pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Presale Finished
                      </Stack>
                    ) : new Date(pool.endDateTime).getTime() < Date.now() && pool.softCap <= pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Ended
                      </Stack>
                    ) : new Date(pool.endDateTime).getTime() < Date.now() && pool.softCap > pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Failed
                      </Stack>
                    ) : new Date(pool.startDateTime).getTime() < Date.now() ? (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Sale Ends In:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {endCountDown.days}:{endCountDown.hours}:{endCountDown.minutes}:{endCountDown.seconds}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Sale Starts In:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {startCountDown.days}:{startCountDown.hours}:{startCountDown.minutes}:{startCountDown.seconds}
                        </Typography>
                      </>
                    )
                  ) : Number(pool.status) === 2 ? (
                    <Stack component="span" fontSize="1rem">
                      Presale Cancelled
                    </Stack>
                  ) : new Date(pool.listDateTime).getTime() + pool.dexLockup * 86400 * 1000 < Date.now() ? (
                    <Stack component="span" fontSize="1rem">
                      LIQ Unlocked
                    </Stack>
                  ) : (
                    <Stack component="span" fontSize="1rem">
                      Listed on DEX
                    </Stack>
                  )}

                  <Stack marginTop="10px">
                    <BorderLinearProgress
                      variant="determinate"
                      value={(100 * pool?.weiRaised) / pool?.hardCap}
                      valueBuffer={100 * pool?.weiRaised < pool?.softCap ? pool?.weiRaised / pool?.softCap : 1}
                      sx={{ my: '2px' }}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" marginTop="5px" padding="0 10px">
                    <Stack component="span" fontSize="0.7rem">
                      {commify(pool?.weiRaised)}
                      {CURRENCY_SYMBOL[chainId]}
                    </Stack>
                    <Stack component="span" fontSize="0.7rem">
                      {commify(pool?.hardCap)}
                      {CURRENCY_SYMBOL[chainId]}
                    </Stack>
                  </Stack>
                  {/* <Stack marginTop="10px">
                    <Alert severity="warning" fontSize="0.85rem" variant="outlined">
                      Make sure the website is pinksale.finance!
                    </Alert>
                  </Stack> */}
                  <Stack component="div" fontSize="0.85rem">
                    {pool?.status === '2' ||
                      (pool?.status === '0' &&
                        new Date(pool?.listDateTime).getTime() + 86400 * 1000 * 21 <= Date.now()) ||
                      (pool?.status === '0' &&
                        new Date(pool?.endDateTime).getTime() <= Date.now() &&
                        pool?.softCap > pool?.weiRaised) ? (
                      <Stack marginTop="10px">
                        {Number(depositedAmount) > 0 ? (
                          !didRefund ? (
                            <Button
                              variant="contained"
                              color="warning"
                              style={{ marginTop: 20 }}
                              onClick={handleRefund}
                            >
                              {isRefunding ? (
                                // <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                                <HashLoader color="#59f1f6" size={30} />
                              ) : (
                                'Refund'
                              )}
                            </Button>
                          ) : (
                            <Button variant="contained" disabled style={{ marginTop: 20 }}>
                              Refunded ({depositedAmount} / {depositedAmount} {pool?.symbol}
                              {CURRENCY_SYMBOL[chainId]})
                            </Button>
                          )
                        ) : (
                          ''
                        )}
                      </Stack>
                    ) : pool?.status == '1' ? (
                      <Stack marginTop="10px">
                        {Number(depositedAmount) > 0 ? (
                          !didRefund ? (
                            <Button
                              variant="contained"
                              color="success"
                              style={{ marginTop: 20 }}
                              onClick={handleClaimToken}
                            >
                              {isClaiming ? (
                                <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                              ) : (
                                'Claim Token'
                              )}
                            </Button>
                          ) : (
                            <Button variant="contained" disabled style={{ marginTop: 20 }}>
                              Claimed ({commify(pool?.presaleRate * depositedAmount)} /
                              {commify(pool?.presaleRate * depositedAmount)} {pool?.symbol})
                            </Button>
                          )
                        ) : (
                          ''
                        )}
                      </Stack>
                    ) : pool?.status == '0' &&
                      new Date(pool?.startDateTime).getTime() < Date.now() &&
                      new Date(pool?.endDateTime).getTime() >= Date.now() &&
                      pool.hardCap !== pool.weiRaised ? (
                      <>
                        <Stack marginTop="10px">
                          <h3>Contribute</h3>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                          <FormControl variant="outlined" sx={{ width: 0.5 }}>
                            <InputLabel htmlFor="amount-deposit">Amount</InputLabel>
                            <OutlinedInput
                              id="amount-deposit"
                              type="number"
                              value={amountToDeposit}
                              onChange={(e) => {
                                setAmountToDeposit(e.target.value);
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Button
                                    color="primary"
                                    aria-label="toggle password visibility"
                                    onClick={handleAmountMAXDeposit}
                                    // onMouseDown={(event) => {event.preventDefault();}}
                                    edge="end"
                                    sx={{ fontSize: 16, p: 0, minWidth: 30, px: 1 }}
                                  >
                                    MAX
                                  </Button>
                                </InputAdornment>
                              }
                              label="Amount"
                            />
                          </FormControl>
                          {!isDepositing ? (
                            <Button
                              sx={{ fontSize: 20, width: 0.5 }}
                              color="success"
                              variant="contained"
                              onClick={deposit}
                            >
                              Buy
                            </Button>
                          ) : (
                            <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                          )}
                        </Stack>
                      </>
                    ) : (
                      ''
                    )}
                  </Stack>
                </Stack>
                <Stack>
                  {/* <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Status</span>
                    <Stack componenet="span" color="error.main">
                      {POOL_STATUS[pool?.status]}
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Sale type</span>
                    <Stack componenet="span" color="error.main">
                      {pool?.whitelistable ? 'White Listed only' : 'Public'}
                    </Stack>
                  </Stack> */}
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Minimum Buy</span>
                    <span>
                      {commify(pool?.minAllocationPerUser)}
                      {CURRENCY_SYMBOL[chainId]}
                    </span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Maximum Buy</span>
                    <span>
                      {commify(pool?.maxAllocationPerUser)}
                      {CURRENCY_SYMBOL[chainId]}
                    </span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Total Contributors</span>
                    <span>{pool?.participantsAddresses ? pool?.participantsAddresses.length : 0}</span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>My Contribution</span>
                    <Typography color={Number(depositedAmount) > 0 && 'primary'}>
                      {depositedAmount} {CURRENCY_SYMBOL[chainId]}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>My Reserved Token</span>
                    <Typography color={Number(depositedAmount) > 0 && 'primary'}>
                      {depositedAmount * pool?.presaleRate} {pool?.symbol}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Presale Rate</span>
                    <span>
                      {commify(pool?.presaleRate)} {pool?.symbol}
                    </span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
                    <span>Dex Rate</span>
                    <span>
                      {commify(pool?.dexRate)} {pool?.symbol}
                    </span>
                  </Stack>
                </Stack>
              </CardContainer>
              <CardContainer>
                <Stack textAlign="center">
                  {Number(pool.status) === 0 ? (
                    new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                      pool.softCap <= pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Presale Cancelled
                      </Stack>
                    ) : new Date(pool.listDateTime).getTime() + 86400 * 21 * 1000 < Date.now() &&
                      pool.softCap > pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Failed
                      </Stack>
                    ) : pool.hardCap === pool.weiRaised ? (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Estimated DEX listing time:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {listCountDown.days}:{listCountDown.hours}:{listCountDown.minutes}:{listCountDown.seconds}
                        </Typography>
                      </>
                    ) : new Date(pool.endDateTime).getTime() < Date.now() && pool.softCap <= pool.weiRaised ? (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Estimated DEX listing time:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {listCountDown.days}:{listCountDown.hours}:{listCountDown.minutes}:{listCountDown.seconds}
                        </Typography>
                      </>
                    ) : new Date(pool.endDateTime).getTime() < Date.now() && pool.softCap > pool.weiRaised ? (
                      <Stack component="span" fontSize="1rem">
                        Sale Failed
                      </Stack>
                    ) : new Date(pool.startDateTime).getTime() < Date.now() ? (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Estimated DEX listing time:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {listCountDown.days}:{listCountDown.hours}:{listCountDown.minutes}:{listCountDown.seconds}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Stack component="span" fontSize="1rem">
                          Estimated DEX listing time:
                        </Stack>
                        <Typography variant="span" fontSize="0.8rem" letterSpacing="1px">
                          {listCountDown.days}:{listCountDown.hours}:{listCountDown.minutes}:{listCountDown.seconds}
                        </Typography>
                      </>
                    )
                  ) : Number(pool.status) === 2 ? (
                    <Stack component="span" fontSize="1rem">
                      Presale Cancelled
                    </Stack>
                  ) : new Date(pool.listDateTime).getTime() + pool.dexLockup * 86400 * 1000 < Date.now() ? (
                    <Stack component="span" fontSize="1rem">
                      LIQ Unlocked
                    </Stack>
                  ) : (
                    <Stack component="span" fontSize="1rem">
                      Listed on DEX
                    </Stack>
                  )}
                  <Stack
                    flexWrap="wrap"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    fontSize="0.85rem"
                    sx={{ mt: 1 }}
                  >
                    <Typography>Token Address</Typography>
                    <Stack direction="row" alignItems="center">
                      <Link
                        href={`${SCAN_URL[network]}/address/${pool?.projectTokenAddress}`}
                        color="primary"
                        fontSize={16}
                        target="_blank"
                      >
                        {pool?.projectTokenAddress}
                      </Link>
                      <CopyClipboard value={pool?.projectTokenAddress} />
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>Token Decimals</Typography>
                    {pool?.decimals}
                  </Stack>
                  {pool?.status == '1' || pool?.status == '3' ? (
                    <>
                      <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

                      <Stack direction="row" alignItems="center" fontSize="0.85rem">
                        <Typography sx={{ width: 100 }}>Listed On</Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          component={Link}
                          href={`${SWAP_URL[network]}${pool?.projectTokenAddress}`}
                          target="_blank"
                          color="primary"
                          fontSize={16}
                          spacing={1}
                        >
                          <Box
                            component="img"
                            src={
                              network === Number(process.env.REACT_APP_BSC_CHAINID)
                                ? '/icons/pancakeswap.png'
                                : '/icons/uniswap.svg'
                            }
                            sx={{ borderRadius: '50%', width: 20 }}
                          />
                          <Typography>
                            {network === Number(process.env.REACT_APP_BSC_CHAINID) ? 'Pancakeswap' : 'Uniswap'}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" alignItems="center" fontSize="0.85rem">
                        <Typography sx={{ width: 100 }}>Chart</Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          component={Link}
                          href={`${DEXTOOL_URL[network]}${pool?.projectTokenAddress}`}
                          target="_blank"
                          color="primary"
                          fontSize={16}
                          spacing={1}
                        >
                          <Box
                            component="img"
                            src={
                              network === Number(process.env.REACT_APP_BSC_CHAINID)
                                ? '/icons/poocoin.png'
                                : '/icons/dextools.png'
                            }
                            sx={{ width: 20 }}
                          />
                          <Typography>
                            {network === Number(process.env.REACT_APP_BSC_CHAINID) ? 'Poocoin' : 'Dextools'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </>
                  ) : (
                    ''
                  )}
                </Stack>
              </CardContainer>

              {account === pool?.owner ? (
                <CardContainer>
                  <Stack component="span" fontSize="0.7rem" textAlign="center">
                    Manage Pool
                  </Stack>
                  <Stack component="div">
                    {Number(pool?.status) === 0 ? (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          style={{ marginTop: 20 }}
                          onClick={() => setCancelDialogOpen(!isCancelling)}
                        >
                          {isCancelling ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'Cancel'}
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          style={{ marginTop: 20 }}
                          onClick={() => setUpdateDialogOpen(!isUpdating)}
                        >
                          {isUpdating ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'Update'}
                        </Button>
                        {pool?.whitelistable ? (
                          <>
                            <TextField
                              fullWidth
                              label="List of Addresses"
                              type="text"
                              value={whiteList}
                              multiline
                              onChange={(e) => {
                                setWhiteList(e.target.value);
                              }}
                              sx={{
                                marginTop: '20px',
                                width: 1,
                                color: 'white',
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiOutlinedInput-root': { color: 'white' },
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white'
                                }
                              }}
                            />
                            <Button
                              variant="contained"
                              color="success"
                              style={{ marginTop: 20 }}
                              onClick={addWhiteList}
                            >
                              {isWhiteListing ? (
                                <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                              ) : (
                                'Add to WhiteList'
                              )}
                            </Button>
                          </>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      ''
                    )}
                    {new Date(pool?.startDateTime).getTime() > Date.now() && Number(pool?.status) === 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                        onClick={handleUpdateWhitelistable}
                      >
                        {isUpdatingWhitelistable ? (
                          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                        ) : pool?.whitelistable ? (
                          'Make Public'
                        ) : (
                          'Make Whitelisted Only'
                        )}
                      </Button>
                    ) : (
                      ''
                    )}
                    {new Date(pool?.listDateTime).getTime() <= Date.now() &&
                      Number(pool?.status) === 0 &&
                      pool?.softCap <= pool?.weiRaised ? (
                      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleFinalize}>
                        {isFinalizing ? (
                          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                        ) : (
                          'Finalize the pool'
                        )}
                      </Button>
                    ) : (
                      ''
                    )}
                    {new Date(pool?.listDateTime).getTime() + 86400 * Number(pool?.dexLockup) * 1000 <= Date.now() &&
                      pool?.status == '1' ? (
                      <Button variant="contained" color="success" style={{ marginTop: 20 }} onClick={handleUnlock}>
                        {isUnlocking ? (
                          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                        ) : (
                          'Unlock Liquidity'
                        )}
                      </Button>
                    ) : (
                      ''
                    )}

                    {teamVesting.reduce((previousValue, currentValue) => {
                      if (currentValue.period < Date.now()) return previousValue + Number(currentValue.amount);
                      else return previousValue;
                    }, 0) > Number(pool.teamVesting_unlocked_amount) &&
                      (pool?.status == '1' || pool?.status == '3') ? (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                        onClick={handleUnlockTeamToken}
                      >
                        {isUnlockingTeamToken ? (
                          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                        ) : (
                          'Unlock Team Token'
                        )}
                      </Button>
                    ) : (
                      ''
                    )}
                  </Stack>
                </CardContainer>
              ) : (
                ''
              )}
              {account === ADMIN_ADDRESS[network] ? (
                <CardContainer>
                  <Stack component="span" fontSize="0.7rem" textAlign="center">
                    Admin Manage Pool
                  </Stack>
                  <Stack component="div">
                    {Number(pool?.status) === 0 ? (
                      <Button
                        variant="contained"
                        color="error"
                        style={{ marginTop: 20 }}
                        onClick={() => setCancelDialogOpen(!isCancelling)}
                      >
                        {isCancelling ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'Cancel'}
                      </Button>
                    ) : (
                      ''
                    )}
                    {/* <Button
                      variant="contained"
                      color="error"
                      style={{ marginTop: 20 }}
                      onClick={() => setRemoveDialogOpen(!isRemoving)}
                    >
                      {isRemoving ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'Remove'}
                    </Button> */}
                    {pool?.kyc ? (
                      <Button variant="contained" color="secondary" style={{ marginTop: 20 }} onClick={setKYC}>
                        {isKYCing ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'no KYC'}
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={setKYC}>
                        {isKYCing ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'KYC'}
                      </Button>
                    )}
                    {!pool?.audit ? (
                      <TextField
                        fullWidth
                        label="Audit Link"
                        type="text"
                        value={auditLink}
                        onChange={(e) => {
                          setAuditLink(e.target.value);
                        }}
                        sx={{
                          marginTop: '20px',
                          width: 1,
                          color: 'white',
                          '& .MuiInputLabel-root': { color: 'white' },
                          '& .MuiOutlinedInput-root': { color: 'white' },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white'
                          }
                        }}
                      />
                    ) : (
                      ''
                    )}
                    {pool?.audit ? (
                      <Button variant="contained" color="secondary" style={{ marginTop: 20 }} onClick={setAudit}>
                        {isAuditing ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'no Audit'}
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={setAudit}>
                        {isAuditing ? <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> : 'Audit'}
                      </Button>
                    )}
                    {isUpdatingTier ? (
                      <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} style={{ marginTop: 20 }} />
                    ) : (
                      <Select
                        style={{ marginTop: 20 }}
                        value={pool?.tier}
                        onChange={handleUpdateTier}
                        fullWidth
                        inputProps={{
                          sx: {
                            display: 'flex',
                            alignItems: 'center'
                          }
                        }}
                        MenuProps={{
                          sx: {
                            '& .MuiPaper-root': {
                              background: 'rgba(255, 255, 255, 0.3)',
                              backdropFilter: 'blur(20px)'
                            }
                          }
                        }}
                      >
                        <MenuItem value="0">Default</MenuItem>
                        <MenuItem value="2">
                          <Box component="img" src={`/promotions/2.png`} sx={{ width: 32, mr: 2 }} />
                          Platinum
                        </MenuItem>
                        <MenuItem value="3">
                          <Box component="img" src={`/promotions/3.png`} sx={{ width: 32, mr: 2 }} />
                          Diamond
                        </MenuItem>
                        <MenuItem value="1">
                          <Box component="img" src={`/promotions/1.png`} sx={{ width: 32, mr: 2 }} />
                          Gold
                        </MenuItem>
                      </Select>
                    )}
                  </Stack>
                </CardContainer>
              ) : (
                ''
              )}
              {pool?.whitelistable && account === pool?.owner ? (
                <CardContainer sx={{ display: { sm: 'block', md: 'none' } }}>
                  <h3>Whitelisted Addresses</h3>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack maxHeight="350px" component={'div'} overflow="auto">
                    {pool?.whiteLists.map((ele, key) => (
                      <React.Fragment key={key}>
                        <Stack>{ele}</Stack>
                        <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                      </React.Fragment>
                    ))}
                  </Stack>
                </CardContainer>
              ) : pool?.whitelistable && account !== pool?.owner ? (
                <CardContainer sx={{ display: { sm: 'block', md: 'none' } }}>
                  <h3>
                    {pool?.whiteLists.find((ele) => ele == account)
                      ? 'Congratulations! You are whitelisted.'
                      : "You aren't whitelisted."}
                  </h3>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack maxHeight="350px" component={'div'} overflow="auto">
                    {pool?.whiteLists.length} addresses are whitelisted.
                  </Stack>
                </CardContainer>
              ) : (
                ''
              )}
              
            </Grid>
          </Grid>
        )}
      </Container>
      <ConfirmDialog
        id="cancel-dialog"
        keepMounted
        open={cancelDialogOpen}
        onClose={handleCancelDialog}
        title="Are you sure?"
        content="This pool will be cancelled."
      />
      {/* <ConfirmDialog
        id="remove-dialog"
        keepMounted
        open={removeDialogOpen}
        onClose={handleRemoveDialog}
        title="Are you sure?"
        content="This pool will be removed."
      /> */}
      <UpdateDialog
        id="update-dialog"
        keepMounted
        open={updateDialogOpen}
        onClose={handleUpdateDialog}
        ipfs={pool ? pool?.ipfs : {}}
      />
    </Page>
  );
}
