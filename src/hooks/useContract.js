import { useMemo } from 'react';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import ERC20_ABI from 'config/abi/erc20.json';
import IDO_ABI from 'config/abi/ido.json';
import LOCK_ABI from 'config/abi/lock.json';
import POOL_ABI from 'config/abi/pool.json';
import STAKING_ABI from 'config/abi/staking.json';
import LIQUIDSTAKING_ABI from 'config/abi/liquid_staking.json';
import PANCAKEROUTER_ABI from 'config/abi/pancake_router.json';

import {
  IDO_ADDRESS, LOCK_ADDRESS, MAIN_STAKING_CONTRACT_ADDRESS,
  PROJECT_MAIN_TOKEN_ADDRESS, LIQUID_STAKING_CONTRACT_ADDRESS, LIQUID_STAKING_TOKEN_ADDRESS,
  DEX_ROUTERV2_ADDRESS
} from 'config/constants';
// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts';
import { useSelector } from 'react-redux';

import { getContract } from 'utils/contract';

function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React();
  // console.log("useContract",library)
  // console.log("useContract",account)
  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      // console.log("inTRY")
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useTokenContract(tokenAddress, withSignerIfPossible = true) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
export function useProjectMainTokenContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);
  return useContract(PROJECT_MAIN_TOKEN_ADDRESS[network], ERC20_ABI, withSignerIfPossible);
}
export function useLiquidStakingTokenContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);
  return useContract(LIQUID_STAKING_TOKEN_ADDRESS[network], ERC20_ABI, withSignerIfPossible);
}

export function usePoolContract(poolAddress, withSignerIfPossible = true) {
  return useContract(poolAddress, POOL_ABI, withSignerIfPossible);
}

export function useIDOContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);
  return useContract(IDO_ADDRESS[network], IDO_ABI, withSignerIfPossible);
}
export function useLockContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);
  return useContract(LOCK_ADDRESS[network], LOCK_ABI, withSignerIfPossible);
}

export function useStakingContract(contractAddress, withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);

  return useContract(contractAddress, STAKING_ABI, withSignerIfPossible);
}

// Main staking contract that determines IDO tier system
export function useMainStakingContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);

  return useContract(MAIN_STAKING_CONTRACT_ADDRESS[network], STAKING_ABI, withSignerIfPossible);
}

export function useLiquidStakingContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);

  return useContract(LIQUID_STAKING_CONTRACT_ADDRESS[network], LIQUIDSTAKING_ABI, withSignerIfPossible);
}

export function useDEXRouterContract(withSignerIfPossible = true) {
  const network = useSelector((state) => state.network.chainId);

  return useContract(DEX_ROUTERV2_ADDRESS[network], PANCAKEROUTER_ABI, withSignerIfPossible);
}

