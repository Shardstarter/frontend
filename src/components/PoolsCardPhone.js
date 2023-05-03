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


export default function PoolsCardPhone(props) {
    const {pool} = props;

    if(!props.hasOwnProperty('pool')) return <></>

    const {tokenName} = pool;


    return (
      <Box borderRadius={1} sx={{  p: '10px', marginBottom: '15px' }} border="1px solid #56C5FF" style={{backgroundColor:"#232323"}}>
        <Grid container spacing={2}>
            <Grid item xs = {4.5}>
              <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                <Box component="img" src="img/icon2.png" sx={{ width: '50px', marginRight: '5px' }} />
                <Box component="a" href="/stakepad" padding="2px" borderRadius={0.5} style={{textDecoration:"none", fontSize:12, border:"none", minWidth:"50px", height:"50%", marginTop:"15px", color: 'white', backgroundColor:'#56C5FF', paddingLeft: '5px'}}>{tokenName}</Box>
              </Box>
            </Grid>
            <Grid item xs={3.5}>
                <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 12 }} color="white">Duration</Typography>
                <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 16 }} color="#56C5FF" gutterBottom>
                    3 Months
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 12 }} color="white">Staked</Typography>
                <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 16 }} color="#3DD598" gutterBottom>
                    6,000
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 12 }} color="white">Bonus</Typography>
                <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 16 }} color="#56C5FF" gutterBottom>
                    45%
                </Typography>
            </Grid>
        </Grid>
      </Box>
    );
  }