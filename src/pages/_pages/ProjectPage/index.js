import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';

import useActiveWeb3React from 'hooks/useActiveWeb3React';
import apis from 'services';

export default function ProjectPage() {
  const { pathname, hash, search } = useLocation();

  const tokenAddress = new URLSearchParams(search).get('address');

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await apis.getProjectDetails(tokenAddress, {});

      const { pool } = response.data;
      setData(pool);

    })();
  }, []);

  const sample_projectinfo = {
    "ipfs": {
      "logo": "https://snipboard.io/SJgPjt.jpg",
      "website": "https://website.com",
      "twitter": "https://tw.com",
      "github": "https://gh.com",
      "telegram": "https://tg.com",
      "discord": "https://discord.com",
      "description": "This token is for testing"
    },
    "whiteLists": [],
    "participantsAddresses": [],
    "alarms": [],
    "_id": "6436bc87438ccb23b065154a",
    "address": "0x8696DD8C78E66b028c0A440E02b951F86Bf55Ea0",
    "owner": "0x712E60AD613492633571793eb69aA3C5eAdB5e83",
    "weiRaised": 2.6,
    "hardCap": 10,
    "softCap": 0.001,
    "presaleRate": 1000,
    "dexCapPercent": 60,
    "dexRate": 1,
    "projectTokenAddress": "0x9DbAacCf4eF5a954271dB02a51ec383D6e360a45",
    "status": "online",
    "tier": "0",
    "kyc": false,
    "startDateTime": "2023-04-12T14:20:00.000Z",
    "endDateTime": "2023-04-12T15:25:00.000Z",
    "listDateTime": "2023-04-28T14:12:00.000Z",
    "minAllocationPerUser": 0.001,
    "maxAllocationPerUser": 10,
    "dexLockup": "31",
    "extraData": "QmQ9V4z1zJxua7xKPc8bNA7AUE4RNFdsZFi5qonPwmLZWx",
    "whitelistable": true,
    "decimals": "18",
    "poolPercentFee": "0",
    "symbol": "BUSD",
    "name": "BUSD",
    "totalSupply": 0,
    "audit": false,
    "auditLink": "auditLink",
    "teamVesting_amount": 0,
    "teamVesting_unlocked_amount": 0,
    "teamVesting_first_percent": 0,
    "teamVesting_first_period": 0,
    "teamVesting_each_percent": 0,
    "teamVesting_each_period": 0,
    "description": "This token is for testing",
    "roadmap_description": "2023 Q1: Token launch, 2023 Q2: DEX listing",
    "roadmap_url": "https://snipboard.io/VqdLuk.jpg",
    "about_description": "about....",
    "about_url": "https://snipboard.io/xWl8BT.jpg",
    "features_description": "features...",
    "features_url": "https://snipboard.io/JCH3Xe.jpg",
    "teams_description": "teams ...",
    "teams_url": "https://snipboard.io/hNmUvc.jpg",
    "tokenomics_description": "10% developing, 30% presale ...",
    "tokenomics_url": "https://snipboard.io/S2vwcD.jpg",
    "twitter_followers": 0,
    "logo": "https://snipboard.io/7l4PMK.jpg",
    "projectName": "Notora",
    "deal": "IDO",
    "poster": "https://snipboard.io/F0wMfL.jpg",
    "category": "Startup",
    "blockchain": "Binance",
    "tgi": "Solana",
    "type": "Unlocked",
    "createdAt": "2023-04-12T14:13:27.290Z",
    "updatedAt": "2023-04-12T14:23:29.712Z",
    "__v": 0
  };

  return (
    <Box
      sx={{
        marginTop: '70px',
        '@media (max-width: 600px)': {
          padding: '60px 2%'
        },
        '@media (max-width: 1500px)': {
          flexDirection: 'column',
          rowGap: '50px',
          columnGap: '50px'
        },
        padding: '60px 8%',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <ProjectDetails projectInfo={data} />
      <ProjectCard projectInfo={data} />
    </Box>
  );
}
