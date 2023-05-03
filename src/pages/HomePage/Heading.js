import { Box, Grid } from '@mui/material';
import { initReactI18next, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { MHidden } from '../../components/@material-extend';
import LaunchCard from 'components/LaunchCard';
import { getProjectStatus, imageURL } from '../../utils';
import { useEffect, useState } from 'react';
import apis from '../../services';
import { PROJECT_STATUS } from '../../config/constants';
import ProjectCard from '../../components/ProjectCard';

import { TRANSLATIONS_ZH } from './translations/zh/translations';
import { TRANSLATIONS_EN } from './translations/en/translations';
import { TRANSLATIONS_RU } from './translations/ru/translations';
import { TRANSLATIONS_TU } from './translations/tu/translations';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      zh: {
        translation: TRANSLATIONS_ZH
      },
      ru: {
        translation: TRANSLATIONS_RU
      },
      tu: {
        translation: TRANSLATIONS_TU
      }
    },
    lng: document.querySelector('html').lang,
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    }
  });

i18n.changeLanguage('en');

const LOGOS = ['bnb-chain-logo.png', 'eth-logo.png', 'poly-logo.png', 'ava-logo.png', 'fantom-logo.png'];

export default function Heading() {
  const { t } = useTranslation();
  const [pool, setPool] = useState(null);
  const font_Family =
    'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';

  useEffect(() => {
    (async () => {
      const response = await apis.getDeals();
      if (response.statusText === 'OK') {
        const { pools } = response.data;

        for (let i = 0; i < pools.length; i++) {
          const { startDateTime, endDateTime } = pools[i];
          const isInProcess = getProjectStatus(startDateTime, endDateTime) === PROJECT_STATUS.inProcess;

          if (isInProcess) {
            setPool(pools[i]);
            break;
          }
        }
      }
    })();
  }, []);

  return (
    <>
      <MHidden width="mdDown">
        <Grid
          data-aos="zoom-out"
          spacing={2}
          sx={{ paddingTop: '50px', marginBottom: '49px', height: '100vh' }}
          position="relative"
          display="flex"
        >
          <Grid container sm={1.5}>
            <Grid container direction="column" marginLeft="30px" spacing={2}>
              {/* <Box component="a" marginBottom='5px' href={"https://discord.com/invite/zR2k28g3d9"} alignItems="center" sx={{width: 42, height: 42, borderRadius : "50%", backgroundImage: 'radial-gradient(rgb(35, 35, 35) 40%, white 15%, rgb(35, 35, 35)) 60%' }}> */}
              <Box
                component="a"
                target="_blank"
                marginBottom="10px"
                style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                href={'https://discord.gg/dzjkkBfxug'}
                alignItems="center"
                sx={{ width: 42, height: 42, bgcolor: '#232323', borderRadius: '50%', padding: '10px' }}
              >
                <Box component="img" src={imageURL('github.png')} />
              </Box>
              <Box
                component="a"
                target="_blank"
                marginBottom="5px"
                style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                href={`https://twitter.com/Megacapitals`}
                alignItems="center"
                sx={{ width: 42, height: 42, bgcolor: '#232323', borderRadius: '50%', padding: '10px' }}
              >
                <Box component="img" src={imageURL('twitter (2).png')} />
              </Box>
              <Box
                component="a"
                target="_blank"
                marginBottom="10px"
                style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                href={'https://t.me/MegacapitalVC'}
                alignItems="center"
                sx={{ width: 42, height: 42, bgcolor: '#232323', borderRadius: '50%', padding: '10px' }}
              >
                <Box component="img" src={imageURL('paper-plane.png')} />
              </Box>
              <Box
                component="a"
                target="_blank"
                marginBottom="10px"
                style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                href={'https://medium.com/@megacapital.io'}
                alignItems="center"
                sx={{ width: 42, height: 42, bgcolor: '#232323', borderRadius: '50%', padding: '10px' }}
              >
                <Box component="img" src={imageURL('medium (2).png')} />
              </Box>
              <Box
                component="a"
                target="_blank"
                marginBottom="5px"
                style={{ boxShadow: 'inset -1px -1px 3px rgba(224, 229, 230, 0.29)' }}
                href={'https://megacapital-io.gitbook.io/megacapital.io'}
                alignItems="center"
                sx={{ width: 42, height: 42, bgcolor: '#232323', borderRadius: '50%', padding: '10px' }}
              >
                <Box component="img" src={imageURL('gitbook-pngrepo-com.png')} />
              </Box>
            </Grid>
          </Grid>

          <Grid item sm={5.4} marginLeft="10px" width="50%" marginTop='40px'>
            <Grid>
              <h3 style={{ color: 'white' }} >
                {process.env.REACT_APP_PROJECT_NAME}
              </h3>
              <h3 className="mb-5 mt-1"> An Advance Launchpad & Community based Venture Capital Ecosystem </h3>
            </Grid>
            <Grid marginTop={3}>
              <p className="mb-7 " fontFamily={font_Family} align="justify">
                <span style={{ color: '#4EB4E2' }}> {process.env.REACT_APP_PROJECT_NAME}</span> is a decentralized community based Venture Capital
                & Launchpad with Multi-Chain interoperability and core focus in incubating projects that are developed
                on <span style={{ color: '#4EB4E2' }}>Metaverse, Web 3.0, GamiFi, NFTs and DeFi Technologies</span> .
              </p>
            </Grid>
            <Grid marginTop="40px" container spacing={2}>
              <Grid item component="a" href="/idodeals" className="hero-buttons btn btn-info text-light mx-3">
                Buy $MGV
              </Grid>
              <Grid item component="a" href="/stakepad" className="button-text hero-buttons btn btn-outline-info mx-1">
                Stake $MGV
              </Grid>
              <Grid item component="a" href="#" className="hero-buttons btn btn-dark mx-3">
                JOIN THE COMMUNITY
              </Grid>
            </Grid>
            <Grid container marginTop="40px" spacing={1}>
              {LOGOS.map((logo) => (
                <Grid item sm>
                  <Box
                    component="img"
                    src={imageURL(logo)}
                    style={{
                      width: '90%',
                      height: '100%',
                      objectFit: 'contain',
                      overflow: 'hidden'
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/*{pool && (*/}
          {/*  <Grid>*/}
          {/*    */}
          {/*    <ProjectCard {...pool} />*/}
          {/*  </Grid>*/}
          {/*)}*/}
        </Grid>
      </MHidden>
      <MHidden width="mdUp">
        {/*<Grid paddingLeft="13%" paddingRight="13%">
          <LaunchCard></LaunchCard>
        </Grid>*/}

        <Grid paddingLeft="13%" paddingRight="13%" marginTop="20px" display="flex" justifyContent="center">
          <h4 style={{ fontSize: '28px', color: 'white' }} className="mb-5 ">
            {process.env.REACT_APP_PROJECT_NAME} - An Advance Launchpad & Community based Venture Capital Ecosystem
          </h4>
        </Grid>
        <Grid paddingLeft="10%" paddingRight="10%" textAlign="center">
          <span style={{ color: '#4EB4E2' }}>{t(process.env.REACT_APP_PROJECT_NAME)}</span>&nbsp;
          <span style={{ color: 'white' }}>{t('is_a_decentralized')} </span>
          <span style={{ color: '#4EB4E2' }}>
            &nbsp;{t('venture')}
            {t('capital')}
          </span>
          <span style={{ color: 'white' }}> {t('community_based_with')} </span>
          <span style={{ color: '#4EB4E2' }}>
            &nbsp;{t('all_in_')}
            {t('one_Multichain')} &amp; {t('Multi_Launchpad')}
          </span>
          <span style={{ color: 'white' }}>{t('investment_ecosystem_for')}&nbsp;</span>
          <span style={{ color: '#4EB4E2' }}>
            {t('Metaverse')},{t('GamiFi')}&nbsp;
          </span>
          <span style={{ color: 'white' }}>{t('and')} </span> <span style={{ color: '#4EB4E2' }}>{t('DEFI')}.</span>
        </Grid>

        <Grid marginTop="30px" spacing={2} paddingLeft="10%" marginBottom="90px">
          <Box
            component="button"
            href="/idodeals"
            borderRadius={1}
            backgroundColor="#56C5FF"
            color="white"
            padding="10px"
            border="none"
            fontSize={10}
          >
            BUY $MGV
          </Box>
          <Box
            component="button"
            href="/stakepad"
            borderRadius={1}
            backgroundColor="rgb(255, 255, 255, 0)"
            color="#56C5FF"
            border="1px solid #56C5FF"
            padding="10px"
            marginLeft="10px"
            fontSize={10}
          >
            STAKE $MGV
          </Box>
          <Box component="a" href="#" style={{ textDecoration: 'none' }} marginLeft="10px" fontSize={10} color="white">
            JOIN THE COMMUNITY
          </Box>
        </Grid>
      </MHidden>
    </>
  );
}
