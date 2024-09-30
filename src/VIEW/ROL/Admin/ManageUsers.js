import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import Header from '../../HEAD/AdminHeader'; // Importamos el header personalizado

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Para el spinner de carga

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost/webservSCI/getUsers.php');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error al obtener la lista de usuarios');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Actualizar permisos
  const updatePermissions = async (userId, canCreate, canEdit, canDelete) => {
    try {
      const response = await axios.post('http://localhost/webservSCI/managePermissions.php', {
        user_id: userId,
        can_create_product: canCreate,
        can_edit_product: canEdit,
        can_delete_product: canDelete
      });
      toast.success(response.data.message);
      // Refrescar la lista de usuarios después de actualizar permisos
      const updatedUsers = await axios.get('http://localhost/webservSCI/getUsers.php');
      setUsers(updatedUsers.data);
    } catch (error) {
      toast.error('Error al actualizar permisos');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando usuarios...</p>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-5 d-flex justify-content-center">
        <ToastContainer />
        <div className="w-100" style={{ maxWidth: '1200px' }}>
          <h2 className="mb-4 text-center text-primary">Gestión de Usuarios</h2>

          <Table responsive="sm" striped bordered hover className="table-sm text-center">
            <thead className="table-dark">
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Permisos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <Badge bg={user.role_name === 'Admin' ? 'success' : 'info'}>
                      {user.role_name}
                    </Badge>
                  </td>
                  <td className="d-flex justify-content-around">
                    <div className="text-center">
                      {user.can_create_product ? (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                      <small className="d-block">Crear</small>
                    </div>
                    <div className="text-center">
                      {user.can_edit_product ? (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                      <small className="d-block">Editar</small>
                    </div>
                    <div className="text-center">
                      {user.can_delete_product ? (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                      <small className="d-block">Eliminar</small>
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="d-flex align-items-center mx-auto"
                      onClick={() =>
                        updatePermissions(
                          user.id,
                          !user.can_create_product,
                          !user.can_edit_product,
                          !user.can_delete_product
                        )
                      }
                    >
                      <span className="d-inline d-md-none">
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                      <span className="d-none d-md-inline">
                        <FontAwesomeIcon icon={faPen} className="me-2" />
                        Actualizar
                      </span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
