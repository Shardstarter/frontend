import { useRef, useState } from 'react';
// material
import { Box, MenuItem, Stack } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MHidden } from '../../components/@material-extend';
import i18next from 'i18next';
import { imageURL } from '../../utils';

const CHAINS = [
  {
    index: 0,
    value: Number(process.env.REACT_APP_ENG_SELECT),
    label: 'English',
    lang: 'en',
    icon: imageURL('us-flag.png')
  },
  {
    index: 1,
    value: Number(process.env.REACT_APP_CHI_SELECT),
    label: 'Chinese',
    lang: 'zh',
    icon: imageURL('china.png')
  },
  {
    index: 2,
    value: Number(process.env.REACT_APP_RUS_SELECT),
    label: 'Russian',
    lang: 'ru',
    icon: imageURL('russia.png')
  },
  {
    index: 3,
    value: Number(process.env.REACT_APP_TUR_SELECT),
    label: 'Turkish',
    lang: 'tu',
    icon: imageURL('turkey.png')
  },
  {
    index: 4,
    value: Number(process.env.REACT_APP_SP_SELECT),
    label: 'Spanish',
    lang: 'es',
    icon: imageURL('spain.png')
  }
];
export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [curID, setCurrentIndex] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (id) => {
    alert('Coming Soon');
    console.log(id);
    setOpen(false);
    if (id >= 0 && id <= 3) {
      setCurrentIndex(id);
      i18next.changeLanguage(CHAINS[id].lang);
    }
  };

  return (
    <>
      <MHidden width="mdDown">
        <Box
          component="button"
          width={'100%'}
          ref={anchorRef}
          onClick={handleOpen}
          className="p-2 rounded bg-dark btn text-white shadow-0 position-relative justify-content-center"
          display="flex"

          // width="100px" height="42px"
        >
          <Stack direction="row" alignItems="center" spacing={1} display="flex" justifyContent="center">
            <Box component="img" src={CHAINS.find((ele) => ele.index === curID)?.icon} sx={{ width: 20 }} />
            <MHidden width="mdDown">
              <Box variant="body2" fontSize={'12px'}>
                {CHAINS.find((ele) => ele.index === curID)?.label}
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
                // selected={option.value === network}
                backgroundColor="#232323"
                onClick={() => handleClose(option.index)}
                sx={{ py: 1, px: 2.5 }}
              >
                <Stack direction="row" alignItems="center">
                  <Box component="img" alt={option.label} src={option.icon} sx={{ width: 20 }} />
                  {/* <MHidden width="mdDown"> */}
                  <Box variant="body2" marginLeft="8px" fontSize={'12px'}>
                    {option.label}
                  </Box>
                  {/* </MHidden> */}
                </Stack>
              </MenuItem>
            ))}
          </Box>
        </MenuPopover>
      </MHidden>
    </>
  );
}
