import React from 'react';
import Box from '@mui/material/Box';
import { ProjectDetail } from 'utils/_utils/Projects';
import { Label, Span } from 'components/_components/Label';
import { IconButtonGroup } from 'components/_components/Button';

const Logo = ({ size }) => (
  <Box>
    <img src={ProjectDetail.icon} alt={ProjectDetail.label} width={size} />
  </Box>
);

const RenderObjArr = (obj) =>
  Object.entries(obj).map(([objKey, val], index) => (
    <Box key={index} sx={{ display: 'flex', columnGap: '4px' }}>
      <Label text={{ value: `${objKey}:`, weight: 100 }} />
      <span>
        {val.map((detail, idx) => (
          <Span key={idx} text={detail} />
        ))}
      </span>
    </Box>
  ));

const ProjectDetails = () => {
  return (
    <Box
      sx={{
        '@media (max-width: 1500px)': {
          width: '100%'
        },
        width: '950px',
        backgroundImage: 'url("_img/cards/card_bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '38px',
        padding: '40px 40px 65px 50px'
      }}
    >
      <Box
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            rowGap: '16px'
          },
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo size={67} />
          <Label sx={{ marginLeft: '28px' }} text={{ value: ProjectDetail.label, size: 30 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={ProjectDetail.img} alt={ProjectDetail.imgAlt} height={48} />
        </Box>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <Label text={ProjectDetail.text} />
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <span style={{ color: '#A7A7A7', fontSize: '20px' }}>
          Your investment is protected, this sale is under the{' '}
          <a href="/" style={{ textDecoration: 'underline' }}>
            <span style={{ color: '#02FF7B' }}>SafeGuarded Launch Protocol</span>
          </a>{' '}
          rules.
        </span>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <IconButtonGroup elements={ProjectDetail.social} size={50} />
      </Box>
      <Box sx={{ marginTop: '60px', maxWidth: '565px' }}>
        <Label text={{ color: 'green', value: 'POOL DETAILS', size: 30 }} sx={{ marginBottom: '15px' }} />
        <Box
          sx={{
            '@media (max-width: 600px)': {
              flexDirection: 'column'
            },
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Label text={{ value: 'Access Type: ', weight: 100 }} />
            <Label text={{ value: 'Levels', color: 'grey', weight: 100 }} sx={{ marginLeft: '8px' }} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Label text={{ value: 'Hard Cap: ', weight: 100 }} />
            <Label text={{ value: '$270 001', color: 'grey', weight: 100 }} sx={{ marginLeft: '8px' }} />
          </Box>
        </Box>
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(ProjectDetail.poolDetail)}
        </Box>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <Label text={{ color: 'green', value: 'PRICE', size: 30 }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(ProjectDetail.price)}
        </Box>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <Label text={{ color: 'green', value: 'TOKEN', size: 30 }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(ProjectDetail.token)}
        </Box>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <Label text={{ color: 'green', value: 'DISTRIBUTION', size: 30 }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(ProjectDetail.distribution)}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
