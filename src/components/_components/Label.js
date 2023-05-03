import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const Label = (props) => {
  const { value, size = 20, color = 'white', type = 'text', href, weight = 700, underlined = false, img } = props.text;

  const textColor =
    color === 'grey'
      ? '#A7A7A7'
      : color === 'green'
      ? '#02FF7B'
      : color === 'black'
      ? '#4B4B4B'
      : color === 'white'
      ? '#fff'
      : color;

  if (type === 'text') {
    return (
      <Typography
        sx={{
          ...props.sx,
          fontSize: size,
          fontWeight: weight,
          color: textColor,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {value}
        {img && <img src={img} alt="img" width={21} height={21} style={{ marginLeft: '14px' }} />}
      </Typography>
    );
  }
  if (type === 'link') {
    return (
      <Link to={href} onClick={props.onClick}>
        <Typography
          sx={{
            ...props.sx,
            fontSize: size,
            fontWeight: weight,
            color: textColor,
            textDecoration: `${underlined ? 'underline' : 'none'}`
          }}
        >
          {value}
        </Typography>
      </Link>
    );
  }
};

export const Span = (props) => {
  const { value, size = 20, color = 'white', type = 'text', href, weight = 300, underlined = false } = props.text;

  const textColor =
    color === 'grey' ? '#A7A7A7' : color === 'green' ? '#02FF7B' : color === 'black' ? '#4B4B4B' : '#fff';

  if (type === 'text') {
    return (
      <span style={{ ...props.sx, fontSize: size, fontWeight: weight, color: textColor }}>
        {value}
        {props.children}
      </span>
    );
  }
  if (type === 'link') {
    return (
      <Link to={href}>
        <span
          style={{
            ...props.sx,
            fontSize: size,
            fontWeight: weight,
            color: textColor,
            textDecoration: `${underlined ? 'underline' : 'none'}`
          }}
        >
          {value}
          {props.children}
        </span>
      </Link>
    );
  }
};

export function RoundedLabel({ keyword, value, bgColor }) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: bgColor,
        borderRadius: '8px',
        padding: '5px 16px 8px 16px',
        overflow: 'hidden'
      }}
    >
      <Label text={{ value: keyword + ':', weight: 100 }} />
      <Label sx={{ marginLeft: '10px' }} text={{ value: value, color: 'green', weight: 100 }} />
    </div>
  );
}
