import React, { useEffect, useState } from 'react';
import MainAccount from './MainAccount';
import PanelAccount from './PanelAccount';
const AccountPage = () => {
  const [unclaimed, setUnclaimed] = useState(0);
  return (
    <div>
      <MainAccount unclaimed={unclaimed} />
      {/* <PanelAccount handleUnclaimed={(value) => setUnclaimed(value)} /> */}
    </div>
  )
};

export default AccountPage;
