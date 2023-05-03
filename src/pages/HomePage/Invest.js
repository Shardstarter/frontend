import { Box, Typography, Grid } from '@mui/material';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import InvestCard from 'components/InvestCard';
import InvestCardP from 'components/InvestCardP';
import { MHidden } from '../../components/@material-extend';
import { imageURL } from '../../utils';

gsap.registerPlugin(ScrollTrigger);
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0, display: 'none' },
  entered: { opacity: 1, display: 'block' },
  exited: { opacity: 0, display: 'none' }
};
export default function Invest() {
  const font_Family =
    'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component="img" src={imageURL('h-1.png')} />
      </Box>
      <Box sx={{ marginBottom: '60px' }}>
        <Typography align="center">
          <Box
            data-aos="zoom-in"
            fontFamily={font_Family}
            sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}
          >
            <MHidden width="mdDown">
              <h1
                className="text-mute text-center fw-bold position-absolute start-50 translate-middle"
                style={{ fontSize: 120, top: '30px', left: '50%', color: '#232323', fontFamily: { font_Family } }}
              >
                INVEST
              </h1>
            </MHidden>
            <h2
              className="text-light text-center position-absolute start-50 translate-middle-x"
              style={{ top: '13px', fontFamily: { font_Family } }}
            >
              How to Invest
            </h2>
          </Box>
          <MHidden width="mdDown">
            <Box
              component="p"
              fontFamily={font_Family}
              marginTop="120px"
              style={{ marginBottom: '10px', color: 'white', fontSize: '0.8rem' }}
            >
              Buy & Stake $MGV Tokens to gain exclusive access to Private VC Deals, Public Rounds and mint NFTs
            </Box>
          </MHidden>
          <MHidden width="mdUp">
            <Box
              padding="0 0"
              fontFamily={font_Family}
              fontSize={14}
              marginTop="60px"
              style={{ marginBottom: '10px', color: 'white', textTransform: 'lowercase' }}
            >
              Buy & Stake $MGV Tokens to gain exclusive access to Private VC Deals, Public Rounds and mint NFTs
            </Box>
          </MHidden>
        </Typography>
        <MHidden width="mdDown">
          <Grid marginTop="10px" container spacing={1} align="center" sx={{ paddingLeft: '14%', paddingRight: '14%' }}>
            <InvestCard name="Alpha" num="1" fname="IDO, NFT" bname="FCFS" />
            <InvestCard name="Beta" num="2" fname="IDO, NFT" bname="FCFS" />
            <InvestCard name="Gamma" num="4" fname="IDO, NFT" bname="FCFS" />
            <InvestCard name="Delta" num="8" fname="VC.IDO.NFT" bname="Earlier Access" />
            <InvestCard name="Epilson" num="16" fname="VC.IDO.NFT" bname="Earlier Access" />
            <InvestCard name="Zeta" num="32" fname="VC.IDO.NFT" bname="Earlier Access" />
          </Grid>
        </MHidden>
        <MHidden width="mdUp">
          <Grid marginTop="10px" container spacing={1} align="center" sx={{ paddingLeft: '5%', paddingRight: '5%' }}>
            <InvestCardP name="Alpha" num="1" fname="IDO, NFT" bname="FCFS" />
            <InvestCardP name="Beta" num="2" fname="IDO, NFT" bname="FCFS" />
            <InvestCardP name="Gamma" num="4" fname="IDO, NFT" bname="FCFS" />
            <InvestCardP name="Delta" num="8" fname="VC.IDO.NFT" bname="Earlier Access" />
            <InvestCardP name="Epilson" num="16" fname="VC.IDO.NFT" bname="Earlier Access" />
            <InvestCardP name="Zeta" num="32" fname="VC.IDO.NFT" bname="Earlier Access" />
          </Grid>
        </MHidden>
      </Box>
      {/* <Box data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0"  sx={{marginTop: '30px', marginBottom: '60px', }} fontFamily={'Segoe UI'}> */}
      <Box sx={{ marginBottom: '60px' }}>
        <Grid container spacing={2}>
          <MHidden width="mdUp">
            <Grid item xs={12}>
              <Box component="h3" fontFamily={'Segoe UI'} marginBottom="30px" paddingLeft="8%" paddingRight="8%">
                <Box
                  component="span"
                  textAlign="center"
                  sx={{ color: '#56C5FF', borderBottom: '2px solid #56C5FF' }}
                  paddingBottom="20px"
                >
                   {process.env.REACT_APP_PROJECT_NAME}’s Project Insurance Fund
                </Box>
              </Box>
              <Box padding="0 8%" textAlign="center">
                <Box component="span" style={{ color: '#56C5FF', marginTop: '40px', fontSize: 12 }}>
                  To ensure the safety & growth of its Community & Investors,  {process.env.REACT_APP_PROJECT_NAME} offers Project Insurance
                  Protection Fund
                </Box>
              </Box>
            </Grid>
          </MHidden>
          <MHidden width="mdDown">
            <Grid container paddingLeft="14%" paddingRight="13%">
              <Grid item sm={5} position="relative" display="flex">
                {/* <Box component="img" src="img/iframe-back.png" sx={{ width: '91%' }} /> */}
                <Box borderRadius={5} width="85%" height="122%" position="absolute" left="3%" top="3%">
                  <iframe
                    width={'100%'}
                    height="90%"
                    src="https://www.youtube.com/embed/S_KNS9i91gk?playlist=S_KNS9i91gk&loop=1"
                    allowfullscreen
                    style={{ borderRadius: '22px' }}
                  />
                </Box>
              </Grid>
              <Grid item sm={7}>
                <Box component="div" marginBottom="10px">
                  <Box component="span" sx={{ borderBottom: '2px solid #56C5FF' }}>
                    <Box component="img" src={imageURL('mega-capital-insurance.png')} width="70%" />
                  </Box>
                </Box>
                <Box component="p" color="white" fontFamily={'Segoe UI'} marginLeft="20px">
                  To ensure the safety and growth of its community,  {process.env.REACT_APP_PROJECT_NAME} Offer insurance protection fund.
                </Box>
              </Grid>
            </Grid>
          </MHidden>
          <MHidden width="mdUp">
            <Grid item xs={12} position="relative" display="flex" justifyConent="center" marginLeft="20px">
              {/* <Box component="img" src="img/iframe-back.png" sx={{ width: '91%' }} /> */}
              <Box borderRadius={5} width="82%" height="117%" position="absolute" left="6%" top="7%">
                <iframe
                  width={'100%'}
                  height="90%"
                  src="https://www.youtube.com/embed/S_KNS9i91gk?playlist=S_KNS9i91gk&loop=1"
                  allowfullscreen
                  style={{ borderRadius: '22px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box component="h3" fontFamily={'Segoe UI'} marginBottom="30px" paddingLeft="8%" paddingRight="8%">
                <Box component="h3" fontFamily={'Segoe UI'} marginBottom="50px" justifyContent="center" display="flex">
                  <Box
                    component="span"
                    sx={{ color: '#56C5FF', borderBottom: '2px solid #56C5FF' }}
                    paddingBottom="20px"
                  >
                    Buy Back & Burn Program
                  </Box>
                </Box>
              </Box>
              <Box padding="0 8%" textAlign="center">
                <Box component="p" style={{ color: '#56C5FF', marginTop: '40px', fontSize: 12 }}>
                  Portion of funds raised during each round of Token Sale will be reserved and be used to Buy Back the
                  circulating tokens & Burn them to make tokens deflationary.
                </Box>
              </Box>
            </Grid>
          </MHidden>
        </Grid>
        <MHidden width="mdDown">
          <Grid container marginTop="50px" direction="row" paddingLeft="14%" paddingRight="13%">
            <Grid item sm={6} marginTop="30px">
              <Box component="h3" fontFamily={'Segoe UI'} marginBottom="50px" marginTop='80px'>
                <Box component="span" sx={{ color: '#56C5FF', borderBottom: '2px solid #56C5FF' }} paddingBottom="20px">
                  Buy Back & Burn Program
                </Box>
              </Box>
              <Box component="p" color="white" maginTop="20px" fontFamily={'Segoe UI'}>
                Portion of funds raised during each round of Token Sale will be reserved and be used to Buy Back the
                circulating tokens & Burn them to make tokens deflationary.
              </Box>
            </Grid>
            <Grid item sm={6} justifyContent="start" display="flex">
              <Box component="img" width="80%" src={imageURL('mega_coin.png')}></Box>
            </Grid>
          </Grid>
        </MHidden>
      </Box>
    </>
  );
}
