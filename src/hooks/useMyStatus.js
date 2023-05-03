import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useActiveWeb3React from "./useActiveWeb3React";
import { TIER_LEVEL, TIER_STAKING_AMOUNT } from "config/constants";
import { useMainStakingContract } from "./useContract";
import { formatUnits, parseUnits, formatEther, parseEther } from '@ethersproject/units';
import apis from "services";

export const useMainStakingStatus = () => {
  const [tier, setTier] = useState(TIER_LEVEL.none_0);
  const [countTiers, setCountTiers] = useState([0, 0, 0, 0]); // number of users in each tier level
  const [myTierLevelCount, setMyTierLevelCount] = useState(0); // number of users in my tier level
  const [staked_amount, setstaked_amount] = useState(0);
  const { account, library } = useActiveWeb3React();
  const mainStakingContract = useMainStakingContract();

  useEffect(() => {
    const dosth = async () => {
      try {
        let staked_amount = await mainStakingContract.balances(account);
        staked_amount = Number(formatEther(staked_amount))
        setstaked_amount(staked_amount);

        if (staked_amount > TIER_STAKING_AMOUNT.topaz_4) setTier(TIER_LEVEL.topaz_4);
        else if (staked_amount > TIER_STAKING_AMOUNT.jade_3) setTier(TIER_LEVEL.jade_3);
        else if (staked_amount > TIER_STAKING_AMOUNT.chrome_2) setTier(TIER_LEVEL.chrome_2);
        else if (staked_amount > TIER_STAKING_AMOUNT.amber_1) setTier(TIER_LEVEL.amber_1);
        else setTier(TIER_LEVEL.none_0);


        let response = await apis.getCountForTierLevel({
          staking_address: mainStakingContract.address,
        });
        if (response.data.result) {
          setCountTiers(response.data.data)
        } else {
          console.log(response.data.message)
        }
      } catch (err) { console.log(err); }
    };

    if (account && mainStakingContract) {
      dosth();
    }
  }, [account, mainStakingContract]);

  useEffect(() => {
    if (tier == TIER_LEVEL.none_0) setMyTierLevelCount(countTiers[0])
    if (tier == TIER_LEVEL.amber_1) setMyTierLevelCount(countTiers[1])
    if (tier == TIER_LEVEL.chrome_2) setMyTierLevelCount(countTiers[2])
    if (tier == TIER_LEVEL.jade_3) setMyTierLevelCount(countTiers[3])
    if (tier == TIER_LEVEL.topaz_4) setMyTierLevelCount(countTiers[4])
  }, [tier, countTiers])


  return { tier, staked_amount, myTierLevelCount };
};
