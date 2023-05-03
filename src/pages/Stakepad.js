import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import ViewAllPools from 'components/ViewAllPools';
import PoolsCardPhone from 'components/PoolsCardPhone';
// material
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useStakingContract, useTokenContract } from '../hooks/useContract';
// hooks
// components
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden';
import axios from '../utils/axios';
import { useSnackbar } from 'notistack';
import { imageURL } from '../utils';

import apis from 'services';
// ----------------------------------------------------------------------

export default function Stakepad() {
  return (
    <Page  style={{ backgroundColor: '#171819' }}>
      <Grid>
        <MHidden width="mdDown">
          <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop="30px">
            <Grid align="center" justifyContent="center">
              <button className="btn btn-dark text-info mx-1">
                Staking Pools
              </button>
              <a href="#farmingSection">
                <button className="btn btn-dark text-info mx-1">Farming Pools</button>
              </a>
            </Grid>
            <Grid align="center" justifyContent="center" marginTop="30px">
              <Box component="p" fontSize="16px" style={{ color: 'white' }}>
                Earn high yield by staking mega capital token or join other
                <br />
                attractive staking pools from IDO projects
              </Box>
            </Grid>
            <StakingPool></StakingPool>
            <FarmingPools></FarmingPools>
          </Grid>
        </MHidden>

        <MHidden width="mdUp">
          <Grid paddingLeft={'7%'} paddingRight={'7%'} paddingTop="30px">
            <Grid color="#56C5FF" textAlign="center" fontSize={20} marginBottom="20px">
              <Box
                component="button"
                marginRight="10px"
                padding="5px"
                backgroundColor="#232323"
                color="#56C5FF"
                border="none"
                borderRadius={0.5}
                fontSize={13}
              >
                Staking Pools
              </Box>
              <Box
                component="button"
                padding="5px"
                backgroundColor="#232323"
                color="#56C5FF"
                border="none"
                borderRadius={0.5}
                fontSize={13}
                onClick={() => window.scrollTo({ left: 0, top: 550, behavior: 'smooth' })}
              >
                Farming Pools
              </Box>
            </Grid>
            <Grid align="center" textAlign="center" color="white">
              Earn high yield by staking mega capital token or join other attractive staking pools from IDO projects
              check word file please
            </Grid>
            <StakingPool />
            <FarmingPools></FarmingPools>
          </Grid>
        </MHidden>
      </Grid>
    </Page>
  );
}

