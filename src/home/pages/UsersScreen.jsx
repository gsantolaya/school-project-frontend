import React, { useEffect, useState } from 'react';
import './UsersScreen.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { tokenIsValid } from '../../utils/TokenIsValid';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


export const UsersScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [showDeleteMyUserModal, setShowDeleteMyUserModal] = useState(false);
  const [showEditMyUserModal, setShowEditMyUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);

  //Funcion obtener usuarios:
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8060/api/users', {
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
  //----------------------------------------------------------------------------------------------------------------------
  // Funciones eliminar mi usuario:
  const handleShowDeleteMyUserModal = (user) => {
    setSelectedUser(user);
    setShowDeleteMyUserModal(true);
  };
  const handleCloseDeleteMyUserModal = () => {
    setSelectedUser(null);
    setShowDeleteMyUserModal(false);
  }
  const deleteMyUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8060/api/users/${id}`, {
        headers: {
          'access-token': `${token}`
        }
      });
      if (response.status === 200) {
        handleCloseDeleteMyUserModal();
        localStorage.removeItem('token');
        navigate("/");
        const { data } = await axios.get('http://localhost:8060/api/users');
        setUsers(data);
      }
    } catch (error) {
      handleCloseDeleteMyUserModal()
      // setShowErrorToast(true);
    }
  }
  //----------------------------------------------------------------------------------------------------------------------
  // Funciones editar mi usuario:
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
      const response = await axios.put(`http://localhost:8060/api/users/${editedUser._id}`, editedUser, {
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
  //----------------------------------------------------------------------------------------------------------------------
  // Funciones para editar la contrasena
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
  
  const handleEditPasswordFormSubmit = async (e) => {
    e.preventDefault();
    console.log(editedUser)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8060/api/users/reset/password`,
        { email: editedUser.email, password: editedUser.password },
        {
          headers: {
            'access-token': token
          }
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
        alert("Tu contrasena ha sido modificada");
      }
    } catch (error) {
      console.log(error);
      alert("Error al modificar la contrasena");
    }
  };
  
  const handleEditPasswordInputChange = (event) => {
    const { value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      password: value
    }));
  };
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
      const response = await axios.delete(`http://localhost:8060/api/users/${id}`, {
        headers: {
          'access-token': `${token}`
        }
      });
      if (response.status === 200) {
        handleCloseDeleteUserModal();
        const { data } = await axios.get('http://localhost:8060/api/users');
        setUsers(data);
      }
    } catch (error) {
      handleCloseDeleteUserModal()
      // setShowErrorToast(true);
    }
  }
  //----------------------------------------------------------------------------------------------------------------------
  const decodedToken = tokenIsValid();
  return (
    <>
      <div className='text-center p-5'>
        <h1 className="title mb-3"><b>Welcome {decodedToken.firstName}</b></h1>
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
                          <Button className='m-1' onClick={() => handleShowEditMyUserModal(user)} variant="secondary"><FaEdit /></Button>
                          <Button className='m-1' variant="secondary" onClick={() => handleShowEditPassword(user)}>Modificar contraseña</Button>
                          <Button className='m-1' onClick={() => handleShowDeleteMyUserModal(user)} variant="danger"><FaTrashAlt /></Button>
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
                <th>Usuario</th>
                <th>Apellido y Nombre</th>
                <th>Tipo de cuenta</th>
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
                      <Button className='m-1' onClick={() => handleShowEditMyUserModal(user)} variant="secondary"><FaEdit /></Button>
                      <Button className='m-1' variant="secondary" onClick={() => handleShowEditPassword(user)}>Modificar contraseña</Button>
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

      {/* Modal eliminar mi cuenta */}
      <Modal show={showDeleteMyUserModal} onHide={handleCloseDeleteMyUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar mi cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar su cuenta de usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteMyUserModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteMyUser(selectedUser?._id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal editar mi cuenta */}
      <Modal show={showEditMyUserModal} onHide={handleCloseEditMyUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar mi Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditMyUserFormSubmit}>
            <Form.Group controlId="editFormFirstName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editedUser?.firstName || ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormLasttName">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editedUser?.lastName || ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            {decodedToken.isAdmin && (
              <>
                <Form.Group controlId="editFormIsActivated">
                  <Form.Check
                    type="checkbox"
                    name="isActivated"
                    checked={editedUser?.isActivated || false}
                    onChange={handleEditInputChange}
                    label="Cuenta activa"
                  />
                </Form.Group>
                <Form.Group controlId="editFormIsAdmin">
                  <Form.Check
                    type="checkbox"
                    name="isAdmin"
                    checked={editedUser?.isAdmin || false}
                    onChange={handleEditInputChange}
                    label="Administrador"
                  />
                </Form.Group>
              </>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditMyUserModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal modificar contrasena */}
      <Modal show={showEditPasswordModal} onHide={handleCloseEditPasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditPasswordFormSubmit}>
            <Form.Group controlId="editFormFirstName">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={editedUser?.email || ''}
                disabled  // Deshabilita el campo de entrada
              />
            </Form.Group>
            <Form.Group controlId="editFormLasttName">
              <Form.Label>Nueva contraseña:</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={editedUser?.password || ''}
                onChange={handleEditPasswordInputChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditPasswordModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Modificar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal eliminar otra cuenta */}
      <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar mi cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la cuenta de {selectedUser?.firstName} {selectedUser?.lastName}?</Modal.Body>
        <Modal.Footer>
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
