import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Label } from 'components/_components/Label';
import { RoundedCard } from 'components/_components/Card';
import { PrimaryButton } from 'components/_components/Button';
import { LinearProgressBar } from 'components/_components/ProgressBar';

const Projectcard = ({ projectInfo }) => {
  const [walletConnected, setWalletConnected] = useState(false);

  var componentInfo = {
    icon: projectInfo.logo,
    label: projectInfo.projectName,
    pair_label: projectInfo.projectName + " / SHM",
    price1: `1 SHM = ${projectInfo.presaleRate} ${projectInfo.projectName}`,
    price2: `1 ${projectInfo.projectName} = ${1 / projectInfo.presaleRate} SHM`,
    progress: {
      title: 'registration opens in 2 days, 3 hours',
      currProg: Number(projectInfo.weiRaised / projectInfo.hardCap * 100).toFixed(1),
      text: projectInfo.weiRaised + ' SHM',
      value: `${projectInfo.weiRaised * projectInfo.presaleRate} / ${projectInfo.hardCap * projectInfo.presaleRate}  ${projectInfo.projectName}`
    },
    date_register: ' ~ ' + new Date(projectInfo.startDateTime).toUTCString(), //'Apr 14, 14:00 - Apr 16, 11:00 UTC'
    date_sale: new Date(projectInfo.startDateTime).toUTCString() + ' - ' + new Date(projectInfo.endDateTime).toUTCString(), //'Apr 16, 14:00 - Apr 17, 14:00 UTC'
    date_fcfs: new Date(projectInfo.endDateTime).toUTCString(),// 'Apr 17, 13:20 UTC'
  };

  return (
    <Box
      sx={{
        '@media (max-width: 1500px)': {
          width: '100%',
          marginLeft: '0px',
          height: 'auto'
        },
        width: '620px',
        height: '850px',
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
                label="Levels"
                bgColor='#FF77774F'
                color='#FF5D5D'
                size={14}
                width={90}
                height={30}
              />
              <RoundedCard
                label="KYC"
                bgColor='#FFD5002B'
                color='#FFD500'
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
          {walletConnected && (
            <Label
              sx={{ marginBottom: '15px', textAlign: 'center' }}
              text={{ value: 'This IDO requires KYC verification.', size: 18, weight: 100 }}
            />
          )}
          <PrimaryButton
            label={walletConnected ? 'Verify KYC' : 'Connect Wallet'}
            sx={{
              padding: '8px',
              width: '220px'
            }}
            hasFocus={true}
            onClick={() => setWalletConnected(!walletConnected)}
          />
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
            href: ''
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
              <Label sx={{ marginLeft: '15px', minWidth: '75px' }} text={{
                value: 'IDO and distribution on Shardeum chain',
                size: 18,
                weight: 100
              }} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <img src="_img/icon/register.png" width={31} height={31} style={{ marginTop: '15px' }} />
              <Label sx={{ marginLeft: '15px', minWidth: '75px' }} text={{
                value: 'Register',
                size: 18,
                weight: 100
              }} />
              <Label sx={{ marginLeft: '40px' }} text={{
                value: componentInfo.date_register,
                size: 18
              }} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <img src="_img/icon/money-bag.png" width={31} height={31} style={{ marginTop: '25px' }} />
              <Label sx={{ marginLeft: '15px', minWidth: '75px' }} text={{
                value: 'Sale',
                size: 18,
                weight: 100
              }} />
              <Label sx={{ marginLeft: '40px' }} text={{
                value: componentInfo.date_sale,
                size: 18
              }} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <img src="_img/icon/training.png" width={31} height={31} style={{ marginTop: '15px' }} />
              <Label sx={{ marginLeft: '15px', minWidth: '75px' }} text={{
                value: 'FCFS',
                size: 18,
                weight: 100
              }} />
              <Label sx={{ marginLeft: '40px' }} text={{
                value: componentInfo.date_fcfs,
                size: 18
              }} />
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Projectcard;
