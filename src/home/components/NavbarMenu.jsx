import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoHorizontal from '../components/img/LogoHorizontal.jpg';
import Logo from '../components/img/Logo.png';

import './NavbarMenu.css';
import { tokenIsValid } from '../../utils/TokenIsValid';
import { FaUserAlt } from "react-icons/fa";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';



export function NavbarMenu() {
  const currentPath = window.location.pathname;
  const decodedToken = tokenIsValid();
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (decodedToken) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  const isActive = (path) => {
    return currentPath === path ? 'navActive' : '';
  };

  return (
    <Navbar className="navContainer p-1" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className='bigScreen' onClick={handleNavClick}><img src={LogoHorizontal} height="70px" alt="logo" /></Navbar.Brand>
        <Navbar.Brand className='smallScreen' onClick={handleNavClick}><img src={Logo} height="70px" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navLinks bigScreen" onClick={handleNavClick}>Inicio</Nav.Link>
            <NavDropdown className="navDropdownLinksTitle smallScreen" id="nav-dropdown-dark-example" title="Inicio" menuVariant="dark">
              <NavDropdown.Item className={`navDropdownLinks ${isActive('/home/administrativeStaff')}`} href="/home/administrativeStaff">Personal Administrativo</NavDropdown.Item>
              <NavDropdown.Item className={`navDropdownLinks ${isActive('/home/students')}`} href="/home/students">Alumnos</NavDropdown.Item>
              <NavDropdown.Item className={`navDropdownLinks ${isActive('/home/analytics')}`} href="/home/analytics">Analíticos</NavDropdown.Item>
              <NavDropdown.Item className={`navDropdownLinks ${isActive('/home/payments')}`} href="/home/payments">Pagos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="navLinks" href="aboutUs">Acerca de nosotros</Nav.Link>




            {decodedToken ? (
              <>
                <Nav.Link className="userNameLink text-start" href="/myUser"><FaUserAlt /> {decodedToken.firstName} {decodedToken.lastName}</Nav.Link>
                <Nav.Link className="logOut ms-auto" href="/home">Cerrar Sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="navLinks" href="/login">Login</Nav.Link>
                <Nav.Link className="navLinks" href="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}