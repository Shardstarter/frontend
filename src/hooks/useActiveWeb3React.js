import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { simpleRpcProvider } from "utils/providers";
import { useSelector, useDispatch } from "react-redux";

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const [provider, setProvider] = useState();

  /**
   * If network is project chain1 or chain2, use it as provider
   * Else set provider as project chain1
   */
  useEffect(() => {
    if (Number(network) !== Number(process.env.REACT_APP_PROJECT_CHAINID) && Number(network) !== Number(process.env.REACT_APP_PROJECT_CHAINID2)) {
      setProvider(library || simpleRpcProvider(Number(process.env.REACT_APP_PROJECT_CHAINID)));
    } else {
      setProvider(library || simpleRpcProvider(network));
    }
  }, [library, network]);

  return { library: provider, chainId, ...web3React };
};

export default useActiveWeb3React;
