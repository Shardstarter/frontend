// material
import { Container, Box, Grid } from '@mui/material';
import { MHidden } from '../components/@material-extend';
import { imageURL } from '../utils';
export default function DashboardFooter() {
  return (
    <>
      <MHidden width="mdDown">
        <Grid container spacing={0} sx={{ height: '50%', marginTop: '50px', paddingLeft: '14%', paddingRight: '14%' }}>
          <Grid item sm={6} bgcolor="#232323" paddingLeft="30px" paddingTop="30px">
            <Box component="h4" color="white">
              Join Army
            </Box>
            <div className="d-flex">
              <div className="bg-img_09">
                {/*<Box component="p" className="mb-0" style={{ color: 'white' }}>
                   Promote Tweets for additional score points
                 </Box>*/}
                <Box
                  component="a"
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd1Z4Ju-Xzr0qvrbLpw3ffY8DpaJYSkW7TDIvx9hdeHlGGUhg/viewform"
                >
                  <button className="join-army-btn">Join Now</button>
                </Box>
              </div>
              <div className="bg-img_09">
                <div className="a-image">
                  <Box
                    component="img"
                    src={imageURL('army.png')}
                    alt="Army-Image"
                    sx={{ width: '80%', height: '80%' }}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            container
            item
            sm={6}
            alignItems={'center'}
            justifyContent="center"
            display="flex"
            padding="30px"
            style={{ background: 'linear-gradient(to bottom right, #56C5ff  10%, #67CBFF 73%)' }}
          >
            {/* <div className="col-md-6 p-0"> */}
            <Grid
              container
              item
              sm={12}
              component="h4"
              direction="column"
              color="white"
              alignItems={'center'}
              justifyContent="center"
              display="flex"
            >
              <Grid>Want to launch your project</Grid>
              <Grid> on  {process.env.REACT_APP_PROJECT_NAME}</Grid>
            </Grid>
            <Grid
              item
              sm={12}
              component="a"
              target="_blank"
              alignItems={'center'}
              justifyContent="center"
              display="flex"
              style={{ textDecoration: 'none' }}
              href="https://docs.google.com/forms/d/e/1FAIpQLSccomiCjlviokNn0_zuOHpStCNb3x_0OQreV4qEaGLpIyTMzg/viewform"
            >
              <Box component="button" className="btn btn-dark">
                <i className="fa-solid fa-rocket text-info"></i> Apply to Launch
              </Box>
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
        <Grid container direction={'column'} marginTop="70px" sx={{ paddingLeft: '14%', paddingRight: '14%' }}>
          <Grid container direction={'row'}>
            <Grid container item md={2} direction="column">
              <Grid item mg="5">
                <Box component="img" src={imageURL('logo.png')} />
              </Grid>
              <Grid container item mg="2" direction={'row'} marginTop="40px" spacing={2}>
                <Box
                  component="a"
                  target="_blank"
                  justifyContent="flex-start"
                  marginRight="12px"
                  marginTop="12px"
                  style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                  href={'https://discord.gg/dzjkkBfxug'}
                  alignItems="center"
                  sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
                >
                  <Box component="img" src={imageURL('github.png')} />
                </Box>
                <Box
                  component="a"
                  target="_blank"
                  justifyContent="flex-start"
                  marginRight="12px"
                  marginTop="12px"
                  style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                  href={'https://twitter.com/Megacapitals'}
                  alignItems="center"
                  sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
                >
                  <Box component="img" src={imageURL('twitter.png')} />
                </Box>
                <Box
                  component="a"
                  target="_blank"
                  justifyContent="flex-start"
                  marginRight="12px"
                  marginTop="12px"
                  style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                  href={'https://t.me/MegacapitalVC'}
                  alignItems="center"
                  sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
                >
                  <Box component="img" src={imageURL('paper-plane.png')} />
                </Box>
                <Box
                  component="a"
                  target="_blank"
                  justifyContent="flex-start"
                  marginRight="12px"
                  marginTop="12px"
                  style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                  href={'https://medium.com/@megacapital.io'}
                  alignItems="center"
                  sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
                >
                  <Box component="img" src={imageURL('medium (2).png')} />
                </Box>
                <Box
                  component="a"
                  target="_blank"
                  justifyContent="flex-start"
                  marginRight="12px"
                  marginTop="12px"
                  style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                  href={'https://megacapital-io.gitbook.io/megacapital.io'}
                  alignItems="center"
                  sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
                >
                  <Box component="img" src={imageURL('gitbook-pngrepo-com.png')} />
                </Box>
              </Grid>
            </Grid>
            <Grid item md={2}>
              <Box component="h3" color="white">
                General
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="Introduction - Megacapital.io (gitbook.io)"
                  style={{ textDecoration: 'none' }}
                  color="white"
                >
                  Introduction
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="Vision & Mission - Megacapital.io (gitbook.io)"
                  style={{ textDecoration: 'none' }}
                  color="white"
                >
                  Mission
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="Vision & Mission - Megacapital.io (gitbook.io)"
                  style={{ textDecoration: 'none' }}
                  color="white"
                >
                  Vision
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="/Attachment/FAQ.docx"
                  color="white"
                  style={{ textDecoration: 'none' }}
                >
                  FAQ
                </Box>
              </Box>
            </Grid>
            <Grid item md={2.5}>
              <Box component="h3" color="white">
                About Us
              </Box>
              <Box marginTop="20px" color="white">
                Tokennomics
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="/Attachment/MegaCapital.io wheitpaper.pdf"
                  style={{ textDecoration: 'none' }}
                  color="white"
                >
                  Lightpaper
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="/Attachment/Megacapital Pitch Deck.pdf"
                  style={{ textDecoration: 'none' }}
                  color="white"
                >
                  Pitch Deck
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box component="a" target="_blank" href="/blog" color="white" style={{ textDecoration: 'none' }}>
                  Blog
                </Box>
              </Box>
            </Grid>
            <Grid item md={2.5}>
              <Box component="h3" color="white">
                Community
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="https://t.me/MegacapitalVC"
                  style={{ textDecoration: 'none' }}
                  color="white"
                >
                  English
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="https://t.me/+y_azriUrGYoyNzJk"
                  style={{ textDecoration: 'none' }}
                  marginTop="20px"
                  color="white"
                >
                  Chinese
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="https://t.me/+Kd6DXRhpTj5hMjJk"
                  style={{ textDecoration: 'none' }}
                  marginTop="20px"
                  color="white"
                >
                  Russian
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  href="https://t.me/+ko2vIRtwBYpmOTk0"
                  style={{ textDecoration: 'none' }}
                  marginTop="20px"
                  color="white"
                >
                  Turkey
                </Box>
              </Box>
            </Grid>
            <Grid item md={2.5}>
              <Box component="h3" color="white">
                &nbsp;
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                  href="/Attachment/Terms & Conditions privacy policy .docx"
                  color="white"
                >
                  Privacy Policy
                </Box>
              </Box>
              <Box marginTop="20px">
                <Box
                  component="a"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                  href="/Attachment/Terms & Conditions privacy policy .docx"
                  color="white"
                >
                  Terms & Conditions
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box borderRadius={'30%'} sx={{ width: '100%', height: '4px', bgcolor: '#3b3b3b' }} marginTop="20px" />
          <Grid container marginTop="20px">
            <Grid item lg={9}>
              <Box color="white">copyright @ 2023,  {process.env.REACT_APP_PROJECT_NAME} . All Right Reserved</Box>
            </Grid>
            <Grid item lg={3}>
              <Box position="relative" justifyContent={'flex-end'} color="white">
                privacy policy terms & conditions
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </MHidden>

      <MHidden width="mdUp">
        <Grid container spacing={0} sx={{ height: '50%', marginTop: '50px', paddingLeft: '5%', paddingRight: '5%' }}>
          <Grid item sm={6} bgcolor="#232323" padding="0px 30px" paddingTop="30px">
            <Box component="h4" color="white" justifyContent="center" display="flex">
              Join Army
            </Box>
            <Box
              className="mb-0"
              style={{ color: 'white' }}
              fontSize={23}
              padding="0 20px"
              justifyContent="center"
              display="flex"
            ></Box>
            <Box justifyContent="center" display="flex">
              <Box
                component="button"
                target="_blank"
                color="white"
                backgroundColor="#56C5FF"
                marginTop="10px"
                border="none"
                padding="10px 35px"
                borderRadius={1}
                href="https://docs.google.com/forms/d/e/1FAIpQLSd1Z4Ju-Xzr0qvrbLpw3ffY8DpaJYSkW7TDIvx9hdeHlGGUhg/viewform"
              >
                Join Now
              </Box>
            </Box>
            <Box marginTop="30px" justifyContent="center" display="flex">
              <Box
                component="img"
                src={imageURL('army.png')}
                alt="Army-Image"
                sx={{ width: '80%', height: '80%' }}
              />
            </Box>
          </Grid>
          <Grid
            container
            item
            sm={6}
            alignItems={'center'}
            justifyContent="center"
            display="flex"
            padding="30px 10px"
            style={{ background: 'linear-gradient(to bottom right, #56C5ff  10%, #67CBFF 73%)' }}
          >
            {/* <div className="col-md-6 p-0"> */}
            <Grid
              item
              sm={12}
              marginTop="30px"
              padding="0 10px"
              component="h4"
              color="white"
              alignItems={'center'}
              justifyContent="center"
              display="flex"
            >
              <Box textAlign="center">Want to launch your project on MegaCapital</Box>
            </Grid>
            <Grid
              item
              sm={12}
              marginTop="120px"
              alignItems={'center'}
              justifyContent="center"
              display="flex"
              style={{ textDecoration: 'none' }}
            >
              <Box
                component="a"
                target="_blank"
                className="btn btn-dark"
                style={{ backgroundColo: 'black' }}
                href="https://docs.google.com/forms/d/e/1FAIpQLSccomiCjlviokNn0_zuOHpStCNb3x_0OQreV4qEaGLpIyTMzg/viewform"
              >
                <i className="fa-solid fa-rocket text-info"></i> Apply to Launch
              </Box>
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop="40px" display="flex" justifyContent="center">
          <Box component="img" src={imageURL('logo.png')}></Box>
        </Grid>
        <Grid item xs={12} marginTop="20px" padding="0px 20px">
          <Box textAlign="center" color="white">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Pharetra tortor nec
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction={'row'}
          marginTop="40px"
          padding="0px 20px"
          justifyContent="space-around"
          display="flex"
        >
          <Box
            component="a"
            target="_blank"
            justifyContent="flex-start"
            marginRight="12px"
            marginTop="12px"
            style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
            href={'https://discord.gg/dzjkkBfxug'}
            alignItems="center"
            sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
          >
            <Box component="img" src={imageURL('github.png')} />
          </Box>
          <Box
            component="a"
            target="_blank"
            justifyContent="flex-start"
            marginRight="12px"
            marginTop="12px"
            style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
            href={'https://twitter.com/Megacapitals'}
            alignItems="center"
            sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
          >
            <Box component="img" src={imageURL('twitter.png')} />
          </Box>
          <Box
            component="a"
            target="_blank"
            justifyContent="flex-start"
            marginRight="12px"
            marginTop="12px"
            style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
            href={'https://t.me/MegacapitalVC'}
            alignItems="center"
            sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
          >
            <Box component="img" src={imageURL('paper-plane.png')} />
          </Box>
          <Box
            component="a"
            target="_blank"
            justifyContent="flex-start"
            marginRight="12px"
            marginTop="12px"
            style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
            href={'https://medium.com/@megacapital.io'}
            alignItems="center"
            sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
          >
            <Box component="img" src={imageURL('medium (2).png')} />
          </Box>
          <Box
            component="a"
            target="_blank"
            justifyContent="flex-start"
            marginRight="12px"
            marginTop="12px"
            style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
            href={'https://megacapital-io.gitbook.io/megacapital.io'}
            alignItems="center"
            sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#232323', padding: '7px' }}
          >
            <Box component="img" src={imageURL('gitbook-pngrepo-com.png')} />
          </Box>
        </Grid>
        <Grid marginLeft="30px" style={{ backgroundImage: `url(${imageURL('footer_image.png')})` }}>
          <Box component="h3" color="white" marginTop="30px">
            General
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="Introduction - Megacapital.io (gitbook.io)"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              Introduction
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="Vision & Mission - Megacapital.io (gitbook.io)"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              Mission
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="Vision & Mission - Megacapital.io (gitbook.io)"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              Vision
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="/Attachment/FAQ.docx"
              color="white"
              style={{ textDecoration: 'none' }}
            >
              FAQ
            </Box>
          </Box>
          <Box component="h3" color="white" marginTop="30px">
            About Us
          </Box>
          <Box marginTop="20px" color="white">
            Tokennomics
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="/Attachment/MegaCapital.io wheitpaper.pdf"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              LightPaper
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="/Attachment/Megacapital Pitch Deck.pdf"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              Pitch Deck
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box component="a" target="_blank" href="/blog" color="white" style={{ textDecoration: 'none' }}>
              Blog
            </Box>
          </Box>
          <Box component="h3" color="white" marginTop="30px">
            Community
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="https://t.me/MegacapitalVC"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              English
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="https://t.me/+y_azriUrGYoyNzJk"
              style={{ textDecoration: 'none' }}
              marginTop="20px"
              color="white"
            >
              Chinese
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="https://t.me/+Kd6DXRhpTj5hMjJk"
              style={{ textDecoration: 'none' }}
              marginTop="20px"
              color="white"
            >
              Russian
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="https://t.me/+ko2vIRtwBYpmOTk0"
              style={{ textDecoration: 'none' }}
              marginTop="20px"
              color="white"
            >
              Turkey
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="/Attachment/Terms & Conditions privacy policy .docx"
              style={{ textDecoration: 'none' }}
              color="white"
            >
              Privacy Policy
            </Box>
          </Box>
          <Box marginTop="20px">
            <Box
              component="a"
              target="_blank"
              href="/Attachment/Terms & Conditions privacy policy .docx"
              style={{ textDecoration: 'none' }}
              marginTop="20px"
              color="white"
            >
              Terms & Conditions
            </Box>
          </Box>
        </Grid>
        <Grid padding="0 15px" marginTop="30px" color="white" fontSize={14}>
          copyright @ 2023, <span style={{ color: '#56C5FF' }}>{process.env.REACT_APP_PROJECT_NAME}</span>.
          <span style={{ fontStyle: 'italic' }}>All Right Reserved</span>
        </Grid>
      </MHidden>
    </>
  );
}
