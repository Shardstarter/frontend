import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Label } from 'components/_components/Label';
import { RoundedCard } from 'components/_components/Card';
import { PrimaryButton } from 'components/_components/Button';
import { LinearProgressBar } from 'components/_components/ProgressBar';
import { SubmitInput } from 'components/_components/Input';
import { useIDOPoolStatus, useMainStakingStatus } from 'hooks/useMyStatus';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ADMIN_WALLETS } from 'config/constants';
// import AccountPopover from 'layouts/dashboard/AccountPopover';

const Projectcard = ({ projectInfo }) => {
  const { account, library } = useActiveWeb3React();
  const { tier } = useMainStakingStatus();
  const {
    myMaxDeposit, tokenBalance,
    stage,
    stage_label,
    action,
    action_label,
    action_description,
    action_available,
    handleFinalize,
    deletePool
  } = useIDOPoolStatus(projectInfo);

  var componentInfo = {
    icon: projectInfo.logo,
    label: projectInfo.projectName,
    tier_label: tier,
    stage_label: stage_label,
    pair_label: projectInfo.projectName + ' / SHM',
    price1: `1 SHM = ${projectInfo.presaleRate} ${projectInfo.projectName}`,
    price2: `1 ${projectInfo.projectName} = ${1 / projectInfo.presaleRate} SHM`,
    progress: {
      title: 'Fund raised',
      currProg: Number((projectInfo.weiRaised / projectInfo.hardCap) * 100).toFixed(1),
      text: projectInfo.weiRaised + ' SHM',
      value: `${projectInfo.weiRaised * projectInfo.presaleRate} / ${projectInfo.hardCap * projectInfo.presaleRate}  ${projectInfo.projectName
        }`
    },
    date_register: ' ~ ' + new Date(projectInfo.startDateTime).toUTCString(), //'Apr 14, 14:00 - Apr 16, 11:00 UTC'
    date_sale:
      new Date(projectInfo.startDateTime).toUTCString() + ' - ' + new Date(projectInfo.endDateTime).toUTCString(), //'Apr 16, 14:00 - Apr 17, 14:00 UTC'
    date_fcfs: new Date(projectInfo.endDateTime).toUTCString() // 'Apr 17, 13:20 UTC'
  };

  const [amount, setAmount] = useState(0);

  return (
    <Box
      sx={{
        '@media (max-width: 1500px)': {
          width: '100%',
          marginLeft: '0px',
          height: 'auto'
        },
        width: '620px',
        height: '950px',
        backgroundImage: 'url("_img/cards/detail_bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '38px',
        padding: '50px',
        marginLeft: '50px'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <img src={componentInfo.icon} alt={componentInfo.label} width={100} />
          </Box>
          <Box sx={{ marginLeft: '35px' }}>
            <Label text={{ value: componentInfo.label, size: 30 }} sx={{ marginBottom: '4px' }} />
            <Label text={{ value: componentInfo.pair_label, color: 'green', size: 16 }} />
            <Box sx={{ display: 'flex', columnGap: '8px' }}>
              <RoundedCard
                label={componentInfo.tier_label}
                bgColor="#FF77774F"
                color="#FF5D5D"
                size={14}
                width={90}
                height={30}
              />
              <RoundedCard
                label={componentInfo.stage_label}
                bgColor="#FFD5002B"
                color="#FFD500"
                size={14}
                width={90}
                height={30}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '40px',
            backgroundColor: '#171717',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            padding: '15px 0px'
          }}
        > 
          <Label
            sx={{ marginBottom: '25px', textAlign: 'center' }}
            text={{ value: account ? action_description : 'Please connect wallet', size: 18, weight: 100 }}
          />        
          {account &&
            action_available &&
            (stage == 1 || stage == 3 ? (
              <>
                <SubmitInput
                  sx={{
                    width: '30%',
                    minWidth: '350px',
                    '@media (max-width: 1000px)': {
                      width: '100%',
                      minWidth: 'fit-content'
                    }
                  }}
                  size={38}
                  btnValue={action_label}
                  label={`SHM`}
                  value={amount}
                  onChangeValue={(value) => setAmount(value)}
                  onClick={() => action(amount)}
                />
                <Box sx={{ width: "350px", display: 'flex', justifyContent: 'end', cursor: 'pointer', color: '#02FF7B' }}
                  onClick={() => setAmount(Number(myMaxDeposit))}>
                  <p>max</p>
                </Box>
              </>

            ) : (
              <PrimaryButton
                label={action_label}
                sx={{
                  padding: '8px',
                  width: '220px'
                }}
                hasFocus={true}
                onClick={() => action()}
              />
            ))}
        </Box>
        <Label
          sx={{ marginTop: '8px', textAlign: 'right' }}
          text={{
            value: 'How to participate',
            size: 14,
            type: 'link',
            color: 'grey',
            weight: 300,
            underlined: true,
            href: 'https://shardstarter-io.gitbook.io/shardstarter/the-tier-system'
          }}
        />
        <Label
          sx={{ marginTop: '20px' }}
          text={{ value: componentInfo.price1, size: 24, color: 'green', weight: 600 }}
        />
        <Label
          sx={{ marginTop: '8px' }}
          text={{ value: componentInfo.price2, size: 18, color: 'green', weight: 100 }}
        />
        <Box sx={{ marginTop: '38px', display: 'flex', justifyContent: 'space-between' }}>
          <Label text={{ value: componentInfo.progress.title, size: 18, weight: 100 }} />
          <Label text={{ value: `${componentInfo.progress.currProg}%`, size: 18, color: 'green', weight: 100 }} />
        </Box>
        {/* progress bar */}
        <Box sx={{ marginTop: '8px' }}>
          <LinearProgressBar value={componentInfo.progress.currProg} bgColor="grey" />
          <Box sx={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <Label text={{ value: componentInfo.progress.text, size: 18, color: 'grey', weight: 100 }} />
            <Label text={{ value: componentInfo.progress.value, size: 18, color: 'grey', weight: 100 }} />
          </Box>
        </Box>
        {/* list */}
        <Box sx={{ marginTop: '42px' }}>
          <Box sx={{ display: 'flex', rowGap: '15px', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <img src="_img/icon/wifi.png" width={31} height={31} />
              <Label
                sx={{ marginLeft: '15px', minWidth: '75px' }}
                text={{
                  value: 'IDO and distribution on Shardeum chain',
                  size: 18,
                  weight: 100
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                '@media (max-width: 800px)': {
                  flexWrap: 'wrap'
                }
              }}
            >
              <Box sx={{ display: 'flex', minWidth: "110px" }}>
                <img src="_img/icon/register.png" width={31} height={31} style={{ marginTop: '15px' }} />
                <Label
                  sx={{ marginLeft: '15px', minWidth: '75px' }}
                  text={{
                    value: 'Register',
                    size: 18,
                    weight: 100
                  }}
                />
              </Box>
              <Label
                sx={{ marginLeft: '40px' }}
                text={{
                  value: componentInfo.date_register,
                  size: 18
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                '@media (max-width: 800px)': {
                  flexWrap: 'wrap'
                }
              }}
            >
              <Box sx={{ display: 'flex', minWidth: "110px" }}>
                <img src="_img/icon/money-bag.png" width={31} height={31} style={{ marginTop: '25px' }} />
                <Label
                  sx={{ marginLeft: '15px', minWidth: '75px' }}
                  text={{
                    value: 'Sale',
                    size: 18,
                    weight: 100
                  }}
                />
              </Box>
              <Label
                sx={{ marginLeft: '40px' }}
                text={{
                  value: componentInfo.date_sale,
                  size: 18
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                '@media (max-width: 800px)': {
                  flexWrap: 'wrap'
                }
              }}
            >
              <Box sx={{ display: 'flex', minWidth: "110px" }}>
                <img src="_img/icon/training.png" width={31} height={31} style={{ marginTop: '15px' }} />
                <Label
                  sx={{ marginLeft: '15px', minWidth: '75px' }}
                  text={{
                    value: 'FCFS',
                    size: 18,
                    weight: 100
                  }}
                />
              </Box>
              <Label
                sx={{ marginLeft: '40px' }}
                text={{
                  value: componentInfo.date_fcfs,
                  size: 18
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* admin function */}
        {stage == 4 && ADMIN_WALLETS.includes(account) && (
          <PrimaryButton
            label="Admin: Finalize"
            sx={{
              margin: '8px',
              width: '220px'
            }}
            hasFocus={true}
            onClick={() => handleFinalize()}
          />
        )}
        {ADMIN_WALLETS.includes(account) && (
          <PrimaryButton
            label="Admin: Delete Pool"
            sx={{
              marginTop: '50px',
              width: '220px'
            }}
            hasFocus={true}
            onClick={() => deletePool()}
          />
        )}
      </Box>
    </Box>
  );
};

export default Projectcard;
