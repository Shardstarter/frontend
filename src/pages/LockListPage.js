import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Card,
  Divider,
  TextField,
  Container,
  Link,
  Tabs,
  Tab,
  Pagination
} from '@mui/material';
import { formatUnits, commify } from '@ethersproject/units';
import Page from 'components/Page';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { getLiquidities } from 'redux/slices/liquidityLocks';
import { getTokens } from 'redux/slices/tokenLocks';


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
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function LockList() {
  const { hash } = useLocation();
  const [mode, setMode] = useState();
  const [tab, setTab] = useState(0);
  const { account } = useActiveWeb3React();
  const [search, setSearch] = useState('');
  //Pagination part
  const [page, setPage] = useState(1);
  const liquidities = useSelector((state) => state.liquidityLocks.liquidities);
  const liquiditiesTotalPage = useSelector((state) => state.liquidityLocks.totalPage);
  const tokens = useSelector((state) => state.tokenLocks.tokens);
  const tokensTotalPage = useSelector((state) => state.tokenLocks.totalPage);
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const dispatch = useDispatch();
  const network = useSelector((state) => state.network.chainId);
  console.log(mode);
  useEffect(() => {
    setMode(hash.slice(1));
  }, [hash]);

  useEffect(() => {
    if (mode === 'token') {
      dispatch(getTokens(network, page, search, tab, account));
    } else dispatch(getLiquidities(network, page, search, tab, account));
  }, [account, dispatch, network, page, search, tab, mode]);

  // const handleTokenAddress = async (e) => {
  //   setIsParsing(true);
  //   dispatch(setAddress(e.target.value));
  // };

  console.log('tokens:', tokens);
  return (
    <Page title="Lock List">
      <Container maxWidth="lg">
        <Card
          sx={{
            width: 1,
            p: 3,
            transition: 'all .3s',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z24
            }
          }}
        >
          <TextField
            fullWidth
            label="Search by token address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              textColor="secondary"
              indicatorColor="primary"
              aria-label="icon position tabs example"
              sx={{ mt: 2, align: 'right' }}
            >
              <Tab label="All" />
              <Tab label="My locks" />
            </Tabs>
          </Stack>
          <Stack direction="row" sx={{ mt: 2 }}>
            <Typography fontWeight="bold" sx={{ width: 0.45 }}>
              Token
            </Typography>
            <Typography fontWeight="bold" sx={{ width: 0.45 }}>
              Amount
            </Typography>
          </Stack>
          <TabPanel value={tab} index={0}>
            {mode === 'token' ? (
              tokens.length > 0 ? (
                tokens?.map((item, index) => (
                  <Stack key={index}>
                    <Stack direction="row" alignItems="center">
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ width: 0.45 }}>
                        <Box component="img" src="/icons/logo.png" sx={{ width: 50 }} />
                        <Stack>
                          <Typography fontSize={18}>{item.name}</Typography>
                          <Typography color="text.secondary">{item.symbol}</Typography>
                        </Stack>
                      </Stack>
                      <Stack sx={{ width: 0.45 }}>
                        <Typography fontSize={18}>
                          {parseFloat(formatUnits(item.amount, item.decimals)).toLocaleString('en')} {item.symbol}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="flex-end">
                        <Link component={RouterLink} to={`/token-lock-detail/${item.token}/${item.owner}`}>
                          View
                        </Link>
                      </Stack>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                  </Stack>
                ))
              ) : (
                <Stack alignItems="Center" spacing={2}>
                  <Typography variant="h3">No Data</Typography>
                </Stack>
              )
            ) : liquidities.length > 0 ? (
              liquidities?.map((item, index) => (
                <Stack key={index}>
                  <Stack direction="row" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: 0.45 }}>
                      <Stack direction="row">
                        <Box component="img" src="/icons/logo.png" sx={{ width: 50, zIndex: 1 }} />
                        <Box component="img" src="/icons/logo.png" sx={{ width: 50, ml: -3 }} />
                      </Stack>
                      <Stack>
                        <Typography fontSize={18}>
                          {item.token0_name}/{item.token1_name}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.token0_symbol}/{item.token1_symbol}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack sx={{ width: 0.45 }}>
                      <Typography fontSize={18}>{commify(formatUnits(item.amount, 18))}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end">
                      <Link component={RouterLink} to={`/liquidity-lock-detail/${item.token}/${item.owner}`}>
                        View
                      </Link>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                </Stack>
              ))
            ) : (
              <Stack alignItems="Center" spacing={2}>
                <Typography variant="h3">No Data</Typography>
              </Stack>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {mode === 'token' ? (
              tokens.length > 0 ? (
                tokens?.map((item, index) => (
                  <Stack key={index}>
                    <Stack direction="row" alignItems="center">
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ width: 0.45 }}>
                        <Box component="img" src="/icons/logo.png" sx={{ width: 50 }} />
                        <Stack>
                          <Typography fontSize={18}>{item.name}</Typography>
                          <Typography color="text.secondary">{item.symbol}</Typography>
                        </Stack>
                      </Stack>
                      <Stack sx={{ width: 0.45 }}>
                        <Typography fontSize={18}>
                          {parseFloat(formatUnits(item.amount, item.decimals)).toLocaleString('en')} {item.symbol}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="flex-end">
                        <Link component={RouterLink} to={`/token-lock-detail/${item.token}/${item.owner}`}>
                          View
                        </Link>
                      </Stack>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                  </Stack>
                ))
              ) : (
                <Stack alignItems="Center" spacing={2}>
                  <Typography variant="h3">No Data</Typography>
                </Stack>
              )
            ) : liquidities.length > 0 ? (
              liquidities.map((item, index) => (
                <Stack key={index}>
                  <Stack direction="row" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: 0.45 }}>
                      <Stack direction="row">
                        <Box component="img" src="/icons/logo.png" sx={{ width: 50, zIndex: 1 }} />
                        <Box component="img" src="/icons/logo.png" sx={{ width: 50, ml: -3 }} />
                      </Stack>
                      <Stack>
                        <Typography fontSize={18}>
                          {item.token0_name}/{item.token1_name}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.token0_symbol}/{item.token1_symbol}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack sx={{ width: 0.45 }}>
                      <Typography fontSize={18}>{commify(formatUnits(item.amount, 18))}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end">
                      <Link component={RouterLink} to={`/liquidity-lock-detail/${item.token}/${item.owner}`}>
                        View
                      </Link>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                </Stack>
              ))
            ) : (
              <Stack alignItems="Center" spacing={2}>
                <Typography variant="h3">No Data</Typography>
              </Stack>
            )}
          </TabPanel>
          <Stack direction="row" justifyContent="center">
            <Pagination
              color="primary"
              count={mode === 'token' ? tokensTotalPage : liquiditiesTotalPage}
              page={page}
              onChange={handlePageChange}
              sx={{ marginTop: '20px' }}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
