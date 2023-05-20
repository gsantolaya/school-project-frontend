import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

//pagination
let active = 1;
let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

export const AdministrativeStaffScreen = () => {
  const [adminStaff, setAdminStaff] = useState([]);
  const [searchOption, setSearchOption] = useState("lastName");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/adminStaff").then((response) => {
      setAdminStaff(response.data);
    });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const filterAdminStaff = adminStaff.filter((admin) => {
    const lastName = admin.lastName.toLowerCase();
    const dateAdmission = admin.dateAdmission.toString().toLowerCase();
    const schoolName = admin.schoolName.toLowerCase();
    switch (searchOption) {
      case "lastName":
        return lastName.includes(searchTerm.toLowerCase());
      case "dateAdmission":
        return dateAdmission.includes(searchTerm.toLowerCase());
      case "schoolName":
        return schoolName.includes(searchTerm.toLowerCase());
      default:
        return lastName.includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <div className="Container col-md-9 col-lg-10 position-absolute end-0 p-5 text-center">
        <h1 className="title">Personal Administrativo</h1>

        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </Form.Group>

        <div className="col-12 col-md-4 my-2 my-md-0">
          <Form.Group controlId="searchOptionForm">
            <FaSearch />

            <Form.Control
              as="select"
              value={searchOption}
              onChange={handleSearchOptionChange}
            >
              <option value="lastName">Apellido</option>
              <option value="schoolName">Nombre Institución</option>
              <option value="dateAdmission">Fecha Iingreso</option>
            </Form.Control>
          </Form.Group>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th> Nombre</th>
              <th> Apellido</th>
              <th>Fecha Ingreso</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Direccion</th>
              <th>Nombre Institucion</th>
              <th>Telefono Institucion</th>
              <th>Email Institucion</th>
            </tr>
          </thead>
          <tbody>
            {filterAdminStaff.map((admin) => (
              <tr key={admin.id}>
                <td>{admin._id}</td>
                <td>{admin.firstName}</td>
                <td>{admin.lastName}</td>
                <td>{admin.dateAdmission}</td>
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
        <div className="justify-content-center align-items-center d-flex mt-3">
          <Pagination size="sm">{items}</Pagination>
        </div>
      </div>
    </>
  );
};
