import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LaunchCard from 'components/LaunchCard';
import MyProjectCard from 'components/MyProjectCard';
import PhoneProjectCard from 'components/PhoneProjectCard';
// material
import { Box, Grid, Modal } from '@mui/material';
import apis from '../services';

import { getPools } from 'redux/slices/pools';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// components
import Page from 'components/Page';
import MyCalendar from './MyCalendar';
import { MHidden } from '../components/@material-extend';
import { DEALS_TAB, PROJECT_STATUS } from '../config/constants';
import { getProjectStatus, imageURL } from '../utils';


// ----------------------------------------------------------------------

export default function IdoDeals() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { pathname } = useLocation();
  const [completedProject, setCompletedProjects] = useState(0);
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();

  //Pagination part
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [pools, setPools] = useState([]);

  const network = useSelector((state) => state.network.chainId);

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, tab, account));
      // let pools = [];

      // const response = await axios.get(`/api/${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}/ido`, {
      //   params: {
      //     // page,
      //     // search: search == null ? '' : search,
      //     // tab,
      //     // sort,
      //     // filter,
      //     // account
      //   }
      // });
      const response = await apis.getBscIdo();

      if (response.statusText === 'OK') {
        const _pools = response.data.pools;
        setPools(_pools);
      }


      // console.log(idoDeals);

      // pools = response.data.pools;
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, network, tab]);

  return (
    <Page  style={{ backgroundColor: '#171819' }}>
      <MHidden width='mdDown'>
        <Grid paddingLeft={'14%'} paddingRight={'14%'} paddingTop='30px'>
          <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'
                 aria-describedby='modal-modal-description'>
            <Box margin='150px 14% 0px 14%' style={{ backgroundColor: 'rgba(35, 35, 35, 0.5)', blurRadius: 12 }}>
              <MyCalendar />
            </Box>
          </Modal>
          <Grid container direction='row' align='center' justifyContent={'center'}>
            {DEALS_TAB.map(({ id, link, title }) => {
              const btnColor = pathname === link ? 'light' : 'dark';
              return  (
                <Box key={id} component={Link} to={link}
                     className={`btn btn-${btnColor} text-info mx-1`}
                >{title}</Box>
              )
            })}
            <Box className={`btn btn-dark text-info mx-1`} onClick={() => alert('Coming Soon')}>INO Deals</Box>
            {/*<Box component='button' onClick={() => alert('Coming Soon')} className='btn btn-dark text-info mx-1'>*/}
            {/*  <i className='fa-solid fa-calendar-days text-info mx-1'></i>Calendar*/}
            {/*</Box>*/}
            {/* <Box component="a" href="/phonecalendar" className="btn btn-dark text-info mx-1">
                        <i className="fa-solid fa-calendar-days text-info mx-1"></i>Calendar
                    </Box> */}
          </Grid>
          {/*<Box component='h2' marginTop='20px' display='flex' align='center' justifyContent='center'*/}
          {/*     color='#00BFFF'>PROJECTS</Box>*/}
          <Grid align='center' justifyContent={'center'}><Box component='img' marginTop='30px'
                                                              src={imageURL('projects.png')}></Box></Grid>
          <Grid container direction="row" marginTop="90px" marginBottom="50px" gap={1}>
            <Grid item container md={8} justifyContent='flex-end'>
              <Box component="button" className="btn btn-dark text-info mx-1">
                <Box component={'a'} href="/calender" sx={{ textDecoration: 'none' }}>
                  <Box component="img" src={imageURL('Calendar.png')} />
                </Box>
              </Box>
            </Grid>
            <Grid item md='3.5' position='relative' display='flex'>
              <Box component='input' placeholder='Search...' borderRadius={1} style={{
                paddingLeft: '10px',
                height: '50px',
                width: '100%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }} />
              <Box component='button' border='none' borderRadius={1} height='40px' width='90px' position='absolute'
                   right='10px' top='5px' style={{ backgroundColor: '#56C5FF', color: 'white' }}>Search</Box>

            </Grid>
          </Grid>
          {pools.length > 0 && (
            <Box component='h2' color='#00BFFF' marginTop='20px'>Next To Launch</Box>
          )}
          <Grid container spacing={2}>
            {pools.length > 0 && pools.map((pool, poolIdx) => {
              const [privacy, tag] = pool?.whitelistable ? ['Private', 'VC'] : ['Public', 'IDO'];
              return <LaunchCard key={poolIdx} privacy={privacy} tag={tag} {...pool}></LaunchCard>;
            })}
          </Grid>

          {completedProject > 0 && (
            <Grid marginTop='50px' dispay='flex' position='relative' container direction='row'>
              <Box component='h4' position='relative' color='#56C5FF' fontSize={34}>Completed Projects</Box>
              <Box component='p' position='absolute' right='0px' top='10px' fontSize={24} color='white'>View All
                Pools</Box>
            </Grid>
          )}

          {pools.length > 0 && pools.map((pool, poolIdx) => {
            const isCompleted = getProjectStatus(pool?.startDateTime, pool?.endDateTime) === PROJECT_STATUS.completed;
            const [privacy, tag] = pool?.whitelistable ? ['Private', 'VC'] : ['Public', 'IDO'];

            if (isCompleted) {
              if(completedProject === 0)
                setCompletedProjects(prevState => prevState + 1);
              return <MyProjectCard key={poolIdx} privacy={privacy} tag={tag} {...pool} />
            }
          })}
        </Grid>
      </MHidden>

      <MHidden width='mdUp'>
        <Grid paddingLeft={'5%'} paddingRight={'5%'} paddingTop='30px'>
          <Grid container direction='row' align='center' justifyContent={'center'}>
            {DEALS_TAB.map(({ id, link, title }) => {
              const btnColor = pathname === link ? 'light' : 'dark';
              return (
                <Box key={id} component={Link} to={link}
                     className={`btn btn-${btnColor} text-info mx-1`}
                >{title}</Box>
              );
            })}
            <Box className={`btn btn-dark text-info mx-1`} onClick={() => alert('Coming Soon')}>INO Deals</Box>
            {/*<Box component='button' onClick={() => alert('Coming Soon')} className='btn btn-dark text-info mx-1'>
              <i className='fa-solid fa-calendar-days text-info mx-1'></i>Calendar
            </Box>*/}
          </Grid>
          {/*<Box component='h2' marginTop='20px' display='flex' align='center' justifyContent='center'*/}
          {/*     color='#00BFFF'>PROJECTS</Box>*/}
          <Grid align='center' justifyContent={'center'}><Box component='img' marginTop='30px'
                                                              src={imageURL('projects.png')}></Box></Grid>
          {/* <Grid container direction="row" marginTop="90px" marginBottom="50px">
                    <Grid item md="8.5"></Grid>
                    <Grid item md="3.5" position="relative" display="flex">
                        <Box component="input" placeholder="Search..." style={{ paddingLeft:"10px", borderRadius:2, height:"50px", width:"100%", border:"none", backgroundColor:"rgba(255, 255, 255, 0.1)"}}/>
                        <Box component="button" border="none" borderRadius={1} height="40px" width="90px" position="absolute" right="10px" top="5px" style={{ backgroundColor:"#56C5FF", color:"white" }}>Search</Box>

                    </Grid>
                </Grid> */}
          <Grid container marginBottom='20px'>
            {pools.length > 0 && (
              <Grid item xs={8} component='h2' color='#00BFFF' fontSize={18} marginTop='20px'>Next To Launch</Grid>
            )}

            <Grid item xs={2} marginTop='15px'>
              <a href='/phonecalendar'><Box component='button' href='/phonecalendar' padding='10px'
                                            backgroundColor='rgba(255, 255, 255, 0.1)' border='none' borderRadius={0.5}>
                <Box component='img' src={imageURL('Calendar.png')} />
              </Box></a>
            </Grid>
            <Grid item xs={2} marginTop='15px'>
              <Box component='button' padding='10px' backgroundColor='rgba(255, 255, 255, 0.1)' border='none'
                   borderRadius={0.5}>
                <Box component='img' src={imageURL('Search.png')} />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {pools.length > 0 && pools.map((pool, poolIdx) => {
              const [privacy, tag] = pool?.whitelistable ? ['Private', 'VC'] : ['Public', 'IDO'];
              return <LaunchCard key={poolIdx} privacy={privacy} tag={tag} {...pool}></LaunchCard>;
            })}
          </Grid>
          <Grid marginTop='30px' display='flex' justifyContent='center'>
            <Box component='p' fontSize={16} color='white'>View All Pools</Box>
          </Grid>
          <PhoneProjectCard angle='up'></PhoneProjectCard>
          <PhoneProjectCard angle='down'></PhoneProjectCard>
          <PhoneProjectCard angle='down'></PhoneProjectCard>
          <PhoneProjectCard angle='down'></PhoneProjectCard>
        </Grid>
      </MHidden>
      {/* </Container> */}
    </Page>
  );
}
