import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './SideMenu.css';
import { tokenIsValid } from '../../utils/TokenIsValid';

export function SideMenu() {
  const decodedToken = tokenIsValid();

  const currentPath = window.location.pathname;
  const isActive = (path) => {
    return currentPath === path ? 'active' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Nav className="flex-column sideMenuContainer col-12 text-center">
      {decodedToken.isAdmin && (
        <Nav.Link className={`sideMenuLinks ${isActive('/home/administrativeStaff')}`} href="/home/administrativeStaff">
          Personal Administrativo
        </Nav.Link>
      )}
      {decodedToken.isAdmin && (
        <Nav.Link className={`sideMenuLinks ${isActive('/home/students')}`} href="/home/students">
          Alumnos
        </Nav.Link>
      )}
      {decodedToken.isAdmin && (
        <Nav.Link className={`sideMenuLinks ${isActive('/home/analytics')}`} href="/home/analytics">
          Analíticos
        </Nav.Link>
      )}
      {decodedToken.isAdmin && (
        <Nav.Link className={`sideMenuLinks ${isActive('/home/payments')}`} href="/home/payments">
          Pagos
        </Nav.Link>
      )}
      {!decodedToken.isAdmin && (
        <Nav.Link className={`sideMenuLinks ${isActive('/home/myStudentInformation')}`} href="/home/myStudentInformation">
          Mi información
        </Nav.Link>
      )}
      <Nav.Link className="log" href="/" onClick={handleLogout}>
        Cerrar Sesión
      </Nav.Link>
    </Nav>
  );
}
