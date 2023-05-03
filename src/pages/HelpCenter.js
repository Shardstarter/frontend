import {Box, Grid, Typography} from '@mui/material';
import Page from 'components/Page'
import MHidden from 'components/@material-extend/MHidden'
import { imageURL } from '../utils';

export default function HelpCenter(props){
    const items = [
        {name : "Buying Mega Coin", href : "/Attachment/Buying MGV Tokens.docx"},
        {name : "Linking Wallet to Megacapital.io", href : "/Attachment/Linking Wallet to BullPerks.docx"},
        {name : "Are the allocations guaranteed?", href : "/Attachment/Are the allocations guaranteed.docx"},
        {name : "Why is my KYC taking so long?", href : "/Attachment/Why is my KYC taking so long.docx"},
        {name : "How to join", href : "/Attachment/Joining a deal.docx"},
        {name : "The megacapital.io platform", href : "/Attachment/The MegaCapital.io Platform.docx"},
        {name : "VC or IDO: What's the Difference?", href : "/Attachment/VC or IDO_ What’s the Difference.docx"},
        {name : "Completing KYC", href : "/Attachment/Why is my KYC taking so long.docx"},
        {name : "Buying MGV Tokens", href : "/Attachment/Buying MGV Tokens.docx"},
        {name : "Locking and Unlocking MGV", href : "/"},
        {name : "Creating a Solana Wallet", href : "/Attachment/Creating a Solana Wallet.docx"},
        {name : "Creating a Wallet", href : "/Attachment/Creating a Wallet.docx"},
        {name : "About TGE", href : "/Attachment/About TGE.docx"},
        {name : "Claiming Tokens", href : "/"},
        {name : "Setting up the Polygon Network", href : "/Attachment/Setting up the Polygon Network.docx"},
        {name : "Claiming Tokens", href : "/"},
        {name : "Glossary", href : "/Attachment/Glossary.docx"},
        {name : "Joining a deal", href : "/Attachment/Joining a deal.docx"},
        {name : "Adding the MGV Token", href : "/Attachment/Buying MGV Tokens.docx"},
        {name : "FAQ", href : "/Attachment/FAQ.docx"},
    ]
    return(
        <Page style={{backgroundColor:"#171819"}}>
            <MHidden width="mdDown">
            <Grid paddingLeft="12%" paddingRight="12%" paddingTop="70px">
                <Grid color="#56C5FF" fontSize="48px" display="flex" justifyContent="center">
                    HOW CAN WE HELP YOU?
                </Grid>
                <Grid marginTop="30px" fontSize="30px" display="flex" color="white" justifyContent="center">
                    Welcome to MegaCapital Help Center
                </Grid>
                <Grid marginTop="20px" display="flex" position="relative" justifyContent="center" borderRadius={7}>
                    <Box component="input" height="50px" display="flex" position="relative" style={{border:"none", backgroundColor:"#232323", width:"50%", color:"white"}} placeholder="Ask a question..." padding="15px">
                    </Box>
                    <Box component="button" position="absolute" right="25%" borderRadius={1} top="5px" border="none" paddingRight="20px" paddingLeft="20px" color="white" height="80%" backgroundColor="#56C5FF">Search</Box>
                </Grid>
                <Grid container marginTop="30px" spacing={2} justifyContent="center" direction="row">
                    <Grid item style={{color:"#56C5FF", fontSize:24}}>Popular:</Grid>
                    <Grid item><Box component="button" style={{borderRadius:5, color:"#56C5FF", border:"none", backgroundColor:"#232323", padding:"8px 23px 8px 23px"}}>Join a deal</Box></Grid>
                    <Grid item><Box component="button" style={{borderRadius:5, color:"#56C5FF", border:"none", backgroundColor:"#232323", padding:"8px 23px 8px 23px"}}>Registration</Box></Grid>
                    <Grid item><Box component="button" style={{borderRadius:5, color:"#56C5FF", border:"none", backgroundColor:"#232323", padding:"8px 23px 8px 23px"}}>Nft Pad</Box></Grid>
                </Grid>
                <Grid marginTop="30px" fontSize="34px" color="#56C5FF" display="flex" justifyContent="center">
                    Our Documentation
                </Grid>
                <Grid container marginTop="70px" spacing={1}>
                    {items.map(item => (
                        <Grid item sm="12" lg="3" md="4" container>
                            <Box component="img" src={imageURL('Help_Center.png')} />
                            <Box component="a" href={item.href} fontSize={14} color="white" style={{textDecoration:"none"}} marginLeft="10px">{item.name}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            </MHidden>
            <MHidden width="mdUp">
            <Grid paddingLeft="5%" paddingRight="5%" paddingTop="40px">
                <Grid color="#56C5FF" fontSize="20px" display="flex" justifyContent="center">
                    HOW CAN WE HELP YOU?
                </Grid>
                <Grid marginTop="30px" fontSize="16px" display="flex" color="white" justifyContent="center">
                    Welcome to MegaCapital Help Center
                </Grid>
                <Grid marginTop="20px" display="flex" position="relative" justifyContent="center" borderRadius={7}>
                    <Box component="input" height="50px" display="flex" position="relative" style={{border:"none", backgroundColor:"#232323", width:"90%", color:"white"}} placeholder="Ask a question..." padding="15px">
                    </Box>
                    <Box component="button" position="absolute" right="15px" borderRadius={1} top="5px" border="none" paddingRight="20px" paddingLeft="20px" color="white" height="80%" backgroundColor="#56C5FF">Search</Box>
                </Grid>
                <Grid container marginTop="30px" spacing={2} justifyContent="center" direction="row">
                    <Grid item xs={12} style={{color:"#56C5FF", fontSize:24}} justifyContent="center" display="flex">Popular:</Grid>
                    <Grid item><Box component="button" fontSize={12} style={{borderRadius:5, color:"#56C5FF", border:"none", backgroundColor:"#232323", padding:"10px 13px 10px 13px"}}>Join a deal</Box></Grid>
                    <Grid item><Box component="button" fontSize={12} style={{borderRadius:5, color:"#56C5FF", border:"none", backgroundColor:"#232323", padding:"10px 13px 10px 13px"}}>Registration</Box></Grid>
                    <Grid item><Box component="button" fontSize={12} style={{borderRadius:5, color:"#56C5FF", border:"none", backgroundColor:"#232323", padding:"10px 13px 10px 13px"}}>Nft Pad</Box></Grid>
                </Grid>
                <Grid marginTop="30px" fontSize="25px" color="#56C5FF" display="flex" justifyContent="center">
                    Our Documentation
                </Grid>
                <Grid container marginTop="30px" spacing={1}>
                    {items.map(item => (
                        <Grid item sm="12" lg="3" md="4" container>
                            <Box component="img" src={imageURL('Help_Center.png')} />
                            <Box component="a" href={item.href} fontSize={14} color="white" style={{textDecoration:"none"}} marginLeft="10px">{item.name}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            </MHidden>
        </Page>
    );
}