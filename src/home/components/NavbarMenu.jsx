import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoHorizontal from '../components/img/LogoHorizontal.jpg';
import './NavbarMenu.css';
import { tokenIsValid } from '../../utils/TokenIsValid';
import { FaUserAlt } from "react-icons/fa";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';



export function NavbarMenu() {
  const decodedToken = tokenIsValid();
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (decodedToken) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  return (
    <Navbar className="navContainer p-1" variant="dark" expand="lg">
      <Container >
        <Navbar.Brand onClick={handleNavClick}><img src={LogoHorizontal} width="270px" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navLinks" onClick={handleNavClick}>Inicio</Nav.Link>
            <Nav.Link className="navLinks" href="aboutUs">Acerca de nosotros</Nav.Link>
            {decodedToken ? (
              <>
                <Nav.Link className="userNameLink text-start" href="/myUser"><FaUserAlt /> {decodedToken.firstName} {decodedToken.lastName}</Nav.Link>
                <Nav.Link className="logOut" href="/home">Cerrar Sesión</Nav.Link>
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



{/* <NavDropdown className="navLinks" id="nav-dropdown-dark-example" title="Inicio" menuVariant="dark">
<NavDropdown.Item className="navDropdownLinks" href="/administrativeStaff">Personal Administrativo</NavDropdown.Item>
<NavDropdown.Item className="navDropdownLinks" href="/students">Alumnos</NavDropdown.Item>
<NavDropdown.Item className="navDropdownLinks" href="/analytics">Analíticos</NavDropdown.Item>
<NavDropdown.Item className="navDropdownLinks" href="/payments">Pagos</NavDropdown.Item>
<NavDropdown.Item className="navDropdownLinks" href="/users">Usuarios</NavDropdown.Item>
</NavDropdown> */}

{/* <Nav.Link className="logOut" href="/home">Cerrar Sesión</Nav.Link> */ }
