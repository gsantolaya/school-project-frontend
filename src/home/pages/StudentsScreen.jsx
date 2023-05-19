import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import './StudentsScreen.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';


export const StudentsScreen = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name');
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
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchOptionChange = (event) => {
        setSearchOption(event.target.value);
    };

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

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8060/api/students/${editedStudent._id}`, editedStudent);
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

    const filteredStudents = students.filter((student) => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const studentId = student._id.toLowerCase();
        const currentYearOfStudy = student.currentYearOfStudy.toString().toLowerCase();
        const paymentStatus = student.payment ? 'al día' : 'deudor';
        switch (searchOption) {
            case 'name':
                return fullName.includes(searchTerm.toLowerCase());
            case 'id':
                return studentId.includes(searchTerm.toLowerCase());
            case 'year':
                return currentYearOfStudy.includes(searchTerm.toLowerCase());
            case 'payment':
                return paymentStatus.includes(searchTerm.toLowerCase());
            default:
                return fullName.includes(searchTerm.toLowerCase());
        }
    });
    return (
        <>
            <div className='text-center p-2 p-md-5'>
                <h1 className='mb-5 title'><b>Listado de Alumnos</b></h1>
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
                                    <option value="year">Año de cursado actual</option>
                                    <option value="payment">Cuota</option>
                                </Form.Control>
                            </Form.Group>
                    </div>
                    <div className='col-12 my-2 col-md-2 my-md-0 ms-auto'>
                        <Nav.Link className="buttonAddStudent" href="newStudent">Agregar Estudiante</Nav.Link>
                    </div>
                </div>

                <div className='table-container' >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID de Expediente</th>
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
                                filteredStudents.map((student) => (
                                    <tr key={student._id}>
                                        <td>{student._id}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.currentYearOfStudy}</td>
                                        <td style={{ color: student.payment ? 'green' : 'red' }}>
                                            {student.payment ? 'Al día' : 'Pendiente'}
                                        </td>
                                        <td><Button onClick={() => handleShowEditModal(student)} variant="secondary">Ver detalles</Button>{' '}</td>
                                        <td><Button onClick={() => handleShowModal(student)} variant="danger">Eliminar <FaTrashAlt /></Button>{' '}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
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
