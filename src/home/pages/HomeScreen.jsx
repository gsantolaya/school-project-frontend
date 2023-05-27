import React from 'react';
import { useLocation } from 'react-router-dom';
import './HomeScreen.css';
import { SideMenu } from '../components/SideMenu';
import { Outlet } from 'react-router-dom';
import { Welcome } from '../components/Welcome';

export const HomeScreen = () => {
  const location = useLocation();

  // Verificar si la ruta es exactamente "/home"
  const isHome = location.pathname === '/home';

  return (
    <>
      <div className='d-flex'>
        <div className='col-2 col-sm-4 col-md-3 col-lg-2 sideMenu'>
          <SideMenu />
        </div>
        <div className='col-12 col-sm-8 col-md-9 col-lg-10 main'>
          {isHome ? <Welcome /> : <Outlet />}
        </div>
      </div>
    </>
  );
};