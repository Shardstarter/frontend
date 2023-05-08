import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useActiveWeb3React from "./useActiveWeb3React";
import { TIER_LEVEL, TIER_STAKING_AMOUNT } from "config/constants";
import { useMainStakingContract, useMainStakingTokenContract } from "./useContract";
import { useIDOContract, usePoolContract } from "./useContract";
import { formatUnits, parseUnits, formatEther, parseEther } from '@ethersproject/units';
import { TIER_DEPOSIT_PERCENT } from "config/constants";
import apis from "services";

export const useMainStakingStatus = () => {
  const [tier, setTier] = useState(TIER_LEVEL.none_0);
  const [countTiers, setCountTiers] = useState([0, 0, 0, 0]); // number of users in each tier level
  const [myTierLevelCount, setMyTierLevelCount] = useState(0); // number of users in my tier level
  const [staked_amount, setStakedAmount] = useState(0);
  const [reward_amount, setRewardAmount] = useState(0);
  const { account, library } = useActiveWeb3React();

  const mainStakingContract = useMainStakingContract();
  const tokenContract = useMainStakingTokenContract(); //main staking token

  //Wallet balance
  const [wallet_balance, setWalletBalance] = useState(0)
  useEffect(() => {
    (async () => {
      try {
        let decimals = await tokenContract.decimals();
        let wallet_balance = await tokenContract.balanceOf(account);
        wallet_balance = formatUnits(wallet_balance, decimals);
        setWalletBalance(wallet_balance);
      } catch (error) {
        console.log(error.message)
      }
    })();
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
  }, [account]);

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

    if (poolInfo?.whitelistable) {//whitelist
      if (poolInfo?.whiteLists?.includes(account)) { //included in whitelists
        setMyMaxDeposit(poolInfo.whitelistMaxDeposit)
      } else { //not included in whitelists, follow tier system
        var tier_count = Number(myTierLevelCount) ? Number(myTierLevelCount) : 1;
        var mymax = Number(poolInfo?.hardCap) * Number(TIER_DEPOSIT_PERCENT[tier]) / 100 / tier_count;
        setMyMaxDeposit(mymax)
      }

    } else { //public, tier system
      var tier_count = Number(myTierLevelCount) ? Number(myTierLevelCount) : 1;
      var mymax = Number(poolInfo?.hardCap) * Number(TIER_DEPOSIT_PERCENT[tier]) / 100 / tier_count;
      setMyMaxDeposit(mymax)
    }
  }, [tier, myTierLevelCount, poolInfo, account])



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
      if (buyingAmount > tokenBalance) {
        alert('It greater than wallet balance.');
        return;
      }
      if (buyingAmount < poolInfo.minAllocationPerUser) {
        alert('Should be greater than min allocation');
        return;
      }
      if (buyingAmount > myMaxDeposit) {
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

  return {
    myCollaboration,
    stage, stage_label,
    action, action_label, action_description, action_available,
    handleFinalize,
  };
};
