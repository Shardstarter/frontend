import React from 'react';
import Box from '@mui/material/Box';
import { Label } from 'components/_components/Label';
import { Staking } from 'utils/_utils/Staking';

const renderDetails = () => (
  <Box sx={{ display: 'flex', rowGap: '30px', flexDirection: 'column', justifyContent: 'center' }}>
    {Staking.details.map((detail, idx) => (
      <Box key={idx} sx={{ display: 'flex' }}>
        <img src={detail.imgUrl} alt={detail.imgUrl} width={80} height={80} />
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '22px' }}>
          <Label sx={{ minWidth: '75px' }} text={detail.label} />
          {detail.value && <Label text={detail.value} sx={{ marginTop: '5px' }} />}
        </Box>
      </Box>
    ))}
  </Box>
);

function LeftStaking() {
  return (
    <Box
      sx={{
        '@media (max-width: 1260px)': {
          width: '100%'
        },
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 0px 60px 65px',
        width: '43%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          '@media(max-width: 500px)': {
            flexDirection: 'column'
          }
        }}
      >
        <img src={Staking.icon} alt={Staking.iconUrl} width={120} height={120} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '@media(max-width: 500px)': {
              marginLeft: '0px'
            },
            marginLeft: '40px'
          }}
        >
          <Label sx={{ minWidth: '75px' }} text={Staking.label} />
          {Staking.value && <Label sx={{ marginTop: '10px' }} text={Staking.value} />}
        </Box>
      </Box>
      <Box sx={{ marginTop: '42px' }}>{renderDetails()}</Box>
    </Box>
  );
}

export default LeftStaking;
