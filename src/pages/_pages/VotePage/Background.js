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
            padding: '88px 120px 78px 76px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            '@media (max-width: 1500px)': {
              alignItems: 'center',
              flexDirection: 'column'
            }
          }}
        >
          <Box sx={{ paddingTop: '62px' }}>
            <Box>
              <Label
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '45px'
                  }
                }}
                text={{ value: 'Vote For Projects', size: 60 }}
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
                label="How it works"
                sx={{
                  '@media (max-width: 800px)': {
                    marginRight: '0px',
                    marginBottom: '20px'
                  },
                  marginRight: '20px',
                  width: '220px'
                }}
                hasFocus={true}
              />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                background:
                  'transparent radial-gradient(closest-side at 142% 150%, #70C5A3 0%, #02FF7B 49%, #008540 100%) 0% 0% no-repeat padding-box'
              }}
            ></Box>
            <img src="_img/vote.png" alt="coin" height={535} width={585} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Background;
