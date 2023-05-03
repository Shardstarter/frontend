import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent
} from '@mui/material';
import { useState } from "react"
import { imageURL } from '../utils';
export default function PhoneProjectCard(props) {
    const [cur_dir, setDirection] = useState(props.angle);
    return (
        <>
            <Grid container borderRadius={1} direction="row" bgcolor={"#232323"} padding="15px" marginTop="20px" display="flex" >
                <Grid item xs={2}>
                    <Box component="img" src={imageURL('geni-logo.png')}></Box>
                </Grid>
                <Grid container align="center" justifyContent="center" spacing={1} direction="column" paddingLeft="10px">
                    <Grid item><Box padding="4px 5px 4px 5px" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} color="white">PUBLIC</Box></Grid>
                    <Grid item color="white" fontSize={12}>GemUni IDO</Grid>
                </Grid>
                <Grid container align="center" justifyContent="center">
                    <Grid item><Box color="#56C5FF">CLAIMABLE</Box></Grid>
                </Grid>
                {cur_dir === "up" ? <>
                    <Grid item xs={2} padding="20px 0px 0px 20px">
                        <Box component="button" onClick={() => setDirection("down")} backgroundColor="rgb(255,255,255,0)" border="none">
                            <Box component="img" src={imageURL('angle_up.png')}></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7} color="white" marginTop="15px">Total Raise</Grid>
                    <Grid item xs={5} color="white" marginTop="15px">$2000</Grid>
                    <Grid item xs={7} color="white" marginTop="15px">Participants</Grid>
                    <Grid item xs={5} color="white" marginTop="15px">2805</Grid>
                    <Grid item xs={7} color="white" marginTop="15px">Current Price</Grid>
                    <Grid item xs={5} color="white" marginTop="15px">Updating...</Grid>
                    <Grid item xs={7} color="white" marginTop="15px">ATH IDO ROI USD</Grid>
                    <Grid item xs={5} color="white" marginTop="15px">Updating...</Grid>
                </> :
                    <Grid item xs={2} padding="20px 0px 0px 20px">
                        <Box component="button" onClick={() => setDirection("up")} backgroundColor="rgb(255,255,255,0)" border="none">
                            <Box component="img" src={imageURL('angle_down.png')} ></Box>
                        </Box>
                    </Grid>
                }
            </Grid>
        </>
    );
}