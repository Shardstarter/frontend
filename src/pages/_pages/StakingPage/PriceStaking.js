import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Label, RoundedLabel } from 'components/_components/Label';
import { SearchInput, SubmitInput, Search } from 'components/_components/Input';
import { PrimaryButton } from 'components/_components/Button';
import { RoundedCard } from 'components/_components/Card';
import Pagination from 'components/_components/Pagination';
import { StakingButtons, stakingElement, LiquidParams } from 'utils/_utils/EntityFieldDefs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const RenderElements = (element, idx, expanded, setExpanded) => {
  return (
    <Box
      key={idx}
      sx={{
        padding: '35px 30px 35px 60px',
        backgroundColor: '#000000',
        border: '1px solid #7070704C',
        borderRadius: '20px',
        position: 'relative'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box
          sx={{
            display: 'flex',
            '@media (max-width: 600px)': {
              flexDirection: 'column'
            }
          }}
        >
          <img src={element.imgUrl} width={100} height={100} alt="coin" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '30px',
              '@media (max-width: 600px)': {
                marginLeft: '0px'
              }
            }}
          >
            <Label text={element.value} sx={{ marginBottom: '8px' }} />
            <RoundedCard {...element.label} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '70%',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            '@media (max-width: 1500px)': {
              width: '100%'
            },
            '@media (max-width: 600px)': {
              flexDirection: 'column'
            }
          }}
        >
          {element.items.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                '@media (max-width: 600px)': {
                  marginTop: '20px'
                }
              }}
            >
              <Box
                sx={{
                  height: '70%',
                  '@media (max-width: 600px)': {
                    height: '100%'
                  }
                }}
              >
                <Label
                  text={item.label}
                  sx={{
                    textAlign: 'center',
                    '@media (max-width: 600px)': {
                      textAlign: 'start'
                    }
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '@media (max-width: 600px)': {
                      justifyContent: 'start'
                    }
                  }}
                >
                  <Label text={item.value} />
                  {item.img && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.img.imgUrl} width={16} height={16} alt="img" style={{ marginLeft: '10px' }} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              background: '#171717',
              width: '44px',
              height: '44px',
              padding: '0px',
              minWidth: '44px',
              position: 'absolute',
              right: '30px',
              top: '30px'
            }}
            onClick={() =>
              setExpanded(
                expanded.map((value, index) => {
                  if (index === idx) {
                    return !value;
                  }
                  return value;
                })
              )
            }
          >
            {!expanded[idx] && <ExpandMoreIcon sx={{ color: 'white' }} />}
            {expanded[idx] && <ExpandLessIcon sx={{ color: 'white' }} />}
          </Button>
        </Box>
      </Box>
      {expanded[idx] && (
        <Box
          sx={{
            margin: '35px -30px 0px -60px',
            paddingTop: '50px',
            borderTop: '1px solid #002B15'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              columnGap: '35px',
              rowGap: '25px',
              padding: '0px 30px',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <SubmitInput
              sx={{
                width: '30%',
                minWidth: '400px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  minWidth: 'fit-content'
                }
              }}
              value="600.55"
              size={38}
              btnValue="Harvest"
            />
            <SubmitInput
              sx={{
                width: '30%',
                minWidth: '400px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  minWidth: 'fit-content'
                }
              }}
              value="1,200.00"
              size={26}
              btnValue="Stake"
            />
            <SubmitInput
              sx={{
                width: '30%',
                minWidth: '400px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  minWidth: 'fit-content'
                }
              }}
              value="1,200.00"
              size={26}
              btnValue="Un Stake"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

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
      <Label text={{ ...props.label }} />
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
      <Label text={props.value} sx={{ marginTop: '5px' }} />
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
            '@media (max-width: 500px)': {
              marginLeft: '0px',
              marginTop: '10px'
            }
          }}
        >
          Harvest
        </Button>
      )}
    </Box>
  </Box>
);

const RenderLiquid = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '50px 50px',
          backgroundColor: '#000000',
          border: '1px solid #7070704C',
          borderRadius: '20px',
          flexWrap: 'wrap',
          rowGap: '25px',
          '@media (max-width: 500px)': {
            flexDirection: 'column'
          }
        }}
      >
        {LiquidParams.items.map((item, idx) => (
          <RenderRoundedCard key={idx} {...item} id={idx} />
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
          backgroundColor: '#000000'
        }}
      >
        <Label sx={{ marginTop: '60px' }} text={{ value: 'Stake SHM', size: 40, color: 'green' }} />
        <Label
          sx={{ marginTop: '10px' }}
          text={{ value: 'Stake SHM & Receive xSHM While Staking', color: 'grey', size: 18, weight: 100 }}
        />
        <Box
          sx={{
            width: '600px',
            '@media (max-width: 760px)': {
              width: '100%'
            }
          }}
        >
          <Search value="1,200.00" />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <RoundedLabel keyword="Balance" value="$SHMX 120,000.00" bgColor="#171717" />
          </Box>
          <PrimaryButton
            sx={{
              marginTop: '30px',
              marginBottom: '52px',
              width: '100%',
              minHeight: '85px',
              fontSize: '24px !important'
            }}
            label="Stake"
            hasFocus
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
};

function PriceStaking() {
  const [activeId, setActiveId] = useState(0);
  const elements = Array(5).fill(stakingElement);
  const [expanded, setExpanded] = useState(Array(5).fill(false));

  return (
    <Box
      sx={{
        backgroundImage: 'url("_img/projects/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '80px',
        position: 'relative',
        '@media (max-width: 600px)': {
          padding: '60px 2%'
        },
        padding: '60px 8%'
      }}
    >
      <img
        src="_img/projects/dot.png"
        alt="dot"
        style={{ position: 'absolute', top: '35px', left: '35px', width: '67px' }}
      />
      <img
        src="_img/projects/dot2.png"
        alt="dot"
        style={{
          position: 'absolute',
          bottom: '927px',
          left: '-37px',
          width: '115px',
          filter: 'blur(6px)'
        }}
      />
      <img
        src="_img/projects/dot3.png"
        alt="dot"
        style={{
          position: 'absolute',
          bottom: '882px',
          right: '46px',
          width: '105px',
          height: '90px',
          filter: 'blur(30px)'
        }}
      />
      <img
        src="_img/projects/dot4.png"
        alt="dot"
        style={{ position: 'absolute', bottom: '40px', right: '100px', width: '89px' }}
      />
      <Box>
        <Box sx={{ marginTop: '10px' }}>
          <Stack flexWrap="wrap" flexDirection="row" columnGap="28px" rowGap="15px">
            {StakingButtons.map((but, idx) => (
              <PrimaryButton
                key={idx}
                label={but}
                sx={{ padding: '20px 43px 20px 43px', color: '#585858' }}
                onClick={() => setActiveId(idx)}
                hasFocus={activeId === idx}
              />
            ))}
          </Stack>
        </Box>
        <Box sx={{ marginTop: '60px' }}>
          {(activeId === 0 || activeId === 1) && (
            <Box sx={{ display: 'flex', rowGap: '20px', flexDirection: 'column' }}>
              {elements.map((element, idx) => RenderElements(element, idx, expanded, setExpanded))}
            </Box>
          )}
          {activeId === 2 && RenderLiquid()}
        </Box>
      </Box>
    </Box>
  );
}

export default PriceStaking;
