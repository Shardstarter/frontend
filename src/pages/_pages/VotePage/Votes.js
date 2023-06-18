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
import { useMainStakingStatus } from 'hooks/useMyStatus';


const Votes = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useActiveWeb3React();
  const { tvl, staked_amount: vote_power } = useMainStakingStatus();

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

  const [filter, setFilter] = useState('All'); //filter
  const [showing_votes, setShowingVotes] = useState([]); //modified votes 
  useEffect(() => {
    var new_arr = votes
      .filter(item => (filter == 'All' || item.ticker?.includes(filter)))
      .filter(item => activeId == 0 || activeId == 1) //only for "All" and "Open" button
      .map((item) => {
        let found = false, liked = false;
        item.participants.find((item) => {
          if (item.wallet_address == account) {
            found = true;
            liked = item.isUp;
          }
        });

        return {
          id: item._id,
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
          liked: found ? (liked ? 1 : -1) : 0,  //1, -1, 0
          percent: Number(item.up / tvl * 100).toFixed(1),
          percent1_label: Number(item.up / tvl * 100).toFixed(1) + " %",
          percent2_label: Number(item.down / tvl * 100).toFixed(1) + " %",
          links: [
            {
              value: 'Whitepapers',
              href: item.whitepaper
            },
            {
              value: 'Pitchdeck',
              href: item.pitchdeck
            },
            {
              value: 'Audit Report',
              href: item.audit
            }
          ]
        }
      })
      .reverse();
    setShowingVotes(new_arr)
  }, [votes, tvl, filter, activeId])

  const placeVote = async (vote_id, isUp) => {
    try {
      const response = await apis.placeVote({
        vote_id,
        wallet_address: account,
        power: vote_power,
        isUp
      });
      if (response.data.result) {
        enqueueSnackbar('success', {
          variant: 'success'
        });
        window.location.reload()
      } else {
        enqueueSnackbar(response.data.message, {
          variant: 'danger'
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'danger'
      });
    }
  }

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
            <FilterBar options={['All', 'Governance', 'Funding', 'Project', 'Policy', 'Community']} onChangeAction={setFilter} />
          </Box>
          <Box sx={{ marginTop: '60px', display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
            {showing_votes.map((vote, idx) => (
              <VoteCard key={idx} vote={vote}
                onClickYes={() => vote.liked == 0 ? placeVote(vote.id, true) : alert('Already voted')}
                onClickNo={() => vote.liked == 0 ? placeVote(vote.id, false) : alert('Already voted')}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


const VoteCard = ({ vote, onClickYes, onClickNo }) => {
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
          <img src={vote.imgUrl} alt="imgUrl" width={100} />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
            <Label text={{ value: vote.value, size: 30 }} />
            <RoundedCard bgColor="#171717" color="#02FF7B" label={vote.label} width={250} height={43} />
          </Box>
        </Box>
        <Box sx={{ marginTop: '28px' }}>
          <IconButtonGroup elements={vote.social} size={50} />
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
              src={vote.liked === 1 ? '_img/icon/liked.png' : '_img/icon/like.png'}
              alt="like"
              width={50}
              style={vote.liked == 0 ? { cursor: 'pointer' } : {}}
              onClick={onClickYes}
            />
            <Label
              sx={{ marginTop: '20px' }}
              text={{ value: 'Yes', size: 22, color: vote.liked === 1 ? 'green' : 'white' }}
            />
          </Box>
          <Box>
            <img
              src={vote.liked === -1 ? '_img/icon/hated.png' : '_img/icon/hate.png'}
              alt="like"
              width={50}
              style={vote.liked == 0 ? { cursor: 'pointer' } : {}}
              onClick={onClickNo}
            />
            <Label
              sx={{ marginTop: '20px' }}
              text={{ value: 'No', size: 22, color: vote.liked === -1 ? 'green' : 'white' }}
            />
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Label text={{ value: vote.percent1_label, color: 'grey', size: 18, weight: 100 }} />
            <Label text={{ value: vote.percent2_label, color: 'grey', size: 18, weight: 100 }} />
          </Box>
          <LinearProgressBar value={vote.percent} bgColor="grey" />
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
        {vote.links.map((link, idx) => (
          <Box key={idx} sx={{ display: 'flex' }}>
            <Label text={{ value: link.value, type: 'text' }} sx={{ marginRight: '12px' }} />
            <Link to={link.href} onClick={(event) => {
              event.preventDefault();
              window.open(event.currentTarget.href, '_blank');
            }}>
              <LaunchIcon />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Votes;
