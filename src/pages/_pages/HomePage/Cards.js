import React, { useCallback, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Label } from 'components/_components/Label';
import apis from 'services';

const Cards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await apis.getCards();
        if (response.data.result) {
          var arr = response.data.data;
          setCards(arr)
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  return (
    <Box className="scrolling-box">
      <Box className="scrolling-content">
        <Box

          sx={{
            '@media (max-width: 600px)': {
              margin: '20px 2%'
            },
            margin: '20px 8%',
            display: '-webkit-box',
            // overflowX: 'hidden !important'
          }}
        >
          {cards.map((project, idx) => (
            <Box
              width={320}
              // height={150}
              height={110}
              sx={{
                ...project.sx,
                backgroundImage: 'url("_img/cards/background.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                marginRight: '40px'
              }}
            >
              <Box sx={{ marginLeft: '22px' }}>
                <img src={project.img} alt={project.title} width={80} />
              </Box>
              <Box sx={{ marginLeft: '15px', display: 'flex', justifyContent: 'space-around', flexFlow: 'column' }}>
                <Label text={{ value: project.title, size: 18 }} />
                <Label text={{ value: project.description, size: 25, color: 'green' }} />
              </Box>
            </Box>

          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
