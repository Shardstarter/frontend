import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Container,
  Alert,
  AlertTitle,
  linearProgressClasses,
  Link
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useNavigate } from 'react-router';
import Page from 'components/Page';
import { formatUnits, parseUnits, commify } from '@ethersproject/units';
import { useSnackbar } from 'notistack';
import HashLoader from 'react-spinners/HashLoader';
import apis from 'services';

export default function CreateVote() {
  const navigate = useNavigate();
  const { library, account } = useActiveWeb3React();
  const signer = library?.getSigner();
  const network = useSelector((state) => state.network.chainId);

  const [projectName, setProjectName] = useState('');
  const [logo, setLogo] = useState('https://snipboard.io/pFnzT4.jpg');
  const [ticker, setTicker] = useState('');
  const [website, setWebsite] = useState('');
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');

  const [processing, setProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCreate = async () => {
    setProcessing(true);
    (async () => {
      try {
        const response = await apis.createVote({
          projectName, logo, ticker, website, telegram, twitter, discord
        });
        if (response.data.result) {
          enqueueSnackbar('success', {
            variant: 'success'
          });
          navigate('/vote')
        } else {
          enqueueSnackbar(response.data.message, {
            variant: 'danger'
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Oops, Something went wrong!' + error.message, {
          variant: 'error'
        });
      }
      setProcessing(false);
    })();
  };

  return (
    <Page title="Create Vote">
      <Container maxWidth="lg" className="pt-5">
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
          <Typography variant="h4">Create Vote</Typography>
          <Divider />
          <Stack sx={{ mt: 2 }} spacing={3}>
            <TextField
              fullWidth
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              sx={{ width: 1 }}
            />
            <TextField
              fullWidth
              label="Logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              sx={{ width: 1 }}
              placeholder="https://tokenlogo.url"
            />
            <TextField
              fullWidth
              label="Ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              sx={{ width: 1 }}
            />
            <TextField
              fullWidth
              label="Website Link"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              sx={{ width: 1 }}
            />
            <TextField
              fullWidth
              label="Telegram Link"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              sx={{ width: 1 }}
            />
            <TextField
              fullWidth
              label="Twitter Link"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              sx={{ width: 1 }}
            />
            <TextField
              fullWidth
              label="Discord Link"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              sx={{ width: 1 }}
            />
          </Stack>
          <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
            <Button size="large" variant="contained" className="btn btn-info text-light mt-2 mx-4" onClick={handleCreate}>
              {processing ? <HashLoader color="#59f1f6" size={30} /> : 'Create Pool'}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
