import {
    Box,
    Typography,
    Grid,
} from '@mui/material';
import { MHidden} from '../../components/@material-extend';
import PerformanceCard from 'components/PerformanceCard'
import PerformanceCardPhone from 'components/PerformanceCardPhone'
import { getProjectStatus, imageURL } from '../../utils';
import React, { useEffect, useState } from 'react';
import apis from '../../services';
import { PROJECT_STATUS } from '../../config/constants';
import MyProjectCard from '../../components/MyProjectCard';
export default function Performance(){
    const font_Family = 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';

    const [pools, setPools] = useState([]);
  const [completedProject, setCompletedProjects] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await apis.getDeals();
      if (response.statusText === 'OK') {
        const { pools } = response.data;
        setPools(pools);
      }
    })();
  }, []);

    return(
        <>
        <MHidden width="mdDown">
        <Box  sx={{ marginTop: '10px', marginBottom: '50px', paddingLeft:'14%', paddingRight:'14%'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1,}}>
            <Box  component="img" src={imageURL('h-3.png')} ></Box>
          </Box>
          <Box data-aos="zoom-in" fontFamily={font_Family} sx={{display:'flex', position:'relative', justifyContent:'center'}}>
              <h1 className="text-mute text-center fw-bold position-absolute start-50 translate-middle" style={{fontSize:120, top:'30px', left:'50%', color:"#232323", fontFamily:{font_Family}}}>PERFORMANCE</h1>
              <h2 className="text-light text-center position-absolute start-50 translate-middle-x" style={{top:'13px'}}>Past Invest Performance</h2>
          </Box>
          <Grid spacing={2} container data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" marginTop="150px" >

            {pools.length > 0 &&
              pools.map((pool, poolIdx) => {
                const isCompleted = getProjectStatus(pool?.startDateTime, pool?.endDateTime) === PROJECT_STATUS.completed;
                const [privacy, tag] = pool?.whitelistable ? ['Private', 'VC'] : ['Public', 'IDO'];

                if (isCompleted) {
                  if (completedProject === 0) setCompletedProjects((prevState) => prevState + 1);
                  return <Grid item sm="12"><PerformanceCard key={poolIdx}  {...pool}/></Grid>;
                }
              })}
          </Grid>
          {completedProject === 0 && <Box data-aos="zoom-in" fontFamily={font_Family} sx={{display:'flex', position:'relative', justifyContent:'center', padding: '1em 0'}}>
            <img className="text-mute text-center fw-bold position-absolute start-50 translate-middle" src={imageURL('logo.png')} alt='logo' style={{filter: 'blur(4px)'}} height={150} width={150}/>
            <h1 className="text-light text-center position-absolute start-50 translate-middle-x" style={{fontSize:25, top:'13px'}}>Coming Soon</h1>
          </Box>
          }
          <Typography fontFamily={'Segoe UI'} fontSize={'25px'} align='center' marginTop="20px" sx={{ padding: '2em 0', color : '#24B6E6' }}>
            <a href="/deals" style={{textDecoration:'none', color:"#24B6E6"}}>View All</a>
          </Typography>
        </Box>
        </MHidden>
        <MHidden width="mdUp">
        <Box  sx={{ marginTop: '10px', marginBottom: '50px', paddingLeft:'2%', paddingRight:'2%'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1,}}>
            <Box  component="img"  src={imageURL('h-3.png')}></Box>
          </Box>
          <Box data-aos="zoom-in" fontFamily={font_Family} sx={{display:'flex', position:'relative', justifyContent:'center'}}>
              <h2 className="text-light text-center position-absolute start-50 translate-middle-x" style={{fontSize:15, top:'13px'}}>Past Invest Performance</h2>
          </Box>
          <Grid spacing={2} container marginTop="40px" >
            {pools.length > 0 && pools.map( (pool, poolIdx) =>  {
              return (
                <PerformanceCardPhone key={poolIdx}  {...pool}/>
              )
            })}
          </Grid>
          <Typography fontFamily={'Segoe UI'} fontSize={'25px'} align='center' marginTop="20px" sx={{ marginBottom: '5px', color : '#24B6E6' }}>
            <a href="#" style={{textDecoration:'none',  color:"#24B6E6"}}>View All</a>
          </Typography>
        </Box>
        </MHidden>
        </>
    );
}