import React from 'react'
import Nav from 'react-bootstrap/Nav';
import './SideMenu.css';


export function SideMenu() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column sideMenuContainer col-2 text-center">
      <Nav.Link className="sideMenuLinks" href="/home">Personal Administrativo</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/home">Alumnos</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/home">Analiticos</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/home">Pagos</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/home">Usuarios</Nav.Link>
      <Nav.Link className="logOut" href="/home">Cerrar Sesión</Nav.Link>

    </Nav>
  );
}