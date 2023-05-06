import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div id="xxyyzz" style={{ backgroundColor: "#171819" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
