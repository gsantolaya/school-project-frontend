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
        dni:'',
        email:'',
        currentYearOfStudy: '',
        payment: true,
        phone: '',
        address: '',
        birthdate: '',
        isBanned: false,
        notes: {
            mathI: null,
            languageAndLiteratureI: null,
            biologyI: null,
            physicsI: null,
            chemistryI: null,
            economyI: null,
            geographyI: null,
            historyI: null,
            physicalEducationI: null,
            mathII: null,
            languageAndLiteratureII: null,
            biologyII: null,
            physicsII: null,
            chemistryII: null,
            economyII: null,
            geographyII: null,
            historyII: null,
            physicalEducationII: null,
            mathIII: null,
            languageAndLiteratureIII: null,
            biologyIII: null,
            physicsIII: null,
            chemistryIII: null,
            economyIII: null,
            geographyIII: null,
            historyIII: null,
            physicalEducationIII: null,
            mathIV: null,
            languageAndLiteratureIV: null,
            biologyIV: null,
            physicsIV: null,
            chemistryIV: null,
            economyIV: null,
            geographyIV: null,
            historyIV: null,
            physicalEducationIV: null
        }
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
            const response = await axios.post('/students', newStudent);
            if (response.status === 201) {
                setShowConfirmationToast(true);
                console.log(newStudent)
                //setShowConfirmationToast(true);
            }
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
                <h1 className="title mb-3"><b>Nuevo Alumno</b></h1>
                <div className=''>
                    <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleAddStudentFormSubmit}>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicFirstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" maxLength={20} name="firstName" value={newStudent.firstName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" maxLength={20} name="lastName" value={newStudent.lastName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="text" maxLength={20} name="dni" value={newStudent.dni} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" maxLength={35} name="email" value={newStudent.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicCurrentYearOfStudy">
                            <Form.Label>Año de cursado</Form.Label>
                            <Form.Control type="number" maxLength={1} min={1} max={4} name="currentYearOfStudy" value={newStudent.currentYearOfStudy} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" maxLength={5} name="phone" value={newStudent.phone} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" maxLength={30} name="address" value={newStudent.address} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicBirthdate">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control type="date" maxLength={9} name="birthdate" value={newStudent.birthdate} onChange={handleInputChange} />
                        </Form.Group>
                        <Nav.Link className="buttonsFormAddStudent" href="students">Cancelar</Nav.Link>
                        <Button className='buttonsFormAddStudent' variant="" type="submit">
                            Agregar Nuevo Alumno
                        </Button>
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
