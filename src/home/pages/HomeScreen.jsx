import React from 'react'
import './HomeScreen.css';
import { SideMenu } from '../components/SideMenu';
import { Outlet } from 'react-router-dom'


export const HomeScreen = () => {
  return (
    <>
      <div className='d-flex'>
        <div className='col-2 sideMenu'>
          <SideMenu />
        </div>
        <div className='col-12 col-md-10 main'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
