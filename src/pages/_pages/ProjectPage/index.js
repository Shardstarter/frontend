import React from 'react';
import Box from '@mui/material/Box';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';

export default function ProjectPage() {
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
      <ProjectDetails />
      <ProjectCard />
    </Box>
  );
}
