import * as React from 'react';
// import PropTypes from 'prop-types';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
// import AdditionalInfo from '../create/AdditionalInfo';
import * as Yup from 'yup';
import { useFormik, 
  // Form, FormikProvider 
} from 'formik';
import {
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
  InputAdornment
} from '@mui/material';
// import axios from '../../utils/axios';
// import { styled } from '@mui/material/styles';
// import { DesktopDateTimePicker } from '@mui/lab';
import { ImImage, ImSphere, ImFacebook, ImTwitter, ImGithub, ImTelegram, ImInstagram } from 'react-icons/im';
import { IoLogoDiscord, IoLogoReddit } from 'react-icons/io5';
import Scrollbar from 'components/Scrollbar';
export default function UpdateDialog(props) {
  const { onClose, ipfs, open } = props;
  const handleCancel = () => {
    onClose(false);
  };

  const NewInfluencerSchema = Yup.object().shape({
    logo: Yup.string().url('Not a url').required('Logo is required'),
    website: Yup.string().url('Not a url'),
    facebook: Yup.string().url('Not a url'),
    twitter: Yup.string().url('Not a url'),
    github: Yup.string().url('Not a url'),
    telegram: Yup.string().url('Not a url'),
    instagram: Yup.string().url('Not a url'),
    discord: Yup.string().url('Not a url'),
    reddit: Yup.string().url('Not a url'),
    description: Yup.string().required('Description is required')
  });
  const logo = ipfs?.logo ? ipfs?.logo : '';
  const website = ipfs?.website ? ipfs?.website : '';
  const facebook = ipfs?.facebook ? ipfs?.facebook : '';
  const twitter = ipfs?.twitter ? ipfs?.twitter : '';
  const github = ipfs?.github ? ipfs?.github : '';
  const telegram = ipfs?.telegram ? ipfs?.telegram : '';
  const instagram = ipfs?.instagram ? ipfs?.instagram : '';
  const discord = ipfs?.discord ? ipfs?.discord : '';
  const reddit = ipfs?.reddit ? ipfs?.reddit : '';
  const description = ipfs?.description ? ipfs?.description : '';

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      logo,
      website,
      facebook,
      twitter,
      github,
      telegram,
      instagram,
      discord,
      reddit,
      description
    },
    validationSchema: NewInfluencerSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      onClose(values);
    }
  });

  // const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', color: 'black' } }} maxWidth="xs" open={open}>
      <Stack sx={{ px: 2 }}>
        <DialogTitle>
          <Typography color="text.primary">Update the Additional Information</Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 460 }}>
          <Scrollbar>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Logo URL"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImImage />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('logo')}
                    error={Boolean(touched.logo && errors.logo)}
                    helperText={touched.logo && errors.logo}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Website"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImSphere />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('website')}
                    error={Boolean(touched.website && errors.website)}
                    helperText={touched.website && errors.website}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImFacebook />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('facebook')}
                    error={Boolean(touched.facebook && errors.facebook)}
                    helperText={touched.facebook && errors.facebook}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImTwitter />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('twitter')}
                    error={Boolean(touched.twitter && errors.twitter)}
                    helperText={touched.twitter && errors.twitter}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Github"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImGithub />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('github')}
                    error={Boolean(touched.github && errors.github)}
                    helperText={touched.github && errors.github}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Telegram"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImTelegram />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('telegram')}
                    error={Boolean(touched.telegram && errors.telegram)}
                    helperText={touched.telegram && errors.telegram}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImInstagram />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('instagram')}
                    error={Boolean(touched.instagram && errors.instagram)}
                    helperText={touched.instagram && errors.instagram}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Discord"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IoLogoDiscord />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('discord')}
                    error={Boolean(touched.discord && errors.discord)}
                    helperText={touched.discord && errors.discord}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Reddit"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IoLogoReddit />
                        </InputAdornment>
                      )
                    }}
                    {...getFieldProps('reddit')}
                    error={Boolean(touched.reddit && errors.reddit)}
                    helperText={touched.reddit && errors.reddit}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{
                      width: 1,
                      '& .MuiInput-input': {
                        color: 'black'
                      }
                    }}
                    variant="standard"
                    multiline
                    minRows={3}
                    maxRows={6}
                  />
                </Grid>
              </Grid>
            </form>
          </Scrollbar>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="error" variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
