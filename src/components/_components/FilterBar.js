import * as React from 'react';
import PropTypes from 'prop-types';
import Select, { selectClasses } from '@mui/base/Select';
import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f'
};

const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <ExpandMoreIcon sx={{ fontSize: '20px' }} />
    </button>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  box-sizing: border-box;
  height: 70px;
  max-width: 250px;
  min-width: 250px;
  padding: 20px 24px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: #171717;
  border: 1px solid #02FF7B;
  color: #fff;
  font-size: 20px;
  position: relative;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
   border-color: #afb8c1;
  }

  & > svg {
    font-size: 28px;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-size: 20px;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  width: 250px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #171717;
  color: #fff;
  border: 1px solid #02FF7B;
  `
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(Popper)`
  z-index: 100;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

const FilterBar = ({ options }) => {
  return (
    <CustomSelect defaultValue={-1}>
      <StyledOption value={-1} sx={{ display: 'none' }}>
        Filters
      </StyledOption>
      {options.map((option, idx) => (
        <StyledOption key={idx} value={idx}>{option}</StyledOption>
      ))}
    </CustomSelect>
  );
};

export default FilterBar;
