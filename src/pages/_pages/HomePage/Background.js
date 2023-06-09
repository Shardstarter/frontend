import React from 'react';
import Box from '@mui/material/Box';
import { PrimaryButton, SecondaryButton } from 'components/_components/Button';
import { Label } from 'components/_components/Label';
import { Link } from 'react-router-dom';

const Background = () => {
  return (
    <Box
      sx={{
        '@media (max-width: 1400px)': {
          padding: '60px 4%'
        },
        '@media (max-width: 600px)': {
          padding: '60px 2%'
        },
        '@media (max-width: 480px)': {
          padding: '60px 0%'
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
          minHeight: '550px'
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
            },
            '@media (max-width: 820px)': {
              padding: '10px 10px 0px 10px',
              flexDirection: 'column',
            }
          }}
        >
          <Box sx={{ paddingTop: '0px' }}>
            <Box>
              <Label
                sx={{
                  '@media (max-width: 600px)': {
                    paddingTop: '60px',
                    fontSize: '34px'
                  },
                  '@media (max-width: 1200px)': {
                    paddingTop: '60px',
                    fontSize: '30px'
                  }
                }}
                text={{ value: 'Start Investing With', size: 44 }}
              />
              <Label
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '36px'
                  },
                  '@media (max-width: 1200px)': {
                    fontSize: '32px'
                  }
                }}
                text={{ value: 'Shardstarter', color: 'green', size: 44 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                '@media (max-width: 800px)': {
                  flexDirection: 'row',
                  gap:"0.4rem"
                },
                '@media (max-width: 1200px)': {
                  flexDirection: 'row',
                  gap:"0.8rem"
                },
                marginTop: '20px'
              }}
            >
              <Link to="/swap">
                <PrimaryButton
                  label="Buy SHMX"
                  sx={{
                    '@media (max-width: 800px)': {
                      marginRight: '0px',
                      marginBottom: '20px',
                      width:"180px"
                    },
                    '@media (max-width: 1200px)': {
                      marginRight: '0px',
                      marginBottom: '20px',
                      width:"150px",
                      fontSize: '0.8rem',
                      height: '3rem',
                    },
                    marginRight: '20px',
                    width: '220px'
                  }}
                  hasFocus={true}
                  img={'_img/icon/shardstarter.png'}
                />
              </Link>
              <SecondaryButton label="How to Invest" 
                sx={{ 
                  width: '170px',
                  '@media (max-width: 1200px)':{
                    width: '140px',
                    fontSize: '0.8rem',
                    height: '3rem',
                  },
                }} 
                onClick={() => window.open('https://shardstarter-io.gitbook.io/shardstarter/the-tier-system')} />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                background:
                  'transparent radial-gradient(closest-side at 142% 150%, #70C5A3 0%, #02FF7B 49%, #008540 100%) 0% 0% no-repeat padding-box'
              }}
            ></Box>
            <img src="_img/coin.png" alt="coin" height={400} style={{objectFit:"contain"}}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Background;
