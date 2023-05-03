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


export default function PoolsCard(props) {
    return (
      // <Box borderRadius={1} border= '1px solid #232323' sx={{  p: '10px', marginBottom: '15px' }}>
      <Box borderRadius={1} sx={{  p: '10px', marginBottom: '15px' }} style={{backgroundColor:"#232323"}}>
        <Grid container spacing={2}>
          <Grid container item sm={6} direction="row">
            <Grid item sm = {4}>
              <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                <Box component="img" src="img/icon2.png" sx={{ width: '50px', marginRight: '10px' }} />
                <Typography fontFamily={'Segoe UI'} variant="h6" sx={{ marginTop: '10px' }} color="white">MGV</Typography>
              </Box>
            </Grid>
            {/* if(props.allocation == 1){ */}
            { props.allocation == 1 ?  <Grid item sm={8}><Box marginTop="5px" >
            
            <button className="btn mx-3 text-white" style={{backgroundColor:'#56C5FF'}}>Guaranteed allocation</button>
            </Box></Grid>
            :null
            }
            {/* } */}
          </Grid>
          <Grid item sm={1.5}>
              <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 14 }} color="white">Duration</Typography>
              <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                3 Months
              </Typography>
          </Grid>
          <Grid item sm={1.5}>
              <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 14 }} color="white">Staked</Typography>
              <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                6,000
              </Typography>
          </Grid>
          <Grid item sm={1.5}>
              <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 14 }} color="white">Bonus</Typography>
              <Typography fontFamily={'Segoe UI'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                45%
              </Typography>
          </Grid>
          <Grid item sm={1.5}>
            <Box sx={{ color: 'white', marginRight: '10px', width: '100%' }}><button className="btn text-light" style={{backgroundColor:'#56C5FF'}}>Discover</button></Box>
          </Grid>
        </Grid>
      </Box>
    );
  }