import React from 'react';
import Box from '@mui/material/Box';
import { Label } from 'components/_components/Label';
import { TIER_LEVEL } from 'config/constants';

import { useMainStakingStatus } from 'hooks/useMyStatus';

function LeftStaking() {
  const { tier, staked_amount, reward_amount } = useMainStakingStatus();

  var tierimg;
  switch (tier) {
    case TIER_LEVEL.none_0:
      tierimg = '_img/icon/solchicks_2.png'
      break;
    case TIER_LEVEL.amber_1:
      tierimg = '_img/icon/tier1.png'
      break;
    case TIER_LEVEL.chrome_2:
      tierimg = '_img/icon/tier2.png'
      break;
    case TIER_LEVEL.jade_3:
      tierimg = '_img/icon/tier3.png'
      break;
    case TIER_LEVEL.topaz_4:
      tierimg = '_img/icon/tier4.png'
      break;

    default:
      break;
  }

  var Staking = {
    icon: tierimg,
    label: {
      value: tier,
      size: 40
    },
    value: {
      value: 'Your Current Tier',
      color: 'green',
      size: 20,
      weight: 100
    },
    details: [
      {
        imgUrl: '_img/icon/coins.png',
        label: {
          value: staked_amount + ' $SHMX',
          size: 24
        },
        value: {
          value: 'Staked $SHMX',
          size: 18,
          weight: 100,
          color: 'grey'
        }
      },
      {
        imgUrl: '_img/icon/shield.png',
        label: {
          value: 'Guaranteed Allocation',
          size: 24
        },
        value: {
          value: '50% of Pool Size',
          size: 18,
          weight: 100,
          color: 'grey'
        }
      },
      {
        imgUrl: '_img/icon/clock.png',
        label: {
          value: 'Minimum Staking',
          size: 24
        },
        value: {
          value: 'Stake for 56 Days',
          size: 18,
          weight: 100,
          color: 'grey'
        }
      }
    ]
  };

  return (
    <Box
      sx={{
        '@media (max-width: 1260px)': {
          width: '100%'
        },
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 0px 60px 65px',
        width: '43%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          '@media(max-width: 500px)': {
            flexDirection: 'column'
          }
        }}
      >
        <img src={Staking.icon} alt="tierlevel" width={120} height={120} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '@media(max-width: 500px)': {
              marginLeft: '0px'
            },
            marginLeft: '40px'
          }}
        >
          <Label sx={{ minWidth: '75px' }} text={Staking.label} />
          {Staking.value && <Label sx={{ marginTop: '10px' }} text={Staking.value} />}
        </Box>
      </Box>
      <Box sx={{ marginTop: '42px' }}>
        <Box sx={{ display: 'flex', rowGap: '30px', flexDirection: 'column', justifyContent: 'center' }}>
          {Staking.details.map((detail, idx) => (
            <Box key={idx} sx={{ display: 'flex' }}>
              <img src={detail.imgUrl} alt={detail.imgUrl} width={80} height={80} />
              <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '22px' }}>
                <Label sx={{ minWidth: '75px' }} text={detail.label} />
                {detail.value && <Label text={detail.value} sx={{ marginTop: '5px' }} />}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LeftStaking;
