import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Label } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';
import { VoteButtons, VoteProjects } from 'utils/_utils/EntityFieldDefs';
import { VoteCard } from 'components/_components/Card';
import FilterBar from 'components/_components/FilterBar';

const Projects = () => {
  const [activeId, setActiveId] = useState(0);

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
            {VoteProjects.map((project, idx) => (
              <VoteCard key={idx} project={project} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
