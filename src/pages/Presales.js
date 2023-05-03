import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';

// material
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Typography,
  Stack,
  Grid,
  Pagination,
  Hidden
} from '@mui/material';
import { getPools } from 'redux/slices/pools';
import apis from '../services';
// import PoolCard from 'components/PoolCard';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShareIcon from '@mui/icons-material/Share';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import MyAlarms from './MyAlarms';

// ----------------------------------------------------------------------

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 0, md: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------

export default function Presales() {
  const { themeStretch } = useSettings();
  const { hash } = useLocation();

  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();

  //Pagination part
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState(-1);
  const [sort, setSort] = useState('createdAt');
  const [isLoading, setIsLoading] = useState(true);

  const network = useSelector((state) => state.network.chainId);
  const pools = useSelector((state) => state.pools.pools);
  const totalPage = useSelector((state) => state.pools.totalPage);
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      try {
      await dispatch(getPools(network, tab, sort, filter, account));
        
      } catch (error) {
        console.log("presales", error)
      }
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, filter, network, sort, tab]);

  useEffect(() => {
    switch (hash) {
      case '#my-contributions':
        setTab(1);
        break;
      case '#my-alarms':
        setTab(2);
        break;
      case '#my-presales':
        setTab(3);
        break;
      default:
        setTab(0);
    }
  }, [hash]);

  const NavPanel = () => (
    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mb: 3 }}>
      <FormControl sx={{ marginLeft: '20px' }}>
        <InputLabel>Filter By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter By"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            height: 35
          }}
          inputProps={{
            sx: {
              // width: 160,
              fontSize: '0.85rem',
              padding: '0 20px 0 15px'
            }
          }}
          MenuProps={{
            sx: {
              '& .MuiPaper-root': {
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)'
              }
            }
          }}
        >
          <MenuItem value={-1}>All Status</MenuItem>
          <MenuItem value={0}>Upcoming</MenuItem>
          <MenuItem value={1}>Live</MenuItem>      
          <MenuItem value={5}>Listed on Dex</MenuItem>
          <MenuItem value={7}>KYC</MenuItem>
          <MenuItem value={8}>Audit</MenuItem>
          <MenuItem value={9}>Gold</MenuItem>
          <MenuItem value={10}>Platinum</MenuItem>
          <MenuItem value={11}>Diamond</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginLeft: '20px' }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          label="Sort By"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{
            height: 35
          }}
          inputProps={{
            sx: {
              // width: 160,
              fontSize: '0.85rem',
              padding: '0 20px 0 15px'
            }
          }}
          MenuProps={{
            sx: {
              '& .MuiPaper-root': {
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)'
              }
            }
          }}
        >
          <MenuItem value={'createdAt'}>No Filter</MenuItem>
          <MenuItem value={'hardCap'}>Hard Cap</MenuItem>
          <MenuItem value={'softCap'}>Soft Cap</MenuItem>
          <MenuItem value={'dexCapPercent'}>LP Percent</MenuItem>
          <MenuItem value={'startDateTime'}>Start Time</MenuItem>
          <MenuItem value={'endDateTime'}>End Time</MenuItem>
          <MenuItem value={'tier'}>Tier</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );

  return (
    <Page >
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Hidden smDown>
          <Tabs
            centered
            value={tab}
            scrollButtons="auto"
            onChange={(e, newValue) => setTab(newValue)}
            textColor="secondary"
            indicatorColor="primary"
            aria-label="icon position tabs example"
          >
            <Tab icon={<AppsIcon />} iconPosition="start" label="All Presales" />

            {/* <Tab
              icon={<SvgIconStyle src="/icons/contribution.svg" sx={{ width: 20, height: 20, mr: '4px' }} />}
              iconPosition="start"
              label=" My Contributions"
            /> */}
            {/* <Tab icon={<NotificationsActiveIcon />} iconPosition="start" label="My Alarms" /> */}
            {/* <Tab icon={<AppsIcon />} iconPosition="start" label="My Presales" /> */}
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Tabs
            value={tab}
            variant="scrollable"
            scrollButtons="auto"
            onChange={(e, newValue) => setTab(newValue)}
            textColor="secondary"
            indicatorColor="primary"
            aria-label="icon position tabs example"
          >
            <Tab icon={<AppsIcon />} iconPosition="start" label="All Presales" />
            <Tab icon={<AppsIcon />} iconPosition="start" label="My Presales" />
            <Tab icon={<ShareIcon />} iconPosition="start" label="My Contributions" />
            <Tab icon={<NotificationsActiveIcon />} iconPosition="start" label="My Alarms" />
          </Tabs>
        </Hidden>
        {isLoading ? (
          <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
        ) : (
          <>
            <TabPanel value={tab} index={0}>
              {/* <NavPanel /> */}
              <Grid container spacing={2}>
                {pools?.length > 0 ? (
                  pools.map((pool, key) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={key}>
                      {/* <PoolCard pool={pool} account={account} /> */}
                    </Grid>
                  ))
                ) : (
                  <Stack sx={{ width: 1, height: 1 }} alignItems="center" justifyContent="center">
                    <Typography variant="h3">No Data</Typography>
                  </Stack>
                )}
              </Grid>
              {totalPage > 0 ? (
                <Pagination count={totalPage} page={page} onChange={handlePageChange} sx={{ marginTop: '20px' }} />

              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel value={tab} index={3}>
              {
                !account ? (
                  "Please login with your wallet!"
                ) : (
                  <Page title="My Presales">
                    <NavPanel />
                    <Grid container spacing={2}>
                      {pools?.length > 0 ? (
                        pools.map((pool, key) => (
                          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={key}>
                            {/* <PoolCard pool={pool} account={account} /> */}
                          </Grid>
                        ))
                      ) : (
                        <Stack sx={{ width: 1, height: 1 }} alignItems="center" justifyContent="center">
                          <Typography variant="h3">No Data</Typography>
                        </Stack>
                      )}
                    </Grid>
                    {totalPage > 0 ? (
                      <Pagination count={totalPage} page={page} onChange={handlePageChange} sx={{ marginTop: '20px' }} />
                    ) : (
                      ''
                    )}
                  </Page>
                )
              }

            </TabPanel>
            <TabPanel value={tab} index={1}>
              {
                !account ? (
                  "Please login with your wallet!"
                ) : (
                  <Page title="My Contributions">
                    <NavPanel />
                    <Grid container spacing={2}>
                      {pools?.length > 0 ? (
                        pools.map((pool, key) => (
                          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={key}>
                            {/* <PoolCard pool={pool} account={account} /> */}
                          </Grid>
                        ))
                      ) : (
                        <Stack sx={{ width: 1, height: 1 }} alignItems="center" justifyContent="center">
                          <Typography variant="h3">No Data</Typography>
                        </Stack>
                      )}
                    </Grid>
                    {totalPage > 0 ? (
                      <Pagination count={totalPage} page={page} onChange={handlePageChange} sx={{ marginTop: '20px' }} />
                    ) : (
                      ''
                    )}
                  </Page>
                )}
            </TabPanel>
            <TabPanel value={tab} index={2}>
              {
                !account ? (
                  "Please login with your wallet!"
                ) : (
                  <MyAlarms account={account} network={network} />
                )}
            </TabPanel>
          </>
        )}


      </Container>
    </Page>
  );
}
