import './AnalyticsScreen.css';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Form from 'react-bootstrap/Form';




export const AnalyticsScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);


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
    setEditedStudent({ ...student }); // Agregar esta línea para establecer editedStudent
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
        // Actualiza el estado de students con la versión actualizada del estudiante
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
  return (
    <>
      <div className='text-center p-2 p-md-5'>
        <h1 className='mb-5 title'><b>Analiticos</b></h1>
        <div className='table-container'>
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
                const subjectKeys = Object.keys(notes).filter((key) =>
                  key.endsWith('I') || key.endsWith('II') || key.endsWith('III') || key.endsWith('IV')
                );

                return subjectKeys.map((subject) => {
                  const grade = notes[subject];
                  return (
                    <tr key={`${student.firstName}-${subject}`}>
                      <td>
                        {(() => {
                          switch (subject) {
                            case "mathI":
                              return "Matemáticas I";
                            case "mathII":
                              return "Matemáticas II";
                            case "mathIII":
                              return "Matemáticas III";
                            case "mathIV":
                              return "Matemáticas IV";
                            case "languageAndLiteratureI":
                              return "Lengua y Literatura I";
                            case "languageAndLiteratureII":
                              return "Lengua y Literatura II";
                            case "languageAndLiteratureIII":
                              return "Lengua y Literatura III";
                            case "languageAndLiteratureIV":
                              return "Lengua y Literatura IV";
                            case "biologyI":
                              return "Biología I";
                            case "biologyII":
                              return "Biología II";
                            case "biologyIII":
                              return "Biología III";
                            case "biologyIV":
                              return "Biología IV";
                            case "physicsI":
                              return "Física I";
                            case "physicsII":
                              return "Física II";
                            case "physicsIII":
                              return "Física III";
                            case "physicsIV":
                              return "Física IV";
                            case "chemistryI":
                              return "Química I";
                            case "chemistryII":
                              return "Química II";
                            case "chemistryIII":
                              return "Química III";
                            case "chemistryIV":
                              return "Química IV";
                            case "economyI":
                              return "Economía I";
                            case "economyII":
                              return "Economía II";
                            case "economyIII":
                              return "Economía III";
                            case "economyIV":
                              return "Economía IV";
                            case "geographyI":
                              return "Geografía I";
                            case "geographyII":
                              return "Geografía II";
                            case "geographyIII":
                              return "Geografía III";
                            case "geographyIV":
                              return "Geografía IV";
                            case "historyI":
                              return "Historia I";
                            case "historyII":
                              return "Historia II";
                            case "historyIII":
                              return "Historia III";
                            case "historyIV":
                              return "Historia IV";
                            case "physicalEducationI":
                              return "Educación Física I";
                            case "physicalEducationII":
                              return "Educación Física II";
                            case "physicalEducationIII":
                              return "Educación Física III";
                            case "physicalEducationIV":
                              return "Educación Física IV";
                            default:
                              return subject;
                          }
                        })()}
                      </td>
                      <td>{lastName}, {firstName}</td>
                      <td>{grade !== null ? grade : 'Sin calificación'}</td>
                      <td>
                        <Button className='m-1' onClick={() => handleShowEditModal(student, subject)} variant="secondary"><FaEdit /></Button>{' '}
                        <Button className='m-1' onClick={() => handleShowDeleteModal(student, subject)} variant="danger"><FaTrashAlt /></Button>{' '}
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
          <Modal.Title>Editar Estudiante</Modal.Title>
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
                onChange={(event) => setEditedStudent({ ...selectedStudent, notes: { ...selectedStudent.notes, [selectedSubject]: parseFloat(event.target.value) } })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
