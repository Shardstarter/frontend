import { useEffect, useState, useMemo } from "react";
import { ethers } from "ethers";
import useActiveWeb3React from "./useActiveWeb3React";
import {
  DEX_ROUTERV2_ADDRESS, TIER_LEVEL, TIER_STAKING_AMOUNT, TIER_DEPOSIT_PERCENT,
  LIQUID_STAKING_CONTRACT_ADDRESS, PROJECT_MAIN_TOKEN_ADDRESS,
  WETH_TOKEN_ADDRESS, DEX_COINS, DEX_COINS_LIST
} from "config/constants";
import {
  useTokenContract, useMainStakingContract, useProjectMainTokenContract, useIDOContract,
  usePoolContract, useLiquidStakingContract, useLiquidStakingTokenContract,
  useDEXRouterContract,
  useDEXFactoryContract, usePairContract
} from "./useContract";
import { useSelector } from "react-redux";

import { formatUnits, parseUnits, formatEther, parseEther } from '@ethersproject/units';
import apis from "services";

export const useMainStakingStatus = () => {
  const [tier, setTier] = useState(TIER_LEVEL.none_0);
  const [countTiers, setCountTiers] = useState([0, 0, 0, 0]); // number of users in each tier level
  const [myTierLevelCount, setMyTierLevelCount] = useState(0); // number of users in my tier level
  const [staked_amount, setStakedAmount] = useState(0);
  const [reward_amount, setRewardAmount] = useState(0);
  const { account, library } = useActiveWeb3React();

  const mainStakingContract = useMainStakingContract();
  const tokenContract = useProjectMainTokenContract(); //main staking token

  //Wallet balance
  const [wallet_balance, setWalletBalance] = useState(0)
  useEffect(() => {
    if (tokenContract) {
      (async () => {
        try {
          let decimals = await tokenContract.decimals();
          console.log('decimals', decimals)
          let wallet_balance = await tokenContract.balanceOf(account);
          wallet_balance = formatUnits(wallet_balance, decimals);
          setWalletBalance(wallet_balance);
        } catch (error) {
          console.log(error.message)
        }
      })();
    }
  }, [tokenContract])

  //TVL
  const [tvl, setTVL] = useState(0);
  useEffect(() => {
    (async () => {
      if (mainStakingContract) {
        try {
          const pool_tvl = await mainStakingContract._totalSupply();
          setTVL(Number(formatEther(pool_tvl)))
        } catch (error) {
          console.log(error.message)
        }
      }
    })();
  }, [mainStakingContract])

  useEffect(() => {
    const dosth = async () => {
      try {
        if (account) {
          let staked_amount = await mainStakingContract.balances(account);
          staked_amount = Number(formatEther(staked_amount))
          setStakedAmount(staked_amount);

          if (staked_amount > TIER_STAKING_AMOUNT.topaz_4) setTier(TIER_LEVEL.topaz_4);
          else if (staked_amount > TIER_STAKING_AMOUNT.jade_3) setTier(TIER_LEVEL.jade_3);
          else if (staked_amount > TIER_STAKING_AMOUNT.chrome_2) setTier(TIER_LEVEL.chrome_2);
          else if (staked_amount > TIER_STAKING_AMOUNT.amber_1) setTier(TIER_LEVEL.amber_1);
          else setTier(TIER_LEVEL.none_0);

          let reward_amount = await mainStakingContract.earned(account);
          reward_amount = Number(formatEther(staked_amount))
          setRewardAmount(reward_amount);


          let response = await apis.getCountForTierLevel({
            staking_address: mainStakingContract.address,
          });
          if (response.data.result) {
            setCountTiers(response.data.data)
          } else {
            console.log(response.data.message)
          }
        } else {
          setStakedAmount(0)
          setRewardAmount(0)
          setTier(TIER_LEVEL.none_0)
          setCountTiers(0)
        }
      } catch (err) { console.log(err); }
    };

    dosth();
  }, [account, mainStakingContract]);

  useEffect(() => {
    if (tier == TIER_LEVEL.none_0) setMyTierLevelCount(countTiers[0])
    if (tier == TIER_LEVEL.amber_1) setMyTierLevelCount(countTiers[1])
    if (tier == TIER_LEVEL.chrome_2) setMyTierLevelCount(countTiers[2])
    if (tier == TIER_LEVEL.jade_3) setMyTierLevelCount(countTiers[3])
    if (tier == TIER_LEVEL.topaz_4) setMyTierLevelCount(countTiers[4])
  }, [tier, countTiers])


  return { tier, tvl, staked_amount, reward_amount, wallet_balance, myTierLevelCount };
};

