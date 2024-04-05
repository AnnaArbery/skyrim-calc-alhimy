import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'

const Layout = () => (
  <>
    <Header />
    <Nav />
    <div className='main'>
      <Outlet/>
    </div>    
  </>
);

export default Layout;