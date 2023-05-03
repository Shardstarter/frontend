import React from 'react';
import { Box, Button, IconButton } from '@mui/material';

export const PrimaryButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      sx={{
        ':disabled': {
          color: '#585858',
          backgroundColor: '#171717'
        },
        ...props.sx,
        color: props.color ? props.color : props.hasFocus ? '#000' : '#585858',
        backgroundColor: props.hasFocus ? '#02FF7B' : '#171717',
        fontSize: '20px',
        height: '70px'
      }}
    >
      {props.img && <img src={props.img} alt="icon" height={28} style={{ marginRight: '10px' }} />}
      {props.label}
    </Button>
  );
};

export const SecondaryButton = (props) => {
  return (
    <Button
      variant="outlined"
      sx={{
        ...props.sx,
        // width: '220px',
        textTransform: 'initial',
        height: '70px',
        fontSize: '20px',
        backgroundColor: '#171717',
        color: '#fff',
        borderColor: '#02FF7B'
      }}
    >
      {props.label}
    </Button>
  );
};

export const IconButtonGroup = (props) => {
  return (
    <Box sx={props.sx}>
      {props.elements.map((element, idx) => (
        <IconButton key={idx} onClick={() => (window.location.href = element.path)}>
          <img src={element.img} width={props.size} />
        </IconButton>
      ))}
    </Box>
  );
};
