import { useState, useContext, useEffect } from 'react';
import * as React from 'react';
import MHidden from 'components/@material-extend/MHidden';
import Page from 'components/Page';
// material
import { Box, Typography, Grid, Button, Card, CardContent, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
  NETWORK_NAME, IDO_ADDRESS, PROJECT_MAIN_TOKEN_ADDRESS, MAIN_STAKING_CONTRACT_ADDRESS,
  LIQUID_STAKING_CONTRACT_ADDRESS, LIQUID_STAKING_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS,
  TIER_LEVEL, TIER_STAKING_AMOUNT
} from 'config/constants';

export default function Admin() {

  const network = useSelector((state) => state.network.chainId);

  useEffect(() => {
    var pwd = prompt('input admin password');
    if (pwd == 'shardstarter12345') {

    } else {
      window.location.href = "/"
    }
  }, []);

  const navigate = useNavigate();
  return (
    <Page style={{ backgroundColor: '#171819' }}>
      <Container maxWidth="lg" className="pt-5" style={{ minHeight: '400px' }}>
        <Grid container paddingLeft={'5%'} paddingRight={'5%'} paddingTop="30px">
          <Grid container direction="row" position="relative" display="flex" borderRadius={2}>
            <Grid item md={3} sm={3} xs={12} padding="5px">
              <Box
                component="button"
                borderRadius={1}
                width="100%"
                color="white"
                border="1px solid #56C5FF"
                padding="3px 8px"
                backgroundColor="rgb(255, 255, 255, 0)"
              >
                <Box component={Link} to={'/create-ido'} sx={{ textDecoration: 'none' }}>
                  CREATE IDO DEALS
                </Box>
              </Box>
            </Grid>
            <Grid item md={3} sm={3} xs={12} padding="5px">
              <Box
                component="button"
                borderRadius={1}
                width="100%"
                color="white"
                border="1px solid #56C5FF"
                padding="3px 8px"
                backgroundColor="rgb(255, 255, 255, 0)"
                onClick={() => navigate('/create-stake')}
              >
                Create Staking POOLS
              </Box>
            </Grid>
            <Grid item md={3} sm={3} xs={12} padding="5px">
              <Box
                component="button"
                borderRadius={1}
                width="100%"
                color="white"
                border="1px solid #56C5FF"
                padding="3px 8px"
                backgroundColor="rgb(255, 255, 255, 0)"
              >
                <Box component="a" href="/calender?admin=true" target={'_blank'} sx={{ textDecoration: 'none' }}>
                  CALENDER
                </Box>
              </Box>
            </Grid>
            <Grid item md={3} sm={3} xs={12} padding="5px">
              <Box
                component="button"
                borderRadius={1}
                width="100%"
                color="white"
                border="1px solid #56C5FF"
                padding="3px 8px"
                backgroundColor="rgb(255, 255, 255, 0)"
                onClick={() => navigate('/create-vote')}
              >
                Create Vote
              </Box>
            </Grid>
          </Grid>

          <Grid container direction="row" position="relative" display="flex" borderRadius={2}>
            <Grid item md={3} sm={3} xs={12} padding="5px">
              <Box
                component="button"
                borderRadius={1}
                width="100%"
                color="white"
                border="1px solid #56C5FF"
                padding="3px 8px"
                backgroundColor="rgb(255, 255, 255, 0)"
              >
                <Box component={Link} to={'/manage-cards'} sx={{ textDecoration: 'none' }}>
                  Manage Homepage Cards
                </Box>
              </Box>
            </Grid>

            <Grid item md={3} sm={3} xs={12} padding="5px">
              <Box
                component="button"
                borderRadius={1}
                width="100%"
                color="white"
                border="1px solid #56C5FF"
                padding="3px 8px"
                backgroundColor="rgb(255, 255, 255, 0)"
              >
                <Box component={Link} to={'/addliquidity'} sx={{ textDecoration: 'none' }}>
                  DEX: Add Liquidity
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Grid>


        <Grid padding="5%">
          <h3>Current setting</h3>
          <hr />
          <p>Network: <span style={{ color: 'green' }}> {NETWORK_NAME[network]} ({network})</span></p>
          <p>SHMX Token address: <span style={{ color: 'green' }}> {PROJECT_MAIN_TOKEN_ADDRESS[network]}</span></p>
          <p>sSHMX Token address: <span style={{ color: 'green' }}> {LIQUID_STAKING_TOKEN_ADDRESS[network]}</span></p>
          <p>Liquid Staking Contract address: <span style={{ color: 'green' }}> {LIQUID_STAKING_CONTRACT_ADDRESS[network]}</span></p>
          <p>Main Staking Contract address: <span style={{ color: 'green' }}> {MAIN_STAKING_CONTRACT_ADDRESS[network]}</span></p>
          <p>IDO Contract address: <span style={{ color: 'green' }}> {IDO_ADDRESS[network]}</span></p>
          <p>USDC Token address: <span style={{ color: 'green' }}> {USDC_TOKEN_ADDRESS[network]}</span></p>
          <hr />
          <p>Tier Level and Staking amount:
            <span style={{ color: 'green' }}>
              {TIER_LEVEL.amber_1} {TIER_STAKING_AMOUNT.amber_1},
              {TIER_LEVEL.chrome_2} {TIER_STAKING_AMOUNT.chrome_2},
              {TIER_LEVEL.jade_3} {TIER_STAKING_AMOUNT.jade_3},
              {TIER_LEVEL.topaz_4} {TIER_STAKING_AMOUNT.topaz_4}
            </span>
          </p>
        </Grid>
      </Container>
    </Page>
  );
}
