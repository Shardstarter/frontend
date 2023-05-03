import {Box} from '@mui/material'
export default function ViewAllPools(props){
    return(
        <Box component="a" style={{textDecoration:"none", color:'white'}} href={props.to}>{props.title}</Box>
    );
}