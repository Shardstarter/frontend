import React from 'react';
import Box from '@mui/material/Box';
import { Label } from 'components/_components/Label';
import { RoundedCard } from 'components/_components/Card';
import { PrimaryButton } from 'components/_components/Button';

const RenderItems = (item, idx) => {
  return (
    <Box
      key={idx}
      sx={{
        display: 'flex',
        margin: '30px -50px 0px -50px',
        borderBottom: idx === 3 ? 'none' : '1px solid #002B15',
        padding: '0px 50px 30px 50px',
        justifyContent: 'space-between',
        '@media (max-width: 1500px)': {
          flexDirection: 'column',
          rowGap: '25px'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          '@media (max-width: 500px)': {
            flexDirection: 'column'
          }
        }}
      >
        <img src={item.project.img} width={100} height={100} alt="icon" />
        <Box
          sx={{
            marginLeft: '30px',
            '@media (max-width: 500px)': {
              marginLeft: '0px'
            }
          }}
        >
          <Label text={item.project.text} />
          <Label text={item.project.value} sx={{ marginTop: '4px' }} />
          <Box sx={{ display: 'flex', marginTop: '15px', columnGap: '15px' }}>
            {item.project.labels.map((label, idx) => (
              <RoundedCard key={idx} {...label} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '18%',
          '@media (max-width: 1500px)': {
            width: '100%'
          }
        }}
      >
        <Label text={item.purchased.label} />
        <Label text={item.purchased.value} />
      </Box>
      <Box
        sx={{
          width: '16%',
          '@media (max-width: 1500px)': {
            width: '100%'
          }
        }}
      >
        <Label text={item.claimed.label} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <Label text={item.unclaimed.label} />
        <PrimaryButton sx={{ marginLeft: '30px', width: '120px', maxHeight: '52px' }} label="Claim" hasFocus={true} />
      </Box>
    </Box>
  );
};

const MuiTable = ({ items }) => {
  return (
    <Box
      sx={{
        padding: '40px 50px 0px 50px',
        backgroundColor: '#000000',
        borderRadius: '20px',
        border: '1px solid #7070704C'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#0A1710',
          borderRadius: '8px',
          display: 'flex',
          padding: '20px 0px',
          rowGap: '10px',
          justifyContent: 'space-around',
          '@media (max-width: 1500px)': {
            flexDirection: 'column',
            paddingLeft: '25px'
          }
        }}
      >
        <Label text={{ value: 'PROJECT', color: 'green' }} />
        <Label text={{ value: 'PURCHASED', color: 'green' }} />
        <Label text={{ value: 'CLAIMED', color: 'green' }} />
        <Label text={{ value: 'UN CLAIMED', color: 'green' }} />
      </Box>
      <Box>{items.map((item, idx) => RenderItems(item, idx))}</Box>
    </Box>
  );
};

export default MuiTable;
