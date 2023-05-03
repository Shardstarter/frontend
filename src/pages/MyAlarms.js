import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography, Button, Card, Divider, Container, IconButton, Hidden } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Page from 'components/Page';
import { setAlarmList, setAlarm } from 'redux/slices/alarms';
import { useSnackbar } from 'notistack';
import axios from '../utils/axios';
import ConfirmDialog from 'components/ConfirmDialog';
import HashLoader from 'react-spinners/HashLoader';
import Moment from 'react-moment';

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

export default function MyAlarms({ account, network }) {
  const tab = 0;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const alarms = useSelector((state) => state.alarms.alarms);
  const [isRemoving, setIsRemoving] = useState(false);

  console.log(alarms);
  //Pagination part
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      if (account) {
        try {
          const response = await axios.get(
            `/webpush/${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}/${account}`
          );
          let alarms = response.data.alarms;
          console.log(alarms);
          if (!unmounted) dispatch(setAlarmList(alarms));
        } catch (error) {
          console.log(error);
          enqueueSnackbar('Oops, Something went wrong!', {
            variant: 'error'
          });
        }
      }
    })();
    return () => (unmounted = true);
  }, [account, network, dispatch, enqueueSnackbar]);
  // const handleTokenAddress = async (e) => {
  //   setIsParsing(true);
  //   dispatch(setAddress(e.target.value));
  // };
  const deleteAlarm = async (index) => {
    if (!account) return;
    try {
      const response = await axios.delete(`/webpush`, {
        data: {
          network: network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc',
          pool: {
            address: alarms[index].address,
            status: alarms[index].status,
            time: alarms[index].time
          },
          wallet: account,
          subscription: global.subscription
        }
      });
      let message = response.data.message;
      console.log(message);
      if (message === 'no existed') {
        enqueueSnackbar('No alarm existed!', {
          variant: 'error'
        });
      } else {
        enqueueSnackbar('Alarm removed successfully!', {
          variant: 'success'
        });
        dispatch(
          setAlarm({
            address: alarms[index].address,
            status: alarms[index].status,
            time: alarms[index].time
          })
        );
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Oops, Something went wrong!', {
        variant: 'error'
      });
    }
  };

  const deleteAll = async () => {
    if (!account) return;
    try {
      const response = await axios.delete(`/webpushes`, {
        data: {
          network: network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc',
          wallet: account
        }
      });
      let message = response.data.message;
      if (message === 'no existed') {
        enqueueSnackbar('No alarm existed!', {
          variant: 'error'
        });
      } else {
        enqueueSnackbar('All alarms removed successfully!', {
          variant: 'success'
        });
        dispatch(setAlarmList([]));
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Oops, Something went wrong!', {
        variant: 'error'
      });
    }
  };

  const handleRemoveDialog = async (val) => {
    setRemoveDialogOpen(false);
    if (val && !isRemoving) {
      setIsRemoving(true);
      try {
        await deleteAll();
        setIsRemoving(false);
      } catch (err) {
        setIsRemoving(false);
      }
    }
  };
  return (
    <Page title="My Alarms">
      <Container maxWidth="lg">
        <Card
          sx={{
            width: 1,
            p: 3,
            mt: 5,
            transition: 'all .3s',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z24
            }
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <Button size="large" startIcon={<CloseIcon />} onClick={() => setRemoveDialogOpen(!isRemoving)}>
              {isRemoving ? <HashLoader color="#59f1f6" size={30} /> : 'Remove All'}
            </Button>
          </Stack>
          <Typography variant="h3" align="center">
            My Alarms
          </Typography>
          <Hidden mdDown>
            <Stack direction="row" sx={{ mt: 4 }}>
              <Typography fontWeight="bold" sx={{ width: 0.25 }}>
                Name
              </Typography>
              <Typography fontWeight="bold" sx={{ width: 0.25 }}>
                Presale Start
              </Typography>
              <Typography fontWeight="bold" sx={{ width: 0.25 }}>
                Estimated Dex Listing
              </Typography>
              <Typography fontWeight="bold" sx={{ width: 0.25 }}>
                Alarm
              </Typography>
              <Stack sx={{ width: 0.1 }}>
                <Typography align="right" fontWeight="bold">
                  Actions
                </Typography>
              </Stack>
            </Stack>
          </Hidden>
          <Hidden mdUp>
            <Stack direction="row" sx={{ mt: 4 }}>
              <Typography fontWeight="bold" sx={{ width: 0.4 }}>
                Name
              </Typography>
              <Typography fontWeight="bold" sx={{ width: 0.4 }}>
                Alarm
              </Typography>
              <Stack sx={{ width: 0.2 }}>
                <Typography align="right" fontWeight="bold">
                  Actions
                </Typography>
              </Stack>
            </Stack>
          </Hidden>
          <TabPanel value={tab} index={0}>
            <Hidden mdDown>
              {alarms.map((item, index) => (
                <Stack key={index}>
                  <Stack direction="row" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: 0.25 }}>
                      <Box component="img" src={item.logo} sx={{ width: 50 }} />

                      <Stack>
                        <Typography fontSize={18}>{item.name}</Typography>
                        <Typography color="text.secondary">{item.symbol}</Typography>
                      </Stack>
                    </Stack>
                    <Stack sx={{ width: 0.25 }}>
                      <Typography fontSize={18}>
                        <Moment format="YYYY-MM-DD HH:mm">{item.startDateTime}</Moment>
                      </Typography>
                    </Stack>
                    <Stack sx={{ width: 0.25 }}>
                      <Typography fontSize={18}>
                        <Moment format="YYYY-MM-DD HH:mm">{item.listDateTime}</Moment>
                      </Typography>
                    </Stack>
                    <Stack sx={{ width: 0.25 }}>
                      <Typography fontSize={18}>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {new Date(
                            Number(item.time) * 60 * 1000 +
                              (item.status === 'presale'
                                ? new Date(item.startDateTime).getTime()
                                : new Date(item.listDateTime).getTime())
                          ).toISOString()}
                        </Moment>
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ width: 0.1 }}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                      spacing={3}
                    >
                      <IconButton onClick={() => deleteAlarm(index)}>
                        <CloseIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                </Stack>
              ))}
            </Hidden>
            <Hidden mdUp>
              {alarms.map((item, index) => (
                <Stack key={index}>
                  <Stack direction="row" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: 0.4 }}>
                      <Box component="img" src={item.logo} sx={{ width: 50 }} />

                      <Stack>
                        <Typography fontSize={18}>{item.name}</Typography>
                        <Typography color="text.secondary">{item.symbol}</Typography>
                      </Stack>
                    </Stack>

                    <Stack sx={{ width: 0.4 }}>
                      <Typography fontSize={18}>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {new Date(
                            Number(item.time) * 60 * 1000 +
                              (item.status === 'presale'
                                ? new Date(item.startDateTime).getTime()
                                : new Date(item.listDateTime).getTime())
                          ).toISOString()}
                        </Moment>
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ width: 0.2 }}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                      spacing={3}
                    >
                      <IconButton onClick={() => deleteAlarm(index)}>
                        <CloseIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                </Stack>
              ))}
            </Hidden>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Typography align="center" sx={{ mt: 2 }} fontSize={20}>
              No Data
            </Typography>
          </TabPanel>
          {/* <Stack direction="row" justifyContent="center">
            <Pagination
              color="primary"
              count={totalPage}
              page={page}
              onChange={handlePageChange}
              sx={{ marginTop: '20px' }}
            />
          </Stack> */}
        </Card>
      </Container>
      <ConfirmDialog
        id="remove-dialog"
        keepMounted
        open={removeDialogOpen}
        onClose={handleRemoveDialog}
        title="Are you sure?"
        content="All alarms will be removed."
      />
    </Page>
  );
}
