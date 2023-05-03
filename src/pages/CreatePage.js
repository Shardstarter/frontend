import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAddress,
  setDeal,
  setProjectName,
  setError,
  setParsed,
  setApproved,
  setAllowance,
  setTotalSupply
} from '../redux/slices/tokenListing';
import { useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Container,
  Box,
  Paper,
  TextField,
  Alert as MuiAlert,
  Stack,
  Typography,
  Divider,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Link,
  Dialog,
  DialogContent
} from '@mui/material';
import MainInfo from './create/MainInfo';
import AdditionalInfo from './create/AdditionalInfo';
import FinishStep from './create/FinishStep';
import { useNavigate } from 'react-router';
import { useTokenContract } from '../hooks/useContract';
import { IDO_ADDRESS } from '../config/constants';
import { useWeb3React } from '@web3-react/core';
import Loader from 'react-loader-spinner';
import HashLoader from 'react-spinners/HashLoader';
import { formatUnits, commify } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { useSnackbar } from 'notistack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Page from 'components/Page';

const steps = [
  {
    title: 'Approve Token',
    desc: 'Enter the token address and approve'
  },
  {
    title: 'Presale Information',
    desc: 'Enter the Presale information'
  },
  {
    title: 'Project Information',
    desc: 'Add project links, description and select tier'
  },
  {
    title: 'Submit',
    desc: 'Submit your presale'
  }
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Create() {
  const { account } = useWeb3React();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const network = useSelector((state) => state.network.chainId);
  const projectName = useSelector((state) => state.tokenListing.projectName);
  const address = useSelector((state) => state.tokenListing.address);
  const deal = useSelector((state) => state.tokenListing.deal);
  const error = useSelector((state) => state.tokenListing.error);
  const symbol = useSelector((state) => state.tokenListing.symbol);
  const name = useSelector((state) => state.tokenListing.name);
  const totalSupply = useSelector((state) => state.tokenListing.totalSupply);
  const decimals = useSelector((state) => state.tokenListing.decimals);
  const approved = useSelector((state) => state.tokenListing.approved);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0); // 0 default, 1 maininfo, 2 additional info
  const [isApproving, setIsApproving] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const tokenContract = useTokenContract(address);

  const handleProjectName = async (e) => {
    dispatch(setProjectName(e.target.value));
  };

  const handleDeal = async (e) => {
    dispatch(setDeal(e.target.value));
  };

  const handleTokenAddress = async (e) => {
    if (!account) {
      enqueueSnackbar('Please login with your wallet!', {
        variant: 'error'
      });
      return;
    }
    setIsParsing(true);
    dispatch(setAddress(e.target.value));
  };
  const handleApprove = async (e) => {
    if (!isApproving) {
      try {
        setIsApproving(true);
        const balance = await tokenContract.balanceOf(account);
        const tx = await tokenContract.approve(IDO_ADDRESS[network], balance);
        await tx.wait();
        dispatch(setAllowance(balance));
        setIsApproving(false);
        goNext();
      } catch (err) {
        setIsApproving(false);
        enqueueSnackbar('Failed in approving!', {
          variant: 'error'
        });
      }
    }
  };

  const goNext = () => {
    if (activeStep < 3)
      setActiveStep((current) => {
        return current + 1;
      });
  };
  const goBack = () => {
    if (activeStep > 0)
      setActiveStep((current) => {
        return current - 1;
      });
  };
  const goComplete = (address) => {
    navigate(`/project/${address}`);
  };

  return (
    <Page title="Create IDO">
      <Container maxWidth="lg">
        <Box sx={{ mt: 5 }}>
          <Stepper alternativeLabel activeStep={activeStep} sx={{ mb: 5 }}>
            {steps.map((label, index) => (
              <Step key={label.title} completed={index < activeStep}>
                <StepLabel>
                  <Stack fontSize="1.2rem">{label.title}</Stack>
                  <Typography fontSize="0.8rem">{label.desc} </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep == 0 ? (
            <Paper sx={{ p: 10, mx: 'auto' }}>
              <Stack>
                <TextField
                  fullWidth
                  label="Project(Token) Name"
                  type="text"
                  error={Boolean(error)}
                  helperText={error}
                  value={projectName}
                  onChange={handleProjectName}
                  sx={{
                    width: 1
                  }}
                />
              </Stack>
              <Stack sx={{ marginTop: '30px' }}>
                <TextField
                  fullWidth
                  label="Deal"
                  type="text"
                  error={Boolean(error)}
                  helperText={error}
                  value={deal}
                  onChange={handleDeal}
                  sx={{
                    width: 1
                  }}
                />
              </Stack>
              <Stack sx={{ marginTop: '30px' }}>
                <TextField
                  fullWidth
                  label="Team Wallet Address For Raising Fund"
                  type="text"
                  error={Boolean(error)}
                  helperText={error}
                  value={address}
                  onChange={handleTokenAddress}
                  sx={{
                    width: 1
                  }}
                />
              </Stack>
              <Stack sx={{ marginTop: '30px' }}>
                <Stack direction="row" justifyContent="center">
                  <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={goNext}>
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ) : activeStep == 1 ? (
            <MainInfo goBack={goBack} goNext={goNext}></MainInfo>
          ) : activeStep == 2 ? (
            <AdditionalInfo goBack={goBack} goNext={goNext}></AdditionalInfo>
          ) : (
            <FinishStep goBack={goBack} goComplete={goComplete}></FinishStep>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default Create;
