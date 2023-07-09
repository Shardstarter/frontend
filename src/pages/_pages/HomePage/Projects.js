import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Label } from 'components/_components/Label';
import { SearchInput } from 'components/_components/Input';
import { PrimaryButton } from 'components/_components/Button';
import { ProjectCard } from 'components/_components/Card';
import Pagination from 'components/_components/Pagination';
import FilterBar from 'components/_components/FilterBar';
import { ProjectButtons, Fantasy, Solchicks, NetVRK, Bulkperks, Sidus } from 'utils/_utils/EntityFieldDefs';
import { SecondaryButton } from 'components/_components/Button';
// my insert
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import apis from 'services';
import { getPools } from 'redux/slices/pools';

const Projects = () => {
  const [activeId, setActiveId] = useState(0);
  const [curId, setCurId] = useState(0);
  // const projects = [Fantasy, Solchicks, NetVRK, Bulkperks, Sidus, Fantasy];
  const [projects, setProjects] = useState([]);

  const dispatch = useDispatch();

  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await dispatch(getPools(network, tab, account));
      const response = await apis.getDeals();
      console.log('apis.getDeals===>', response)

      const _pools = response.data.pools;
      _pools.map((pool) => {
        pool.privacy = pool?.whitelistable ? 'Private Deal' : 'Public Deal';
        pool.tag = pool?.deal;

        var startDateTime = new Date(pool.startDateTime)
        var endDateTime = new Date(pool.endDateTime)
        var nowDateTime = new Date();

        if (nowDateTime < startDateTime) pool.status = 1; //upcoming
        else if (nowDateTime <= endDateTime) pool.status = 2; //open
        else if (nowDateTime > endDateTime) pool.status = 3; //completed
      })
      setProjects(_pools);


    })();
    return () => (unmounted = true);
  }, [account, dispatch, network, tab]);

  const [filter, setFilter] = useState('All'); //filter

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
        <Box
          sx={{
            display: 'flex',
            '@media (max-width: 800px)': {
              flexDirection: 'column'
            }
          }}
        >
          <Label
            text={{
              value: 'Projects',
              size: 40
            }}
            sx={{
              '@media (max-width: 800px)': {
                marginRight: '0px',
                marginBottom: '20px'
              },
              marginRight: '120px'
            }}
          />
          <SearchInput placeholder="Search" />
        </Box>
        <Box sx={{ marginTop: '55px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap:"10px",
              '@media (max-width: 1200px)': {
                flexDirection: 'column',
                rowGap: '20px',
              }
            }}
          >
            <Stack
              width="725px"
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-start"
              rowGap="20px"
              gap= "10px"
              sx={{
                '@media (max-width: 1200px)': {
                  width: '100%',
                  justifyContent:"flex-start"
                }
              }}
            >
              {ProjectButtons.map((but, idx) => (
                <PrimaryButton
                  key={idx}
                  label={but}
                  sx={{ padding: '20px 23px 20px 23px', color: '#585858',
                  '@media (max-width: 850px)': {
                    width: '100%',
                  }
                  }}
                  onClick={() => setActiveId(idx)}
                  hasFocus={activeId === idx}
                />
              ))}
            </Stack>
            <Box sx={{
            display: 'flex',
            marginLeft:"10px",
            justifyContent:"flex-end",
            gap:2,
            '@media (max-width: 600px)': {
              flexWrap:"wrap"
            }
            
          }}>
            <SecondaryButton label="Calendar View" sx={{ width: '250px' }} onClick={() => window.open('/calender')} />
            <FilterBar options={['All', 'GTEDI', 'Bulkperks', 'Solchicks', 'SIDUS']} onChangeAction={setFilter} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '60px',
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '85px',
            columnGap: '45px',
            justifyContent: 'space-around',
            '@media (max-width: 1250px)': {
              justifyContent: 'center'
            }
          }}
        >
          {projects
            .filter(project => (filter == 'All' || project.projectName?.includes(filter)))
            .map((project, idx) =>
              (activeId == 0 || project.status == activeId) &&
              <ProjectCard key={idx} project={project} />
            )}
        </Box>
        <Box sx={{ marginTop: '80px', marginBottom: '30px' }}>
          <Pagination id={curId} setCurId={setCurId} />
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
