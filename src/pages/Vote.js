import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';
import { getPools } from 'redux/slices/pools';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden';
import { imageURL } from '../utils';
import apis from 'services';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { useMainStakingStatus } from 'hooks/useMyStatus';

export default function Vote() {
  const { account } = useActiveWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { staked_amount: vote_power } = useMainStakingStatus();

  const [votes, setVotes] = useState([]);
  const [opendVoteID, setOpenedVoteID] = useState('');

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const response = await apis.getVotes({});
      if (!unmounted) {
        if (response.data.result) {
          setVotes(response.data.data)
        } else {
          enqueueSnackbar(response.data.message, {
            variant: 'danger'
          });
        }
      }
    })();
    return () => unmounted = true;
  }, []);

  const placeVote = async (vote_id, isUp) => {
    try {
      const response = await apis.placeVote({
        vote_id,
        wallet_address: account,
        power: vote_power,
        isUp
      });
      if (response.data.result) {
        enqueueSnackbar('success', {
          variant: 'success'
        });
        window.location.reload()
      } else {
        enqueueSnackbar(response.data.message, {
          variant: 'danger'
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'danger'
      });
    }
  }


  return (
    <Page style={{ backgroundColor: '#171819' }}>
      <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop='70px'>
        <Grid align='center' justifyContent='center' paddingBottom='30px'>
          <Box component='h2' className='text-info'>VOTE</Box>
          <Box component='h5' color='white'>
            Vote for the next project you'd like to see on Launchpads
            <br />
            {account && <>
              Your vote power is {vote_power}
            </>}
          </Box>
        </Grid>

        {
          votes.map((item) => {
            let up_percent = Math.round(Number(item.up) / (Number(item.up) + Number(item.down)) * 100);
            let down_percent = Math.round(Number(item.down) / (Number(item.up) + Number(item.down)) * 100);
            //check if I did vote before
            let found = item.participants.find((item) => item.wallet_address == account);

            return (
              <>
                <Grid borderRadius={1} container bgcolor={'#232323'} direction='row' sx={{ width: '100%' }}
                  padding='20px 5px 20px 5px' marginTop='20px' onClick={() => setOpenedVoteID(item._id)}>
                  <Grid item container md='3' sm='12' direction='row'>
                    <Box component='img' src={item.logo} marginLeft='10px' height="50px"></Box>
                    <Box fontSize='20px' marginTop='13px' marginLeft='10px' color='white'> {item.projectName}</Box>
                  </Grid>
                  <Grid item md='2' sm='3'>
                    <Box marginTop='1px' alignItems='center' justifyContent='center' display='flex' fontSize='16px'
                      borderRadius={1} style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        width: '100px',
                        height: '40px',
                        color: '#56C5FF'
                      }}> {item.ticker} </Box>
                  </Grid>
                  <Grid item md='3' sm='3' container direction='row' spacing={1}>
                    <Grid item>
                      <Box style={{
                        height: '44px',
                        border: 'none',
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 10px 10px 10px'
                      }} component='button' >
                        <Box component='a' href={item.website} target='_blank'>
                          <Box component='img' src={imageURL('Vector_www.png')} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box style={{
                        height: '44px',
                        border: 'none',
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 10px 10px 10px'
                      }} component='button'>
                        <Box component='a' href={item.website} target='_blank'>
                          <Box component='img' src={imageURL('plane_avatar.png')} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box style={{
                        height: '44px',
                        border: 'none',
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 10px 10px 10px'
                      }} component='button'>
                        <Box component='a' href={item.website} target='_blank'>
                          <Box component='img' src={imageURL('twitter_avatar.png')} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box style={{
                        height: '44px',
                        border: 'none',
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 10px 10px 10px'
                      }} component='button'>
                        <Box component='a' href={item.website} target='_blank'>
                          <Box component='img' src={imageURL('Discord.png')} />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item md='1' sm='3'>
                    {account && !found && <Button className='btn btn-info text-light ' onClick={() => placeVote(item._id, true)}>YES</Button>}
                  </Grid>
                  <Grid item md='1' sm='3'>
                    {account && !found && <Button className='btn btn-outline-info' onClick={() => placeVote(item._id, false)}>NO</Button>}
                  </Grid>
                  <Grid item md='2' sm='3'>
                    <Grid item sm={12}>
                      <Box color='#56C5FF'>Yes {up_percent}%/ No {down_percent}%</Box>
                      <Box position='relative' display='flex' marginRight={'10px'}>
                        <Box width='100%' height='10px' borderRadius={2} backgroundColor='white' />
                        <Box
                          position='absolute'
                          left='0px'
                          borderRadius={2}
                          height='10px'
                          width={`${up_percent}%`}
                          backgroundColor='#56C5FF'
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {opendVoteID == item._id &&
                  <Box bgcolor={'#232323'} marginTop="5px">
                    {item.participants.map((voter) =>
                      <>
                        <p>{voter.wallet_address}, Power: {voter.power}, {voter.isUp ? "Yes" : "No"}</p>
                      </>
                    )}
                  </Box>}
              </>);
          })
        }
        {/* <AboutCard></AboutCard> */}
      </Grid>
    </Page>
  );
}


