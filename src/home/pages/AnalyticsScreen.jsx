import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import './AnalyticsScreen.css';

export const AnalyticsScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);


  const [filterName, setFilterName] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  // const [filterYear, setFilterYear] = useState("");
  const [filterGrade, setFilterGrade] = useState("");


  useEffect(() => {
    axios.get('http://localhost:8060/api/students')
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

  //Eliminar nota
  const handleShowDeleteModal = (student, subject) => {
    setSelectedStudent({ ...student, subject });
    setSelectedSubject(subject);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedStudent(null);
    setShowDeleteModal(false);
  }

  //Modificar nota
  const handleShowEditModal = (student, subject) => {
    setSelectedStudent(student);
    setSelectedSubject(subject);
    setEditedStudent({ ...student });
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditedStudent(null);
    setShowEditModal(false);
  }

  const deleteNote = async (id, subject) => {
    try {
      const updatedStudent = { ...selectedStudent };
      updatedStudent.notes[subject] = null;

      const response = await axios.put(`http://localhost:8060/api/students/${id}`, updatedStudent);

      if (response.status === 200) {
        const updatedStudents = students.map((student) => {
          if (student._id === id) {
            return updatedStudent;
          }
          return student;
        });

        setStudents(updatedStudents);
        handleCloseDeleteModal();
        alert("Nota eliminada correctamente");
      }
    } catch (error) {
      console.log(error);
      alert("Error al eliminar la nota");
    }
  };

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

  const SUBJECTS_LABELS = {
    mathI: "Matemáticas I",
    mathII: "Matemáticas II",
    mathIII: "Matemáticas III",
    mathIV: "Matemáticas IV",
    languageAndLiteratureI: "Lengua y Literatura I",
    languageAndLiteratureII: "Lengua y Literatura II",
    languageAndLiteratureIII: "Lengua y Literatura III",
    languageAndLiteratureIV: "Lengua y Literatura IV",
    biologyI: "Biología I",
    biologyII: "Biología II",
    biologyIII: "Biología III",
    biologyIV: "Biología IV",
    physicsI: "Física I",
    physicsII: "Física II",
    physicsIII: "Física III",
    physicsIV: "Física IV",
    chemistryI: "Química I",
    chemistryII: "Química II",
    chemistryIII: "Química III",
    chemistryIV: "Química IV",
    economyI: "Economía I",
    economyII: "Economía II",
    economyIII: "Economía III",
    economyIV: "Economía IV",
    geographyI: "Geografía I",
    geographyII: "Geografía II",
    geographyIII: "Geografía III",
    geographyIV: "Geografía IV",
    historyI: "Historia I",
    historyII: "Historia II",
    historyIII: "Historia III",
    historyIV: "Historia IV",
    physicalEducationI: "Educación Física I",
    physicalEducationII: "Educación Física II",
    physicalEducationIII: "Educación Física III",
    physicalEducationIV: "Educación Física IV",
  };

  return (
    <>
      <div className='text-center p-2 p-md-5'>
        <h1 className='mb-5 title'><b>Analíticos</b></h1>
        <div className="col-md-10 filter-container">


          <Form.Group className='d-flex m-2' controlId="formNameFilter">
            <Form.Label className='col-2 '><b>Nombre:</b></Form.Label>
            <Form.Control type="text" placeholder="Filtrar por nombre" value={filterName} onChange={(e) => setFilterName(e.target.value)} maxLength={30} />
          </Form.Group>


          <Form.Group className='d-flex m-2' controlId="formSubjectFilter">
            <Form.Label className='col-2'><b>Materia:</b></Form.Label>
            <Form.Control as="select" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="">Todas las materias</option>
              {Object.values(SUBJECTS_LABELS).map((subjectLabel) => (
                <option key={subjectLabel} value={subjectLabel}>{subjectLabel}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* <Form.Group className='d-flex m-2' controlId="formSubjectFilter">
            <Form.Label className='col-2'><b>Año:</b></Form.Label>
            <Form.Control as="select" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
              <option value="">Todos los años</option>
              <option value="">I</option>
              <option value="">II</option>
              <option value="">III</option>
              <option value="">IV</option>
            </Form.Control>
          </Form.Group> */}

          <Form.Group className='d-flex m-2' controlId="formGradeFilter">
            <Form.Label className='col-2'><b>Nota:</b></Form.Label>
            <Form.Control type="text" placeholder="Filtrar por nota" value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} maxLength={2} />
          </Form.Group>

        </div>
        <div className='table-container mt-5'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Alumno</th>
                <th>Nota final</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const { firstName, lastName, notes } = student;
                const subjectKeys = Object.keys(notes);

                return subjectKeys.map((subject) => {
                  const grade = notes[subject];
                  const subjectLabel = SUBJECTS_LABELS[subject];

                  // Aplicar los filtros
                  if (
                    (filterName !== "" && !`${lastName}, ${firstName}`.toLowerCase().includes(filterName.toLowerCase())) ||
                    (filterSubject !== "" && subjectLabel !== filterSubject) ||
                    // (filterYear !== "" && !student.year.toLowerCase().includes(filterYear.toLowerCase())) ||
                    (filterGrade !== "" && (
                      (grade === null && filterGrade.toLowerCase() !== "sin calificación" && filterGrade.toLowerCase() !== "-") ||
                      (grade !== null && grade.toString() !== filterGrade)
                    ))
                  ) {
                    return null;
                  }

                  return (
                    <tr key={`${student.firstName}-${subject}`}>
                      <td>{subjectLabel}</td>
                      <td>{`${lastName}, ${firstName}`}</td>
                      <td>{grade !== null ? grade : 'Sin calificación'}</td>
                      <td>
                        <Button className='m-1' onClick={() => handleShowEditModal(student, subject)} variant="secondary"><FaEdit /></Button>
                        <Button className='m-1' onClick={() => handleShowDeleteModal(student, subject)} variant="danger"><FaTrashAlt /></Button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>

          </Table>
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la nota {selectedStudent?.notes[selectedSubject]} de la materia: {selectedSubject} del estudiante: {selectedStudent?.firstName} {selectedStudent?.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteNote(selectedStudent?._id, selectedSubject)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Calificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="editGrade">
              <Form.Label>Nota:</Form.Label>
              <Form.Control
                type="number"
                step="1"
                min="4"
                max="10"
                value={editedStudent ? editedStudent.notes[selectedSubject] : ''}
                onChange={(event) => event.target.value !== '' && setEditedStudent({ ...selectedStudent, notes: { ...selectedStudent.notes, [selectedSubject]: parseFloat(event.target.value) } })}
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
    </>
  );
};
