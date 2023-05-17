import React, { useState } from 'react';
import './NewStudentScreen.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';

export const NewStudentScreen = () => {
    const [showConfirmationToast, setShowConfirmationToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        currentYearOfStudy: '',
        payment: true,
        phone: '',
        address: '',
        birthdate: '',
        isBanned: false,
        notes: {
            firstYear: {
                math: '',
                languageAndLiterature: '',
                biology: '',
                physics: '',
                chemistry: '',
                economy: '',
                geography: '',
                history: '',
                physicalEducation: '',
            },
            secondYear: {
                math: '',
                languageAndLiterature: '',
                biology: '',
                physics: '',
                chemistry: '',
                economy: '',
                geography: '',
                history: '',
                physicalEducation: '',
            },
            thirdYear: {
                math: '',
                languageAndLiterature: '',
                biology: '',
                physics: '',
                chemistry: '',
                economy: '',
                geography: '',
                history: '',
                physicalEducation: '',
            },
            fourthYear: {
                math: '',
                languageAndLiterature: '',
                biology: '',
                physics: '',
                chemistry: '',
                economy: '',
                geography: '',
                history: '',
                physicalEducation: '',
            },
        },
    });

    const handleConfirmationToastClose = () => {
        setShowConfirmationToast(false);
    };

    const handleErrorToastClose = () => {
        setShowErrorToast(false);
    };

    const handleAddStudentFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8060/api/students', newStudent);
            setShowConfirmationToast(true);

            // if (response.status === 200) {
            //     setShowConfirmationToast(true);
            // }
        } catch (error) {
            console.log(error);
            setShowErrorToast(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="text-center p-5 row">
                <h1>Nuevo Alumno</h1>
                <div className='col-6'>Aqui va la foto del estudiante</div>
                <div className='col-6'>
                <Form onSubmit={handleAddStudentFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={newStudent.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={newStudent.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCurrentYearOfStudy">
                        <Form.Label>Año de cursado</Form.Label>
                        <Form.Control
                            type="number"
                            name="currentYearOfStudy"
                            value={newStudent.currentYearOfStudy}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={newStudent.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={newStudent.address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBirthdate">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthdate"
                            value={newStudent.birthdate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Agregar Nuevo Alumno
                    </Button>
                    <Nav.Link className="buttonCancel" href="students">Cancelar</Nav.Link>
                </Form>
                </div>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showConfirmationToast} onClose={handleConfirmationToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Confirmación</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>Estudiante creado correctamente.</Toast.Body>
                </Toast>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showErrorToast} onClose={handleErrorToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>No se pudo crear el estudiante.</Toast.Body>
                </Toast>
            </div>
        </>
    );
};
