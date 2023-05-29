import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup';
import { TokenStorage } from "../../utils/TokenStorage";
import { useNavigate } from "react-router-dom";
import './StudentsScreen.css';

import {
  BsSearch
} from "react-icons/bs";
//pagination
let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {

  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

export const AdministrativeStaffScreen = () => {
  const [adminStaff, setAdminStaff] = useState([]);
  const [adminFiltered, setAdminFiltered] = useState([])

  const store = TokenStorage()
  const navigate = useNavigate();

  useEffect(() => {
    if (store.tokenValid) {   
      axios.get("/adminStaff", {headers:{
        "access-token": store.token
      }}).then((response) => {
        setAdminStaff(response.data);
        setAdminFiltered(response.data)
      });
    }else{
      navigate("/login")
    }
  }, []);

  const handleSearchInput = (e) => {
    let userInput = (e.target.value).toLowerCase()
    if (userInput === "") {
      setAdminFiltered(adminStaff)
    } else {
      const filterAdminStaff = adminStaff.filter((admin) => {
        return admin.firstName.toLowerCase().includes(userInput) ||
          admin.schoolName.toLowerCase().includes(userInput) ||
          admin.lastName.toLowerCase().includes(userInput)
      });
      setAdminFiltered(filterAdminStaff)
    }
  };



  return (
    <>
      <div className="text-center p-2 p-md-5">
        <h1 className="title mb-5"><b>Personal Administrativo</b></h1>
        <div className="mb-4 w-50">

          <InputGroup >
            <InputGroup.Text id="btnGroupAddon"><BsSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por Apellido, Nombre Institución o Fecha Ingreso"
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
              onChange={handleSearchInput}
            />
          </InputGroup>
        </div>


        <div className="table-container m-2">
          <Table striped bordered hover size="sm">
            <thead className="title align-middle text-center">
              <tr>
                <th>ID</th>
                <th> Nombre</th>
                <th> Apellido</th>
                <th>Fecha Ingreso</th>
                <th> Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Nombre Institución</th>
                <th>Teléfono Institución</th>
                <th>Email Institución</th>
              </tr>
            </thead>
            <tbody>
              {adminFiltered.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin._id}</td>
                  <td>{admin.firstName}</td>
                  <td>{admin.lastName}</td>
                  <td>{new Date(admin.dateAdmission).toLocaleDateString()}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>{admin.address}</td>
                  <td>{admin.schoolName}</td>
                  <td>{admin.phoneInstitution}</td>
                  <td>{admin.emailInstitution}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
