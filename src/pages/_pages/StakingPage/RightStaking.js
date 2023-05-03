import React from 'react';
import Box from '@mui/material/Box';
import { RoundedLabel, Label } from 'components/_components/Label';
import { SubmitInput } from 'components/_components/Input';
import { PrimaryButton } from 'components/_components/Button';

function RightStaking() {
  return (
    <Box
      sx={{
        padding: '50px 70px 60px 70px',
        width: '57%',
        '@media (max-width: 1260px)': {
          width: '100%'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom: '50px' }}>
        <RoundedLabel keyword="Balance" value="$SHMX 120,000.00" bgColor="#171717" />
      </Box>
      <SubmitInput value="1,200.00" size={26} btnValue="Stake" />
      <SubmitInput value="1,200.00" size={26} btnValue="Un Stake" sx={{ marginTop: '60px' }} />
      <Box sx={{ marginTop: '40px' }}>
        <Label text={{ value: '$SHMX', color: 'green', weight: 100 }} />
        <Box
          sx={{
            display: 'flex',
            '@media (max-width: 500px)': {
              flexDirection: 'column',
              rowGap: '25px'
            }
          }}
        >
          <Label sx={{ marginTop: '10px', marginRight: '40px' }} text={{ size: 40, value: '600.55' }} />
          <PrimaryButton label="Harvest" hasFocus={true} sx={{ width: '200px' }} />
        </Box>
      </Box>
    </Box>
  );
}

export default RightStaking;
