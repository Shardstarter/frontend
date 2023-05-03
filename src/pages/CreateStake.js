import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Container,
  Alert,
  AlertTitle,
  linearProgressClasses,
  Link
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTokenContract } from '../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Page from 'components/Page';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits, commify } from '@ethersproject/units';
import { useSnackbar } from 'notistack';
import { useLockContract } from 'hooks/useContract';
import Loader from 'react-loader-spinner';
import HashLoader from 'react-spinners/HashLoader';
import axios from '../utils/axios';
import { ethers } from 'ethers';
import STAKE_CONTRACT_BYTECODE from '../config/bytecode/staking.json';
import STAKE_CONTRACT_ABI from '../config/abi/staking.json';
import { MAIN_WALLET } from 'config/constants';

const TitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
}));

// const SERVER_URL = "https://mintwall.io/uploads"; // was http://localhost:5000/uploads

export default function CreateStake() {
  const navigate = useNavigate();
  // const handleTokenAddress = async (e) => {
  //   setIsParsing(true);
  //   dispatch(setAddress(e.target.value));
  // };
  const { library, account } = useActiveWeb3React();
  const signer = library?.getSigner();
  const network = useSelector((state) => state.network.chainId);
  //input
  const [token, setToken] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [logo, setLogo] = useState('https://snipboard.io/QnhTJZ.jpg');
  const [lockingdays, setLockingDays] = useState(56);
  const [rewardRate, setRewardRate] = useState(3);
  const [amount, setAmount] = useState(1000);
  const [amountError, setAmountError] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));

  const tokenContract = useTokenContract(token);
  const [isParsing, setIsParsing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const lockContract = useLockContract();
  const [tokenInfo, setTokenInfo] = useState({
    name: '',
    symbol: '',
    decimals: 0,
    totalSupply: 0,
    balanceOf: 0
  });
  useEffect(() => {
    let unmounted = false;
    setIsParsing(true);
    setTokenError('');
    (async () => {
      try {
        if (token != '') {
          const name = await tokenContract.name();
          const symbol = await tokenContract.symbol();
          const decimals = await tokenContract.decimals();
          const totalSupply = await tokenContract.totalSupply();
          const balanceOf = await tokenContract.balanceOf(account);
          if (!unmounted) {
            setTokenInfo({ name, symbol, totalSupply, decimals, balanceOf });
          }
        } else {
          if (!unmounted) {
            setTokenInfo({
              name: '',
              symbol: '',
              decimals: 0,
              totalSupply: 0,
              balanceOf: 0
            });
          }
        }
      } catch (err) {
        console.log(err);
        if (!unmounted) {
          setTokenInfo({
            name: '',
            symbol: '',
            decimals: 0,
            totalSupply: 0,
            balanceOf: 0
          });
          setTokenError('Invalid token address');
        }
      }
      setIsParsing(false);
    })();

    return () => {
      unmounted = true;
    };
  }, [tokenContract, account]);

  const handleCreate = async () => {
    let unmounted = false;
    setProcessing(true);
    (async () => {
      if (token != '' && amount > 0 && !processing) {
        let isLiquidity = false;
        try {
          const token0 = await tokenContract.token0();
          if (token0) isLiquidity = true;
        } catch (err) { }
        //check wallet balance
        try {
          const balance = await tokenContract.balanceOf(account);
          if (balance.lt(parseUnits(String(amount), tokenInfo.decimals))) {
            if (!unmounted) {
              setAmountError('More than balance!');
              setProcessing(false);
            }
            return;
          }
        } catch (err) {
          if (!unmounted) {
            setTokenError('Invalid token address');
            setProcessing(false);
          }
          return;
        }
        // check allowance
        // try {
        //   const allowance = await tokenContract.allowance(account, LOCK_ADDRESS[network]);
        //   console.log(allowance);
        //   if (allowance.lt(parseUnits(String(amount), tokenInfo.decimals))) {
        //     const tx = await tokenContract.approve(
        //       LOCK_ADDRESS[network],
        //       parseUnits(String(amount), tokenInfo.decimals)
        //     );
        //     await tx.wait();
        //   }
        // } catch (err) {
        //   if (!unmounted) {
        //     setTokenError('Failed in Approving!');
        //     setProcessing(false);
        //   }
        //   return;
        // }

        //check Date
        // if (new Date(date).getTime() - Date.now() < 10 * 1000) {
        //   enqueueSnackbar('Oops, Lock duration should be longer than 10 minutes!', {
        //     variant: 'error'
        //   });
        //   if (!unmounted) {
        //     setProcessing(false);
        //   }
        //   return;
        // }

        // add Lock
        // try {
        //   const tx = await lockContract.add(
        //     token,
        //     new Date(date).getTime() / 1000,
        //     parseUnits(String(amount), tokenInfo.decimals),
        //     account,
        //     isLiquidity
        //   );
        //   await tx.wait();
        //   if (!unmounted) {
        //     setAmount(0);
        //     setToken('');
        //     enqueueSnackbar('Locked successufully!', {
        //       variant: 'success'
        //     });
        //     setProcessing(false);
        //   }
        // } catch (err) {
        //   if (!unmounted) {
        //     setTokenError('Failed in Locking!');
        //     setProcessing(false);
        //   }
        //   return;
        // }

        //Deploy staking contract
        var poolAddress;
        try {
          const bytecode = STAKE_CONTRACT_BYTECODE.object;
          const factory = new ethers.ContractFactory(STAKE_CONTRACT_ABI, bytecode, signer);
          const contract = await factory.deploy(token, token, rewardRate, lockingdays, MAIN_WALLET);
          console.log(contract.address);
          poolAddress = contract.address;
          await contract.deployTransaction.wait();

          const tx = await tokenContract.transfer(poolAddress, parseUnits(String(amount), tokenInfo.decimals));
          await tx.wait();

          if (!unmounted) {
            setAmount(0);
            setToken('');
            setProcessing(false);
          }
          navigate(`/stakepad`);
        } catch (err) {
          console.log(err);
          if (!unmounted) {
            setTokenError('Failed!');
            setProcessing(false);
          }
          return;
        }

        //save db
        try {
          const response = await axios.post(`/api/bsc/stake`, {
            address: poolAddress,
            owner: account,
            tokenAddress: token,
            tokenName: tokenInfo.name,
            tokenSymbol: tokenInfo.symbol,
            tokenAddress: token,
            rewardRate: rewardRate,
            logo: logo,
            lockingdays: lockingdays,
            tvl: amount,
            startAt: date
          });
          if (response.data) {
            let message = response.data.message;
            enqueueSnackbar('success', {
              variant: 'success'
            });
          } else {
            enqueueSnackbar('failed', {
              variant: 'danger'
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar('Oops, Something went wrong!', {
            variant: 'error'
          });
        }
      }
    })();
    return () => {
      unmounted = true;
    };
  };

  return (
    <Page title="Create Stake">
      <Container maxWidth="lg" className="pt-5">
        {/* For test */}
        {/* <h6>Network: {network}, Account: {account}, Token: {token}</h6>  */}

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
          <Typography variant="h4">Create Your STAKING POOL</Typography>
          <Divider />
          <Stack sx={{ mt: 2 }} spacing={3}>
            <TextField
              fullWidth
              label="Token Address"
              type="text"
              error={Boolean(tokenError)}
              helperText={tokenError}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              sx={{
                width: 1
              }}
            />
            {isParsing == true ? (
              // <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
              <HashLoader color="#59f1f6" size={30} />
            ) : tokenInfo.name != '' ? (
              <Stack sx={{ marginTop: '30px', padding: '0 20px' }}>
                <Stack direction="row" justifyContent="space-between">
                  <span>Name</span>
                  <span>{tokenInfo.name}</span>
                </Stack>
                <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                <Stack direction="row" justifyContent="space-between">
                  <span>Symbol</span>
                  <span>{tokenInfo.symbol}</span>
                </Stack>
                <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                <Stack direction="row" justifyContent="space-between">
                  <span>Total Supply</span>
                  <span>{commify(formatUnits(tokenInfo.totalSupply, tokenInfo.decimals))}</span>
                </Stack>
                <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                <Stack direction="row" justifyContent="space-between">
                  <span>Decimals</span>
                  <span>{tokenInfo.decimals}</span>
                </Stack>
                <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                <Stack direction="row" justifyContent="space-between">
                  <span>Balance</span>
                  <span>{commify(formatUnits(tokenInfo.balanceOf, tokenInfo.decimals))}</span>
                </Stack>
              </Stack>
            ) : (
              ''
            )}
            <TextField
              fullWidth
              label="Amount(You will send this amount to staking contract for rewards to users.)"
              type="number"
              error={Boolean(amountError)}
              helperText={amountError}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{
                width: 1
              }}
            />
            <TextField
              fullWidth
              label="Token Logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              sx={{
                width: 1
              }}
              placeholder="https://tokenlogo.url"
            />
            <TextField
              fullWidth
              label="Locked Duration(days)"
              value={lockingdays}
              onChange={(e) => setLockingDays(e.target.value)}
              sx={{
                width: 1
              }}
              placeholder="https://tokenlogo.url"
            />
            <TextField
              fullWidth
              label="Reward Rate"
              type="number"
              // error={Boolean(amountError)}
              // helperText={amountError}
              value={rewardRate}
              onChange={(e) => setRewardRate(e.target.value)}
              sx={{
                width: 1
              }}
            />
            <DateTimePicker
              renderInput={(props) => <TextField sx={{ width: 1 }} {...props} />}
              label="Lock Until:"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </Stack>
          <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
            <Button size="large" variant="contained" className="btn btn-info text-light mt-2 mx-4" onClick={handleCreate}>
              {processing ? <HashLoader color="#59f1f6" size={30} /> : 'Create Pool'}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
