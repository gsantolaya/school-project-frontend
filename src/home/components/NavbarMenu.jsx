import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../components/img/Logo Navbar.png';
import './NavbarMenu.css';
import { NavDropdown } from 'react-bootstrap';

export function NavbarMenu() {
  return (
    <Navbar className="navContainer" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={logo} className="logo" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navLinks" href="/">Inicio</Nav.Link>
            <Nav.Link className="navSideLinks" href="/administrativeStaff">Personal Administrativo</Nav.Link>
            <Nav.Link className="navSideLinks" href="/students">Alumnos</Nav.Link>
            <Nav.Link className="navSideLinks" href="/analytics">Analíticos</Nav.Link>
            <Nav.Link className="navSideLinks" href="/payments">Pagos</Nav.Link>
            <Nav.Link className="navSideLinks" href="/users">Usuarios</Nav.Link>
            <Nav.Link className="logOut" href="/home">Cerrar Sesión</Nav.Link>
            <Nav.Link className="navLinks" href="aboutUs">Acerca de nosotros</Nav.Link>
            <Nav.Link className="navLinks" href="login">Login</Nav.Link>
            <Nav.Link className="navLinks" href="register">Registro</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}