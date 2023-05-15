import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export function StudentDetails() {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenido del modal */}
          {/* Aquí puedes mostrar los detalles del estudiante */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}