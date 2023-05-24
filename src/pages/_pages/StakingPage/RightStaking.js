import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RoundedLabel, Label } from 'components/_components/Label';
import { SubmitInput } from 'components/_components/Input';
import { PrimaryButton } from 'components/_components/Button';

import { formatUnits, parseUnits } from '@ethersproject/units';
import { useProjectMainTokenContract, useMainStakingContract } from 'hooks/useContract';
import { useMainStakingStatus } from 'hooks/useMyStatus';
import apis from 'services';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

function RightStaking() {
  const { tier, staked_amount, reward_amount } = useMainStakingStatus();
  const tokenContract = useProjectMainTokenContract(); //main staking token
  const stakingContract = useMainStakingContract();
  const { account } = useActiveWeb3React();

  const [stakingpool_address, setStakingPoolAddress] = useState('')
  const [wallet_balance, setWalletBalance] = useState(0)
  const [data, setData] = useState({
    token_decimal: 18,
    staking_amount: 0, //input data
    unstaking_amount: 0, //input data,
    lockingReleaseTime: '', //user information
  });


  useEffect(() => {
    (async () => {
      try {
        setStakingPoolAddress(stakingContract.address)
        let decimals = await tokenContract.decimals();
        let wallet_balance = await tokenContract.balanceOf(account);
        wallet_balance = formatUnits(wallet_balance, decimals);
        setWalletBalance(wallet_balance);

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
          lockingReleaseTime,
        });
      } catch (error) {
        console.log(error.message)
      }
    })();

  }, [account, stakingContract, tokenContract]);

  const handleStake = async () => {
    console.log(data)
    var bignumber_staking_amount = parseUnits(String(data.staking_amount), data.token_decimal);
    // check allowance
    try {
      const allowance = await tokenContract.allowance(account, stakingpool_address);
      if (allowance.lt(bignumber_staking_amount)) {
        const tx = await tokenContract.approve(stakingpool_address, bignumber_staking_amount);
        let result = await tx.wait();
        if (result.confirmations > 1) {
          const tx = await stakingContract.stake(bignumber_staking_amount);
          await tx.wait();

          await apis.updateUserStaking({
            staking_address: stakingpool_address,
            wallet_address: account,
            changing_amount: Number(data.staking_amount)
          });

          window.location.reload()
        }
      } else {
        const tx = await stakingContract.stake(bignumber_staking_amount);
        await tx.wait();

        await apis.updateUserStaking({
          staking_address: stakingpool_address,
          wallet_address: account,
          changing_amount: Number(data.staking_amount)
        });

        window.location.reload()
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleUnstake = async () => {
    console.log(data)
    try {
      if (new Date(data.lockingReleaseTime).getTime() > Date.now()) {
        if (window.confirm("Unstaking before locktime(" + data.lockingReleaseTime + ") can be take fee upto 25%. Are you ok?")) {

        } else {
          return;
        }
      }
      const tx = await stakingContract.withdraw(parseUnits(String(data.unstaking_amount), data.token_decimal));
      await tx.wait();

      await apis.updateUserStaking({
        staking_address: stakingpool_address,
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
    <Box
      sx={{
        padding: '50px 70px 60px 70px',
        width: '57%',
        '@media (max-width: 1260px)': {
          width: '100%'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom: '50px' }}>
        <RoundedLabel keyword="Balance" value={`$SHMX ${Number(wallet_balance).toFixed(3)}`} bgColor="#171717" />
      </Box>
      <SubmitInput size={26} btnValue="Stake"
        value={data.staking_amount}
        onClick={() => handleStake()}
        onChangeValue={(value) => setData({ ...data, staking_amount: value })}
      />
      <SubmitInput size={26} btnValue="Un Stake" sx={{ marginTop: '60px' }}
        value={data.unstaking_amount}
        onClick={() => handleUnstake()}
        onChangeValue={(value) => setData({ ...data, unstaking_amount: value })}
      />
      <Box sx={{ marginTop: '40px' }}>
        <Label text={{ value: '$SHMX', color: 'green', weight: 100 }} />
        <Box
          sx={{
            display: 'flex',
            '@media (max-width: 500px)': {
              flexDirection: 'column',
              rowGap: '25px'
            }
          }}
        >
          <Label sx={{ marginTop: '10px', marginRight: '40px' }} text={{ size: 40, value: Number(reward_amount).toFixed(4) }} />
          <PrimaryButton label="Harvest" hasFocus={true} sx={{ width: '200px' }} onClick={() => handleHarvest()} />
        </Box>
      </Box>
    </Box>
  );
}

export default RightStaking;
