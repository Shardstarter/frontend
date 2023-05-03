import { MHidden } from '../components/@material-extend';
import { Box, Grid, Modal } from '@mui/material';
import MyCalendar from './MyCalendar';
import { DEALS_TAB, PROJECT_STATUS } from '../config/constants';
import { Link, useLocation } from 'react-router-dom';
import { getProjectStatus, imageURL } from '../utils';
import LaunchCard from '../components/LaunchCard';
import MyProjectCard from '../components/MyProjectCard';
import PhoneProjectCard from '../components/PhoneProjectCard';
import Page from '../components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { getPools } from '../redux/slices/pools';
import apis from '../services';

const Deals = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { pathname } = useLocation();

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
      const response = await apis.getDeals();

      if (response.statusText === 'OK') {
        const _pools = response.data.pools;
        _pools.map((pool) => {
          pool.privacy = pool?.whitelistable ? 'Private' : 'Public';
          pool.tag = pool?.deal;

          var startDateTime = new Date(pool.startDateTime)
          var endDateTime = new Date(pool.endDateTime)
          var nowDateTime = new Date();

          if (nowDateTime < startDateTime) pool.status = 1; //upcoming
          else if (nowDateTime <= endDateTime) pool.status = 2; //open
          else if (nowDateTime > endDateTime) pool.status = 3; //closed
        })
        setPools(_pools);
        console.log(pools);
      }

      if (!unmounted) setIsLoading(false);
    })();
    return () => (unmounted = true);
  }, [account, dispatch, network, tab]);

  return (
    <Page  style={{ backgroundColor: '#171819' }}>
      <MHidden width="mdDown">
        <Grid paddingLeft={'14%'} paddingRight={'14%'} paddingTop="30px">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box margin="150px 14% 0px 14%" style={{ backgroundColor: 'rgba(35, 35, 35, 0.5)', blurRadius: 12 }}>
              <MyCalendar />
            </Box>
          </Modal>
          <Grid container direction="row" align="center" justifyContent={'center'}>
            {DEALS_TAB.map(({ id, link, title }) => {
              const btnColor = pathname === link ? 'light' : 'dark';
              return (
                <Box key={id} component={Link} to={link} className={`btn btn-${btnColor} text-info mx-1`}>
                  {title}
                </Box>
              );
            })}
          </Grid>
          <Grid align="center" justifyContent={'center'}>
            <Box component="img" marginTop="30px" src={imageURL('projects.png')}></Box>
          </Grid>
          <Grid container direction="row" marginTop="90px" marginBottom="50px" gap={1}>
            <Grid item container md={8} justifyContent="flex-end">
              <Box component="button" className="btn btn-dark text-info mx-1">
                {/* <i className="fa-solid fa-calendar-days text-info mx-1"></i>Calendar */}

                <Box component={'a'} href="/calender" sx={{ textDecoration: 'none' }}>
                  <Box component="img" src={imageURL('Calendar.png')} />
                </Box>
              </Box>
            </Grid>
            <Grid item md={3.5} position="relative" display="flex">
              <Box
                component="input"
                placeholder="Search..."
                borderRadius={1}
                style={{
                  paddingLeft: '10px',
                  height: '50px',
                  width: '100%',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
              />
              <Box
                component="button"
                border="none"
                borderRadius={1}
                height="40px"
                width="90px"
                position="absolute"
                right="10px"
                top="5px"
                style={{ backgroundColor: '#56C5FF', color: 'white' }}
              >
                Search
              </Box>
            </Grid>
          </Grid>

          {/* Projects open */}
          <Box component="h2" color="#00BFFF" marginTop="40px">
            Projects Open Now
          </Box>
          <Grid container spacing={2}>
            {pools.map((pool, poolIdx) => {
              if (pool.status == 2)
                return <LaunchCard key={poolIdx} {...pool}></LaunchCard>;
            })}
          </Grid>


          {/* Next to launch */}
          <Box component="h2" color="#00BFFF" marginTop="40px">
            Projects Upcoming
          </Box>
          <Grid container spacing={2}>
            {pools.length > 0 &&
              pools.map((pool, poolIdx) => {
                if (pool.status == 1)
                  return <LaunchCard key={poolIdx} {...pool}></LaunchCard>;
              })}
          </Grid>

          {/* Closed projects */}
          <Box component="h2" color="#00BFFF" marginTop="40px">
            Projects Closed
          </Box>
          <Grid container spacing={2}>
            {pools.map((pool, poolIdx) => {
              if (pool.status == 3)
                return <LaunchCard key={poolIdx} {...pool}></LaunchCard>;
            })}
          </Grid>

        </Grid>
      </MHidden>

      <MHidden width="mdUp">
        <Grid paddingLeft={'5%'} paddingRight={'5%'} paddingTop="30px">
          <Grid container direction="row" align="center" justifyContent={'center'}>
            {DEALS_TAB.map(({ id, link, title }) => {
              const btnColor = pathname === link ? 'light' : 'dark';
              return (
                <Box key={id} component={Link} to={link} className={`btn btn-${btnColor} text-info mx-1`}>
                  {title}
                </Box>
              );
            })}
          </Grid>
          <Grid align="center" justifyContent={'center'}>
            <Box component="img" marginTop="30px" src={imageURL('projects.png')}></Box>
          </Grid>

          <Grid container marginBottom="20px">
            <Grid item xs={2} marginTop="15px">
              <a href="/src/pages/PhoneCalendar">
                <Box
                  component="button"
                  href="/phonecalendar"
                  padding="10px"
                  backgroundColor="rgba(255, 255, 255, 0.1)"
                  border="none"
                  borderRadius={0.5}
                >
                  <Box component="img" src={imageURL('Calendar.png')} />
                </Box>
              </a>
            </Grid>
            <Grid item xs={2} marginTop="15px">
              <Box
                component="button"
                padding="10px"
                backgroundColor="rgba(255, 255, 255, 0.1)"
                border="none"
                borderRadius={0.5}
              >
                <Box component="img" src={imageURL('Search.png')} />
              </Box>
            </Grid>
          </Grid>


          <Grid item xs={8} component="h2" color="#00BFFF" fontSize={18} marginTop="20px" marginBottom="20px">
            Projects Open Now
          </Grid>
          <Grid container spacing={2}>
            {pools.map((pool, poolIdx) => {
              if (pool.status == 2)
                return <LaunchCard key={poolIdx} {...pool} />;
            })}
          </Grid>

          <Grid item xs={8} component="h2" color="#00BFFF" fontSize={18} marginTop="20px" marginBottom="20px">
            Projects Upcoming
          </Grid>
          <Grid container spacing={2}>
            {pools.map((pool, poolIdx) => {
              if (pool.status == 1)
                return <LaunchCard key={poolIdx} {...pool} />;
            })}
          </Grid>


          <Grid item xs={8} component="h2" color="#00BFFF" fontSize={18} marginTop="20px" marginBottom="20px">
            Projects Closed
          </Grid>
          <Grid container spacing={2}>
            {pools.map((pool, poolIdx) => {
              if (pool.status == 3)
                return <LaunchCard key={poolIdx} {...pool} />;
            })}
          </Grid>

        </Grid>
      </MHidden>
      {/* </Container> */}
    </Page>
  );
};

export default Deals;
