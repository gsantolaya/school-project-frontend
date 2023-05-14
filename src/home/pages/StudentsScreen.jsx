import React from 'react';
import NavbarMenu from '../components/NavbarMenu';
import { SideMenu } from '../components/SideMenu';
import Table from 'react-bootstrap/Table';
import './StudentsScreen.css';



export const StudentsScreen = () => {
    return (
        <>
            <NavbarMenu />
            <SideMenu />
            <div className='Container col-md-9 col-lg-10 position-absolute end-0 p-5 text-center'>
                <h1 className='mb-5'>Listado de alumnos</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nro. de Expediente</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Año cursado</th>
                            <th>Cuota</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>14522</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>3</td>
                            <td>On day</td>
                            <td>+ Detalles</td>
                            <td>Eliminar</td>
                        </tr>
                        <tr>
                            <td>14522</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>3</td>
                            <td>On day</td>
                            <td>+ Detalles</td>
                            <td>Eliminar</td>
                        </tr>
                        <tr>
                            <td>14522</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>3</td>
                            <td>On day</td>
                            <td>+ Detalles</td>
                            <td>Eliminar</td>
                        </tr>
                                                <tr>
                            <td>14522</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>3</td>
                            <td>On day</td>
                            <td>+ Detalles</td>
                            <td>Eliminar</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}
