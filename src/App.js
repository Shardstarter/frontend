import { useEffect } from "react";
// routes
import Router from 'router';
// theme
import ThemeConfig from './theme';
// components
import ThemePrimaryColor from './components/ThemePrimaryColor';
import { useDispatch, useSelector } from "react-redux";
import useEagerConnect from "./hooks/useEagerConnect";
import { switchNetwork } from "./redux/slices/network";

import { useInactiveListener } from './hooks/useInactiveListener'

import useActiveWeb3React from "hooks/useActiveWeb3React";
import { setupNetwork } from 'utils/wallet';

// ----------------------------------------------------------------------

export default function App() {
  const { chainId } = useActiveWeb3React();


  const network = useSelector((state) => state.network.chainId);
  const dispatch = useDispatch();

  useEagerConnect();
  useInactiveListener();

  const provider = window.ethereum;
  useEffect(() => {
    if (provider) {
      if (provider.chainId && (Number(provider.chainId) !== Number(process.env.REACT_APP_PROJECT_CHAINID))) {
        setupNetwork(process.env.REACT_APP_PROJECT_CHAINID);
      }
      dispatch(switchNetwork(provider.networkVersion));
    }
  }, [dispatch, chainId, network, provider]);


  // useEffect(() => {
  //   if (provider)
  //     provider.on('chainChanged', (id) => {      
  //       dispatch(switchNetwork(id));
  //     });
  // }, [dispatch, provider]);

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <Router />
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
