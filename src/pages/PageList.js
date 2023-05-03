// material
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function PageList() {
  const { themeStretch } = useSettings();

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <div style={{ padding: '50px' }}>
          <Typography variant="h3" component="h1" paragraph>
            Pages List
          </Typography>
          <a href="/home"><h5>Home</h5></a>
          <a href="/dashboard"><h5>Dashbaord</h5></a>
          <a href="/deals"><h5>Deals</h5></a>
          <a href="/project/0xE910A5e10e4e74369c893a58302a9C5e669335D5"><h5>One deal</h5></a>
          <a href="/vcdeals"><h5>VC Deals</h5></a>
          <a href="/vote"><h5>Vote</h5></a>
          <hr/>
          <a href="/stakepad"><h5>Stakepad</h5></a>
          <a href="/stakingpool"><h5>Staking Pool</h5></a>
          <a href="/farmingpool"><h5>Farming Pool</h5></a>
          <hr/>
          <a href="/helpcenter"><h5>helpcenter</h5></a>
          <a href="/blog"><h5>blog</h5></a>
          <hr/>
          <a href="/admin"><h5>admin page</h5></a>
        </div>
      </Container>
    </Page>
  );
}
