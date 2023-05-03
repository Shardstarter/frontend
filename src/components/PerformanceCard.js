import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    Fade,
    useScrollTrigger,
} from '@mui/material';

import { isValidImage} from '../utils'

export default function PerfofomanceCard(props) {
  const { name, ipfs, presaleRate, weiRaised } = props;

    return (
      // <Card style={{border:'1px solid #56C5FF', borderRadius:1}}>
      //   <CardContent style={{ p: '1px', backgroundColor:'#272727', padding:'10px'}}>
      <Box border='1px solid #56C5FF' borderRadius={1} padding="13px" backgroundColor='#272727' style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
        <Grid container direction="row">
          <Grid item sm={8.5}>
            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
              <Box component="img" src={isValidImage(ipfs?.logo)} sx={{ width: '50px', marginRight: '10px' }} />
              <Box fontFamily={'Arial'} marginTop="15px" sx={{ fontSize: 14}} color="white">{name}</Box>
            </Box>
          </Grid>
          <Grid item sm={1} sx={{ marginRight: '10px' }}>
            <Typography fontFamily={'Arial'} sx={{ fontSize: 14}} color="white">Total Raise</Typography>
            <Typography fontFamily={'Arial'} sx={{ fontSize: 14, color:"#00BFFF" }} gutterBottom>
              ETH {weiRaised}
            </Typography>
          </Grid>
          <Grid item sm={1} sx={{ marginRight: '10px' }}>
            <Typography fontFamily={'Arial'} sx={{ fontSize: 14}} color="white">Token Price</Typography>
            <Typography fontFamily={'Arial'} sx={{ fontSize: 14, color:"#00BFFF" }} gutterBottom>
              ETH {presaleRate}
            </Typography>
          </Grid>
          <Grid item sm={1} sx={{ marginRight: '10px' }}>
            <Typography fontFamily={'Arial'} sx={{ fontSize: 14}} color="white">ROI(ATH)</Typography>
            <Typography fontFamily={'Arial'} sx={{ fontSize: 14, color:"#13BF00" }} gutterBottom>
              71.00x
            </Typography>
          </Grid>
        </Grid>
        </Box>
    );
  }