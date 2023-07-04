import React, { useEffect, useState } from 'react';
import { Button, Box, Paper, InputBase, IconButton } from '@mui/material';
import { Label } from 'components/_components/Label';
import { RoundedLabel } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';

import { useLiquidStakingStatus } from 'hooks/useMyStatus';

const RenderRoundedCard = (props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '7px',
        width: '120px',
        minHeight: '43px',
        backgroundColor: '#02FF7B',
        justifyContent: 'center'
      }}
    >
      <Label
        text={{ ...props.label }}
        sx={{
          marginTop: '5px',
          '@media (max-width: 1000px)': {
            fontSize: 22
          }
        }}
      />
    </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '@media (max-width: 500px)': {
          flexDirection: 'column',
          alignItems: 'start'
        }
      }}
    >
      <Label
        text={props.value}
        sx={{
          marginTop: '5px',
          '@media (max-width: 1000px)': {
            fontSize: 22
          }
        }}
      />
      {props.id === 2 && (
        <Button
          sx={{
            fontSize: '15px',
            width: '120px',
            height: '52px',
            backgroundColor: '#171717',
            color: 'white',
            border: '1px solid #02FF7B',
            borderRadius: '8px',
            marginLeft: '35px',
            '@media (max-width: 1000px)': {
              fontSize: '12px'
            },
            '@media (max-width: 500px)': {
              marginLeft: '0px',
              marginTop: '10px'
            }
          }}
          onClick={props.funcClaimRewards}
        >
          Harvest
        </Button>
      )}
    </Box>
  </Box>
);

function LiquidStaking() {
  const {
    staked_amount,
    received_amount,
    rewards,
    wallet_SHMX_balance,
    wallet_sSHMX_balance,
    sSHMX_marketcap,
    totalStakedSHMX,
    totalStakers,
    funcStake,
    funcUnstake,
    funcClaimRewards
  } = useLiquidStakingStatus();

  const [amount, setAmount] = useState(0);

  var LiquidParams = {
    labels: [
      {
        label: {
          value: 'You will receive',
          weight: 100
        },
        value: {
          value: amount + ' sSHMX',
          color: 'grey',
          weight: 100
        }
      },
      {
        label: {
          value: 'Exchange Rate',
          weight: 100
        },
        value: {
          value: '1 SHMX = 1 sSHMX',
          color: 'grey',
          weight: 100
        }
      },
      {
        label: {
          value: 'Transaction Cost',
          weight: 100
        },
        value: {
          value: '- $0.12',
          color: 'grey',
          weight: 100
        }
      },
      {
        label: {
          value: 'Reward Fee',
          weight: 100,
          img: '_img/icon/info.png'
        },
        value: {
          value: '10%',
          color: 'grey',
          weight: 100
        }
      }
    ],
    items: [
      {
        label: {
          value: 'Staked',
          size: 18,
          color: '#26323E'
        },
        value: {
          value: Number(staked_amount).toFixed(1) + ' SHMX',
          size: 40
        }
      },
      {
        label: {
          value: 'Received',
          size: 18,
          color: '#26323E'
        },
        value: {
          value: Number(received_amount).toFixed(1) + ' sSHMX',
          size: 40
        }
      },
      {
        label: {
          value: 'Rewards',
          size: 18,
          color: '#26323E'
        },
        value: {
          value: Number(rewards).toFixed(3) + ' sSHMX',
          size: 40
        }
      }
    ],
    values: [
      {
        label: {
          value: 'Annual Percentage Rate',
          weight: 100
        },
        value: {
          value: '6%',
          color: 'grey',
          weight: 100
        }
      },
      {
        label: {
          value: 'Total Staked',
          weight: 100
        },
        value: {
          value: totalStakedSHMX + ' SHMX',
          color: 'grey',
          weight: 100
        }
      },
      {
        label: {
          value: 'Total Stakers',
          weight: 100
        },
        value: {
          value: totalStakers,
          color: 'grey',
          weight: 100
        }
      },
      {
        label: {
          value: 'sSHMX Marketcap',
          weight: 100
        },
        value: {
          value: '$ ' + sSHMX_marketcap,
          color: 'grey',
          weight: 100
        }
      }
    ]
  };

  const handleStake = async () => {
    try {
      await funcStake(amount);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleUnstake = async () => {
    try {
      await funcUnstake(amount);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '50px 50px',
          backgroundColor: '#000000',
          border: '1px solid #7070704C',
          borderRadius: '20px',
          flexWrap: 'wrap',
          rowGap: '25px',
          gap: '20px'
        }}
      >
        {LiquidParams.items.map((item, idx) => (
          <RenderRoundedCard key={idx} {...item} id={idx} funcClaimRewards={funcClaimRewards} />
        ))}
      </Box>
      <Box
        sx={{
          width: '100%',
          marginTop: '40px',
          paddingBottom: '50px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#000000',
          padding: '5px'
        }}
      >
        <Label sx={{ marginTop: '60px' }} text={{ value: 'Stake SHMX', size: 40, color: 'green' }} />
        <Label
          sx={{ marginTop: '10px' }}
          text={{ value: 'Stake SHMX & Receive sSHMX While Staking', color: 'grey', size: 18, weight: 100 }}
        />
        <Box
          sx={{
            width: '600px',
            '@media (max-width: 760px)': {
              width: '100%'
            }
          }}
        >
          {/* Stake Input */}
          <Paper
            component="form"
            sx={{
              p: '2px 13px',
              display: 'flex',
              alignItems: 'center',
              marginTop: '50px',
              marginBottom: '10px',
              border: '1px solid #02FF7B',
              backgroundColor: '#171717',
              height: '96px'
            }}
          >
            <IconButton sx={{ p: '10px' }} disabled>
              <img src="_img/icon/shmx.png" alt="hello" width={50} />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            />
            <Button
              sx={{
                width: '140px',
                height: '70px',
                backgroundColor: '#000000',
                borderRadius: '8px',
                border: '1px solid #7070704D',
                color: 'white',
                fontSize: 20
              }}
              onClick={() => setAmount(wallet_SHMX_balance)}
            >
              MAX
            </Button>
          </Paper>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              '@media (max-width: 760px)': {
                flexDirection:"column",
                gap:"10px"
              }
            }}
          >
            <RoundedLabel
              keyword="Balance"
              value={'$SHMX ' + Number(wallet_SHMX_balance).toFixed(1)}
              bgColor="#171717"
            />
            <RoundedLabel
              keyword="Balance"
              value={'$sSHMX ' + Number(wallet_sSHMX_balance).toFixed(1)}
              bgColor="#171717"
            />
          </Box>
          <PrimaryButton
            sx={{
              marginTop: '30px',
              width: '100%',
              minHeight: '85px',
              fontSize: '24px !important'
            }}
            label="Stake"
            hasFocus
            onClick={handleStake}
          />
          <PrimaryButton
            sx={{
              marginTop: '10px',
              marginBottom: '52px',
              width: '100%',
              minHeight: '85px',
              fontSize: '24px !important'
            }}
            label="Unstake"
            hasFocus
            onClick={handleUnstake}
          />
          {LiquidParams.labels.map((val, idx) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '22px' }}>
              <Label text={{ ...val.label }} />
              <Label text={{ ...val.value }} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#0A1610',
          padding: '18px 0px 40px 0px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '600px',
            '@media (max-width: 760px)': {
              width: '100%'
            }
          }}
        >
          {LiquidParams.values.map((val, idx) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '22px' }}>
              <Label text={{ ...val.label }} />
              <Label text={{ ...val.value }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LiquidStaking;
