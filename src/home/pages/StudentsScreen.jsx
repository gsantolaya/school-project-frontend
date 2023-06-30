import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import './StudentsScreen.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { TokenStorage } from "../../utils/TokenStorage";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";

export const StudentsScreen = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name');
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirmationToast, setShowConfirmationToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showEditStudentConfirmationToast, setShowEditStudentConfirmationToast] = useState(false);
    const [showEditStudentErrorToast, setShowEditStudentErrorToast] = useState(false);
    const [showConfirmationAddStudentToast, setShowConfirmationAddStudentToast] = useState(false);
    const [showErrorAddStudentToast, setShowErrorAddStudentToast] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);
    const [isBanned, setIsBanned] = useState(false);
    const [payment, setPayment] = useState(false);
    const store = TokenStorage()
    const navigate = useNavigate();

    useEffect(() => {
        if (store.tokenValid) {
            axios.get('/students', {
                headers: {
                    "access-token": store.token
                }
            })
                .then((response) => {
                    setStudents(response.data)
                })
        } else {
            navigate("/login")
        }
    }, [navigate, store.token, store.tokenValid])

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
    const handleShowAddModal = () => {
        setShowAddModal(true);
    };
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };
    const handleConfirmationToastClose = () => {
        setShowConfirmationToast(false);
    };
    const handleEditStudentConfirmationToastClose = () => {
        setShowEditStudentConfirmationToast(false)
    } 
    const handleEditStudentErrorToastClose = () => {
        setShowEditStudentErrorToast(false)
    } 
    const handleErrorToastClose = () => {
        setShowErrorToast(false);
    };
    const handleConfirmationAddStudentToastClose = () => {
        setShowConfirmationAddStudentToast(false);
    };
    const handleErrorAddStudentToastClose = () => {
        setShowErrorAddStudentToast(false);
    };
    const handleEditInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
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
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchOptionChange = (event) => {
        setSearchOption(event.target.value);
    };

    const deleteStudent = async (id) => {
        try {
            const response = await axios.delete(`/students/${id}`, {
                headers: {
                    "access-token": store.token
                }
            });
            if (response.status === 200) {
                handleCloseModal()
                setShowConfirmationToast(true)
                const { data } = await axios.get('/students', {
                    headers: {
                        "access-token": store.token
                    }
                });
                setStudents(data);
            }
        } catch (error) {
            handleCloseModal()
            setShowErrorToast(true);
        }
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/students/${editedStudent._id}`, editedStudent, {
                headers: {
                    "access-token": store.token
                }
            });
            if (response.status === 200) {
                const updatedStudents = students.map((student) => {
                    if (student._id === editedStudent._id) {
                        return { ...student, ...editedStudent };
                    }
                    return student;
                });
                setStudents(updatedStudents);
                handleCloseEditModal();
                setShowEditStudentConfirmationToast(true)
            }
        } catch (error) {
            console.log(error);
            handleCloseEditModal();
            setShowEditStudentErrorToast(true)
        }
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddStudentFormSubmit = async (data) => {
        console.log(data)
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
        const newdata = { ...data, payment, isBanned, notes }
        console.log(newdata)
        axios.post('/students', { ...newdata }, {
            headers: {
                "access-token": store.token
            }
        })
            .then(response => {
                handleCloseAddModal()
                setShowConfirmationAddStudentToast(true);
            })
            .catch(error => {
                handleCloseAddModal()
                setShowErrorAddStudentToast(true);
                console.log(error);
            })
    };
    const filteredStudents = students.filter((student) => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const studentId = student._id.toLowerCase();
        const currentYearOfStudy = student.currentYearOfStudy.toString().toLowerCase();
        const paymentStatus = student.payment ? 'al día' : 'pendiente';
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
            <div className='text-center p-5'>
                <h1 className='mb-5 title'><b>Listado de Alumnos</b></h1>
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
                            <Form.Select className='w-50' as="select" value={searchOption} onChange={handleSearchOptionChange}>
                                <option value="name">Apellido/ nombre</option>
                                <option value="id">ID</option>
                                <option value="year">Año de cursado actual</option>
                                <option value="payment">Cuota</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-xl-2 my-2 my-md-0 ms-auto'>
                        <Nav.Link className="buttonAddStudent" onClick={() => handleShowAddModal()}>Agregar Alumno</Nav.Link>
                    </div>
                </div>

                <div className='table-container mt-4' >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className='homeText'>ID de Expediente</th>
                                <th className='homeText'>Alumno</th>
                                <th className='homeText'>Año de cursado actual</th>
                                <th className='homeText'>Cuota</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredStudents.map((student) => (
                                    <tr key={student._id} className={student.isBanned ? "banned" : ""}>
                                        <td>{student._id}</td>
                                        <td>{student.lastName}, {student.firstName}</td>
                                        <td>{student.currentYearOfStudy}</td>
                                        <td style={{ color: student.payment ? 'green' : 'red' }}>
                                            {student.payment ? 'Al día' : 'Pendiente'}
                                        </td>
                                        <td>
                                            <Button className='m-1' onClick={() => handleShowEditModal(student)} variant="secondary"><FaInfoCircle /></Button>
                                            <Button className='m-1' onClick={() => handleShowModal(student)} variant="danger"> <FaTrashAlt /></Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
                <div className='text-end'>
                    <h5 className='text-danger m-3'>* <s>Alumno</s> = <i>Alumno Inactivo</i></h5>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header className='modalHeader' closeButton>
                    <Modal.Title className='modalTitle'><strong>Confirmar Eliminación</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody py-4'>
                    ¿Estás seguro de que deseas eliminar al alumno <b>{selectedStudent?.firstName} {selectedStudent?.lastName}</b>?
                </Modal.Body>
                <Modal.Footer className='modalBody'>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => deleteStudent(selectedStudent?._id)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header className='modalHeader' closeButton>
                    <Modal.Title className="modalTitle">
                        <strong>Información del Alumno</strong>{" "}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody'>
                    <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleEditFormSubmit}>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormFirstName">
                            <Form.Label className="mt-2">
                                <strong>Nombre:</strong></Form.Label>
                            <Form.Control
                                maxLength={20}
                                type="text"
                                name="firstName"
                                value={editedStudent?.firstName || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormLastName">
                            <Form.Label className="mt-2"><strong>Apellido:</strong></Form.Label>
                            <Form.Control
                                maxLength={20}
                                type="text"
                                name="lastName"
                                value={editedStudent?.lastName || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormLastName">
                            <Form.Label className="mt-2"><strong>DNI:</strong></Form.Label>
                            <Form.Control
                                maxLength={20}
                                type="text"
                                name="dni"
                                value={editedStudent?.dni || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormCurrentYearOfStudy">
                            <Form.Label className="mt-2"><strong>Año de cursado actual:</strong></Form.Label>
                            <Form.Control
                                maxLength={1}
                                min={1}
                                max={4}
                                type="number"
                                name="currentYearOfStudy"
                                value={editedStudent?.currentYearOfStudy || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormPhone">
                            <Form.Label className="mt-2"><strong>Teléfono:</strong></Form.Label>
                            <Form.Control
                                maxLength={15}
                                type="string"
                                name="phone"
                                value={editedStudent?.phone || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormAddress">
                            <Form.Label className="mt-2"><strong>Dirección</strong></Form.Label>
                            <Form.Control
                                maxLength={30}
                                type="string"
                                name="address"
                                value={editedStudent?.address || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormLastName">
                            <Form.Label className="mt-2"><strong>Email:</strong></Form.Label>
                            <Form.Control
                                maxLength={35}
                                type="text"
                                name="email"
                                value={editedStudent?.email || ''}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormBirthdate">
                            <Form.Label className="mt-2 d-flex">
                                <strong>Fecha de nacimiento</strong>
                            </Form.Label>
                            <DatePicker
                                className="customDatepicker"
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
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormIsBanned">
                            <Form.Check className="mt-3"
                                type="checkbox"
                                name="isBanned"
                                checked={editedStudent?.isBanned || false}
                                onChange={handleEditInputChange}
                                label="Alumno inactivo"
                            />
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormPayment">
                            <Form.Check className="mt-3"
                                type="checkbox"
                                name="payment"
                                checked={editedStudent?.payment || false}
                                onChange={handleEditInputChange}
                                label="Pago al día"
                            />
                        </Form.Group>
                        <Modal.Footer className="mt-3">
                            <div>
                                <Button className='buttonsFormAddStudent' variant="null" onClick={handleCloseEditModal}>
                                    Cancelar
                                </Button>
                                <Button className='buttonsFormAddStudent' variant="null" type="submit">
                                    Guardar cambios
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header className='modalHeader' closeButton>
                    <Modal.Title className="modalTitle">
                        <strong>Agregar Nuevo Alumno</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody'>
                    <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleSubmit(handleAddStudentFormSubmit)}>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicFirstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" maxLength={20} name="firstName"
                                placeholder="Ingrese el nombre"  {...register("firstName", { required: true })} />
                            {errors?.firstName && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" maxLength={20} name="lastName"
                                placeholder="Ingrese el apellido"  {...register("lastName", { required: true })} />
                            {errors?.lastName && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="text" maxLength={20} name="dni" placeholder="Ingrese el DNI"  {...register("dni", { required: true })} />
                            {errors?.dni && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicLastName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" maxLength={35} name="email" placeholder="Ingrese el email" {...register("email", { required: true })} />
                            {errors?.email && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicCurrentYearOfStudy">
                            <Form.Label>Año de cursado</Form.Label>
                            <Form.Control type="number" maxLength={1} min={1} max={4} name="currentYearOfStudy" placeholder="Ingrese el año de cursado" {...register("currentYearOfStudy", { required: true })} />
                            {errors?.currentYearOfStudy && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" maxLength={15} name="phone" placeholder="Ingrese el número de teléfono"  {...register("phone", { required: true })} />
                            {errors?.phone && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>

                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" maxLength={30} name="address" placeholder="Ingrese dirección"  {...register("address", { required: true })} />
                            {errors?.address && (<span className="authSpan">Este campo es requerido</span>)}
                        </Form.Group>
                        <Form.Group className='formFields m-2 col-10 col-md-5' controlId="editFormBirthdate">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <DatePicker type="Date" name="birthdate"
                                className="customDatepicker"
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
                                maxDate={addDays(new Date(), 0)} locale={es} dateFormat="yyyy-MM-dd"
                            />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicIsBanned">
                            <Form.Check
                                className="mt-3"
                                type="checkbox"
                                name="isBanned"
                                checked={isBanned}
                                onChange={(e) => setIsBanned(e.target.checked)}
                                label="Alumno inactivo"
                            />
                        </Form.Group>
                        <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicPayment">
                            <Form.Check
                                className="mt-3"
                                type="checkbox"
                                name="payment"
                                checked={payment}
                                onChange={(e) => setPayment(e.target.checked)}
                                label="Pago al día"
                            />
                        </Form.Group>
                        <Modal.Footer className="mt-3">
                            <div>
                                <Button className='buttonsFormAddStudent' variant="null" type="submit">
                                    Agregar Nuevo Alumno
                                </Button>
                                <Button className='buttonsFormAddStudent' variant="null" onClick={handleCloseAddModal}>
                                    Cancelar
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>



            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showEditStudentConfirmationToast} onClose={handleEditStudentConfirmationToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Confirmación</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>Alumno editado correctamente.</Toast.Body>
                </Toast>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showEditStudentErrorToast} onClose={handleEditStudentErrorToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>No se pudo editar al alumno seleccionado.</Toast.Body>
                </Toast>
            </div>




            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showConfirmationToast} onClose={handleConfirmationToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Confirmación</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>Alumno eliminado correctamente.</Toast.Body>
                </Toast>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showErrorToast} onClose={handleErrorToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>No se pudo eliminar al alumno seleccionado.</Toast.Body>
                </Toast>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showConfirmationAddStudentToast} onClose={handleConfirmationAddStudentToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Confirmación</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>Alumno guardado correctamente.</Toast.Body>
                </Toast>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Toast show={showErrorAddStudentToast} onClose={handleErrorAddStudentToastClose} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>No se pudo guardar el nuevo alumno.</Toast.Body>
                </Toast>
            </div>
        </>
    )
}