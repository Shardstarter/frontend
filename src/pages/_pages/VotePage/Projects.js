import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Label } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';
import { VoteButtons } from 'utils/_utils/EntityFieldDefs';
import FilterBar from 'components/_components/FilterBar';
import { RoundedCard } from 'components/_components/Card';
import { LinearProgressBar } from 'components/_components/ProgressBar';
import { IconButtonGroup } from 'components/_components/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import apis from 'services';
import useActiveWeb3React from 'hooks/useActiveWeb3React';


const Projects = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useActiveWeb3React();

  const [activeId, setActiveId] = useState(0);

  const [votes, setVotes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await apis.getVotes({});

      if (response.data.result) {
        setVotes(response.data.data)
      } else {
        enqueueSnackbar(response.data.message, {
          variant: 'danger'
        });
      }
    })();
  }, []);


  var tempVotes = [{
    "up": 2060,
    "down": 200,
    "_id": "643773f23c51f3308049adc7",
    "projectName": "VoteTest1",
    "logo": "https://snipboard.io/pFnzT4.jpg",
    "ticker": "Token",
    "website": "https://safelaunch.io/",
    "telegram": "https://safelaunch.io/",
    "twitter": "https://safelaunch.io/",
    "discord": "https://safelaunch.io/",
    "participants": [
      {
        "_id": "643773fb3c51f3308049add0",
        "wallet_address": "0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619",
        "power": 1050,
        "isUp": true
      },
      {
        "_id": "643774d83c51f3308049ae08",
        "wallet_address": "0x42E8c710Cff480eDF060e6d5cC385c01f55C88F4",
        "power": 200,
        "isUp": false
      },
      {
        "_id": "643a8c9bbc5728457b221f75",
        "wallet_address": "0x712E60AD613492633571793eb69aA3C5eAdB5e83",
        "power": 1010,
        "isUp": true
      }
    ],
    "createdAt": "2023-04-13T03:16:02.563Z",
    "updatedAt": "2023-04-15T11:38:03.235Z"
  }];

  const [showing_votes, setShowingVotes] = useState([]);
  useEffect(() => {
    var new_arr = votes.map((item) => {
      return {
        imgUrl: item.logo,
        value: item.projectName,
        label: item.ticker,
        social: [
          {
            img: '_img/icon/chain.png',
            path: item.website
          },
          {
            img: '_img/icon/twitter.png',
            path: item.twitter
          },
          {
            img: '_img/icon/telegram.png',
            path: item.telegram
          },
          {
            img: '_img/icon/reddit.png',
            path: item.discord
          },
        ],
        liked: 0,  //1, -1, 0
        percent: Number(item.up / (item.up + item.down) * 100).toFixed(1),
        percent1_label: Number(item.up / (item.up + item.down) * 100).toFixed(1) + " %",
        percent2_label: Number(item.down / (item.up + item.down) * 100).toFixed(1) + " %",
        links: [
          {
            value: 'Whitepapers',
            href: '/'
          },
          {
            value: 'Pitchdeck',
            href: '/'
          },
          {
            value: 'Audit Report',
            href: '/'
          }
        ]
      }
    })
    setShowingVotes(new_arr)
  }, [votes])

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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '@media (max-width: 1200px)': {
                flexDirection: 'column',
                rowGap: '20px'
              }
            }}
          >
            <Stack flexWrap="wrap" flexDirection="row" columnGap="28px" rowGap="15px">
              {VoteButtons.map((but, idx) => (
                <PrimaryButton
                  key={idx}
                  label={but}
                  sx={{ padding: '20px 43px 20px 43px', color: '#585858' }}
                  onClick={() => setActiveId(idx)}
                  hasFocus={activeId === idx}
                />
              ))}
            </Stack>
            <FilterBar options={['PolkaFantasy', 'NetVRK', 'Bulkperks', 'Solchicks', 'SIDUS']} />
          </Box>
          <Box sx={{ marginTop: '60px', display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
            {showing_votes.map((project, idx) => (
              <VoteCard key={idx} project={project} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


const VoteCard = ({ project }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        width: '100%',
        flexWrap: 'wrap',
        rowGap: '20px',
        borderRadius: '20px',
        padding: '35px 60px 42px 60px',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 100
      }}
    >
      <Box>
        <Box sx={{ display: 'flex' }}>
          <img src={project.imgUrl} alt="imgUrl" width={100} />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
            <Label text={{ value: project.value, size: 30 }} />
            <RoundedCard bgColor="#171717" color="#02FF7B" label={project.label} width={119} height={43} />
          </Box>
        </Box>
        <Box sx={{ marginTop: '28px' }}>
          <IconButtonGroup elements={project.social} size={50} />
        </Box>
      </Box>
      <Box
        sx={{
          width: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '160px', display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <img
              src={project.liked === 1 ? '_img/icon/liked.png' : '_img/icon/like.png'}
              alt="like"
              width={50}
              style={{ cursor: 'pointer' }}
            />
            <Label
              sx={{ marginTop: '20px' }}
              text={{ value: 'Yes', size: 22, color: project.liked === 1 ? 'green' : 'white' }}
            />
          </Box>
          <Box>
            <img
              src={project.liked === -1 ? '_img/icon/hated.png' : '_img/icon/hate.png'}
              alt="like"
              width={50}
              style={{ cursor: 'pointer' }}
            />
            <Label
              sx={{ marginTop: '20px' }}
              text={{ value: 'No', size: 22, color: project.liked === -1 ? 'green' : 'white' }}
            />
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Label text={{ value: project.percent1_label, color: 'grey', size: 18, weight: 100 }} />
            <Label text={{ value: project.percent2_label, color: 'grey', size: 18, weight: 100 }} />
          </Box>
          <LinearProgressBar value={project.percent} bgColor="grey" />
        </Box>
      </Box>
      <Box
        sx={{
          height: '190px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        {project.links.map((link, idx) => (
          <Box key={idx} sx={{ display: 'flex' }}>
            <Label text={{ value: link.value, type: 'link', href: link.href }} sx={{ marginRight: '12px' }} />
            <Link to={link.href}>
              <LaunchIcon />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Projects;
