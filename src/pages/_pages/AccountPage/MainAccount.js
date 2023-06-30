import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { RoundedLabel, Label } from 'components/_components/Label';
import LeftStaking from '../StakingPage/LeftStaking';
import { Link } from 'react-router-dom';

import apis from 'services';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useMainStakingStatus } from 'hooks/useMyStatus';

function MainAccount({unclaimed}) {
  const { account } = useActiveWeb3React();
  const { tier, staked_amount, wallet_balance } = useMainStakingStatus();

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

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserEmail = async () => {
      const response = await apis.getUserInfo({
        wallet_address: account
      });
      if (response.data.result) {
        setUserInfo(response.data.data);
      }
      else {
        alert(response.data.message)
      }
    }
    if (account) getUserEmail();
  }, [account])

  const saveEmail = async () => {
    try {
      const userInput = prompt("Enter a email:", userInfo?.email);
      if (userInput) {
        const response = await apis.setUserEmail({
          wallet_address: account,
          email: userInput
        });
        if (response.data.result) {
          alert('success');
          window.location.reload();
        }
        else {
          alert(response.data.message)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const saveNonEVM = async () => {
    try {
      const userInput = prompt("Enter a email:", userInfo?.nonevm);
      if (userInput) {
        const response = await apis.setUserNonEVM({
          wallet_address: account,
          nonevm: userInput
        });
        if (response.data.result) {
          alert('success');
          window.location.reload();
        }
        else {
          alert(response.data.message)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  var AccountInfo = {
    balance: {
      keyword: 'Balance',
      value: '$SHMX ' + Number(wallet_balance).toFixed(3)
    },
    buy: {
      keyword: 'Buy',
      value: '$SHMX'
    },
    wallet: {
      keyword: 'Wallet',
      value: account
    },
    totalView: [
      {
        keyword: 'Staked $SHMX',
        value: staked_amount + ' SHMX'
      },
      {
        keyword: 'Unclaimed Tokens',
        value: unclaimed 
      }
    ]
  };

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
            <Link to="/swap">
              <RoundedLabel keyword={AccountInfo.buy.keyword} value={AccountInfo.buy.value} bgColor="#171717" />
            </Link>
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
            {/* NonEVM wallet */}
            <div style={{ marginBottom: '30px' }}>
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
                NON EVM WALLET
              </Box>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Label
                  sx={{ overflow: 'hidden' }}
                  text={{
                    value: userInfo?.nonevm,
                    size: 26
                  }}
                />
                <img src="_img/icon/pencil.png" width="26px" style={{ margin: '8px', cursor: 'pointer' }} onClick={() => saveNonEVM()} />
              </div>
            </div>
            {/* Email */}
            <div style={{ marginBottom: '30px' }}>
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
                EMAIL ADDRESS
              </Box>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Label
                  sx={{ overflow: 'hidden' }}
                  text={{
                    value: userInfo?.email,
                    size: 26
                  }}

                />
                <img src="_img/icon/pencil.png" width="26px" style={{ margin: '8px', cursor: 'pointer' }} onClick={() => saveEmail()} />
              </div>
            </div>
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
