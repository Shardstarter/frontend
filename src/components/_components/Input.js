import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { PrimaryButton } from 'components/_components/Button';
import { Label } from './Label';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const SearchInput = (props) => {
  return (
    <TextField
      placeholder={props.placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          fontWeight: 100,
          backgroundColor: '#171717',
          maxWidth: '400px',
          height: '70px',
          fontSize: '20px',
          border: '1px solid #02FF7B'
        }
      }}
    />
  );
};

export const Search = ({ value }) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 13px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '50px',
        marginBottom: '10px',
        border: '1px solid #02FF7B',
        backgroundColor: '#171717',
        height: '96px'
      }}
    >
      <IconButton sx={{ p: '10px' }} disabled>
        <img src="_img/icon/shardeum_1.png" alt="hello" width={50} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        sx={{
          width: '140px',
          height: '70px',
          backgroundColor: '#000000',
          borderRadius: '8px',
          border: '1px solid #7070704D',
          color: 'white',
          fontSize: 20
        }}
      >
        MAX
      </Button>
    </Paper>
  );
};

export const SubmitInput = ({ value, size, btnValue, sx }) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <Box
      sx={{
        ...sx,
        position: 'relative',
        border: '1px solid #02FF7B',
        borderRadius: '8px',
        background: '#171717',
        '@media (max-width: 500px)': {
          height: '192px'
        }
      }}
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          display: 'flex',
          width: '100%',
          height: '96px',
          padding: '34px 0px 23px 30px',
          fontSize: size,
          fontFamily: 'MadaniArabic',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          background: '#171717'
        }}
      />
      <Box
        sx={{
          backgroundColor: '#4B4B4B',
          borderRadius: '7px',
          padding: '6px 25px',
          position: 'absolute',
          top: '-20px',
          left: '30px'
        }}
      >
        <Label text={{ value: '$SHMX', weight: 100, color: 'green' }} />
      </Box>
      <PrimaryButton
        sx={{
          width: '200px',
          height: '70px',
          position: 'absolute',
          top: '13px',
          right: '13px',
          '@media (max-width: 500px)': {
            top: '109px',
            right: '0px',
            width: 'calc(100% - 16px)',
            margin: '0px 8px'
          }
        }}
        label={btnValue}
        hasFocus={true}
      />
    </Box>
  );
};