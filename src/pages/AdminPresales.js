import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddress, setError, setParsed, setApproved, setAllowance, setTotalSupply } from "../redux/slices/tokenListing";
import { useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Container,
  Box,
  Paper,
  TextField,
  Stack,
  Typography, Divider,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel, Stepper, Step, StepLabel, FormControl, InputLabel
} from "@mui/material";
import MainInfo from './create/MainInfo';
import AdditionalInfo from './create/AdditionalInfo';
import FinishStep from './create/FinishStep';
import { useNavigate } from "react-router";
import { useTokenContract } from "../hooks/useContract";
import { IDO_ADDRESS } from '../config/constants';
import { useWeb3React } from "@web3-react/core";
import Loader from "react-loader-spinner";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { useIDOContract } from "hooks/useContract";
import { parseEther, formatEther } from "@ethersproject/units";

function AdminPresales() {
  const { account } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const network = useSelector((state) => state.network.chainId);
  const [poolFixedFee, setPoolFixedFee] = useState([-1, -1, -1, -1]);


  const [percentFee, setPercentFee] = useState(0);
  const [tokenPercentFee, setTokenPercentFee] = useState(0);
  const idoContract = useIDOContract();

  const [isFeeing, setIsFeeing] = useState(false);
  const setAdminFee = async () => {
    if (!isFeeing) {
      setIsFeeing(true);
      try {
        const tx = await idoContract.setAdminFee([parseEther(String(poolFixedFee[0])),
        parseEther(String(poolFixedFee[1])),
        parseEther(String(poolFixedFee[2])),
        parseEther(String(poolFixedFee[3]))],
          percentFee, tokenPercentFee);

        await tx.wait();
        enqueueSnackbar("Succeed in setting fee!", {
          variant: "success",
        });
        setIsFeeing(false);
      } catch (err) {
        console.log(err);
        enqueueSnackbar("Failed in setting fee!", {
          variant: "error",
        });
        setIsFeeing(false);
      }
    }
  };
  useEffect(() => {
    let unmounted = false;
    (async () => {
      try {
        const tmp = [];
        for (let i = 0; i < 4; i++)
          tmp.push(await idoContract.poolFixedFee(i));

        const poolPercentFee = await idoContract.poolPercentFee();
        const poolTokenPercentFee = await idoContract.poolTokenPercentFee();
        if (!unmounted) {
          setPoolFixedFee([formatEther(tmp[0]),
          formatEther(tmp[1]),
          formatEther(tmp[2]),
          formatEther(tmp[3])]);

          setPercentFee(poolPercentFee);
          setTokenPercentFee(poolTokenPercentFee);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return () => { unmounted = true };
  }, []);
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 5 }}>
          {
            poolFixedFee[0] == -1 ? (
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height={50}
                width={50}
              />
            ) : (
              <Paper
                sx={{
                  p: 10,
                  mx: "auto",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Stack >
                  <TextField
                    fullWidth
                    type="number"
                    label="Common Fixed Fee"
                    value={poolFixedFee[0]}
                    onChange={(e) => {
                      const tmp = JSON.parse(JSON.stringify(poolFixedFee));
                      tmp[0] = e.target.value;
                      setPoolFixedFee(tmp)
                    }}
                    sx={{
                      width: 1,
                      color: "white",
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                </Stack>
                <Stack marginTop="20px" >
                  <TextField
                    fullWidth
                    type="number"
                    label="Gold Fixed Fee"
                    value={poolFixedFee[1]}
                    onChange={(e) => {
                      const tmp = JSON.parse(JSON.stringify(poolFixedFee));
                      tmp[1] = e.target.value;
                      setPoolFixedFee(tmp)
                    }}
                    sx={{
                      width: 1,
                      color: "white",
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                </Stack>
                <Stack marginTop="20px" >
                  <TextField
                    fullWidth
                    type="number"
                    label="Platinum Fixed Fee"
                    value={poolFixedFee[2]}
                    onChange={(e) => {
                      const tmp = JSON.parse(JSON.stringify(poolFixedFee));
                      tmp[2] = e.target.value;
                      setPoolFixedFee(tmp)
                    }}
                    sx={{
                      width: 1,
                      color: "white",
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                </Stack>
                <Stack marginTop="20px" >
                  <TextField
                    fullWidth
                    type="number"
                    label="Diamond Fixed Fee"
                    value={poolFixedFee[3]}
                    onChange={(e) => {
                      const tmp = JSON.parse(JSON.stringify(poolFixedFee));
                      tmp[3] = e.target.value;
                      setPoolFixedFee(tmp)
                    }}
                    sx={{
                      width: 1,
                      color: "white",
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                </Stack>
                <Stack marginTop="20px" >
                  <TextField
                    fullWidth
                    label="Percent Fee"
                    type="number"
                    value={percentFee}
                    onChange={(e) => setPercentFee(e.target.value)}
                    sx={{
                      width: 1,
                      color: "white",
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                </Stack>
                <Stack marginTop="20px" >
                  <TextField
                    fullWidth
                    label="Token Percent Fee"
                    type="number"
                    value={tokenPercentFee}
                    onChange={(e) => setTokenPercentFee(e.target.value)}
                    sx={{
                      width: 1,
                      color: "white",
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                </Stack>
                <Stack marginTop="20px" >

                  {
                    !isFeeing ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ height: "40px", marginRight: '20px' }}
                        onClick={setAdminFee}
                      >
                        Set Fee
                      </Button>
                    ) : (
                      <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={30}
                        width={30}
                      />
                    )
                  }

                </Stack>
              </Paper>
            )
          }

        </Box>
      </Container>
    </>
  );
}

export default AdminPresales;
