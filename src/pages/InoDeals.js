import { useState, useEffect } from 'react';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import LaunchCard from 'components/LaunchCard'
import MyProjectCard from 'components/MyProjectCard'
import {Modal} from '@mui/material'
// material
import {
  Box,
  Grid,
} from '@mui/material';

import { getPools } from 'redux/slices/pools';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// hooks
// components
import Page from 'components/Page';
import MyCalendar from './MyCalendar';
import { DEALS_TAB } from '../config/constants';
import { imageURL } from '../utils';


// ----------------------------------------------------------------------

export default function IdoDeals(){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();

  //Pagination part
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const network = useSelector((state) => state.network.chainId);

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, tab, account));
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, network,tab]);

  return (
    <Page  style={{backgroundColor:"#171819"}}>
      {/* <Container maxWidth='md'> */}
        {isLoading ? (
          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
        ) : (
            <>
            {/* <Modal show={show} onHide={() => setShow(true)}> */}
            <Grid paddingLeft={'14%'} paddingRight={'14%'} paddingTop="30px">
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box margin="150px 14% 0px 14%" style={{backgroundColor:"rgba(35, 35, 35, 0.5)", blurRadius:12}}> 
                  <MyCalendar/>
                </Box>
              </Modal>
                <Grid container direction="row" align="center" justifyContent={'center'}>
                  {DEALS_TAB.map(({id, link, title}) =>{
                    const btnColor = pathname === link ? 'light' : 'dark';
                    return  (
                      <Box key={id} component={Link} to={link}
                           className={`btn btn-${btnColor} text-info mx-1`}
                      >{title}</Box>
                    )
                  })}
                    <Box component="button"  onClick={handleOpen} className="btn btn-dark text-info mx-1">
                        <i className="fa-solid fa-calendar-days text-info mx-1"></i>Calendar
                    </Box>
                </Grid>
                <Box component="h2" marginTop="20px" display="flex" align="center" justifyContent="center" color="#00BFFF">PROJECTS</Box>
                <Grid align="center" justifyContent={'center'}><Box component="img" marginTop="30px" src={imageURL('projects.png')}></Box></Grid>
                <Grid container direction="row" marginTop="20px">
                    <Grid item md={6}></Grid>
                    <Grid item md={6} position="relative" display="flex">
                        <Box component="input" placeholder="Search..." style={{ paddingLeft:"10px", borderRadius:2, height:"50px", width:"100%", border:"none", backgroundColor:"rgba(255, 255, 255, 0.1)"}}/>
                        <Box component="button" border="none" borderRadius={1} height="40px" width="90px" position="absolute" right="10px" top="5px" style={{ backgroundColor:"#56C5FF", color:"white" }}>Search</Box>

                    </Grid>
                </Grid>
                <Box component="h2" color="#00BFFF" marginTop="20px">Next To Launch</Box>
                <Grid container spacing={2}>
                    {/*<LaunchCard></LaunchCard>*/}
                    {/*<LaunchCard></LaunchCard>*/}
                    {/*<LaunchCard></LaunchCard>*/}
                    {/*<LaunchCard></LaunchCard>*/}
                    {/*<LaunchCard></LaunchCard>*/}
                </Grid>
                <Grid marginTop="50px" dispay="flex" position="relative" container direction="row">
                    <Box component="h4" position="relative" color="#56C5FF" fontSize={34}>Completed Projects</Box>
                    <Box component="p" position="absolute" right="0px" top="10px" fontSize={24} color="white">View All Pools</Box>
                </Grid>
                <MyProjectCard></MyProjectCard>
                <MyProjectCard></MyProjectCard>
                <MyProjectCard></MyProjectCard>
                <MyProjectCard></MyProjectCard>
            </Grid>
            </>
        )}
      {/* </Container> */}
    </Page>
  );
}