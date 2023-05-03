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
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Label from 'components/Label';
import Page from 'components/Page';
import { BigNumber } from 'ethers';
import { LOCK_ADDRESS } from '../config/constants';
import { formatUnits, parseUnits, commify } from '@ethersproject/units';
import { useSnackbar } from 'notistack';
import { useLockContract } from 'hooks/useContract';
import Loader from 'react-loader-spinner';
import HashLoader from 'react-spinners/HashLoader';
import CopyClipboard from 'components/CopyToClipboard';

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

export default function CreateLock() {
  const navigate = useNavigate();
  // const handleTokenAddress = async (e) => {
  //   setIsParsing(true);
  //   dispatch(setAddress(e.target.value));
  // };
  const { account } = useWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const [token, setToken] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 10000));
  const tokenContract = useTokenContract(token);
  const [isParsing, setIsParsing] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
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

  const handleLock = async () => {
    let unmounted = false;
    setIsLocking(true);
    (async () => {
      if (token != '' && amount > 0 && !isLocking) {
        let isLiquidity = false;
        try {
          const token0 = await tokenContract.token0();
          if (token0) isLiquidity = true;
        } catch (err) {}
        try {
          const balance = await tokenContract.balanceOf(account);
          if (balance.lt(parseUnits(String(amount), tokenInfo.decimals))) {
            if (!unmounted) {
              setAmountError('More than balance!');
              setIsLocking(false);
            }
            return;
          }
        } catch (err) {
          if (!unmounted) {
            setTokenError('Invalid token address');
            setIsLocking(false);
          }
          return;
        }
        try {
          const allowance = await tokenContract.allowance(account, LOCK_ADDRESS[network]);
          console.log(allowance);
          if (allowance.lt(parseUnits(String(amount), tokenInfo.decimals))) {
            const tx = await tokenContract.approve(
              LOCK_ADDRESS[network],
              parseUnits(String(amount), tokenInfo.decimals)
            );
            await tx.wait();
          }
        } catch (err) {
          if (!unmounted) {
            setTokenError('Failed in Approving!');
            setIsLocking(false);
          }
          return;
        }
        if (new Date(date).getTime() - Date.now() < 10 * 1000) {
          enqueueSnackbar('Oops, Lock duration should be longer than 10 minutes!', {
            variant: 'error'
          });
          if (!unmounted) {
            setIsLocking(false);
          }
          return;
        }
        try {
          const tx = await lockContract.add(
            token,
            new Date(date).getTime() / 1000,
            parseUnits(String(amount), tokenInfo.decimals),
            account,
            isLiquidity
          );
          await tx.wait();
          if (!unmounted) {
            setAmount(0);
            setToken('');
            enqueueSnackbar('Locked successufully!', {
              variant: 'success'
            });
            setIsLocking(false);
          }
        } catch (err) {
          if (!unmounted) {
            setTokenError('Failed in Locking!');
            setIsLocking(false);
          }
          return;
        }
      }
    })();
    return () => {
      unmounted = true;
    };
  };
  return (
    <Page title="Create Lock">
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
          <Typography variant="h4">Create Your Lock</Typography>
          <Divider />
          <Alert variant="outlined" severity="success" sx={{ mt: 2 }}>
            <AlertTitle>Verified</AlertTitle>
            GemPad is Audited By:  <Link href="https://github.com/interfinetwork/smart-contract-audits/blob/audit-updates/GemPadLock_AuditReport_InterFi.pdf" target="_blank">InterFi</Link>
          </Alert>
          <Stack sx={{ mt: 2 }} spacing={3}>
            <TextField
              fullWidth
              label="Token or LP Token Address"
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
              label="Amount"
              type="number"
              error={Boolean(amountError)}
              helperText={amountError}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
          <Alert variant="outlined" severity="warning" sx={{ mt: 2 }}>
            Exclude GemPad's lock address <b>{LOCK_ADDRESS[network]}</b> <CopyClipboard value={LOCK_ADDRESS[network]} />
            from Fees, Max Transaction and Rewards.
          </Alert>
          <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
            <Button size="large" variant="contained" sx={{ bgcolor: 'primary.dark', width: 200 }} onClick={handleLock}>
              {isLocking ? <HashLoader color="#59f1f6" size={30} /> : 'Lock'}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
