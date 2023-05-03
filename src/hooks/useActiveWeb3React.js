import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { simpleRpcProvider } from "utils/providers";
import { useSelector, useDispatch } from "react-redux";
import { switchNetwork } from "redux/slices/network";

// eslint-disable-next-line import/no-unresolved

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const network = useSelector((state) => state.network.chainId);
  const [provider, setProvider] = useState(library || (Number(network) !== Number(process.env.REACT_APP_PROJECT_CHAINID) ?
    simpleRpcProvider(Number(process.env.REACT_APP_PROJECT_CHAINID)) : simpleRpcProvider(network)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (Number(network) !== Number(process.env.REACT_APP_PROJECT_CHAINID)) {
      dispatch(switchNetwork(process.env.REACT_APP_PROJECT_CHAINID));
      if (library !== refEth.current) {
        setProvider(library || simpleRpcProvider(Number(process.env.REACT_APP_PROJECT_CHAINID)));
        refEth.current = library;
      }
    } else {
      if (library !== refEth.current) {
        setProvider(library || simpleRpcProvider(network));
        refEth.current = library;
      }
    }

  }, [library, network]);

  return { library: provider, chainId: chainId, ...web3React };
};

export default useActiveWeb3React;
