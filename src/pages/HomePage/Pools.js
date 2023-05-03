import { Box, Grid, Typography } from '@mui/material';
import { MHidden } from '../../components/@material-extend';
import PoolsCard from 'components/PoolsCard';
import PoolsCardPhone from 'components/PoolsCardPhone';
import { imageURL } from '../../utils';
import { StakingPool } from '../Stakepad';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Pools() {
  const font_Family =
    'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
  return (
    <>
      <MHidden width="mdDown">
        <Box
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          sx={{ marginTop: '50px', marginBottom: '50px', paddingLeft: '14%', paddingRight: '14%' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1 }}>
            <Box component="img" src={imageURL('h-4.png')}></Box>
          </Box>
          <Typography align="center">
            <Box
              data-aos="zoom-in"
              fontFamily={font_Family}
              sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}
            >
              <h1
                className="text-mute text-center fw-bold position-absolute start-50 translate-middle"
                style={{ fontSize: 120, top: '30px', left: '50%', color: '#232323', fontFamily: { font_Family } }}
              >
                POOLS
              </h1>
              <h2
                className="text-light text-center position-absolute start-50 translate-middle-x"
                style={{ top: '13px', fontFamily: { font_Family } }}
              >
                Staking Pools
              </h2>
            </Box>
            <Box
              component="p"
              fontSize="12px"
              fontFamily={font_Family}
              marginTop="80px"
              style={{ marginBottom: '25px' }}
              color="white"
            >
              Earn high yields by Staking $MGV Tokens or Join other attractive pools from IDO deals
            </Box>
          </Typography>
          <StakingPool isHomePage />
          <Grid item  container justifyContent='center'>
            <Typography
              fontFamily={'Segoe UI'}
              fontSize={'25px'}
              align="center"
              sx={{ marginBottom: '5px', color: '#24B6E6' }}
            >
              <Link to='/stakepad'  style={{ textDecoration: 'none', color: '#24B6E6' }}>View All</Link>
            </Typography>

          </Grid>
          {/*<PoolsCard allocation="0"/>*/}
          {/*<PoolsCard allocation="0"/>*/}
          {/*<PoolsCard allocation="0"/>*/}
          {/*<PoolsCard allocation="1"/>*/}
          {/*<PoolsCard allocation="1"/>*/}
        </Box>
      </MHidden>
      <MHidden width="mdUp">
        <Box
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          sx={{ marginTop: '50px', marginBottom: '50px', paddingLeft: '5%', paddingRight: '5%' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1 }}>
            <Box component="img" src={imageURL('h-4.png')}></Box>
          </Box>
          <Typography align="center">
            <Box
              data-aos="zoom-in"
              fontFamily={font_Family}
              sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}
            >
              <h2
                className="text-light text-center position-absolute start-50 translate-middle-x"
                style={{ top: '13px', fontFamily: { font_Family } }}
              >
                Staking Pools
              </h2>
            </Box>
            <Box
              fontSize="16px"
              marginTop="80px"
              fontFamily={font_Family}
              style={{ marginBottom: '25px' }}
              color="white"
            >
              Earn high yield by staking MGV or join other attractive staking pools from IDO projects
            </Box>
          </Typography>
          <StakingPool isHomePage />
          <Grid item  container justifyContent='center'>
            <Typography
              fontFamily={'Segoe UI'}
              fontSize={'25px'}
              align="center"
              sx={{ marginBottom: '5px', color: '#24B6E6' }}
            >
              <Link to='/stakepad'  style={{ textDecoration: 'none', color: '#24B6E6' }}>View All</Link>
            </Typography>
          </Grid>
        </Box>
      </MHidden>
    </>
  );
}
