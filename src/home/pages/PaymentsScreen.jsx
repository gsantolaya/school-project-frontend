import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './PaymentsScreen.css';
import Form from 'react-bootstrap/Form';
import { FaInfoCircle } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { TokenStorage } from "../../utils/TokenStorage";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";

export const PaymentsScreen = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const store = TokenStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.tokenValid) {
      axios.get('/students', {
        headers: {
          "access-token": store.token
        }
      })
      .then((response) => {
        setStudents(response.data);
      });
    } else {
      navigate("/login");
    }
  }, [navigate, store.token, store.tokenValid]);


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handlePaymentStatusChange = async (event, student) => {
    const isPaymentAlDia = event.target.value === "alDia";
    const updatedPayment = { payment: isPaymentAlDia };
    try {
      await axios.patch(`/students/${student._id}/payment`, updatedPayment, {
        headers: {
          "access-token": store.token
        }
      });
      const updatedStudents = students.map((s) => (s._id === student._id ? { ...s, payment: isPaymentAlDia } : s));
      setStudents(updatedStudents);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToErrorPage = () => {
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
        <h1 className="mb-5 title"><b>Pagos</b></h1>
        <div className='row d-md-flex'>
          <div className='col-12 col-md-6 col-xl-4 my-2 my-md-0'>
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                maxLength={30}
                type="text"
                placeholder="Buscar alumno"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </InputGroup>
          </div>
          <div className='col-12 col-md col-xl-5 my-2 my-md-0'>
            <Form.Group className='d-flex' controlId="searchOptionForm">
              <Form.Label className='w-25' column sm={2}><b className='homeText'>Buscar por:</b></Form.Label>
              <Form.Select className='w-75' as="select" value={searchOption} onChange={handleSearchOptionChange}>
                <option value="name">Apellido/ nombre</option>
                <option value="id">ID</option>
                <option value="payment">Cuota</option>

              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className='table-container mt-4'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='homeText'>ID de Expediente</th>
                <th className='homeText'>Alumno</th>
                <th className='homeText'>Estado</th>
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
        <div className='text-end'>
          <h5 className='text-danger m-3'>* <s>Alumno</s> = <i>Alumno Inactivo</i></h5>
        </div>
      </div>
    </>
  );
};