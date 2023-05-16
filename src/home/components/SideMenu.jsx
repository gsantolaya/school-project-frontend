import React from 'react'
import Nav from 'react-bootstrap/Nav';
import './SideMenu.css';


export function SideMenu() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column sideMenuContainer col-12 text-center">
      <Nav.Link className="sideMenuLinks" href="/administrativeStaff">Personal Administrativo</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/students">Alumnos</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/analytics">Analiticos</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/payments">Pagos</Nav.Link>
      <Nav.Link className="sideMenuLinks" href="/users">Usuarios</Nav.Link>
      <Nav.Link className="logOut" href="/home">Cerrar Sesión</Nav.Link>
    </Nav>
  );
}