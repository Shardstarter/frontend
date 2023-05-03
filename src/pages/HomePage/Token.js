import { Box, Typography, Grid } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { MHidden } from '../../components/@material-extend';
import ReactApexChart from 'react-apexcharts';
import { imageURL } from '../../utils';
export default function Token() {
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
            <Box component="img" src={imageURL('h-5.png')}></Box>
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
                TOKEN
              </h1>
              <h2
                className="text-light text-center position-absolute start-50 translate-middle-x"
                style={{ top: '13px', fontFamily: { font_Family } }}
              >
                Features & Utility Cases
              </h2>
            </Box>
            <Box
              component="p"
              fontSize="18px"
              fontFamily={font_Family}
              marginTop="80px"
              style={{ marginBottom: '25px' }}
              color="white"
            >
               {process.env.REACT_APP_PROJECT_NAME} Token Is developed on Binance Smart Chain to serve as a native token for our $MGV Ecosystem.
              The features & use cases includes as follows : <br />
            </Box>
          </Typography>
        </Box>
        <Grid
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          container
          spacing={2}
          paddingLeft="14%"
          paddingRight="9%"
        >
          <Grid item sm={6}>
            <Typography
              variant="h4"
              component="div"
              fontFamily={'Arial'}
              sx={{ color: '#56C5FF', marginBottom: '25px', marginLeft: '0.25em' }}
            >
              Key Features
              <Box component="img" src={imageURL('border.png')} width="25%"></Box>
            </Typography>
            <ul style={{ fontSize: '16px', color: '#56C5FF' }}>
              <li>
                <span style={{ color: 'white' }}>Technical Indicator</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Support Multi-Chain EVM Networks</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>IDO Launchpad</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>NFT Launchpad</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Exclusive VC Deals</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Stakepad</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Yield Farming</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>DAO Governance</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Buy Back & Burn</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Project Insurance Fund</span>
              </li>
            </ul>
          </Grid>
          <Grid item sm={6} style={{ textAlign: 'center' }}>
            <Box component="img" src="img/main3.png" sx={{ width: '80%' }} />
          </Grid>
        </Grid>

        {/* Token Distribution*/}
        <Grid
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          container
          spacing={2}
          sx={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '14%', paddingRight: '5%' }}
        >
          <Grid item sm={6} style={{ textAlign: 'center' }}>
            {/* <Box component="img" src="img/main4.png" sx={{ width: '60%' }} /> */}
            <Box width="90%" height="90%" position="relative">
              <MyChart1 width={70}></MyChart1>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Typography
              fontFamily={'Segoe UI'}
              variant="h4"
              component="div"
              sx={{ color: '#56C5FF', marginBottom: '25px' }}
            >
              Token Distribution
              <Box component="img" src={imageURL('border.png')} width="30%"></Box>
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <ul style={{ fontSize: '16px', color: 'white' }}>
                  <li>Seed Sale 9%</li>
                  <li>Private Sale 12%</li>
                  <li>Public Sale 3%</li>
                  <li>Liquidity & Market Making 5%</li>
                  <li>Team 14%</li>
                </ul>
              </Grid>
              <Grid item sm={6}>
                <ul style={{ fontSize: '16px', color: 'white' }}>
                  <li>Marketing 10%</li>
                  <li>Development 6%</li>
                  <li>Staking Rewards 25 %</li>
                  <li>Reserve 10%</li>
                  <li>Advisors 6%</li>
                </ul>
              </Grid>
            </Grid>
            <ul style={{ fontSize: '18px', marginTop: '20px', color: '#56C5FF' }}>
              <li>
                <span style={{ color: 'white' }}>Initial Market Cap $ 148,000</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>DEX Listing Price 0.006 BUSD</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>TGE circulating supply: 7.4 % (including liquidity)</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Tokens Sold at TGE 24%</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Fully Diluted Market Cap $6,000,000</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Token Supply Circulation 1,000,000,000</span>
              </li>
            </ul>
          </Grid>
        </Grid>
      </MHidden>
      <MHidden width="mdUp">
        <Box
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          sx={{ marginTop: '50px', marginBottom: '50px', paddingLeft: '3%', paddingRight: '3%' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1 }}>
            <Box component="img" src={imageURL('h-5.png')}></Box>
          </Box>
          <Typography align="center">
            <Box
              data-aos="zoom-in"
              fontFamily={font_Family}
              sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}
            >
              <h2 style={{ top: '13px', fontFamily: { font_Family }, color: 'white' }}>Features & Utility Cases</h2>
            </Box>
            <Box
              fontSize="12px"
              textTransform="capitalize"
              marginTop="20px"
              style={{ marginBottom: '25px', padding: '0 8%' }}
              color="white"
            >
               {process.env.REACT_APP_PROJECT_NAME} Token Is developed on Binance Smart Chain to serve as a native token for our $MGV Ecosystem.
              The features & use cases includes as follows :
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} justifyContent="center" display="flex" color="white">
            Features
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <Box component="img" src={imageURL('border.png')} width="15%"></Box>
          </Grid>
          <Grid container item sm={12} direction="row">
            <Grid item xs={6}>
              <ul style={{ fontSize: 14, color: '#56C5FF' }}>
                <li>
                  <span style={{ color: 'white' }}>Technical Indicator</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Support Multi-Chain EVM Networks</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>IDO Launchpad</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>NFT Launchpad</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Exclusive VC Deals</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Stakepad</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6}>
              <ul style={{ fontSize: 14, color: '#56C5FF' }}>
                <li>
                  <span style={{ color: 'white' }}>Yield Farming</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>DAO Governance</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Buy Back & Burn</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Project Insurance Fund</span>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Grid item sm={6} justifyContent="center" display="flex">
            <Box component="img" src="img/main3.png" sx={{ width: '80%' }} />
          </Grid>
        </Grid>

        {/* Token Distribution*/}
        <Grid
          container
          spacing={2}
          sx={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '3%', paddingRight: '3%' }}
        >
          <Grid item xs={12} justifyContent="center" display="flex" color="white">
            Token Distribution
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <Box component="img" src={imageURL('border.png')} width="25%"></Box>
          </Grid>
          <Grid container item xs={12} direction="row">
            <Grid item xs={6}>
              <ul style={{ fontSize: '12px', color: '#56C5FF' }}>
                <li>
                  <span style={{ color: 'white' }}>Seed Sale 9%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Private Sale 12%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Public Sale 3%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Liquidity 5%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Team 14%</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6}>
              <ul style={{ fontSize: '12px', color: '#56C5FF' }}>
                <li>
                  <span style={{ color: 'white' }}>Marketing 10%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Development 6%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Staking Rewards 25 %</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Reserve 10%</span>
                </li>
                <li>
                  <span style={{ color: 'white' }}>Advisors 6%</span>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" height="100%" position="relative">
            <MyChart1 width={50}></MyChart1>
          </Box>
          <Box justifyContent="center" display="flex">
            <ul style={{ fontSize: '12px', marginTop: '20px', color: '#56C5FF' }}>
              <li>
                <span style={{ color: 'white' }}>Initial Market Cap $ 148,000</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>DEX Listing Price 0.006 BUSD</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>TGE circulating supply: 7.4 % (including liquidity)</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Net TGE circulating supply: 2.5%</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Tokens Sold at TGE 24%</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Fully Diluted Market Cap $6,000,000</span>
              </li>
              <li>
                <span style={{ color: 'white' }}>Token Supply Circulation 1,000,000,000</span>
              </li>
            </ul>
          </Box>
        </Grid>
      </MHidden>
    </>
  );
}

