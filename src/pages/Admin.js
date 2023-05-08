import { useState, useContext, useEffect } from 'react';
import * as React from 'react';
import MHidden from 'components/@material-extend/MHidden';
import Page from 'components/Page';
// material
import { Box, Typography, Grid, Button, Card, CardContent, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'


export default function Admin() {
  const navigate = useNavigate();
  return (
    <Page style={{ backgroundColor: '#171819' }}>
      <Container maxWidth="lg" className="pt-5" style={{ height: '400px' }}>
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
                width="100%"
                borderRadius={1}
                padding="3px 8px"
                style={{ backgroundColor: '#02FF7B', border: 'none', color: 'white' }}
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
                width="100%"
                borderRadius={1}
                padding="3px 8px"
                style={{ backgroundColor: '#02FF7B', border: 'none', color: 'white' }}
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

          </Grid>
        </Grid>

      </Container>
    </Page>
  );
}
