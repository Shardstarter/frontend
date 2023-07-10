import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { PrimaryButton } from 'components/_components/Button';
import { navItems } from 'utils/_utils/EntityFieldDefs';
import { Label } from 'components/_components/Label';

// import AccountPopover from 'layouts/dashboard/AccountPopover';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useWalletModal } from 'redrum-pancake-uikit';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { NETWORK_NAME } from 'config/constants';

const Logo = () => (
  <Box maxWidth={218} height={64}>
    <Link to="/home">
      <img src="_img/logo.png" alt="Logo" height="64px" style={{objectFit:'contain'}} />
    </Link>
  </Box>
);

const Header = (props) => {
  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const auth = useAuth(network);
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    // props.onClick(),
    auth.login,
    auth.logout,
    (t) => t,
    account,
    Number(network)
  );

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '43px' }}
    >
      <IconButton color="inherit" edge="start">
        <Close />
      </IconButton>
      <Box onClick={handleDrawerToggle}>
        {navItems.map((item, idx) => (
          <Box key={idx}>
            <Label
              sx={{
                textTransform: 'uppercase',
                marginTop: '15px'
              }}
              text={{
                type: 'link',
                value: item.text.toUpperCase(),
                href: item.href,
                size: 16,
                weight: 100
              }}
              onClick={handleDrawerToggle}
            />
            <Divider />
          </Box>
        ))}
      </Box>
      <PrimaryButton
        label={
          account
            ? account.substring(0, 5) + '...' + account.substring(account.length - 4, account.length)
            : 'Connect Wallet'
        }
        sx={{
          marginTop: '20px',
          padding: '8px',
          display: { xs: 'block', md: 'none' },
          width: '220px'
        }}
        hasFocus={true}
      />
      {/* <AccountPopover /> */}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          '@media (max-width: 1400px)': {
            padding: '13px 2%'
          },
          '@media (max-width: 1200px)': {
            padding: '13px 0%'
          },
          '@media (max-width: 600px)': {
            padding: '13px 2%'
          },
          position: 'unset',
          padding: '13px 8%',
          height: '90px',
          borderBottom: '1px solid #002B15',
          boxShadow: 'none',
          backgroundColor: '#000'
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between'
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              '@media (max-width: 992px)': {
                display: 'block'
              },
              display: 'none'
            }}
          >
            <Menu />
          </IconButton>
          <Logo />
          <Box sx={{ display: 'flex', flexFlow: 'row' }}>
            <Box
              sx={{
                '@media (max-width: 992px)': {
                  display: 'none'
                },
                display: 'flex',
                justifyContent: 'row',
                alignItems: 'center'
              }}
            >
              {navItems.map((item, idx) => (
                <Label
                  key={idx}
                  sx={{
                    '@media (max-width: 1600px)': {
                      marginRight: '40px',
                    },
                    marginRight: '60px',
                    '@media (max-width: 1440px)': {
                      fontSize: '15px',
                      marginRight: '20px'
                    },
                    '@media (max-width: 1200px)': {
                      marginRight: '15px',
                      fontSize: '15px'
                    },
                    
                  }}
                  text={{
                    type: 'link',
                    value: item.text.toUpperCase(),
                    href: item.href,
                    size: 16,
                    weight: 100
                  }}
                />
              ))}
            </Box>
            {/* {account && (
              <Label
                key={10}
                sx={{
                  marginRight: '20px'
                }}
                text={{
                  type: 'text',
                  color: 'green',
                  value: NETWORK_NAME[network],
                  size: 15,
                  weight: 100
                }}
              />
            )} */}
            {account ? (
              <PrimaryButton
                label={account.substring(0, 5) + '...' + account.substring(account.length - 4, account.length)}
                sx={{
                  padding: '8px',
                  display: { xs: 'none', md: 'block' },
                  width: '220px',
                  '@media (max-width: 1440px)': {
                    width: '180px',
                    padding: '6px'
                  }
                }}
                hasFocus={true}
                onClick={onPresentAccountModal}
              />
            ) : (
              <PrimaryButton
                label="Connect Wallet"
                sx={{
                  padding: '8px',
                  display: { xs: 'none', md: 'block' },
                  width: '220px',
                  '@media (max-width: 1440px)': {
                    width: '160px',
                    padding: '6px 0',
                    fontSize: '15px',
                    height: '50px'
                  }
                }}
                hasFocus={true}
                onClick={onPresentConnectModal}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            '@media (max-width: 992px)': {
              display: 'flex'
            },
            display: 'none',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
