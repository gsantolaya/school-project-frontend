import React from 'react'
import './Welcome.css';
import Logotipo from './img/Logotipo.png';

export const Welcome = () => {
    return (
        <>
            <div className='welcomeContainer text-center'>
                <h1 className='p-3 textWelcome'><b>Bienvenido a CODE SCHOOL</b></h1>
                <img src={Logotipo} className=" mb-5 appLogo" alt="logo" />
            </div>
        </>
    )
}