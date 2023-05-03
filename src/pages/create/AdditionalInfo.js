import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdditionalInfo } from '../../redux/slices/tokenListing';
import { useSnackbar } from 'notistack';
import { commify, formatEther } from '@ethersproject/units';
import { useIDOContract } from '../../hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { CURRENCY_SYMBOL } from 'config/constants';

import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import {
  CardActionArea,
  RadioGroup,
  Grid,
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  Button,
  FormControlLabel,
  InputAdornment,
  Radio
} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { DesktopDateTimePicker } from '@mui/lab';
import { ImImage, ImSphere, ImTwitter, ImGithub, ImTelegram } from 'react-icons/im';
import { IoLogoDiscord } from 'react-icons/io5';
// const DesktopDateTimePickerStyle = styled(DesktopDateTimePicker)(({ theme }) => ({
//   color: 'blue',
//   background: 'blue',
//   '& .MuiCalendarPicker-root': {
//     backgroundColor: 'red !important'
//   }
// }));
const AdditionalInfo = ({ goBack, goNext }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [poolFixedFees, setPoolFixedFees] = useState([]);
  const [tier, setTier] = useState('common');
  const idoContract = useIDOContract();

  const onChangeTier = (event) => {
    setTier(event.target.value);
  };
  useEffect(() => {
    let unmounted = false;
    (async () => {
      try {
        const poolFixedFee = [];
        for (let i = 0; i < 4; i++) poolFixedFee.push(await idoContract.poolFixedFee(i));
        if (!unmounted) setPoolFixedFees(poolFixedFee);
      } catch (err) { }
    })();
    return () => (unmounted = true);
  }, [idoContract]);
  const NewInfluencerSchema = Yup.object().shape({
    logo: Yup.string().url('Not a url').required('Logo is required'),
    website: Yup.string().url('Not a url'),
    // facebook: Yup.string().url("Not a url"),
    twitter: Yup.string().url('Not a url'),
    github: Yup.string().url('Not a url'),
    telegram: Yup.string().url('Not a url'),
    // instagram: Yup.string().url("Not a url"),
    discord: Yup.string().url('Not a url'),
    // reddit: Yup.string().url("Not a url"),
    description: Yup.string().required('Description is required'),
    roadmap_description: Yup.string(),
    roadmap_url: Yup.string().url('Not a url'),
    about_description: Yup.string(),
    about_url: Yup.string().url('Not a url'),
    features_description: Yup.string(),
    features_url: Yup.string().url('Not a url'),
    teams_description: Yup.string(),
    teams_url: Yup.string().url('Not a url'),
    tokenomics_description: Yup.string(),
    tokenomics_url: Yup.string().url('Not a url')
  });
  const category = useSelector((state) => state.tokenListing.category);
  const blockchain = useSelector((state) => state.tokenListing.blockchain);
  const tgi = useSelector((state) => state.tokenListing.tgi);
  const type = useSelector((state) => state.tokenListing.type);
  const poster = useSelector((state) => state.tokenListing.poster);
  const logo = useSelector((state) => state.tokenListing.logo);
  const website = useSelector((state) => state.tokenListing.website);
  // const facebook = useSelector((state) => state.tokenListing.facebook);
  const twitter = useSelector((state) => state.tokenListing.twitter);
  const github = useSelector((state) => state.tokenListing.github);
  const telegram = useSelector((state) => state.tokenListing.telegram);
  // const instagram = useSelector((state) => state.tokenListing.instagram);
  const discord = useSelector((state) => state.tokenListing.discord);
  // const tier = useSelector((state) => state.tokenListing.tier);
  // const reddit = useSelector((state) => state.tokenListing.reddit);
  const description = useSelector((state) => state.tokenListing.description);
  const roadmap_description = useSelector((state) => state.tokenListing.roadmap_description);
  const roadmap_url = useSelector((state) => state.tokenListing.roadmap_url);
  const about_description = useSelector((state) => state.tokenListing.about_description);
  const about_url = useSelector((state) => state.tokenListing.about_url);
  const features_description = useSelector((state) => state.tokenListing.features_description);
  const features_url = useSelector((state) => state.tokenListing.features_url);
  const teams_description = useSelector((state) => state.tokenListing.teams_description);
  const teams_url = useSelector((state) => state.tokenListing.teams_url);
  const tokenomics_description = useSelector((state) => state.tokenListing.tokenomics_description);
  const tokenomics_url = useSelector((state) => state.tokenListing.tokenomics_url);
  const twitter_followers = useSelector((state) => state.tokenListing.twitter_followers);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      logo,
      poster,
      category,
      blockchain,
      tgi,
      type,
      website,
      // facebook,
      twitter,
      github,
      telegram,
      // instagram,
      discord,
      // reddit,
      description,
      roadmap_description,
      roadmap_url,
      about_description,
      about_url,

      features_description,
      features_url,

      teams_description,
      teams_url,
      tokenomics_description,
      tokenomics_url,
      tier,
      twitter_followers
    },
    validationSchema: NewInfluencerSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log(values);
        dispatch(setAdditionalInfo({ ...values }));
        resetForm();
        goNext();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Oops, Something went wrong!', {
          variant: 'error'
        });
        setSubmitting(false);
      }
    }
  });
  const { account, chainId } = useActiveWeb3React();

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Paper
          sx={{
            p: '20px 30px',
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(6px)'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                {...getFieldProps('category')}
                error={Boolean(touched.category && errors.category)}
                helperText={touched.category && errors.category}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Blockchain"
                {...getFieldProps('blockchain')}
                error={Boolean(touched.blockchain && errors.blockchain)}
                helperText={touched.blockchain && errors.blockchain}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="TGI"
                {...getFieldProps('tgi')}
                error={Boolean(touched.tgi && errors.tgi)}
                helperText={touched.tgi && errors.tgi}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Type"
                {...getFieldProps('type')}
                error={Boolean(touched.type && errors.type)}
                helperText={touched.type && errors.type}
                sx={{
                  width: 1
                }}
              />
            </Grid>

            {/* Links */}
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Poster URL"
                placeholder="Ex: https://..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <ImImage />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('poster')}
                error={Boolean(touched.poster && errors.poster)}
                helperText={touched.poster && errors.poster}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Logo URL"
                placeholder="Ex: https://..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <ImImage />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('logo')}
                error={Boolean(touched.logo && errors.logo)}
                helperText={touched.logo && errors.logo}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                placeholder="Ex: https://..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <ImSphere />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('website')}
                error={Boolean(touched.website && errors.website)}
                helperText={touched.website && errors.website}
                sx={{
                  width: 1
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Twitter"
                placeholder="Ex: https://twitter.com/..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <ImTwitter />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('twitter')}
                error={Boolean(touched.twitter && errors.twitter)}
                helperText={touched.twitter && errors.twitter}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Github"
                placeholder="Ex: https://github.com/..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <ImGithub />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('github')}
                error={Boolean(touched.github && errors.github)}
                helperText={touched.github && errors.github}
                sx={{
                  width: 1
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Telegram"
                placeholder="Ex: https://t.me/..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <ImTelegram />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('telegram')}
                error={Boolean(touched.telegram && errors.telegram)}
                helperText={touched.telegram && errors.telegram}
                sx={{
                  width: 1
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Discord"
                placeholder="Ex: https://t.me/..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <IoLogoDiscord />
                    </InputAdornment>
                  )
                }}
                {...getFieldProps('discord')}
                error={Boolean(touched.discord && errors.discord)}
                helperText={touched.discord && errors.discord}
                sx={{
                  width: 1
                }}
              />
            </Grid>



            <Grid item xs={12} md={12}>
              <Box component="h4">Roadmap</Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} gap={2} display="flex">
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Roadmap Description"
                  placeholder="some text here"
                  {...getFieldProps('roadmap_description')}
                  error={Boolean(touched.description && errors.roadmap_description)}
                  helperText={touched.description && errors.roadmap_description}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Roadmap URl"
                  placeholder="Ex: https://t.me/..."
                  {...getFieldProps('roadmap_url')}
                  error={Boolean(touched.roadmap_url && errors.roadmap_url)}
                  helperText={touched.roadmap_url && errors.roadmap_url}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box component="h4">About</Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} gap={2} display="flex">
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="About Description"
                  placeholder="some text here"
                  {...getFieldProps('about_description')}
                  error={Boolean(touched.about_description && errors.about_description)}
                  helperText={touched.about_description && errors.about_description}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="About URl"
                  placeholder="Ex: https://t.me/..."
                  {...getFieldProps('about_url')}
                  error={Boolean(touched.about_url && errors.about_url)}
                  helperText={touched.about_url && errors.about_url}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box component="h4">Features</Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} gap={2} display="flex">
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Features Description"
                  placeholder="some text here"
                  {...getFieldProps('features_description')}
                  error={Boolean(touched.features_description && errors.features_description)}
                  helperText={touched.features_description && errors.features_description}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Features URl"
                  placeholder="Ex: https://t.me/..."
                  {...getFieldProps('features_url')}
                  error={Boolean(touched.features_url && errors.features_url)}
                  helperText={touched.features_url && errors.features_url}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box component="h4">Teams</Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} gap={2} display="flex">
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Teams Description"
                  placeholder="some text here"
                  {...getFieldProps('teams_description')}
                  error={Boolean(touched.teams_description && errors.teams_description)}
                  helperText={touched.teams_description && errors.teams_description}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Teams URl"
                  placeholder="Ex: https://t.me/..."
                  {...getFieldProps('teams_url')}
                  error={Boolean(touched.teams_url && errors.teams_url)}
                  helperText={touched.teams_url && errors.teams_url}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box component="h4">Tokenomics</Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} gap={2} display="flex">
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Tokenomics Description"
                  placeholder="some text here"
                  {...getFieldProps('tokenomics_description')}
                  error={Boolean(touched.tokenomics_description && errors.tokenomics_description)}
                  helperText={touched.tokenomics_description && errors.tokenomics_description}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  label="Tokenomics URl"
                  placeholder="Ex: https://t.me/..."
                  {...getFieldProps('tokenomics_url')}
                  error={Boolean(touched.tokenomics_url && errors.tokenomics_url)}
                  helperText={touched.tokenomics_url && errors.tokenomics_url}
                  sx={{
                    width: 1
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Description"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                sx={{
                  width: 1
                }}
                multiline
                minRows={3}
                maxRows={6}
              />
            </Grid>
          </Grid>

          {
            'remove tier' == 'in this version' &&
            <>
              <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                <Stack component="span" fontSize="1.2rem">
                  Select Tier:
                </Stack>
                <RadioGroup value={tier} onChange={onChangeTier}>
                  <Grid container spacing={3} sx={{ px: 2 }}>
                    <Grid item md={3} xs={6}>
                      <Stack alignItems="center" sx={{ cursor: 'pointer' }}>
                        <Typography variant="h5">COMMON</Typography>
                        <CardActionArea>
                          <Paper
                            sx={{ width: 1, p: 2, border: `4px solid ${tier === 'common' ? '#e5e5e5' : 'transparent'}` }}
                          >
                            <Box>
                              <Stack alignItems="center" justifyContent="center" sx={{ height: 300 }}>
                                <Typography align="center" variant="h4">
                                  COMMON TIER WITHOUT ANY SPECIAL PERKS
                                </Typography>
                              </Stack>
                              <Typography align="center" variant="h5">
                                FEE: {poolFixedFees[0] ? commify(formatEther(poolFixedFees[0])) : 0}
                                {CURRENCY_SYMBOL[chainId]}
                              </Typography>
                            </Box>
                          </Paper>
                          <FormControlLabel
                            label=""
                            value="common"
                            control={<Radio sx={{ display: 'none' }} />}
                            sx={{
                              top: 0,
                              margin: 0,
                              width: '100%',
                              height: '100%',
                              position: 'absolute'
                            }}
                          />
                        </CardActionArea>
                      </Stack>
                    </Grid>

                    <Grid item md={3} xs={6}>
                      <Stack alignItems="center" sx={{ cursor: 'pointer' }}>
                        <Typography variant="h5">GOLD</Typography>
                        <CardActionArea>
                          <Paper
                            sx={{ width: 1, p: 2, border: `4px solid ${tier === 'gold' ? '#fcd316' : 'transparent'}` }}
                          >
                            <Stack alignItems="center" justifyContent="center" sx={{ height: 300 }}>
                              <Typography align="center" variant="h4">
                                - GOLD BORDER
                              </Typography>
                              <Typography align="center" variant="h4">
                                - AUDIT OPTION
                              </Typography>
                              <Typography align="center" variant="h4">
                                - KYC OPTION
                              </Typography>
                            </Stack>
                            <Typography align="center" variant="h5">
                              FEE: {poolFixedFees[1] ? commify(formatEther(poolFixedFees[1])) : 0}
                              {CURRENCY_SYMBOL[chainId]}
                            </Typography>
                          </Paper>
                          <FormControlLabel
                            label=""
                            value="gold"
                            control={<Radio sx={{ display: 'none' }} />}
                            sx={{
                              top: 0,
                              margin: 0,
                              width: '100%',
                              height: '100%',
                              position: 'absolute'
                            }}
                          />
                        </CardActionArea>
                      </Stack>
                    </Grid>

                    <Grid item md={3} xs={6}>
                      <Stack alignItems="center">
                        <Typography variant="h5">PLATINUM</Typography>
                        <CardActionArea>
                          <Paper
                            sx={{ width: 1, p: 2, border: `4px solid ${tier === 'platinum' ? '#49f0ff' : 'transparent'}` }}
                          >
                            <Stack alignItems="center" justifyContent="center" sx={{ height: 300 }}>
                              <Typography align="center" variant="h4">
                                - PLATINUM BORDER
                              </Typography>
                              <Typography align="center" variant="h4">
                                - KYC INCLUDED
                              </Typography>
                              <Typography align="center" variant="h4">
                                - GEMPAD AMA INCLUDED
                              </Typography>
                              <Typography align="center" variant="h4">
                                - AUDIT OPTION
                              </Typography>
                              <Typography align="center" variant="h4">
                                & MORE
                              </Typography>
                            </Stack>
                            <Typography align="center" variant="h5">
                              FEE: CONTACT US
                            </Typography>
                          </Paper>
                          <FormControlLabel
                            label=""
                            value="platinum"
                            control={<Radio sx={{ display: 'none' }} />}
                            sx={{
                              top: 0,
                              margin: 0,
                              width: '100%',
                              height: '100%',
                              position: 'absolute'
                            }}
                          />
                        </CardActionArea>
                      </Stack>
                    </Grid>

                    <Grid item md={3} xs={6}>
                      <Stack alignItems="center">
                        <Typography variant="h5">DIAMOND</Typography>
                        <CardActionArea>
                          <Paper
                            sx={{ width: 1, p: 2, border: `4px solid ${tier === 'diamond' ? '#ab4bff' : 'transparent'}` }}
                          >
                            <Stack alignItems="center" justifyContent="center" sx={{ height: 300 }}>
                              <Typography align="center" variant="h4">
                                - DIAMOND BORDER
                              </Typography>
                              <Typography align="center" variant="h4">
                                - KYC INCLUDED
                              </Typography>
                              <Typography align="center" variant="h4">
                                - GEMPAD AMA INCLUDED
                              </Typography>
                              <Typography align="center" variant="h4">
                                - CHEAP AUDIT RATE
                              </Typography>
                              <Typography align="center" variant="h4">
                                - CMC & CG LISTING
                              </Typography>
                              <Typography align="center" variant="h4">
                                - CALLS BY PARTNERS
                              </Typography>
                              <Typography align="center" variant="h4">
                                & MORE!
                              </Typography>
                            </Stack>
                            <Typography align="center" variant="h5">
                              FEE: CONTACT US
                            </Typography>
                          </Paper>
                          <FormControlLabel
                            label=""
                            value="diamond"
                            control={<Radio sx={{ display: 'none' }} />}
                            sx={{
                              top: 0,
                              margin: 0,
                              width: '100%',
                              height: '100%',
                              position: 'absolute'
                            }}
                          />
                        </CardActionArea>
                      </Stack>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Stack>
              {(formik.values.tier === 'platinum' || formik.values.tier === 'diamond') && (
                <Typography align="center">
                  Make sure to contact us to apply for this tier with all it's benefits
                </Typography>
              )}
            </>
          }

          <Stack direction="row" justifyContent="center">
            <Button variant="outlined" color="secondary" style={{ marginTop: 20 }} onClick={goBack}>
              Back
            </Button>
            <Button variant="contained" color="secondary" style={{ marginTop: 20, marginLeft: 4 }} type="submit">
              Next
            </Button>
          </Stack>
        </Paper>
      </form>
    </FormikProvider>
  );
};
export default AdditionalInfo;
