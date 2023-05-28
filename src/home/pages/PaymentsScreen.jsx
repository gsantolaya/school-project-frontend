import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './PaymentsScreen.css';
import Form from 'react-bootstrap/Form';
import { FaInfoCircle } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const PaymentsScreen = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('name');

  useEffect(() => {
    axios.get('http://localhost:8060/api/students')
      .then((response) => {
        setStudents(response.data)
      })
  }, [])

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handlePaymentStatusChange = async (event, student) => {
    const isPaymentAlDia = event.target.value === "alDia";
    const updatedStudent = { ...student, payment: isPaymentAlDia };
    try {
      const response = await axios.put(`http://localhost:8060/api/students/${student._id}`, updatedStudent);
      // Handle successful update
      console.log(response.data); // Optional: Log the response data

      // Update the students state with the updated student
      const updatedStudents = students.map((s) => (s._id === student._id ? updatedStudent : s));
      setStudents(updatedStudents);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

    const navigate = useNavigate();
  
    const redirectToErrorPage = () => {
      // Redirige a la página de error
      navigate('/error404');
    };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const studentId = student._id.toLowerCase();
    const paymentStatus = student.payment ? 'al día' : 'pendiente';

    switch (searchOption) {
      case 'name':
        return fullName.includes(searchTerm.toLowerCase());
      case 'id':
        return studentId.includes(searchTerm.toLowerCase());
      case 'payment':
        return paymentStatus.includes(searchTerm.toLowerCase());
      default:
        return fullName.includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <div className='text-center p-2 p-md-5'>
        <h1 className="title mb-3"><b>Pagos</b></h1>
        <div className='row d-md-flex'>
          <div className='col-12 col-md-4 my-2 my-md-0'>
            <Form.Group controlId="searchForm">
              <Form.Control
                type="text"
                placeholder="Buscar estudiante"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </Form.Group>
          </div>
          <div className='col-12 col-md-4 my-2 my-md-0'>
            <Form.Group className='d-flex my-2 ' controlId="searchOptionForm">
              <p><b>Buscar por:</b></p>
              <Form.Control
                as="select"
                value={searchOption}
                onChange={handleSearchOptionChange}
              >
                <option value="name">Nombre</option>
                <option value="id">ID</option>
                <option value="payment">Cuota</option>

              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID de Expediente</th>
              <th>Alumno</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className={student.isBanned ? "banned" : ""}>
                <td>{student._id}</td>
                <td>{student.lastName}, {student.firstName}</td>
                <td>
                  <select
                    value={student.payment ? "alDia" : "pendiente"}
                    onChange={(e) => handlePaymentStatusChange(e, student)}
                    style={{
                      padding: "8px",
                      fontSize: "16px",
                      borderRadius: "4px",
                      color: student.payment ? "green" : "red",
                      border: "none",
                      background: "transparent",
                      width: "150px",
                      outline: "none",
                      textAlign: "center",
                    }}
                  >
                    <option
                      value="alDia"
                      style={{ backgroundColor: "#CDCFC0", color: "green" }}
                    >
                      Al día
                    </option>
                    <option
                      value="pendiente"
                      style={{ backgroundColor: "#CDCFC0", color: "red" }}
                    >
                      Pendiente
                    </option>
                  </select>


                </td>
                <td><Button className='m-1' variant="secondary" onClick={redirectToErrorPage}><FaInfoCircle /> Detalles</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};