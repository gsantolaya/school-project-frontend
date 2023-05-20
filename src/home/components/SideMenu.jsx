import React from 'react'
import Nav from 'react-bootstrap/Nav';
import './SideMenu.css';


export function SideMenu() {
  const currentPath = window.location.pathname;
  const isActive = (path) => {
    return currentPath === path ? "active" : "";
  };

  return (
    <Nav className="flex-column sideMenuContainer col-12 text-center">
      <Nav.Link className={`sideMenuLinks ${isActive("/administrativeStaff")}`} href="/administrativeStaff">
        Personal Administrativo
      </Nav.Link>
      <Nav.Link className={`sideMenuLinks ${isActive("/students")}`} href="/students">
        Alumnos
      </Nav.Link>
      <Nav.Link className={`sideMenuLinks ${isActive("/analytics")}`} href="/analytics">
        Analiticos
      </Nav.Link>
      <Nav.Link className={`sideMenuLinks ${isActive("/payments")}`} href="/payments">
        Pagos
      </Nav.Link>
      <Nav.Link className={`sideMenuLinks ${isActive("/users")}`} href="/users">
        Usuarios
      </Nav.Link>
      <Nav.Link className="logOut" href="/home">Cerrar Sesión</Nav.Link>
    </Nav>
  );
}