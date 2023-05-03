import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Label } from 'components/_components/Label';
import { SearchInput } from 'components/_components/Input';
import { PrimaryButton } from 'components/_components/Button';
import { ProjectCard } from 'components/_components/Card';
import Pagination from 'components/_components/Pagination';
import FilterBar from 'components/_components/FilterBar';
import { ProjectButtons, Fantasy, Solchicks, NetVRK, Bulkperks, Sidus } from 'utils/_utils/EntityFieldDefs';

const Projects = () => {
  const [activeId, setActiveId] = useState(0);
  const [curId, setCurId] = useState(1);
  const projects = [Fantasy, Solchicks, NetVRK, Bulkperks, Sidus, Fantasy];

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
              '@media (max-width: 1200px)': {
                flexDirection: 'column',
                rowGap: '20px'
              }
            }}
          >
            <Stack
              width="725px"
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              rowGap="20px"
              sx={{
                '@media (max-width: 1200px)': {
                  width: '100%'
                }
              }}
            >
              {ProjectButtons.map((but, idx) => (
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
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </Box>
        <Box sx={{ marginTop: '80px', marginBottom: '30px' }}>
          <Pagination id={curId} setCurId={setCurId} />
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
