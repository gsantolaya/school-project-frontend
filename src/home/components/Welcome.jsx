import React from 'react'
import './Welcome.css';
import Logotipo from './img/Logotipo.png';

export const Welcome = () => {
    return (
        <>
            <div className='welcome-container text-center'>
                <h1 className='p-5'>Bienvenido a CODE SCHOOL</h1>
                <img src={Logotipo} className="App-logo" alt="logo" />
            </div>
        </>
    )
}
