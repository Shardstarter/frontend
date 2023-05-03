
import {
    Box,
    Grid,
} from '@mui/material';
import { imageURL } from '../utils';
export default function InvestCard(props) {
  
    return (
      <>
      <Grid container item xs={12} backgroundColor="#232323" marginBottom="10px" borderRadius={1} paddingRight="10px">
        <Grid item xs={4} color="#F4FCFF" fontSize={14} alignItems="center"> IDO, Nft</Grid>
        <Grid item xs={4} color="white" alignItems="center"> <Box component="img"  src={imageURL('logo.png')} width="30%" height="70%"/></Grid>
        <Grid item xs={4} color="white" alignItems="center" justifyContent="right" display="flex" fontSize={14}> <Box backgroundColor="#303030" borderRadius={0.5} width="80%">FCFS</Box></Grid>
        <Grid item xs={4} color="white" alignItems="center" fontSize={15}> ...MGV</Grid>
        <Grid item xs={4} color="white" alignItems="center"  fontSize={16}> {props.name}</Grid>
        <Grid item xs={4} color="white" alignItems="center"  justifyContent="right" display="flex" fontSize={14}> Allocation X {props.num}</Grid>
      </Grid>
      </>
    );
  }