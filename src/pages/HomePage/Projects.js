import { Box, Grid, Typography } from '@mui/material';
import { MHidden } from '../../components/@material-extend';
// import 'swiper/swiper.min.css';
import ProjectCard from 'components/ProjectCard';
import React, { useEffect, useState } from 'react';
import apis from '../../services';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { imageURL } from '../../utils';
import LaunchCard from '../../components/LaunchCard';

export default function Projects() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apis.getDeals();
        if (response.statusText !== 'OK') return console.log('RESPONSE ->', response);

        const pools = response.data.pools;

        // console.log(pools);

        setDeals(pools);
      } catch (e) {
        console.error('error occurred while fetching deals');
      }
    })();
  }, []);

  const font_Family =
    'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
  return (
    <>
      <MHidden width="mdDown">
        <Box
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          sx={{ marginTop: '80px', FontFace: 'Segoe UI' }}
          fontFamily={'Segoe UI'}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1 }}>
            <Box component="img" src={imageURL('h-2.png')}></Box>
          </Box>
          <Typography align="center">
            <Box
              data-aos="zoom-in"
              fontFamily={font_Family}
              sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}
            >
              <h1
                className="text-mute text-center fw-bold position-absolute start-50 translate-middle"
                style={{
                  fontSize: 120,
                  top: '30px',
                  left: '50%',
                  color: '#232323',
                  fontFamily: { font_Family }
                }}
              >
                projects
              </h1>
              <h2 className="text-light text-center position-absolute start-50 translate-middle-x" style={{ top: '13px' }}>
                Upcoming Projects
              </h2>
            </Box>
          </Typography>
          <div className="container">
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid
                container
                spacing={3}
                style={{ paddingLeft: '15px', paddingRight: '15px' }}
                justifyContent="center"
                marginTop="100px"
              >
                <Swiper slidesPerView={4} showArrows={true}>
                  {deals.length > 0 &&
                    deals.map((deal, dealIdx) => {
                      const [privacy, tag] = deal?.whitelistable ? ['Private', 'VC'] : ['Public', 'IDO'];
                      return(
                        <Grid item xs={12} sm={3} md={3} lg={3} gap={2}>
                          <SwiperSlide>
                            <LaunchCard key={dealIdx} privacy={privacy} tag={tag} {...deal} sm='sm'></LaunchCard>
                          </SwiperSlide>
                        </Grid>
                      )
                    })}
                </Swiper>
              </Grid>
              {/* // </Stack> */}
              {/* )} */}
            </Grid>
          </div>

          <Typography
            fontFamily={'Segoe UI'}
            fontSize={'25px'}
            align="center"
            sx={{ marginBottom: '5px', color: '#24B6E6' }}
          >
            <a href="/deals" style={{ textDecoration: 'none', color: '#24B6E6' }}>
              View All
            </a>
          </Typography>
        </Box>
      </MHidden>

      <MHidden width="mdUp">
        <Box
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          sx={{ marginTop: '80px', FontFace: 'Segoe UI' }}
          fontFamily={'Segoe UI'}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, borderRadius: 1 }}>
            <Box component="img" src={imageURL('h-2.png')}></Box>
          </Box>
          <Typography align="center">
            <Box
              data-aos="zoom-in"
              fontFamily={font_Family}
              sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}
            >
              <MHidden width="mdUp">
                <h2
                  className="text-light text-center position-absolute start-50 translate-middle-x"
                  style={{ top: '13px', fontSize: 18 }}
                >
                  Upcoming Projects
                </h2>
              </MHidden>
            </Box>
          </Typography>

          <Grid container alignItems="center" justifyContent="center" sx={{ marginBottom: '20px' }} marginTop="100px">
            <Swiper spaceBetween={50} slidesPerView={1} centeredSlides>
              {deals.length > 0 &&
                deals.map((deal) => (
                  <SwiperSlide>
                    <Box width="350px" height="400px">
                      <ProjectCard {...deal} />
                    </Box>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Grid>
          <Typography
            fontFamily={'Segoe UI'}
            fontSize={'25px'}
            align="center"
            sx={{ marginBottom: '5px', color: '#24B6E6' }}
          >
            <a href="/deals" style={{ textDecoration: 'none', color: '#24B6E6' }}>
              View All
            </a>
          </Typography>
        </Box>
      </MHidden>
    </>
  );
}
