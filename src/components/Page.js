import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';
import DashboardFooter from '../pages/DashboardFooter'

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other} paddingBottom="40px">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
    <DashboardFooter></DashboardFooter>
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
