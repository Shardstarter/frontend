import React from 'react';
import Box from '@mui/material/Box';
import { PrimaryButton, SecondaryButton } from 'components/_components/Button';
import { Label } from 'components/_components/Label';

const Background = () => {
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
          backgroundImage: 'url("_img/main.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '50px',
          minHeight: '700px'
        }}
      >
        <Box
          sx={{
            padding: '75px 70px 0px 70px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            '@media (max-width: 1500px)': {
              alignItems: 'center',
              flexDirection: 'column'
            }
          }}
        >
          <Box sx={{ paddingTop: '75px' }}>
            <Box>
              <Label
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '45px'
                  }
                }}
                text={{ value: 'Start Investing With', size: 60 }}
              />
              <Label
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '45px'
                  }
                }}
                text={{ value: 'Shardstarter', color: 'green', size: 60 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                '@media (max-width: 800px)': {
                  flexDirection: 'column'
                },
                marginTop: '20px'
              }}
            >
              <PrimaryButton
                label="Buy SHMX"
                sx={{
                  '@media (max-width: 800px)': {
                    marginRight: '0px',
                    marginBottom: '20px'
                  },
                  marginRight: '20px',
                  width: '220px'
                }}
                hasFocus={true}
                img={'_img/icon/shardstarter.png'}
              />
              <SecondaryButton label="How to Invest" sx={{ width: '220px' }} />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                background:
                  'transparent radial-gradient(closest-side at 142% 150%, #70C5A3 0%, #02FF7B 49%, #008540 100%) 0% 0% no-repeat padding-box'
              }}
            ></Box>
            <img src="_img/coin.png" alt="coin" height={575} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Background;
