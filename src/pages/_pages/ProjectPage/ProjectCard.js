import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ProjectCard } from 'utils/_utils/Projects';
import { Label } from 'components/_components/Label';
import { RoundedCard } from 'components/_components/Card';
import { PrimaryButton } from 'components/_components/Button';
import { LinearProgressBar } from 'components/_components/ProgressBar';

const Logo = ({ size }) => (
  <Box>
    <img src={ProjectCard.icon} alt={ProjectCard.label} width={size} />
  </Box>
);

const renderDetails = () => (
  <Box sx={{ display: 'flex', rowGap: '15px', flexDirection: 'column' }}>
    {ProjectCard.details.map((detail, idx) => (
      <Box key={idx} sx={{ display: 'flex' }}>
        <img src={detail.imgUrl} alt={detail.imgUrl} width={31} height={31} />
        <Label sx={{ marginLeft: '15px', minWidth: '75px' }} text={detail.label} />
        {detail.value && <Label sx={{ marginLeft: '40px' }} text={detail.value} />}
      </Box>
    ))}
  </Box>
);

const Projectcard = () => {
  const [walletConnected, setWalletConnected] = useState(false);

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
          <Logo size={100} />
          <Box sx={{ marginLeft: '35px' }}>
            <Label text={{ value: ProjectCard.label, size: 30 }} sx={{ marginBottom: '4px' }} />
            <Label text={{ value: 'PLAYZAP / BUSD', color: 'green', size: 16 }} />
            <Box sx={{ display: 'flex', columnGap: '8px' }}>
              {ProjectCard.labels.map((price, idx) => (
                <RoundedCard
                  key={idx}
                  label={price.label}
                  bgColor={price.bgColor}
                  color={price.color}
                  size={14}
                  width={90}
                  height={30}
                />
              ))}
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
          text={{ value: '1 BUSD = 8.333 PLAYZAP', size: 24, color: 'green', weight: 600 }}
        />
        <Label
          sx={{ marginTop: '8px' }}
          text={{ value: '1 PLAYZAP = 0.12 BUSD', size: 18, color: 'green', weight: 100 }}
        />
        <Box sx={{ marginTop: '38px', display: 'flex', justifyContent: 'space-between' }}>
          <Label text={{ value: ProjectCard.progress.title, size: 18, weight: 100 }} />
          <Label text={{ value: `${ProjectCard.progress.currProg}%`, size: 18, color: 'green', weight: 100 }} />
        </Box>
        <Box sx={{ marginTop: '8px' }}>
          <LinearProgressBar value={ProjectCard.progress.prog} bgColor="grey" />
          <Box sx={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <Label text={{ value: ProjectCard.progress.text, size: 18, color: 'grey', weight: 100 }} />
            <Label text={{ value: ProjectCard.progress.value, size: 18, color: 'grey', weight: 100 }} />
          </Box>
        </Box>
        <Box sx={{ marginTop: '42px' }}>{renderDetails()}</Box>
      </Box>
    </Box>
  );
};

export default Projectcard;
