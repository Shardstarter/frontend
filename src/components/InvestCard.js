import { Box, Grid } from '@mui/material';
export default function InvestCardP(props) {
  return (
    <>
      <Grid item sm={2}>
        <Box bgcolor={'#232323'} borderRadius={1} padding={'10px'}>
          <Box component="img" src="logo.png" sx={{ width: '50%', marginTop: '10px' }} />
          <Box component="h6" fontFamily={'Segoe UI'} color="white">
            {props.name}
          </Box>
          <Box component="h6" fontFamily={'Segoe UI'} marginTop="10px" color="white">
            TBA
            <br />
            ..MGV
          </Box>
          <Box component="h5" fontFamily={'Segoe UI'} marginTop="5px" color="white" fontSize={16}>
            Allocations X{props.num}
          </Box>
          <Box bgcolor="#3B3B3B" style={{ borderRadius: 5 }} color="white">
            {props.bname}
          </Box>
          {/* <Typography bgcolor="#3B3B3B" style={{borderRadius:10}}><Box>{props.bname}</Box></Typography> */}
          <Box sx={{ fontSize: 14 }} fontFamily={'Segoe UI'} color="text.secondary" gutterBottom marginTop="5px">
            {props.fname}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
