import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

const actions = [
  { icon: <TwitterIcon />, name: 'Twitter', path: 'https://twitter.com/megacapital' },
  { icon: <TelegramIcon />, name: 'Telegram', path: 'https://t.me/Megacapital' }
];

export default function BasicSpeedDial() {
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', bottom: 16, right: 16 }}>
      <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />} direction="left">
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            target="_blank"
            href={action.path}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
