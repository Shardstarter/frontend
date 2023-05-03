import React from 'react';
import Box from '@mui/material/Box';
import { Fantasy, Solchicks, Bulkperks, Sidus, NetVRK } from 'utils/_utils/EntityFieldDefs';
import Card from 'components/_components/Card';

const Cards = () => {
  const projectArr = [Fantasy, NetVRK, Bulkperks, Solchicks, Sidus];

  return (
    <Box
      sx={{
        '@media (max-width: 600px)': {
          margin: '20px 2%'
        },
        margin: '20px 8%',
        display: '-webkit-box',
        overflowX: 'hidden !important'
      }}
    >
      {projectArr.map((project, idx) => (
        <Card key={idx} {...project} sx={{ marginRight: '40px' }} />
      ))}
    </Box>
  );
};

export default Cards;
