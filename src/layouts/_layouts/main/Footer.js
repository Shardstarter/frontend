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
  reddit
} from 'utils/_utils/EntityFieldDefs';
import { Link } from 'react-router-dom';
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
          <Box height={64} sx={{ marginBottom: '60px' }}>
            <Link to="/home">
              <img src="_img/footer.png" alt="Footer" height="100%" />
            </Link>
          </Box>
          <Label
            text={{ value: loremString, weight: 100, color: '#D1D1D1' }}
            sx={{
              width: '612px',
              '@media (max-width: 1360px)': {
                width: '400px',
                marginBottom: '50px'
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
              '@media (max-width: 500px)': {
                flexDirection: 'column'
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
            sx={{ marginTop: '30px' }}
            size="50px"
            elements={[twitter, facebook, instagram, reddit, linkedin]}
          />
          <Label text={{ value: privacyString, weight: 100 }} sx={{ marginTop: '40px' }} />
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
