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
import MHidden from 'components/@material-extend/MHidden'
import formatDate from '../utils/formattedDate';
import { Link, useNavigate } from 'react-router-dom';
import { imageURL, isValidImage } from '../utils';

export default function ProjectName(props) {
  const {startDateTime, whitelistable, name,  address, ipfs} = props;
  const navigate = useNavigate()

  const tag = whitelistable ? 'VC' : 'IDO';

  // console.log(props);

  return (
    <>
      <MHidden width="mdDown">
        <Box style={{backgroundColor:'#232323', textDecoration:"none"}} borderRadius={1.5} position="relative" marginLeft="5px">
            <Box>
                <Box display="flex" position="relative" component="img" src={isValidImage(ipfs?.logo)} width="100%" height="170px"/>
                <Box position="absolute" top="3%" left="3%" borderRadius={0.5} color="white" bgcolor="#56c5ff" fontSize="12px" padding="5px">{new Date(startDateTime).toLocaleDateString()}</Box>
                <Box position="absolute" top="3%" right="3%" borderRadius={0.5} color="white" bgcolor="#56c5ff" fontSize="12px" padding="5px">{tag} Deals</Box>
            </Box>
            <Box paddingLeft={'13%'} paddingRight={'13%'} paddingBottom="12%" justifyContent="center">
              <Typography marginTop="15px" align="center" variant="body2" fontSize="20px" fontFamily={'Segoe UI'} color="#24B6E6">
                {name}
              </Typography>
              {/*<Typography variant="body2" align="center" fontSize="13px" color="white"  fontFamily={'Segoe UI'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>*/}
              <Typography variant="body2" align="center" fontSize="16px"  fontFamily={'Segoe UI'} marginTop="15px" color="#56C5FF">
                <Link style={{color:"#56C5FF"}} to={`/project/${address}`}>learn more</Link>
                {/*<a href="/project" style={{color:"#56C5FF"}}>learn more</a><br/>*/}
                {/* <i className="fa-solid fa-arrow-right text-info"></i> */}
              </Typography>
              <Typography display="flex" justifyContent="center" sx={{ cursor: 'pointer' }} onClick={()=>navigate(`/project/${address}`)}>
                <Box component="img" width="70px" height="70px" src={imageURL('Ellipse.png')} />
              </Typography>
            </Box>
        </Box>
      </MHidden>
      <MHidden width="mdUp">
        <Grid style={{backgroundColor:'#232323', textDecoration:"none"}} borderRadius={1.5} position="relative" marginLeft="40px" marginBottom="30px">
            <Grid container item xs={12} justifyContent="left" display="flex">
              <Grid item xs={6} paddingLeft="10px">
                <Box marginTop="10px" borderRadius={0.5} color="white" bgcolor="#56c5ff" width="75px" fontSize="12px" padding="5px">22/06/2022</Box>
              </Grid>
              <Grid item xs={6} justifyContent="right" display="flex" paddingRight="10px">
                <Box marginTop="10px" borderRadius={0.5} color="white" bgcolor="#56c5ff" width="65px" fontSize="12px" padding="5px">NFT Deals</Box>
              </Grid>
            </Grid>
            <Box padding="0 100px">
              <Box component="img" src={imageURL('Union.png')}  width="100px" height="100px"
              padding="10px" borderRadius="50%" boxShadow="inset 0px 0px 3.48792px #FFFFFF" border="none" backgroundColor="#232323"/>
            </Box>
            <Box paddingLeft={'13%'} paddingRight={'13%'} paddingBottom="12%" justifyContent="center">
              <Typography marginTop="15px" align="center" variant="body2" fontSize="20px" fontFamily={'Segoe UI'} color="#24B6E6">
              Project Name
              </Typography>
              <Typography variant="body2" align="center" fontSize="13px" color="white"  fontFamily={'Segoe UI'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography variant="body2" align="center" fontSize="16px"  fontFamily={'Segoe UI'} marginTop="15px" color="#56C5FF">
                <a href="/project" style={{color:"#56C5FF"}}>learn more</a><br/>
                {/* <i className="fa-solid fa-arrow-right text-info"></i> */}
              </Typography>
              <Typography display="flex" justifyContent="center" padding="0 80px">
                <Box component="img" width="70px" height="70px"  src={imageURL('Ellipse.png')} />
              </Typography>
            </Box>
        </Grid>
      </MHidden>
    </>
  );
}