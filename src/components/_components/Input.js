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


export const SubmitInput = ({ label='$SHMX', value, size, btnValue, sx, onClick, onChangeValue, readOnly }) => {
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
        type="number"
        value={inputValue}
        onChange={(e) => { if (!readOnly) { setInputValue(e.target.value); onChangeValue(e.target.value) } }}
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
        <Label text={{ value: label, weight: 100, color: 'green' }} />
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
        onClick={onClick}
      />
    </Box>
  );
};