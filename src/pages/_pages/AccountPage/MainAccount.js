import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { RoundedLabel, Label } from 'components/_components/Label';
import { AccountInfo } from '../../../utils/_utils/EntityFieldDefs';
import LeftStaking from '../StakingPage/LeftStaking';

function MainAccount() {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1000) {
      } else {
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        '@media (max-width: 600px)': {
          padding: '60px 2%'
        },
        position: 'unset',
        padding: '60px 8%'
      }}
    >
      <Box
        sx={{
          '@media (max-width: 1260px)': {
            flexDirection: 'column'
          },
          backgroundImage: 'url("_img/staking/background.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '38px',
          display: 'flex'
        }}
      >
        <LeftStaking />
        <Box
          sx={{
            padding: '50px 70px 60px 70px',
            width: '57%',
            '@media (max-width: 1260px)': {
              width: '100%'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              '@media (max-width: 800px)': {
                flexDirection: 'column',
                alignItems: 'start',
                rowGap: '15px'
              }
            }}
          >
            <RoundedLabel keyword={AccountInfo.balance.keyword} value={AccountInfo.balance.value} bgColor="#171717" />
            <RoundedLabel keyword={AccountInfo.buy.keyword} value={AccountInfo.buy.value} bgColor="#171717" />
          </Box>
          <RoundedLabel keyword={AccountInfo.wallet.keyword} value={AccountInfo.wallet.value} bgColor="#171717" />
          <Box
            sx={{
              width: '100%',
              border: '1px solid #02FF7B',
              borderRadius: '8px',
              backgroundColor: '#171717',
              padding: '30px 28px 0px 28px',
              marginTop: '12px',
              '@media (max-width: 500px)': {
                paddingLeft: '15px',
                paddingRight: '5px'
              }
            }}
          >
            {AccountInfo.accountBox.map((element, index) => (
              <div key={index} style={{ marginBottom: '30px' }}>
                {/* Added Part Start */}
                <Box
                  sx={{
                    width: '188px',
                    height: '37px',
                    backgroundColor: '#4B4B4B',
                    color: '#02FF7B',
                    fontSize: '17px',
                    padding: '5px 15px',
                    borderRadius: '7px'
                  }}
                >
                  {element.keyword}
                </Box>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Label
                    sx={{ overflow: 'hidden' }}
                    text={{
                      value: element.value,
                      size: 26
                    }}
                  />
                  <img src="_img/icon/pencil.png" width="26px" style={{ margin: '8px' }} />
                </div>
                {/* Added Part End */}
              </div>
            ))}
          </Box>
          {/* Total View */}
          <Box
            sx={{
              display: 'flex',
              marginTop: '30px',
              '@media (max-width: 700px)': {
                flexDirection: 'column',
                rowGap: '10px'
              }
            }}
          >
            {AccountInfo.totalView.map((element, index) => (
              <Box
                key={index}
                sx={{
                  marginRight: '60px',
                  '@media (max-width: 700px)': {
                    marginRight: '0px'
                  }
                }}
              >
                <Label
                  text={{
                    value: element.keyword,
                    size: 20,
                    weight: 100,
                    color: 'green'
                  }}
                />
                <Label
                  text={{
                    value: element.value,
                    size: 40
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainAccount;
