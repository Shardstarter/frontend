import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { PrimaryButton } from './Button';

const Pagination = ({ id, setCurId }) => {
  const [count, setCount] = useState(5);
  const [prevString, setPrevString] = useState('Previous');
  const [nextString, setNextString] = useState('Next');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1000) {
        setCount(3);
      } else {
        setCount(5);
      }
      if (window.innerWidth < 700) {
        setPrevString('<');
        setNextString('>');
      } else {
        setPrevString('Previous');
        setNextString('Next');
      }
      if (window.innerWidth < 500) {
        setCount(1);
      }
    }

    window.addEventListener('resize', handleResize);

    // cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <PrimaryButton
        label={prevString}
        disabled={true}
        sx={{ marginRight: '18px', '@media (max-width: 700px)': { width: '70px' }, width: '160px' }}
      />
      <Box sx={{ display: 'flex', columnGap: '3px' }}>
        {Array(count)
          .fill()
          .map((_, idx) => (
            <PrimaryButton
              key={idx}
              label={idx + 1}
              hasFocus={idx === id}
              sx={{ width: '70px' }}
              onClick={() => setCurId(idx)}
            />
          ))}
      </Box>
      <PrimaryButton
        label={nextString}
        sx={{ marginLeft: '18px', '@media (max-width: 700px)': { width: '70px' }, width: '160px' }}
        color="#fff"
      />
    </Box>
  );
};

export default Pagination;
