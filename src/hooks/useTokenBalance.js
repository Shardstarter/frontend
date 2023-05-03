import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useActiveWeb3React from "./useActiveWeb3React";
import { useSelector } from "react-redux";

export const useBalanceStatus = () => {
  const [balance, setBalance] = useState(0);
  const { account, library } = useActiveWeb3React();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await library?.getBalance(account);
        setBalance(ethers.utils.formatUnits(walletBalance, 18));
      } catch (err) { console.log(err); }
    };

    if (account) {
      fetchBalance();
    }
  }, [library, account]);

  return { balance };
};

export default useBalanceStatus;
