import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import "./StudentsScreen.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import { TokenStorage } from "../../utils/TokenStorage";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";

export const StudentsScreen = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentFiltered, setStudentFiltered] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showConfirmationToast, setShowConfirmationToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const store = TokenStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.tokenValid) {
      axios
        .get("/students", {
          headers: {
            "access-token": store.token,
          },
        })
        .then((response) => {
          setStudents(response.data);
          setStudentFiltered(response.data);
        });
    } else {
      navigate("/login");
    }
  }, [navigate, store.token, store.tokenValid]);

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  const handleShowEditModal = (student) => {
    setEditedStudent(student);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditedStudent(null);
    setShowEditModal(false);
  };

  const handleConfirmationToastClose = () => {
    setShowConfirmationToast(false);
  };

  const handleErrorToastClose = () => {
    setShowErrorToast(false);
  };

  const handleEditInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setEditedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: checked,
      }));
    } else {
      setEditedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`/students/${id}`, {
        headers: {
          "access-token": store.token,
        },
      });
      if (response.status === 200) {
        handleCloseModal();
        setShowConfirmationToast(true);
        const { data } = await axios.get("/students", {
          headers: {
            "access-token": store.token,
          },
        });
        setStudents(data);
      }
    } catch (error) {
      handleCloseModal();
      setShowErrorToast(true);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/students/${editedStudent._id}`,
        editedStudent,
        {
          headers: {
            "access-token": store.token,
          },
        }
      );
      if (response.status === 200) {
        const updatedStudents = students.map((student) => {
          if (student._id === editedStudent._id) {
            return { ...student, ...editedStudent };
          }
          return student;
        });
        setStudents(updatedStudents);
        handleCloseEditModal();
        alert("Estudiante actualizado correctamente");
      }
    } catch (error) {
      console.log(error);
      alert("Error al actualizar el estudiante");
    }
  };

  const handleSearchInput = (e) => {
    let studentInput = e.target.value.toLowerCase();
    if (studentInput === "") {
      setStudentFiltered(students);
    } else {
      const filterStudent = students.filter((student) => {
        return (
          student.lastName.toLowerCase().includes(studentInput) ||
          student.firstName.toLowerCase().includes(studentInput) ||
          student._id.toLowerCase().includes(studentInput) ||
          (student.payment ? "al dia" : "pendiente").includes(studentInput)
        );
      });
      setStudentFiltered(filterStudent);
    }
  };

  return (
    <>
      <div className="text-center p-5 p-md-5">
        <h1 className="mb-5 title">
          <b>Listado de Alumnos</b>
        </h1>
        <div className="row d-md-flex ">
    <div className="col-md-6 mb-1  ">
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar por Apellido, Nombre, Id o Cuota"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                onChange={handleSearchInput}
              />
            </InputGroup>
          </div>
          <div className=" col-md-6 mb-1 mt-3 mt-md-0 ">
          <Button href="newStudent" className="addStudent">Agregar Alumno</Button>
          </div>
        </div>

        <div className="table-container mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID de Expediente</th>
                <th>Alumno</th>
                <th>Año de cursado actual</th>
                <th>Cuota</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {studentFiltered.map((student) => (
                <tr
                  key={student._id}
                  className={student.isBanned ? "banned" : ""}
                >
                  <td>{student._id}</td>
                  <td>
                    {student.lastName}, {student.firstName}
                  </td>
                  <td>{student.currentYearOfStudy}</td>
                  <td style={{ color: student.payment ? "green" : "red" }}>
                    {student.payment ? "Al día" : "Pendiente"}
                  </td>
                  <td>
                    <Button
                      className="m-1"
                      onClick={() => handleShowEditModal(student)}
                      variant="secondary"
                    >
                      <FaInfoCircle />
                    </Button>
                    <Button
                      className="m-1"
                      onClick={() => handleShowModal(student)}
                      variant="danger"
                    >
                      {" "}
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al estudiante{" "}
          {selectedStudent?.firstName} {selectedStudent?.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteStudent(selectedStudent?._id)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title className="title">
            {" "}
            <strong>Información Estudiante</strong>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="editFormFirstName">
              <Form.Label>
                {" "}
                <strong>Nombre</strong>
              </Form.Label>
              <Form.Control
                maxLength={20}
                type="text"
                name="firstName"
                value={editedStudent?.firstName || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormLastName">
              <Form.Label className="mt-2">
                <strong>Apellido</strong>{" "}
              </Form.Label>
              <Form.Control
                maxLength={20}
                type="text"
                name="lastName"
                value={editedStudent?.lastName || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormID">
              <Form.Label className="mt-2">
                {" "}
                <strong>DNI</strong>
              </Form.Label>
              <Form.Control
                maxLength={20}
                type="text"
                name="dni"
                value={editedStudent?.dni || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormCurrentYearOfStudy">
              <Form.Label className="mt-2">
                <strong>Año de cursado actual</strong>
              </Form.Label>
              <Form.Control
                maxLength={1}
                min={1}
                max={4}
                type="number"
                name="currentYearOfStudy"
                value={editedStudent?.currentYearOfStudy || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormPhone">
              <Form.Label className="mt-2">
                <strong>Teléfono</strong>
              </Form.Label>
              <Form.Control
                maxLength={15}
                type="string"
                name="phone"
                value={editedStudent?.phone || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormAddress">
              <Form.Label className="mt-2">
                <strong>Dirección</strong>
              </Form.Label>
              <Form.Control
                maxLength={30}
                type="string"
                name="address"
                value={editedStudent?.address || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormEmail">
              <Form.Label className="mt-2">
                <strong>Email</strong>
              </Form.Label>
              <Form.Control
                maxLength={35}
                type="text"
                name="email"
                value={editedStudent?.email || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormBirthdate">
              <Form.Label className="mt-2">
                <strong>Fecha de nacimiento</strong>
              </Form.Label>

              <DatePicker
                className="customDatepicker mb-4"
                selected={
                  editedStudent?.birthdate
                  ? moment(editedStudent.birthdate).toDate()
                  : null
                }
                onChange={(date) => {
                    const formattedDate = moment(date).format('YYYY-MM-DD');
                    setEditedStudent((prevStudent) => ({
                      ...prevStudent,
                      birthdate: formattedDate,
                    }));
                  }}
                maxDate={addDays(new Date(), 0)}
                name="birthdate"
                type="Date"
                locale={es}
                dateFormat="yyyy-MM-dd" 
                />
            </Form.Group>   
            <Modal.Footer>

              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="position-fixed bottom-0 end-0 p-3">
        <Toast
          show={showConfirmationToast}
          onClose={handleConfirmationToastClose}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Confirmación</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body>Estudiante eliminado correctamente.</Toast.Body>
        </Toast>
      </div>
      <div className="position-fixed bottom-0 end-0 p-3">
        <Toast
          show={showErrorToast}
          onClose={handleErrorToastClose}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body>
            No se pudo eliminar el estudiante seleccionado.
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
};
