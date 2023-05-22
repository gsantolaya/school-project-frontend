import React from 'react'
import './Welcome.css';
import logo from './img/Logo redondo.png';

export const Welcome = () => {
    return (
        <>
            <div className='welcome-container text-center'>
                <h1 className='p-5'>Bienvenido a CODE SCHOOL</h1>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        </>
    )
}
