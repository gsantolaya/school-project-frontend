import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { tokenIsValid } from '../../utils/TokenIsValid';
import './MyStudentInformationScreen.css';

export const MyStudentInformationScreen = () => {
  const [students, setStudents] = useState([]);
  const [currentUserStudent, setCurrentUserStudent] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8060/api/students')
      .then((response) => {
        setStudents(response.data);
        const decodedToken = tokenIsValid();
        const foundStudent = response.data.find(student => student.email === decodedToken.email);
        setCurrentUserStudent(foundStudent);
      })
  }, []);

  const decodedToken = tokenIsValid();
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
      <div className='text-center p-5'>
        <h1 className="title mb-3"><b>Información Escolar</b></h1>
        <h4 className="text-start title mb-3"><b>Mis datos:</b></h4>
        <div className='tableInfoContainer'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID de Expediente</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>Año cursado actual</th>
              </tr>
            </thead>
            <tbody>
              {currentUserStudent ? (
                <tr key={currentUserStudent._id} className={currentUserStudent.isBanned ? "banned" : ""}>
                  <td>{currentUserStudent._id}</td>
                  <td>{currentUserStudent.firstName}</td>
                  <td>{currentUserStudent.lastName}</td>
                  <td>{currentUserStudent.currentYearOfStudy}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">No ingresado</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className='d-flex'>
          <h4 className="text-start title mb-3"><b>Estado de pago:</b></h4>
          {currentUserStudent.payment ? (
            <h4 className="ms-3" style={{ color: 'green' }}><b>Al día</b></h4>
          ) : (
            <h4 className="ms-3" style={{ color: 'red' }}><b>Pendiente de pago</b></h4>
          )}
        </div>
        <h4 className="text-start title mb-3"><b>Mi Analítico:</b></h4>
        <div className='tableNotesContainer mt-5'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Nota final</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const { notes, email } = student;
                const subjectKeys = Object.keys(notes);
                if (email === decodedToken.email) {
                  return subjectKeys.map((subject) => {
                    const grade = notes[subject];
                    const subjectLabel = SUBJECTS_LABELS[subject];

                    return (
                      <tr key={`${student.firstName}-${subject}`}>
                        <td>{subjectLabel}</td>
                        <td>{grade !== null ? grade : 'Sin calificación'}</td>
                      </tr>
                    );
                  });
                }
                return null;
              })}
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}