function MyChart1(props) {
  const data = {
    series: [25, 14, 12, 10, 10, 9, 6, 6, 5, 3],
    options: {
      chart: {
        width: '100%',
        type: 'pie'
      },
      labels: [
        'Staking Rewards',
        'Team',
        'Private sale',
        'Reserve',
        'Marketing',
        'Seed sale',
        'Advisors',
        'Development',
        'Liquidity & Market Making',
        'Public sale'
      ],
      theme: {
        monochrome: {
          enabled: true
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      // title: {
      //   text: "Monochrome Pie"
      // },
      dataLabels: {
        formatter(val, opts) {
          // const name = opts.w.globals.labels[opts.seriesIndex]
          return [val.toFixed(1) + '%'];
        }
      },
      legend: {
        show: false
      }
    }
  };
  const [width1, setWidth] = useState(100);
  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current.getBoundingClientRect().width);
    // console.log("width", {width1});
  }, []); //empty dependency array so it only runs once at render
  return (
    <Box component="div" id="chart" ref={elementRef} position="relative">
      <ReactApexChart options={data.options} series={data.series} type="pie" />
      <Box
        position="absolute"
        top={`calc(50% - ${props.width}px)`}
        left={`calc(50% - ${props.width}px)`}
        style={{ justifyContent: 'center', alignContent: 'center', display: 'flex' }}
      >
        <Box component="img" src={imageURL('circle_mega.png')} width={props.width * 2} height={props.width * 2}></Box>
      </Box>

      {/* <Box borderRadius="50%" width="12%" justifyContent={"center"} display="flex" align="center" style={{backgroundColor:"white"}}><Box component="img" src="my_public/images/logo.png"></Box></Box> */}
    </Box>
  );
}
