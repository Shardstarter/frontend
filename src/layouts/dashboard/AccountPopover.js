import { useRef, useState } from 'react';
import { useWalletModal } from 'redrum-pancake-uikit';
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import Web3Modal from 'web3modal';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnect from '@walletconnect/web3-provider';
import MHidden from 'components/@material-extend/MHidden';
// material
import { Avatar, Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web 3 Modal Demo',
      infuraId: process.env.INFURA_KEY
    }
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: process.env.INFURA_KEY
    }
  }
};
export default function AccountPopover(props) {
  const { account } = useWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const auth = useAuth(network);
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const web3Modal = new Web3Modal({
    providerOptions // required
  });
  const handleClose = () => {
    // props.onClick();
    // useWalletModal(
    // auth.login,
    // auth.logout,
    // (t)=>t,
    // account,
    // Number(network)
    // );
  };
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    // props.onClick(),
    auth.login,
    auth.logout,
    (t) => t,
    account,
    Number(network)
  );
  return (
    <>
      <MHidden width="mdDown">
        {account ? (
          <Button variant="contained" onClick={onPresentAccountModal} sx={{ bgcolor: 'primary.light' }}>
            {account.substr(0, 4) + '...' + account.substr(account.length - 4, 4)}
          </Button>
        ) : (
          <Box
            component="button"
            height="40px"
            color="white"
            backgroundColor="#56C5FF"
            padding="5px 14px"
            border="none"
            width="100%"
            fontSize={'12px'}
            borderRadius={0.5}
            onClick={onPresentConnectModal}
          >
            Connect Wallet
          </Box>
        )}
      </MHidden>
      <MHidden width="mdUp">
        {account ? (
          <Button variant="contained" width="100%" onClick={onPresentAccountModal} sx={{ bgcolor: 'primary.light' }}>
            {account.substr(0, 4) + '...' + account.substr(account.length - 4, 4)}
          </Button>
        ) : (
          <Box
            component="button"
            width="100%"
            height="40px"
            color="white"
            backgroundColor="#56C5FF"
            padding="5px 14px"
            border="none"
            fontSize={'12px'}
            borderRadius={0.5}
            onClick={onPresentConnectModal}
          >
            Connect Wallet
          </Box>
        )}
      </MHidden>
      {/* <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            displayName
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            email
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover> */}
    </>
  );
}
