import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Link, ListItemIcon, ListItemText, Button, Stack, Typography, Divider } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import { useDispatch, useSelector } from 'react-redux';
import { setupNetwork } from 'utils/wallet';
import { switchNetwork } from 'redux/slices/network';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import MHidden from 'components/@material-extend/MHidden';
import { imageURL } from '../../utils';

// ----------------------------------------------------------------------

const CHAINS = [
  {
    value: Number(process.env.REACT_APP_ETHEREUM_CHAINID),
    label: 'Ethereum',
    icon: '/chains/eth.png'
  },
  {
    value: Number(process.env.REACT_APP_BSC_CHAINID),
    label: 'Binance Smart Chain',
    icon: '/chains/bsc.png'
  },
  {
    value: Number(process.env.REACT_APP_FTM_CHAINID),
    label: 'FTM',
    icon: '/chains/ftm.png'
  },
  {
    value: Number(process.env.REACT_APP_AVAX_CHAINID),
    label: 'AVAX',
    icon: '/chains/avax.png'
  },
  {
    value: Number(process.env.REACT_APP_MATIC_CHAINID),
    label: 'MATIC',
    icon: '/chains/polygon.png'
  }
];

// ----------------------------------------------------------------------

export default function NetworkPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [curID, setCurrentIndex] = useState(0);
  const network = useSelector((state) => state.network.chainId);
  const dispatch = useDispatch();
  const { chainId } = useActiveWeb3React();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (id) => {
    alert('Coming Soon');
    console.log(id);
    setOpen(false);

    const result = await setupNetwork(id);
    if (result === -1) dispatch(switchNetwork(id));
  };

  return (
    <>
      {/* <MHidden width="mdDown">
        <Box
          component="button"
          width={'100%'}
          marginRight="10px"
          ref={anchorRef}
          fontSize={'12px'}
          onClick={handleOpen}
          className="p-2 rounded bg-dark btn text-white shadow-0 position-relative justify-content-center"
          display="flex"
        >
          <Stack direction="row" alignItems="center" spacing={1} display="flex" justifyContent="center">
            <MHidden width="mdDown">
              <Box variant="body2" fontSize={'12px'}>
                Networks
              </Box>
            </MHidden>
            <Box component="img" src={imageURL('angle_down.png')} sx={{ width: 20 }} />
          </Stack>
        </Box>

        <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} backgroundColor="#232323">
          <Box sx={{ py: 1 }} backgroundColor="#232323" fontSize={'12px'}>
            {CHAINS.map((option) => (
              <MenuItem
                key={option.value}
                backgroundColor="#232323"
                onClick={() => handleClose(option.index)}
                sx={{ py: 1, px: 2.5 }}
              >
                <Stack direction="row" alignItems="center">
                  <Box component="img" alt={option.label} src={option.icon} sx={{ width: 20 }} />
                  <Box variant="body2" marginLeft="8px" fontSize={'12px'}>
                    {option.label}
                  </Box>
                </Stack>
              </MenuItem>
            ))}
          </Box>
        </MenuPopover>
      </MHidden>    */}
    </>
  );
}
