import React from 'react';
import { Box } from '@mui/material';
import { Label, Span } from 'components/_components/Label';
import { IconButtonGroup } from 'components/_components/Button';
import {
  loremString,
  privacyString,
  twitter,
  facebook,
  instagram,
  linkedin,
  reddit,
  discord,
  medium,
  telegram,
  mirror
} from 'utils/_utils/EntityFieldDefs';
import { Link } from 'react-router-dom';
import { median } from 'ramda';
const Footer = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#171717',
          padding: '70px 10%',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #002B15',
          flexDirection: 'row',
          '@media (max-width: 1360px)': {
            flexDirection: 'column',
            alignItems: 'center'
          }
        }}
      >
        <Box>
          <Box
            height={64}
            sx={{
              marginBottom: '60px',
            }}
          >
            <Link nk to="/home">
              <img src="_img/footer.png" alt="Footer" height="100%" />
            </Link>
          </Box>
          <Label
            text={{
              value:
                'Developed on Shardeum, We are poised to enhance the DeFi, NFT, Metaverse, and Gaming ecosystems. Our platform rigorously selects high-quality projects through its unique project selection process.',
              weight: 100,
              color: '#D1D1D1'
            }}
            sx={{
              width: '612px',
              '@media (max-width: 1360px)': {
                marginBottom: '50px',              },
              '@media (max-width: 768px)': {
                width: '400px'
              },
              '@media (max-width: 500px)': {
                width: '100%',
                marginBottom: '50px'
              }
            }}
          />
        </Box>

        <Box>
          <Box
            display="flex"
            sx={{
              '@media (max-width: 768px)': {
                width: '400px'
              },
              '@media (max-width: 500px)': {
                flexDirection: 'column',
                padding: '10px',
                width: '350px'
              }
            }}
            flexDirection="row"
            width="100%"
            justifyContent=" space-between"
          >
            <span>
              <Span
                text={{
                  value: 'Join Our ',
                  size: 40,
                  weight: 700
                }}
              />
              <Span text={{ value: 'Community', size: 40, color: 'green', weight: 700 }} />
            </span>
          </Box>
          <IconButtonGroup
            sx={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}
            size="30px"
            elements={[linkedin, telegram, twitter, discord, medium, mirror]}
          />
          <Label
            text={{ value: privacyString, weight: 100 }}
            sx={{
              marginTop: '40px',
              '@media (max-width: 500px)': {
                textAlign: 'center'
              }
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#171717',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Label
          text={{ value: '© Copyrighted Shardstarter Network 2023 | All Rights Reserved', weight: 100 }}
          sx={{ padding: '20px 0px', textAlign: 'center' }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
