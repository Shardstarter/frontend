import {
    Box,
    Grid,
  } from '@mui/material';
import { isValidImage } from '../utils';
export default function MyProjectCard(props){
    const { privacy, tag, name, ipfs, participantsAddresses, poster } = props;

    // console.log(props);

    return(
        <>
        <Grid container borderRadius={1} direction="row" bgcolor={"#232323"} padding="15px" marginTop="20px" display="flex" >
            <Grid item md="1" mx={1}>
                <Box component="img" src={isValidImage(poster)} ></Box>
            </Grid>
            <Grid item container md={1.5} align="center" justifyContent="center" spacing={1} direction="column">
                <Grid item><Box padding="4px 5px 4px 5px" style={{backgroundColor:"rgba(255, 255, 255, 0.1)"}} color="white">{privacy}</Box></Grid>
                <Grid item color="white">{name} {tag}</Grid>
            </Grid>
            <Grid item container md={1.5} align="center" justifyContent="center" mt={3}>
                <Grid item><Box color="#56C5FF">CLAIMABLE</Box></Grid>
            </Grid>
            <Grid item container md={2} align="center" justifyContent="center" spacing={1} direction="column">
                <Grid item><Box color="white">Total Raise</Box></Grid>
                <Grid item color="white">$2000</Grid>
            </Grid>
            <Grid item container md={2} align="center" justifyContent="center" spacing={1} direction="column">
                <Grid item><Box color="white">Participants</Box></Grid>
                <Grid item color="white">{participantsAddresses?.length}</Grid>
            </Grid>
            <Grid item container md={2} align="center" justifyContent="center" spacing={1} direction="column">
                <Grid item><Box color="white">Current Price</Box></Grid>
                <Grid item color="white">Updating...</Grid>
            </Grid>
            <Grid item container md={1.5} align="center" justifyContent="center" spacing={1} direction="column">
                <Grid item><Box color="white">ATH IDO ROI USD</Box></Grid>
                <Grid item color="white">Updating...</Grid>
            </Grid>
        </Grid>
        </>
    );
}