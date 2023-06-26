import React, { useEffect, useState } from 'react';
import './UsersScreen.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { tokenIsValid } from '../../utils/TokenIsValid';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

export const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [showEditMyUserModal, setShowEditMyUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/users', {
      headers: {
        'access-token': `${token}`
      }
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
      });
  }, []);
  const handleShowEditMyUserModal = (user) => {
    setEditedUser({
      ...user,
      email: user.email,
      password: ''
    });
    setShowEditMyUserModal(true);
  };
  const handleCloseEditMyUserModal = () => {
    setEditedUser(null);
    setShowEditMyUserModal(false);
  }
  const handleEditMyUserFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/users/${editedUser._id}`, editedUser, {
        headers: {
          'access-token': token
        }
      });
      if (response.status === 200) {
        const updatedUsers = users.map((user) => {
          if (user._id === editedUser._id) {
            return { ...user, ...editedUser };
          }
          return user;
        });
        setUsers(updatedUsers);
        handleCloseEditMyUserModal();
        alert("Tu cuenta ha sido modificada");
      }
    } catch (error) {
      console.log(error);
      alert("Error al modificar la cuenta");
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: checked,
      }));
    } else {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: name === 'password' && value === '' ? prevUser.password : value,
      }));
    }
  };
  const handleShowEditPassword = (user) => {
    setEditedUser({
      ...user,
      email: user.email,
      password: ''
    });
    setShowEditPasswordModal(true);
  };

  const handleCloseEditPasswordModal = () => {
    setEditedUser(null);
    setShowEditPasswordModal(false);
  };

  const { register, handleSubmit,watch, formState: { errors } } = useForm();

  const handleEditPasswordFormSubmit = handleSubmit(async (data) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        '/users/reset/password',
        { email: editedUser.email, password: data.password },
        {
          headers: {
            'access-token': token,
          },
        }
      );
      if (response.status === 200) {
        const updatedUsers = users.map((user) => {
          if (user._id === editedUser._id) {
            return { ...user, ...editedUser };
          }
          return user;
        });
        setUsers(updatedUsers);
        handleCloseEditPasswordModal();
        alert('Tu contraseña ha sido modificada');
      }
    } catch (error) {
      console.log(error);
      alert('Error al modificar la contraseña');
    }
  });
  //----------------------------------------------------------------------------------------------------------------------
  // Funciones eliminar otro usuario:
  const handleShowDeleteUserModal = (user) => {
    setSelectedUser(user);
    setShowDeleteUserModal(true);
  };
  const handleCloseDeleteUserModal = () => {
    setSelectedUser(null);
    setShowDeleteUserModal(false);
  }
  const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`/users/${id}`, {
        headers: {
          'access-token': `${token}`
        }
      });
      if (response.status === 200) {
        handleCloseDeleteUserModal();
        const { data } = await axios.get('/users');
        setUsers(data);
      }
    } catch (error) {
      handleCloseDeleteUserModal()
    }
  }
  //----------------------------------------------------------------------------------------------------------------------
  const decodedToken = tokenIsValid();
  return (
    <>
      <div className='text-center p-5'>
        <h1 className="title mb-3"><b>Bienvenid@ {decodedToken.firstName}</b></h1>
        <h4 className="text-start title mb-3"><b>Mi usuario:</b></h4>
        <Table striped bordered hover>
          <tbody>
            {
              users.map((user) => {
                const isCurrentUser = user.email === decodedToken.email;
                if (!isCurrentUser) {
                  return null;
                }
                return (
                  <tr key={user._id}>
                    <td className='py-4'>{user.email}</td>
                    <td className='pt-3'>
                      {isCurrentUser && (
                        <>
                          <Button className='m-1' variant="secondary" onClick={() => handleShowEditPassword(user)}>Modificar contraseña</Button>
                          <Button className='m-1' onClick={() => handleShowEditMyUserModal(user)} variant="dark"><FaEdit /></Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
      {decodedToken.isAdmin && (
        <div className='text-center px-5'>
          <h4 className="text-start title mb-3"><b>Otros Usuarios:</b></h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='homeText'>Usuario</th>
                <th className='homeText'>Apellido y Nombre</th>
                <th className='homeText'>Tipo de cuenta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isCurrentUser = user.email === decodedToken.email;
                if (isCurrentUser) {
                  return null;
                }
                const userClass = user.isActivated ? '' : 'inactive-user';
                return (
                  <tr key={user._id}>
                    <td className={`py-4 ${userClass}`}>{user.email}</td>
                    <td className={`py-4 ${userClass}`}>{user.lastName} {user.firstName}</td>
                    <td className={`py-4 ${userClass}`}>{user.isAdmin ? 'Administrador' : 'Estudiante'}</td>
                    <td className='pt-3'>
                      <Button className='m-1' variant="secondary" onClick={() => handleShowEditPassword(user)}>Modificar contraseña</Button>
                      <Button className='m-1' onClick={() => handleShowEditMyUserModal(user)} variant="dark"><FaEdit /></Button>
                      <Button className='m-1' onClick={() => handleShowDeleteUserModal(user)} variant="danger">
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {/* Modal editar cuenta */}
      <Modal show={showEditMyUserModal} onHide={handleCloseEditMyUserModal}>
        <Modal.Header className='modalHeader' closeButton>
          <Modal.Title className='modalTitle' ><strong>Editar Usuario</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <Form onSubmit={handleEditMyUserFormSubmit}>
            <Form.Group className='formFields' controlId="editFormFirstName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                maxLength={20}
                name="firstName"
                value={editedUser?.firstName || ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className='formFields' controlId="editFormLasttName">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                maxLength={20}
                name="lastName"
                value={editedUser?.lastName || ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            {decodedToken.isAdmin && (
              <>
                <Form.Group className='formFields' controlId="editFormIsActivated">
                  <Form.Check className="mt-3"
                    type="checkbox"
                    name="isActivated"
                    checked={editedUser?.isActivated || false}
                    onChange={handleEditInputChange}
                    label="Cuenta activa"
                  />
                </Form.Group>
                <Form.Group className='formFields' controlId="editFormIsAdmin">
                  <Form.Check className="mt-3"
                    type="checkbox"
                    name="isAdmin"
                    checked={editedUser?.isAdmin || false}
                    onChange={handleEditInputChange}
                    label="Administrador"
                  />
                </Form.Group>
              </>
            )}
            <Modal.Footer className="mt-3 d-flex justify-content-center">
              <Button className='buttonsFormAddStudent' variant="null" onClick={handleCloseEditMyUserModal}>
                Cancelar
              </Button>
              <Button className='buttonsFormAddStudent' variant="null" type="submit">
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal modificar contrasena */}
      <Modal show={showEditPasswordModal} onHide={handleCloseEditPasswordModal}>
  <Modal.Header className='modalHeader' closeButton>
    <Modal.Title className="modalTitle"><strong>Modificar contraseña</strong></Modal.Title>
  </Modal.Header>
  <Modal.Body className='modalBody'>
    <Form onSubmit={handleEditPasswordFormSubmit}>
      <Form.Group className="formFields" controlId="editFormFirstName">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={editedUser?.email || ''}
          disabled
        />
      </Form.Group>
      <Form.Group className="formFields" controlId="editFormPassword">
        <Form.Label>Nueva contraseña:</Form.Label>
        <Form.Control
          type="password"
          maxLength={35}
          name="password"
          {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/ })}
        />
        {errors.password && (
          <span className="text-danger">
            La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener al menos 6 caracteres.
          </span>
        )}
      </Form.Group>
      <Form.Group className="formFields" controlId="editFormRepeatPassword">
        <Form.Label>Repetir nueva contraseña:</Form.Label>
        <Form.Control
          type="password"
          maxLength={35}
          name="repeatPassword"
          {...register('repeatPassword', { required: true, validate: value => value === watch('password') })}
        />
        {errors.repeatPassword && (
          <span className="text-danger">
            Las contraseñas ingresadas no son iguales.
          </span>
        )}
      </Form.Group>
      <Modal.Footer className='mt-3 d-flex justify-content-center'>
        <Button className='buttonsFormAddStudent' variant="null" onClick={handleCloseEditPasswordModal}>
          Cancelar
        </Button>
        <Button className='buttonsFormAddStudent' variant="null" type="submit">
          Modificar
        </Button>
      </Modal.Footer>
    </Form>
  </Modal.Body>
</Modal>


      {/* Modal eliminar otra cuenta */}
      <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
        <Modal.Header className='modalHeader' closeButton>
          <Modal.Title className='modalTitle'><strong>Confirmar Eliminación</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody py-4'>
          ¿Estás seguro de que deseas eliminar la cuenta de <b>{selectedUser?.firstName} {selectedUser?.lastName}</b>?</Modal.Body>
        <Modal.Footer className='modalBody'>
          <Button variant="secondary" onClick={handleCloseDeleteUserModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteUser(selectedUser?._id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>    </>
  )
}