function AboutCard() {
  return (
    <>
      <MHidden width='mdDown'>
        <Grid container bgcolor={'#272727'} sx={{ width: '100%' }} padding='20px' marginTop='20px' borderRadius={2}>
          <Box component='h2' className='text-info'>About</Box>
          <Box marginTop='30px' component='p' color='white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mattis congue volutpat in et, dui, iaculis. Commodo morbi posuere et porta. Velit aliquet imperdiet
            fringilla faucibus tincidunt quam facilisi. Risus, posuere lacus, vel aliquet ultrices sagittis, ultrices
            aenean rutrum. Scelerisque elementum porta enim egestas ac tempus eu. Lorem arcu vitae, id risus, faucibus
            duis sed. Sed egestas quis erat amet orci eu porttitor congue. Eu a at velit feugiat faucibus vitae enim.
            Cras massa sapien rhoncus natoque nec.Dolor habitant nisl vulputate morbi in ut ultrices dolor. Facilisis
            elementum est sed interdum amet in aenean sed. Enim porta proin donec sociis consectetur.</Box>
          <Grid container direction='row' marginBottom='20px'>
            <Box component='button' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 10px 10px 10px'
            }}><Box component='img' src={imageURL('twitter_avatar.png')} /></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px'
            }}><Box component='img' src={imageURL('Discord.png')} /></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px'
            }}><Box component='img' src={imageURL('plane_avatar.png')} /></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 10px 10px 10px'
            }}> <Grid container direction='row'><Box component='img' marginTop='7px' width='26px' height='14px'
              src={imageURL('homelink.png')} /><Box marginLeft='5px'
                color='white'>www.megacapital.com</Box></Grid></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px',
              color: 'white'
            }}><i className='fa-regular fa-file text-info mx-2'></i>Pitch Dock</Box>
          </Grid>
          <Box component='img' borderRadius={2} width='100%' height='300px' src={imageURL('projects (2).png')} />
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid container bgcolor={'#272727'} sx={{ width: '100%' }} padding='20px' marginTop='20px' borderRadius={1}>
          <Grid item xs={12} justifyContent='center' display='flex'><Box component='p' fontSize={20}
            color='#56C5FF'>About</Box></Grid>
          <Box marginTop='20px' component='p' textAlign='center' color='white' fontSize={12}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis congue volutpat in et, dui, iaculis. Commodo
            morbi posuere et porta. Velit aliquet imperdiet fringilla faucibus tincidunt quam facilisi. Risus, posuere
            lacus, vel aliquet ultrices sagittis, ultrices aenean rutrum. Scelerisque elementum porta enim egestas ac
            tempus eu. Lorem arcu vitae, id risus, faucibus duis sed. Sed egestas quis erat amet orci eu porttitor
            congue. Eu a at velit feugiat faucibus vitae enim. Cras massa sapien rhoncus natoque nec.Dolor habitant nisl
            vulputate morbi in ut ultrices dolor. Facilisis elementum est sed interdum amet in aenean sed. Enim porta
            proin donec sociis consectetur.</Box>
          <Grid container direction='row' marginBottom='20px'>
            <Grid item xs={12}>
              <Box component='button' width='100%' href='/' style={{
                height: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px 10px 10px 10px'
              }}>
                <Grid container direction='row'>
                  <Box component='img' marginTop='7px' width='26px' height='14px' src={imageURL('homelink.png')} />
                  <Box marginLeft='5px' color='white'>www.megacapital.com</Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} marginTop='15px'>
              <Box component='button' width='100%' href='/' style={{
                height: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px',
                color: 'white'
              }}><i className='fa-regular fa-file text-info mx-2'></i>Pitch Dock</Box>
            </Grid>
            <Grid item xs={12} marginTop='28px' display='flex' justifyContent='space-around'>
              <Box component='button' marginLeft='10px' href='/' style={{
                height: '44px',
                width: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px'
              }}><Box component='img' src={imageURL('plane_avatar.png')} /></Box>
              <Box component='button' href='/' style={{
                height: '44px',
                width: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px 10px 10px 10px'
              }}><Box component='img' src={imageURL('twitter_avatar.png')} /></Box>
              <Box component='button' marginLeft='10px' href='/' style={{
                height: '44px',
                width: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px'
              }}><Box component='img' src={imageURL('Discord.png')} /></Box>
            </Grid>
          </Grid>
        </Grid>
      </MHidden>
    </>
  );
}