export const useIDOPoolStatus = (poolInfo) => {
  const { account, library } = useActiveWeb3React();

  const { tier, myTierLevelCount } = useMainStakingStatus();
  const idoContract = useIDOContract();
  const poolContract = usePoolContract(poolInfo?.address);

  //my deposited amount to pool
  const [myCollaboration, setMyCollaboration] = useState(0);
  useEffect(() => {
    (async () => {
      if (account && poolContract) {
        try {
          let value = await poolContract.collaborations(account)
          console.log('myCollaboration', formatEther(value))
          setMyCollaboration(formatEther(value))
        } catch (error) {
          console.log(error.message)
        }
      }
    })();
  }, [account, poolInfo])

  //user preapproving status
  const [preapproved, setPreapproved] = useState(false);
  useEffect(() => {//setPreapproved
    (async () => {
      if (poolInfo) {
        try {
          const response = await apis.getApproval({
            pool_address: poolInfo.address,
            user_address: account
          });
          if (response.data.result) {
            setPreapproved(response.data.data)
          }
          else {
            alert(response.data.message)
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    })();
  }, [account, poolInfo]);

  /**
* Condition for user to preapprove
* Tier holder and whitedlisted user can preapprove to participate
*/
  const [preapprovingCondition, setPreapprovingCondition] = useState(false);
  useEffect(() => { //setPreapprovingCondition
    (async () => {
      if (account && poolInfo) {
        var value = (tier != TIER_LEVEL.none_0) || (poolInfo?.whitelistable && poolInfo?.whiteLists?.includes(account));
        setPreapprovingCondition(value ? true : false);
      }
    })();
  }, [account, poolInfo, tier]);


  /**
   * Max Deposit amount
   * If IDO is whitelitable, there is max deposit amount for whitelist address. 
   * If IDO is public, each level tier users shares the deposit limit of their tier level.
   */
  const [myMaxDeposit, setMyMaxDeposit] = useState(0)
  useEffect(() => { //setMyMaxDeposit
    if (!account || !poolInfo.address) return;

    if (poolInfo?.whitelistable && poolInfo?.whiteLists?.includes(account)) {// if pool is whitelist and user is included
      setMyMaxDeposit(Number(poolInfo.whitelistMaxDeposit) - Number(myCollaboration))
    } else { //if user is not included in whitelist or pool is public, then follow tier system
      var tier_count = Number(myTierLevelCount) ? Number(myTierLevelCount) : 1;
      var mymax = Number(poolInfo?.hardCap) * Number(TIER_DEPOSIT_PERCENT[tier]) / 100 / tier_count;
      setMyMaxDeposit(Number(mymax) - Number(myCollaboration))
    }
  }, [tier, myTierLevelCount, poolInfo, account, myCollaboration])



  //condition for user buying
  const [buyCondition, setBuyCondition] = useState(false);
  useEffect(() => {
    (async () => {
      if (account && poolInfo) {
        setBuyCondition(preapproved);
      }
    })();
  }, [account, poolInfo, preapproved]);


  //Wallet token balance
  const [tokenBalance, setTokenBalance] = useState(0);
  useEffect(() => {
    (async () => {
      if (account) {
        try {
          /** Get token balance */
          // const wallet_balance = await tokenContract.balanceOf(account);
          // const decimals = await tokenContract.decimals();
          // let tokenBalance = formatUnits(wallet_balance, decimals)
          // setTokenBalance(tokenBalance)

          /** Get native token balance */
          let balance = await library.getBalance(account)
          setTokenBalance(formatUnits(balance, 18))
        } catch (error) {
          console.log(error.message)
        }
      }
    })();
  }, [account, poolInfo])


  //stage
  const [stage, setStage] = useState(-1); //0-upcoming, 1-current open, 2-break time, 3-in FCFS, 4-closed
  useEffect(() => {
    var startDateTime = new Date(poolInfo.startDateTime).getTime()
    var endDateTime = new Date(poolInfo.endDateTime).getTime()
    var fcfsStartDateTime = new Date(poolInfo.fcfsStartDateTime).getTime()
    var fcfsEndDateTime = new Date(poolInfo.fcfsEndDateTime).getTime()
    var nowTime = Date.now();

    if (nowTime < startDateTime) setStage(0); // upcoming
    else if (nowTime < endDateTime) setStage(1); // current open
    else if (nowTime < fcfsStartDateTime) setStage(2); // break time
    else if (nowTime < fcfsEndDateTime) setStage(3); // in FCFS 
    else if (nowTime >= fcfsEndDateTime) setStage(4); // Closed
    else setStage(-2);
  }, [poolInfo])

  const [stage_label, setStageLabel] = useState('');
  useEffect(() => {
    switch (stage) {
      case 0:
        setStageLabel('upcoming')
        break;
      case 1:
        setStageLabel('opened')
        break;
      case 2:
        setStageLabel('break')
        break;
      case 3:
        setStageLabel('FCFS')
        break;
      case 4:
        setStageLabel('closed')
        break;
      default:
        setStageLabel('unknown')
        break;
    }
  }, [stage])

  // functions
  const buy = async (buyingAmount) => {
    try {
      if (Number(buyingAmount) > Number(tokenBalance)) {
        alert('It is greater than wallet balance.');
        return;
      }
      if (Number(buyingAmount) < Number(poolInfo.minAllocationPerUser)) {
        alert('Should be greater than min allocation');
        return;
      }
      if (Number(buyingAmount) > Number(myMaxDeposit)) {
        alert('Should be less than max allocation of tier level');
        return;
      }

      console.log(parseEther(String(buyingAmount)))
      const tx = await idoContract.deposit(poolInfo?.address, {
        value: parseEther(String(buyingAmount))
      });
      await tx.wait();

      const collaborated = await poolContract.collaborations(account);
      setMyCollaboration(formatEther(collaborated));

      var value = await poolContract._weiRaised()

      await apis.updateIDOWeiRaised({
        address: poolInfo?.address,
        weiRaised: formatEther(value)
      });

      await apis.updateUserDeposit({
        pool_address: poolInfo?.address,
        wallet_address: account,
        amount: Number(buyingAmount)
      })

      alert('success');

      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }
  }

  const preapprove = async () => {
    try {
      const response = await apis.setApproval({
        pool_address: poolInfo.address,
        user_address: account
      });
      if (response.data.result) {
        alert('success');
        window.location.reload()
      }
      else {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  //user sider final actions
  const [action, setAction] = useState(); // do when click button
  const [action_label, setActionLabel] = useState(''); //button lable
  const [action_available, setActionAvailable] = useState(false); // can click button?
  const [action_description, setActionDescription] = useState(''); //description for button

  useEffect(() => {
    if (poolInfo != {}) {
      switch (stage) {
        case 0:// current open
          setAction(() => preapprove);
          setActionLabel('Preapprove');
          if (preapproved) {
            setActionAvailable(false);
            setActionDescription('You are preapproved to particiapte')
          } else {
            if (preapprovingCondition) {
              setActionAvailable(true);
              setActionDescription('Preapprove to participate.')
            } else {
              setActionAvailable(true);
              setActionDescription('You are not allowed to particiapte')
            }
          }
          break;
        case 1:// current open
          setAction(() => buy);
          setActionLabel('Deposit');
          if (buyCondition) {
            setActionAvailable(true);
            setActionDescription('Deposit to buy tokens')
          } else {
            setActionAvailable(false);
            setActionDescription('You are not approved to participate')
          }
          break;
        case 2:// break time
          setAction(() => { });
          setActionLabel('');
          setActionAvailable(false);
          setActionDescription('Wait until FCFS opens')
          break;
        case 3:// in FCFS  
          if (poolInfo.weiRaised < poolInfo.hardCap) {
            setMyMaxDeposit(poolInfo.hardCap - poolInfo.weiRaised)
            setAction(() => buy);
            setActionLabel('Deposit');
            setActionAvailable(true);
            setActionDescription('FCFS started')
          } else {
            setAction(() => { });
            setActionLabel('');
            setActionAvailable(false);
            setActionDescription('HardCap reached')
          }
          break;
        case 4:// closed
          setAction(() => { });
          setActionLabel('');
          setActionAvailable(false);
          setActionDescription('Deal is closed')
          break;
        default:
          break;
      }
    }
  }, [stage, poolInfo, preapproved, preapprovingCondition, buyCondition])


  // admin functions
  const handleFinalize = async () => {
    try {
      const tx = await idoContract.endPool(poolInfo?.address);
      await tx.wait();
      console.log('Successfully Finalized!', {
        variant: 'success'
      });
    } catch (err) {
      console.log(err?.message);
      if (err?.data?.message?.includes(`already existed!`) || err?.message?.includes(`already existed!`))
        console.log('Already listed on DEX!', {
          variant: 'error'
        });
      else if (err?.data?.message?.includes(`not finalized!`) || err?.message?.includes(`not finalized!`))
        console.log('Not ready to finalize the pool!', {
          variant: 'error'
        });
      else if (err?.data?.message?.includes(`remove tax`) || err?.message?.includes(`remove tax`))
        console.log('You should remove the tax for the IDO and Presale address! Check Docs', {
          variant: 'error'
        });
      else
        console.log('Oops, Something went wrong, Failed in Finalizing!', {
          variant: 'error'
        });
    }
  }

  const deletePool = async () => {
    try {
      if (window.confirm('Are you sure to remove this pool?')) {
        let response = await apis.deletePool({
          pool_address: poolInfo?.address
        });
        if (response.data.result) {
          window.location.href = "/"
        } else {
          alert(response.data.message)
        }
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  return {
    tokenBalance,
    myCollaboration, myMaxDeposit,
    stage, stage_label,
    action, action_label, action_description, action_available,
    handleFinalize, deletePool,
  };
};

export const useLiquidStakingStatus = () => {
  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);

  const liquidstakingContract = useLiquidStakingContract();

  const [staked_amount, setStakedAmount] = useState(0);
  const [received_amount, setReceivedAmount] = useState(0);
  const [rewards, setRewards] = useState(0);

  const [wallet_SHMX_balance, setWalletSHMXBalance] = useState(0);
  const [wallet_sSHMX_balance, setWalletsSHMXBalance] = useState(0);

  const [totalStakedSHMX, setTotalStakedSHMX] = useState(0);
  const [totalStakers, setTotalStakers] = useState(0);

  const projectmainTokenContract = useProjectMainTokenContract();
  const liquidstakingTokenContract = useLiquidStakingTokenContract();


  const [sSHMX_price] = useState(0.22); //sSHMX token price is 0.22 USD
  const [sSHMX_totalsupply, setsSHMXTotalsupply] = useState(0);
  const sSHMX_marketcap = useMemo(() => {
    console.log('Computing doubledCount');
    return Number(sSHMX_price) * Number(sSHMX_totalsupply);
  }, [sSHMX_price, sSHMX_totalsupply]);

  useEffect(() => {
    (async () => {
      try {
        let staked_amount = await liquidstakingContract.stakedBalances(account);
        staked_amount = formatUnits(staked_amount, 18);
        setStakedAmount(staked_amount);

        let received_amount = await liquidstakingContract.receivedAmount(account);
        received_amount = formatUnits(received_amount, 18);
        setReceivedAmount(received_amount);


        let rewards = await liquidstakingContract.getRewards(account);
        rewards = formatUnits(rewards, 18);
        setRewards(rewards);


        let totalStakedSHMX = await liquidstakingContract.totalStakingAmount();
        totalStakedSHMX = formatUnits(totalStakedSHMX, 18);
        setTotalStakedSHMX(totalStakedSHMX);

        let totalStakers = await liquidstakingContract.totalStakersCount();
        totalStakers = formatUnits(totalStakers, 0);
        setTotalStakers(totalStakers);

        let wallet_SHMX_balance = await projectmainTokenContract.balanceOf(account);
        wallet_SHMX_balance = formatUnits(wallet_SHMX_balance, 18);
        setWalletSHMXBalance(wallet_SHMX_balance);

        let wallet_sSHMX_balance = await liquidstakingTokenContract.balanceOf(account);
        wallet_sSHMX_balance = formatUnits(wallet_sSHMX_balance, 18);
        setWalletsSHMXBalance(wallet_sSHMX_balance);

        let sSHMX_totalsupply = await liquidstakingTokenContract.totalSupply();
        console.log('sSHMX_totalsupply', sSHMX_totalsupply)
        sSHMX_totalsupply = formatUnits(sSHMX_totalsupply, 18);
        setsSHMXTotalsupply(sSHMX_totalsupply);


      } catch (error) {
        console.log(error.message)
      }
    })();
  }, [liquidstakingContract, account])

  const funcStake = async (staking_amount) => {
    let allowance = await projectmainTokenContract.allowance(account, LIQUID_STAKING_CONTRACT_ADDRESS[network]);
    allowance = formatEther(allowance);

    if (Number(allowance) < Number(staking_amount)) {
      const tx = await projectmainTokenContract.approve(LIQUID_STAKING_CONTRACT_ADDRESS[network], parseEther(String(staking_amount)));
      await tx.wait();
    }

    const tx = await liquidstakingContract.stake(parseEther(String(staking_amount)));
    await tx.wait();

    window.location.reload();
  }

  const funcUnstake = async (staking_amount) => {
    const tx = await liquidstakingContract.unstake(parseEther(String(staking_amount)));
    await tx.wait();

    window.location.reload();
  }


  const funcClaimRewards = async () => {
    const tx = await liquidstakingContract.claimRewards();
    await tx.wait();

    window.location.reload();
  }

  return {
    staked_amount, received_amount, rewards,
    wallet_SHMX_balance, wallet_sSHMX_balance,
    totalStakedSHMX, totalStakers, sSHMX_marketcap,
    funcStake, funcUnstake, funcClaimRewards
  };
}

/**
 * 
 * @returns swap contract status
 */
export const useSwapStatus = () => {
  const { account, library } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);

  const dexRouterContract = useDEXRouterContract();

  // Token in
  const [tokenIn, setTokenIn] = useState();
  const tokenInContract = useTokenContract(tokenIn);
  const [tokenInBalance, setTokenInBalance] = useState();
  useEffect(async () => {
    try {
      if (tokenIn == '0x0000000000000000000000000000000000000000') {
        let balance = await library.getBalance(account);
        setTokenInBalance(formatEther(balance));
      } else {
        const balance = await tokenInContract.balanceOf(account);
        setTokenInBalance(formatEther(balance));
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  }, [tokenInContract, tokenIn]);

  // Token out
  const [tokenOut, setTokenOut] = useState();
  const tokenOutContract = useTokenContract(tokenOut);
  const [tokenOutBalance, setTokenOutBalance] = useState();
  useEffect(async () => {
    try {
      if (tokenOut == '0x0000000000000000000000000000000000000000') {
        let balance = await library.getBalance(account);
        setTokenOutBalance(formatEther(balance));
      } else {
        const balance = await tokenOutContract.balanceOf(account);
        setTokenOutBalance(formatEther(balance));
      }

    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  }, [tokenOutContract, tokenOut]);


  const [tokenAmountIn, setTokenAmountIn] = useState(0.001);
  const [tokenAmountOut, setTokenAmountOut] = useState('');

  // Calculate Output from Input
  useEffect(async () => {
    let caltokenIn = tokenIn == '0x0000000000000000000000000000000000000000' ? WETH_TOKEN_ADDRESS[network] : tokenIn;
    let caltokenOut = tokenOut == '0x0000000000000000000000000000000000000000' ? WETH_TOKEN_ADDRESS[network] : tokenOut;

    let amountIn = parseEther(String(tokenAmountIn))
    try {
      const amountsOut = await dexRouterContract.getAmountsOut(amountIn, [caltokenIn, caltokenOut]);
      setTokenAmountOut(Number(formatEther((amountsOut[1]))));
    } catch (e) {
      setTokenAmountOut(0);
    }

  }, [tokenIn, tokenOut, tokenAmountIn, dexRouterContract])

  //Calculate exchange rate
  const [exchangeRate, setExchangeRate] = useState('');
  useEffect(async () => {
    let rate = Number(Number(tokenAmountOut) / Number(tokenAmountIn))
    setExchangeRate(rate)
  }, [tokenAmountIn, tokenAmountOut])

  const funcSwap = async () => {
    let caltokenIn = tokenIn == '0x0000000000000000000000000000000000000000' ? WETH_TOKEN_ADDRESS[network] : tokenIn;
    let caltokenOut = tokenOut == '0x0000000000000000000000000000000000000000' ? WETH_TOKEN_ADDRESS[network] : tokenOut;

    if (caltokenIn == WETH_TOKEN_ADDRESS[network]) {
      const tx = await dexRouterContract.swapExactETHForTokens(
        0,
        [
          caltokenIn,
          caltokenOut
        ],
        account,
        Math.floor(Date.now() / 1000) + 300, // Set the deadline to 5 minutes from now
        { value: parseEther(String(tokenAmountIn)) }
      );
      await tx.wait();
    } else if (caltokenOut == WETH_TOKEN_ADDRESS[network]) {
      const allowance = await tokenInContract.allowance(account, DEX_ROUTERV2_ADDRESS[network]);
      if (allowance.lt(parseEther(String(tokenAmountIn)))) {
        const tx = await tokenInContract.approve(
          DEX_ROUTERV2_ADDRESS[network],
          ethers.constants.MaxUint256 // Approve max token amount
        );
        await tx.wait();
      } else {
        console.log('Token1 transfer is already approved.');
      }

      const tx = await dexRouterContract.swapExactTokensForETH(
        parseEther(String(tokenAmountIn)),
        0,
        [
          caltokenIn,
          caltokenOut
        ],
        account,
        Math.floor(Date.now() / 1000) + 300, // Set the deadline to 5 minutes from now       
      );
      await tx.wait();
    } else {
      const allowance = await tokenInContract.allowance(account, DEX_ROUTERV2_ADDRESS[network]);
      if (allowance.lt(parseEther(String(tokenAmountIn)))) {
        const tx = await tokenInContract.approve(
          DEX_ROUTERV2_ADDRESS[network],
          ethers.constants.MaxUint256 // Approve max token amount
        );
        await tx.wait();
      } else {
        console.log('Token1 transfer is already approved.');
      }

      const tx = await dexRouterContract.swapExactTokensForTokens(
        parseEther(String(tokenAmountIn)),
        0,
        [
          tokenIn,
          tokenOut
        ],
        account,
        Math.floor(Date.now() / 1000) + 300, // Set the deadline to 5 minutes from now
      );
      await tx.wait();
    }


  }

  return {
    tokenIn, tokenOut, setTokenIn, setTokenOut,
    tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut, exchangeRate,
    tokenInBalance, tokenOutBalance,
    funcSwap
  };
};


/**
 * 
 * @returns liquidity, pool status
 */
export const useLiquidityStatus = () => {
  const { account, library } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);

  const dexRouterContract = useDEXRouterContract();
  const dexFactoryContract = useDEXFactoryContract();

  // Token in
  const [tokenIn, setTokenIn] = useState();
  const tokenInContract = useTokenContract(tokenIn);

  const [tokenInBalance, setTokenInBalance] = useState();
  useEffect(async () => {
    try {
      if (tokenIn == '0x0000000000000000000000000000000000000000') {
        let balance = await library.getBalance(account);
        setTokenInBalance(formatEther(balance));
      } else {
        const balance = await tokenInContract.balanceOf(account);
        setTokenInBalance(formatEther(balance));
      }

    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  }, [tokenInContract, tokenIn]);

  // Token out
  const [tokenOut, setTokenOut] = useState();
  const tokenOutContract = useTokenContract(tokenOut);
  const [tokenOutBalance, setTokenOutBalance] = useState();
  useEffect(async () => {
    try {
      if (tokenOut == '0x0000000000000000000000000000000000000000') {
        let balance = await library.getBalance(account);
        setTokenOutBalance(formatEther(balance));
      } else {
        const balance = await tokenOutContract.balanceOf(account);
        setTokenOutBalance(formatEther(balance));
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  }, [tokenOutContract, tokenOut]);


  const [tokenAmountIn, setTokenAmountIn] = useState();
  const [tokenAmountOut, setTokenAmountOut] = useState();

  const [pairAddress, setPairAddress] = useState('0x0000000000000000000000000000000000000000');
  useEffect(async () => {
    if (tokenIn && tokenOut) {
      try {
        const pairAddress = await dexFactoryContract.getPair(tokenIn, tokenOut);
        setPairAddress(pairAddress)
      } catch (error) {
        console.error('Error pair:', error);
      }
    }
  }, [tokenIn, tokenOut]);

  const pairContract = usePairContract(pairAddress)
  const [reserve1, setReserve1] = useState();
  const [reserve2, setReserve2] = useState();
  const [add1, setAdd1] = useState();
  const [sharepercent, setSharepercent] = useState(0);
  const [pairTotalSupply, setPairTotalSupply] = useState();
  const [pairBalance, setPairBalance] = useState();
  useEffect(async () => {
    if (pairContract) {
      try {
        const [reserve1, reserve2] = await pairContract.getReserves();
        setReserve1(Number(formatEther(reserve1)))
        setReserve2(Number(formatEther(reserve2)))

        const add1 = await pairContract.token0();
        setAdd1(add1)

        let pairTotalSupply = await pairContract.totalSupply();
        setPairTotalSupply(Number(formatEther(pairTotalSupply)));

        let pairBalance = await pairContract.balanceOf(account);
        setPairBalance(Number(formatEther(pairBalance)));
      } catch (error) {
        console.error('Error pair:', error);
      }
    }
  }, [pairContract]);

  const onAmountInChanged = async (amountIn) => {
    setTokenAmountIn(amountIn)
    if (pairContract && amountIn) {
      try {
        if (add1.toLowerCase() == tokenIn.toLowerCase()) {
          setTokenAmountOut(Number(amountIn) * reserve2 / reserve1)
          setSharepercent(Math.round(Number(amountIn) / (Number(amountIn) + reserve1) * 100 * 100) / 100)
        }
        else {
          setTokenAmountOut(Number(amountIn) * reserve1 / reserve2)
          setSharepercent(Math.round(Number(amountIn) / (Number(amountIn) + reserve2) * 100 * 100) / 100)
        }
      } catch (error) {
        console.error('Error quote:', error);
      }
    }
  }

  const onAmountOutChanged = async (amountOut) => {
    setTokenAmountOut(amountOut)
    if (pairContract && amountOut) {
      try {

        if (add1.toLowerCase() == tokenIn.toLowerCase()) {
          setTokenAmountIn(Number(amountOut) * reserve1 / reserve2)
          setSharepercent(Math.round(Number(amountOut) / (Number(amountOut) + reserve2) * 100 * 100) / 100)
        }
        else {
          setTokenAmountIn(Number(amountOut) * reserve2 / reserve1)
          setSharepercent(Math.round(Number(amountOut) / (Number(amountOut) + reserve1) * 100 * 100) / 100)
        }
      } catch (error) {
        console.error('Error quote:', error);
      }
    }
  }


  const funcAdd = async () => {
    // approve
    const token1AmountWei = parseEther(String(tokenAmountIn));
    const token2AmountWei = parseEther(String(tokenAmountOut));


    if (tokenIn !== '0x0000000000000000000000000000000000000000') {
      const allowance1 = await tokenInContract.allowance(account, DEX_ROUTERV2_ADDRESS[network]);
      console.log(formatEther(allowance1))
      if (allowance1.lt(token1AmountWei)) {
        const tx = await tokenInContract.approve(
          DEX_ROUTERV2_ADDRESS[network],
          ethers.constants.MaxUint256 // Approve max token amount
        );
        await tx.wait();
      } else {
        console.log('Token1 transfer is already approved.');
      }
    }

    if (tokenOut !== '0x0000000000000000000000000000000000000000') {
      const allowance2 = await tokenOutContract.allowance(account, DEX_ROUTERV2_ADDRESS[network]);
      console.log(formatEther(allowance2))
      if (allowance2.lt(token2AmountWei)) {
        const tx = await tokenOutContract.approve(
          DEX_ROUTERV2_ADDRESS[network],
          ethers.constants.MaxUint256 // Approve max token amount
        );
        await tx.wait();
      } else {
        console.log('Token2 transfer is already approved.');
      }
    }


    if (tokenIn == '0x0000000000000000000000000000000000000000') {
      // addLiquidityETH
      const tx = await dexRouterContract.addLiquidityETH(
        tokenOut,
        token2AmountWei,
        0,
        0,
        account,
        Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes deadline
        { value: token1AmountWei }
      );
      await tx.wait();
    } else if (tokenOut == '0x0000000000000000000000000000000000000000') {
      // addLiquidityETH
      const tx = await dexRouterContract.addLiquidityETH(
        tokenIn,
        token1AmountWei,
        0,
        0,
        account,
        Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes deadline
        { value: token2AmountWei }
      );
      await tx.wait();
    } else {
      // addLiquidity
      const tx = await dexRouterContract.addLiquidity(
        tokenIn,
        tokenOut,
        token1AmountWei,
        token2AmountWei,
        0,
        0,
        account,
        Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes deadline
      );
      await tx.wait();
    }
  }

  const funcRemove = async (percent) => {
    let removeAmount = pairBalance * Number(percent) / 100;
    removeAmount = parseEther(String(removeAmount));

    const allowance = await pairContract.allowance(account, DEX_ROUTERV2_ADDRESS[network]);
    if (allowance.lt(removeAmount)) {
      const tx = await pairContract.approve(
        DEX_ROUTERV2_ADDRESS[network],
        ethers.constants.MaxUint256 // Approve max token amount
      );
      await tx.wait();
    } else {
      console.log('Pair transfer is already approved.');
    }

    const tx = await dexRouterContract.removeLiquidity(
      tokenIn,
      tokenOut,
      removeAmount,
      0,
      0,
      account,
      Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes deadline
    );
    await tx.wait();
  }

  return {
    tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut,
    tokenInBalance, tokenOutBalance,
    tokenIn, tokenOut, setTokenIn, setTokenOut,
    pairAddress, sharepercent,
    onAmountInChanged, onAmountOutChanged,
    pairTotalSupply, pairBalance,
    funcAdd, funcRemove
  };
};