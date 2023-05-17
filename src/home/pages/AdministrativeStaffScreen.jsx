import React from 'react'
import { SideMenu } from '../components/SideMenu'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

let active = 1;
let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

export const AdministrativeStaffScreen = () => {
  return (
    <>
    <SideMenu />
    <div  className='Container col-md-9 col-lg-10 position-absolute end-0 p-5 text-center'>
<h1>Personal Administrativo</h1>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Apellido</th>
          <th>Nombre</th>
          <th>Fecha Ingreso</th>
          <th>Telefono</th>
          <th>Email</th>
          <th>Direccion</th>
          <th>Nombre Institucion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      
      </tbody>
    </Table>
    <div className='justify-content-center align-items-center d-flex mt-3'>
    <Pagination size="sm">{items}</Pagination>
    </div>
    </div>
    </>
  )
}
