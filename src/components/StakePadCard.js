import {
  Box,
  Grid,
} from '@mui/material';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import MHidden from 'components/@material-extend/MHidden'
import React from 'react';
import { imageURL } from '../utils';
export default function StakePadCard(props) {
    const navigate = useNavigate();
    const [cur_dir, setDirection] = useState(props.angle)
    return (
      <>
      <MHidden width="mdDown">
      <Box borderRadius={1} sx={{ bgcolor: '#272727', p: '10px', marginBottom: '15px' }}>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
              <Box component="img" src={imageURL('logo.png')}  sx={{ width: '50px', marginRight: '10px' }} />
              <Box sx={{ marginTop: '10px', fontSize: 20, color:'white' }}>Megacapital</Box>
            </Box>
          </Grid>
          <Grid container item sm={8} justifyContent="right" display="flex" direction="row">
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color:'white' }}>Starts in</Box>
              <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
                22/06/2022
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color:'white' }}>Staked</Box>
              <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
                6,000
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color:'white' }}>Apr</Box>
              <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
                10,000%
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color:'white' }}>Tvl</Box>
              <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
                $5,566,158
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      </MHidden>
      <MHidden width="mdUp">
      <Box borderRadius={1} sx={{ bgcolor: '#272727', p: '10px', marginBottom: '15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
              <Box component="img" src={imageURL('logo.png')} sx={{ width: '50px', marginRight: '10px' }} />
              <Box sx={{ marginTop: '10px', fontSize: 14, color:'white' }}>Megacapital</Box>
            </Box>
          </Grid>
          { cur_dir === "up" ?<>
          <Grid item xs={1}>
            <Box component="button" onClick={() => setDirection("down")} backgroundColor="rgb(255, 255, 255, 0)" border="none">
              <Box component="img" marginTop="20px" src={imageURL('angle_up.png')}></Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ fontSize: 15, color:'white' }}>Starts in</Box>
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="right">
            <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
              22/06/2022
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ fontSize: 15, color:'white' }}>Staked</Box>
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="right">
            <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
              6,000
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ fontSize: 15, color:'white' }}>Apr</Box>
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="right">
            <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
              10,000%
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ fontSize: 15, color:'white' }}>Tvl</Box>
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="right">
            <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
              $5,566,158
            </Box>
          </Grid> </>:
          <Grid item xs={1}>
            <Box component="button" onClick={() => setDirection("up")} backgroundColor="rgb(255, 255, 255, 0)" border="none">
              <Box component="img" marginTop="20px" src={imageURL('angle_down.png')}></Box>
            </Box>
          </Grid>
          }
        </Grid>
      </Box>
      </MHidden>
      </>
    );
  }