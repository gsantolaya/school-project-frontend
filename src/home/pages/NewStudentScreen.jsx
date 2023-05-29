import React, { useState } from 'react';
import './NewStudentScreen.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useForm } from "react-hook-form";
import { TokenStorage } from "../../utils/TokenStorage";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

export const NewStudentScreen = () => {
    const [showConfirmationToast, setShowConfirmationToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const notes = {
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

    const store = TokenStorage()
    const navigate = useNavigate();

    const handleConfirmationToastClose = () => {
        setShowConfirmationToast(false);
    };

    const handleErrorToastClose = () => {
        setShowErrorToast(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddStudentFormSubmit = (data) => {
        console.log(data)
        const newdata = { ...data, payment: true, isBanned: false, notes }
        console.log(newdata)
        axios.post('/students',
            { ...newdata }, {
                headers: {
                    "access-token": store.token
                }
        })
            .then(response => {
                setShowConfirmationToast(true);
                console.log(response);
                setTimeout(() => {
                    navigate("/home/students");
                }, 3000);
            })
            .catch(error => {
                setShowErrorToast(true);
                console.log(error);
            })
    };
    return (
        <>
            <div className="text-center p-5 row">
                <h1 className="title mb-3"><b>Nuevo Alumno</b></h1>
                <div className=''>
                    <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleSubmit(handleAddStudentFormSubmit)}>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicFirstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" maxLength={20} name="firstName"
                                placeholder="Ingrese su nombre"  {...register("firstName", { required: true })} />
                            {errors?.firstName && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" maxLength={20} name="lastName"
                                placeholder="Ingrese su apellido"  {...register("lastName", { required: true })} />
                            {errors?.lastName && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="text" maxLength={20} name="dni" placeholder="Ingrese su DNI"  {...register("dni", { required: true })} />
                            {errors?.dni && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" maxLength={35} name="email" placeholder="Ingrese su email" {...register("email", { required: true })} />
                            {errors?.email && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicCurrentYearOfStudy">
                            <Form.Label>Año de cursado</Form.Label>
                            <Form.Control type="number" maxLength={1} min={1} max={4} name="currentYearOfStudy" placeholder="Ingrese año de cursado" {...register("currentYearOfStudy", { required: true })} />
                            {errors?.currentYearOfStudy && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" maxLength={15} name="phone" placeholder="Ingrese número de teléfono"  {...register("phone", { required: true })} />
                            {errors?.phone && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" maxLength={30} name="address" placeholder="Ingrese dirección"  {...register("address", { required: true })} />
                            {errors?.address && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicBirthdate">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control type="date" maxLength={9} name="birthdate"       {...register("birthdate", { required: true })} />
                            {errors?.birthdate && (<span className="authSpan">Este campo es requerido</span>)}
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