import React from 'react';
import Box from '@mui/material/Box';
import { Label, Span } from 'components/_components/Label';
import { IconButtonGroup } from 'components/_components/Button';

const RenderObjArr = (obj) =>
  Object.entries(obj).map(([objKey, val], index) => (
    <Box key={index} sx={{ display: 'flex', columnGap: '4px', flexWrap:"wrap", gap:"10px" }}>
      <Label text={{ value: `${objKey}:`, weight: 100 }} />
      <span>
        {val.map((detail, idx) => (
          <Span key={idx} text={detail} />
        ))}
      </span>
    </Box>
  ));

const ProjectDetails = ({ projectInfo }) => {
  var componentInfo = {
    icon: projectInfo.logo,
    label: projectInfo.projectName,
    img: '_img/icon/shardeum.png',
    imgAlt: 'Shardeum',
    text: {
      value:
        projectInfo.description,
      size: 20,
      color: 'grey',
      weight: 100
    },
    social: [
      {
        img: '_img/icon/chain.png',
        path: projectInfo.ipfs?.website
      },
      {
        img: '_img/icon/twitter.png',
        path: projectInfo.ipfs?.twitter
      },
      {
        img: '_img/icon/telegram.png',
        path: projectInfo.ipfs?.telegram
      },
      {
        img: '_img/icon/discord.png',
        path: projectInfo.ipfs?.discord
      },

    ],
    poolDetail: {
      'Access Type': [
        {
          value: 'Levels',
          color: 'grey'
        }
      ],
      'Hard Cap': [
        {
          value: projectInfo.hardCap + ' SHM',
          color: 'grey'
        }
      ],
      'Swap Rate': [
        {
          value: '1 ' + projectInfo.projectName,
          color: 'green'
        },
        {
          value: ' = ',
          color: 'grey'
        },
        {
          value: 1 / projectInfo.presaleRate + ' SHM',
          color: 'green'
        },
        {
          value: ' | ',
          color: 'grey'
        },
        {
          value: projectInfo.presaleRate + ' ' + projectInfo.projectName,
          color: 'green'
        },
        {
          value: ' per ',
          color: 'grey'
        },
        {
          value: '1 SHM',
          color: 'green'
        }
      ],
      'Registration': [
        {
          value: ' ~ ' + new Date(projectInfo.startDateTime).toUTCString(),
          color: 'grey'
        },
      ],
      'Start/end': [
        {
          value: new Date(projectInfo.startDateTime).toDateString() + ' - ' + new Date(projectInfo.endDateTime).toDateString(),
          color: 'grey'
        }
      ],

      'FCFS Opens': [
        {
          value: new Date(projectInfo.endDateTime).toUTCString(),
          color: 'grey'
        }
      ]
    },
    price: {
      Listing: [
        {
          value: 1 / projectInfo.presaleRate + ' SHM (+0.00%)',
          color: 'green'
        }
      ],
      IDO: [
        {
          value: 1 / projectInfo.presaleRate + ' SHM',
          color: 'green'
        }
      ]
    },
    token: {
      Token: [
        { value: projectInfo.projectName, color: 'green' },
        { value: ' on Shardeum Chain', color: 'grey' }
      ],
      'Total Supply': [
        {
          value: projectInfo.presaleRate * projectInfo.hardCap + ' ' + projectInfo.projectName,
          color: 'grey'
        }
      ],
      'Initial Supply': [
        {
          value: projectInfo.presaleRate * projectInfo.hardCap + ' ' + projectInfo.projectName,
          color: 'green'
        },
        {
          value: ', market cap ',
          color: 'grey'
        },
        {
          value: 'SHM '+ projectInfo.hardCap,
          color: 'green'
        }
      ],
      'Token Listing': [
        {
          value: 'TBA',
          color: 'grey'
        }
      ]
    },
    distribution: {
      Distribution: [
        {
          value: 'Claimed on Shardstarter',
          color: 'grey'
        }
      ],
      Vesting: [
        {
          value: '20% at listing, 1 month cliff, then 6 months linear vesting',
          color: 'grey'
        }
      ]
    }
  };
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
          <Box>
            <img src={componentInfo.icon} alt={componentInfo.label} width={67} />
          </Box>
          <Label sx={{ marginLeft: '28px' }} text={{ value: componentInfo.label, size: 30 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={componentInfo.img} alt={componentInfo.imgAlt} height={48} />
        </Box>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <Label text={componentInfo.text} />
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
        <IconButtonGroup elements={componentInfo.social} size={50} />
      </Box>
      <Box sx={{ marginTop: '60px', maxWidth: '565px' }}>
        <Label text={{ color: 'green', value: 'POOL DETAILS', size: 30 }} sx={{ marginBottom: '15px' }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(componentInfo.poolDetail)}
        </Box>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <Label text={{ color: 'green', value: 'PRICE', size: 30 }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(componentInfo.price)}
        </Box>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <Label text={{ color: 'green', value: 'TOKEN', size: 30 }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(componentInfo.token)}
        </Box>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <Label text={{ color: 'green', value: 'DISTRIBUTION', size: 30 }} />
        <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {RenderObjArr(componentInfo.distribution)}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
