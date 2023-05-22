import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import axios from "axios";

//pagination
let active = 1;
let items = [];
for (let number = 1; number <= 20; number++) {
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
    axios.get("http://localhost:8080/API/adminStaff").then((response) => {
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

      <div className='text-center p-2 p-md-5'>
        <h1 className="title mb-5 font-weight-bold">Personal Administrativo</h1>
        <div className='row d-md-flex mb-4'>
        <div className='col-12 col-md-4 my-2 my-md-0 row d-md-flex'>
                            <Form.Group  controlId="searchOptionForm">
                            
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
                    <div className='col-12 col-md-4 my-2 my-md-0'>
                        <Form.Group controlId="searchForm">
                            <Form.Control
                                type="text"
                                placeholder="Buscar"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                        </Form.Group>
                    </div>
                   
                   
                </div>


    
    
 {/* <div className=" ">
        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </Form.Group>

     
          
          <Form.Group controlId="searchOptionForm" >
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

        </div>  */}
  
       

        <div className="table-responsive m-2">
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
        </div>

        
        <div className="justify-content-center align-items-center d-flex mt-3">
          <Pagination size="sm">{items}</Pagination>
        </div>
      </div>
    </>
  );
};
