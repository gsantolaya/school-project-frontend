import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../components/img/Logo Navbar.png';
import './NavbarMenu.css';

function NavbarMenu() {
  return (
    <Navbar className="navContainer" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="home"><img src={logo} className="logo" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navLinks" href="home">Inicio</Nav.Link>
            <Nav.Link className="navLinks" href="aboutUs">Acerca de nosotros</Nav.Link>
            <Nav.Link className="navLinks" href="login">Login</Nav.Link>
            <Nav.Link className="navLinks" href="register">Registro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;