export function StakingPool(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);
  // const [isLoading, setIsLoading] = useState(true);
  const [pools, SetPools] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/bsc/stake`, {});
        if (response.data) {
          SetPools(response.data.data);
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
    })();
  }, [account, network]);

  return (
    <>
      <MHidden width="mdDown">
        <Grid marginTop="50px">
          {props?.isHomePage ? null : (
            <Grid container position="relative" marginBottom="60px">
              <Box fontSize="24px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
                Staking Pools
              </Box>
              <Box fontSize="24px" sx={{ position: 'absolute', right: '10px', color: 'white' }}>
                <ViewAllPools to="#" title="View All Pools" />
              </Box>
            </Grid>
          )}
          {pools.map((item, index) => (
            <PoolBox pool={item} key={index} />
          ))}
        </Grid>
      </MHidden>
      <MHidden width="mdUp">
        <Grid marginTop="50px">
          <Grid container position="relative" marginBottom="60px">
            <Box fontSize="16px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
              {props?.title ? props?.title : 'Staking Pools'}
            </Box>
            <Box fontSize="16px" sx={{ position: 'absolute', right: '10px', color: 'white' }}>
              <ViewAllPools to="#" title="View All Pools" />
            </Box>
          </Grid>
          {pools.map((item, index) => (
            <PoolsCardPhone pool={item} key={index} />
          ))}
        </Grid>
      </MHidden>
    </>
  );
}

function PoolBox(poolInfo) {
  const navigate = useNavigate();

  const { pool } = poolInfo;
  const { library, account } = useActiveWeb3React();
  const tokenContract = useTokenContract(pool.tokenAddress);
  const stakingContract = useStakingContract(pool.address);
  const [data, setData] = useState({
    token_decimal: 0,
    wallet_balance: 0,
    staked: 0,
    rewards: 0,
    staking_amount: 0,
    unstaking_amount: 0,
    tvl: 0, //pool information
    lockingReleaseTime: '', //user information
  });
  const [openedPool, setOpenedPool] = useState(false);
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    // let unmounted = false;
    if (openedPool) {

      (async () => {
        setProcessing(true);
        try {
          const wallet_balance = await tokenContract.balanceOf(account);
          const pool_tvl = await stakingContract._totalSupply();
          const decimals = await tokenContract.decimals();
          const staked = await stakingContract.balances(account);
          const rewards = await stakingContract.earned(account);

          let lockingReleaseTime = await stakingContract.lockingReleaseTime(account);
          lockingReleaseTime = formatUnits(lockingReleaseTime, 0);
          if (Number(lockingReleaseTime) > 0) {
            lockingReleaseTime = new Date(Number(lockingReleaseTime) * 1000);
            var year = lockingReleaseTime.getFullYear();
            var month = ("0" + (lockingReleaseTime.getMonth() + 1)).slice(-2);
            var day = ("0" + lockingReleaseTime.getDate()).slice(-2);
            var formattedDate = `${year}-${month}-${day}`;
            lockingReleaseTime = formattedDate;
          } else {
            lockingReleaseTime = "~"
          }


          setData({
            ...data,
            token_decimal: decimals,
            wallet_balance: formatUnits(wallet_balance, decimals),
            staked: formatUnits(staked, decimals),
            rewards: formatUnits(rewards, decimals),
            tvl: formatUnits(pool_tvl, decimals),
            lockingReleaseTime,
          });

        } catch (error) {
        }
        setProcessing(false);
      })();
    }
  }, [account, tokenContract, pool, openedPool]);

  const toggleOpenedPool = () => { setProcessing(true); setOpenedPool((prevState) => !prevState) };

  const handleStake = async () => {
    var bignumber_staking_amount = parseUnits(String(data.staking_amount), data.token_decimal);
    // check allowance
    try {
      const allowance = await tokenContract.allowance(account, pool.address);
      if (allowance.lt(bignumber_staking_amount)) {
        const tx = await tokenContract.approve(pool.address, bignumber_staking_amount);
        let result = await tx.wait();
        if (result.confirmations > 1) {
          const tx = await stakingContract.stake(bignumber_staking_amount);
          await tx.wait();
          window.location.reload()
        }
      } else {
        const tx = await stakingContract.stake(bignumber_staking_amount);
        await tx.wait();

        await apis.updateUserStaking({
          staking_address: pool.address,
          wallet_address: account,
          changing_amount: Number(data.staking_amount)
        });

        window.location.reload()
      }
    } catch (err) {
      console.log(err);
      return;
    }

    // stake
    try {
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleUnstake = async () => {
    try {
      if (new Date(data.lockingReleaseTime).getTime() > Date.now()) {
        if (window.confirm("Unstaking before locktime can be take fee upto 25%. Are you ok?")) {

        } else {
          return;
        }
      }
      const tx = await stakingContract.withdraw(parseUnits(String(data.unstaking_amount), data.token_decimal));
      await tx.wait();

      await apis.updateUserStaking({
        staking_address: pool.address,
        wallet_address: account,
        changing_amount: 0 - Number(data.unstaking_amount)
      });

      window.location.reload()
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const handleHarvest = async () => {
    try {
      const tx = await stakingContract.getReward();
      await tx.wait();
      window.location.reload()
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <>
      <Box
        borderRadius={1}
        sx={{ cursor: 'pointer', bgcolor: '#272727', p: '10px', marginBottom: '5px', marginTop: '30px' }}
        onClick={toggleOpenedPool}
      >
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box component="img" src={pool?.logo} sx={{ width: '50px', marginRight: '10px' }} />
              <Box fontSize="20px" sx={{ marginTop: '10px', color: 'white' }}>
                {pool.tokenName}
              </Box>
            </Box>
          </Grid>
          <Grid container item sm={8} display="flex" justifyContent="right" direction="row">
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color: 'white' }}> Duration</Box>
              <Box sx={{ fontSize: 20 }} color="white" >
                {pool.lockingdays} days
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color: 'white' }}>Staked</Box>
              <Box sx={{ fontSize: 20, minWidth: '3em' }} color="white" >
                {Number(data.tvl).toFixed(2)}
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color: 'white' }}>bonus</Box>
              <Box sx={{ fontSize: 20 }} color="white" >
                {pool.rewardRate}%
              </Box>
            </Grid>
            {/* <Grid item sx={{ marginRight: '20px' }}>
              <button className="btn btn-info text-light mt-2 mx-4">Discover</button>
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
      {openedPool &&
        (processing ? (
          <>loading...</>
          // <Grid
          //   container
          //   borderRadius={1}
          //   bgcolor={'#232323'}
          //   marginTop="20px"
          //   marginBottom="20px"
          //   marginLeft="0px"
          //   padding="20px"
          //   alignItems="center"
          //   justifyContent="center"
          //   columnSpacing={4}
          //   rowSpacing={2}
          //   width="100%"
          // >
          //   <HashLoader color="#59f1f6" size={30} />
          // </Grid>
        ) : (
          <Grid
            container
            borderRadius={1}
            bgcolor={'#232323'}
            marginTop="5px"
            paddingBottom={'20px'}
            marginLeft="0px"
            columnSpacing={4}
            rowSpacing={2}
            width="100%"
          >
            <Grid sm={6} item color="#56C5FF">
              Your wallet {pool.tokenSymbol} balance: {data.wallet_balance}
            </Grid>
            <Grid sm={6} item color="#56C5FF">
              your staked amount: {data.staked}
            </Grid>
            <Grid container item sm={6} display="flex" position="relative" height="60px">
              <Box
                component="input"
                type="number"
                padding="5px"
                width="100%"
                height="50px"
                placeholder="0.0"
                style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 5 }}
                value={data.staking_amount}
                onChange={(e) => setData({ ...data, staking_amount: e.target.value })}
              ></Box>
              <Box
                component="button"
                type="number"
                position="absolute"
                right="7px"
                top="20px"
                style={{ backgroundColor: '#56C5FF', height: '70%', border: 'none', borderRadius: 6 }}
                color="white"
                paddingLeft="20px"
                paddingRight="20px"
                onClick={() => setData({ ...data, staking_amount: data.wallet_balance })}
              >
                MAX
              </Box>
            </Grid>
            <Grid container item sm={6} display="flex" position="relative" height="60px">
              <Box
                component="input"
                padding="5px"
                width="99%"
                height="50px"
                placeholder="0.0"
                style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 5 }}
                value={data.unstaking_amount}
                onChange={(e) => setData({ ...data, unstaking_amount: e.target.value })}
              ></Box>
              <Box
                component="button"
                position="absolute"
                right="17px"
                top="20px"
                style={{ backgroundColor: '#56C5FF', height: '70%', border: 'none', borderRadius: 6 }}
                color="white"
                paddingLeft="20px"
                paddingRight="20px"
                onClick={() => setData({ ...data, unstaking_amount: data.staked })}
              >
                MAX
              </Box>
            </Grid>
            <Grid sm={6} item >
              <Button className="btn btn-info mx-1 px-4 text-light" onClick={() => handleStake()}>
                STAKE
              </Button>
            </Grid>
            <Grid sm={6} item >
              <Button className="btn btn-outline-secondary mx-1 px-4 text-info" onClick={() => handleUnstake()}>
                UNSTAKE
              </Button>
            </Grid>
            <Grid item>
              <Button
                className="btn btn-outline-secondary mx-1 px-4 mt-2 text-light"
                width="100px"
                onClick={() => handleHarvest()}
              >
                HARVEST {data.rewards} {pool.tokenSymbol}
              </Button>
              <Box marginTop="8px">Your Lock time: {data.lockingReleaseTime} Harvesting will reset the lock time. </Box>
            </Grid>
          </Grid>
        ))}
    </>
  );
}

function FarmingPools() {
  const [pools, SetPools] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { account, network } = useActiveWeb3React();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/bsc/stake`, {});
        if (response.data) {
          SetPools(response.data.data);
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
    })();
  }, [account, network]);
  return (
    <Grid marginTop="50px" id="farmingSection">
      <Grid container position="relative" marginBottom="60px">
        <Box fontSize="24px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
          Farming Pools
        </Box>
        <Box fontSize="24px" sx={{ position: 'absolute', right: '10px', color: 'white' }}>
          <ViewAllPools to="#" title="View All Pools" />
        </Box>
      </Grid>

      <Grid item container justifyContent="center">
        <Typography variant="h3">Coming Soon</Typography>
      </Grid>

      {/*{pools.map((item, key) => (*/}
      {/*  <PoolBox key={key} pool={item} />*/}
      {/*))}*/}
    </Grid>
  );
}
