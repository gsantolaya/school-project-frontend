import React, { useEffect, useState } from 'react';
import NavbarMenu from '../components/NavbarMenu';
import { FaTrashAlt } from "react-icons/fa"
import { SideMenu } from '../components/SideMenu';
import Table from 'react-bootstrap/Table';
import './StudentsScreen.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';



export const StudentsScreen = () => {

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirmationToast, setShowConfirmationToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8060/api/students')
            .then((response) => {
                setStudents(response.data)
            })
    }, [])

    const deleteStudent = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8060/api/students/${id}`);
            if (response.status === 200) {
                handleCloseModal()
                setShowConfirmationToast(true)
                const { data } = await axios.get('http://localhost:8060/api/students');
                setStudents(data);
            }
        } catch (error) {
            handleCloseModal()
            setShowErrorToast(true);
        }
    }

    const handleShowModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setShowModal(false);
    }

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
        const { name, value } = event.target;
        setEditedStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.put(`http://localhost:8060/api/students/${editedStudent._id}`, editedStudent);
          if (response.status === 200) {
            // Actualizar la lista de estudiantes después de la actualización exitosa
            const updatedStudents = students.map((student) => {
              if (student._id === editedStudent._id) {
                return { ...student, ...editedStudent };
              }
              return student;
            });
            setStudents(updatedStudents);
            
            handleCloseEditModal();
            
            // Mostrar un toast o mensaje de éxito
            alert("Estudiante actualizado correctamente");
          }
        } catch (error) {
          console.log(error);
          // Mostrar un toast o mensaje de error
          alert("Error al actualizar el estudiante");
        }
      };
    return (
        <>


            <NavbarMenu />
            <SideMenu />
            <div className='Container col-md-9 col-lg-10 position-absolute end-0 p-5 text-center'>
                <h1 className='mb-5 font-weight-bold'>Listado de Alumnos</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nro. de Expediente</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Año cursado actual</th>
                            <th>Cuota</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student) => {
                                return (
                                    <tr key={student._id}>
                                        <td>{student._id}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.currentYearOfStudy}</td>
                                        <td style={{ color: student.payment ? 'green' : 'red' }}>
                                            {student.payment ? 'Al día' : 'Deudor'}
                                        </td>
                                        <td><Button onClick={() => handleShowEditModal(student)} variant="secondary">Ver detalles</Button>{' '}</td>
                                        <td><Button onClick={() => handleShowModal(student)} variant="danger">Eliminar <FaTrashAlt /></Button>{' '}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar al estudiante {selectedStudent?.firstName} {selectedStudent?.lastName}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => deleteStudent(selectedStudent?._id)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Estudiante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditFormSubmit}>
                        <Form.Group controlId="editFormFirstName">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={editedStudent?.firstName || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormLastName">
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={editedStudent?.lastName || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormCurrentYearOfStudy">
                            <Form.Label>Año de cursado actual:</Form.Label>
                            <Form.Control
                                type="number"
                                name="currentYearOfStudy"
                                value={editedStudent?.currentYearOfStudy || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormPhone">
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                type="string"
                                name="phone"
                                value={editedStudent?.phone || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="string"
                                name="address"
                                value={editedStudent?.address || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormBirthdate">
                            <Form.Label>Fecha de nacimiento:</Form.Label>
                            <Form.Control
                                type="string"
                                name="birthdate"
                                value={editedStudent?.birthdate || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormIsBanned">
                            <Form.Check
                                type="checkbox"
                                name="isBanned"
                                checked={editedStudent?.isBanned || false}
                                onChange={handleEditInputChange}
                                label="Estudiante inactivo"
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormPayment">
                            <Form.Check
                                type="checkbox"
                                name="payment"
                                checked={editedStudent?.payment || false}
                                onChange={handleEditInputChange}
                                label="Pago al día"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showConfirmationToast} onClose={handleConfirmationToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Confirmación</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>Estudiante eliminado correctamente.</Toast.Body>
                </Toast>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showErrorToast} onClose={handleErrorToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>No se pudo eliminar el estudiante seleccionado.</Toast.Body>
                </Toast>
            </div>
        </>
    )
}
