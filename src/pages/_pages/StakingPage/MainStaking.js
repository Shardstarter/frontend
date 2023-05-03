import React from 'react';
import Box from '@mui/material/Box';
import LeftStaking from './LeftStaking';
import RightStaking from './RightStaking';

function MainStaking() {
  return (
    <Box
      sx={{
        '@media (max-width: 600px)': {
          padding: '60px 2%'
        },
        position: 'unset',
        padding: '60px 8%'
      }}
    >
      <Box
        sx={{
          '@media (max-width: 1260px)': {
            flexDirection: 'column'
          },
          backgroundImage: 'url("_img/staking/background.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '38px',
          display: 'flex',
        }}
      >
        <LeftStaking />
        <RightStaking />
      </Box>
    </Box>
  );
}

export default MainStaking;
