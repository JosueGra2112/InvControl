import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../HEAD/AdminHeader'; // Importamos el header personalizado

export default function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de confirmación
  const [showClearModal, setShowClearModal] = useState(false); // Estado para el modal de limpiar inventario
  const [movementToDelete, setMovementToDelete] = useState(null); // Estado para almacenar el movimiento a eliminar

  // Obtener movimientos de inventario desde el backend
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await axios.get('http://localhost/webservSCI/getStockMovements.php');
        setMovements(response.data);
      } catch (error) {
        toast.error('Error al obtener los movimientos de inventario');
      }
    };
    fetchMovements();
  }, []);

  // Abrir modal de confirmación de eliminación
  const handleShowDeleteModal = (movement) => {
    setMovementToDelete(movement); // Guardamos el movimiento que se va a eliminar
    setShowDeleteModal(true); // Mostramos el modal de confirmación
  };

  // Eliminar un movimiento de inventario individual
  const deleteMovement = async () => {
    try {
      await axios.post('http://localhost/webservSCI/deleteStockMovement.php', { id: movementToDelete.id });
      toast.success('Movimiento eliminado correctamente');
      setMovements((prevMovements) => prevMovements.filter((movement) => movement.id !== movementToDelete.id));
      setShowDeleteModal(false); // Cerramos el modal de confirmación
    } catch (error) {
      toast.error('Error al eliminar el movimiento');
    }
  };

  // Abrir modal de confirmación para limpiar inventario
  const handleShowClearModal = () => {
    setShowClearModal(true); // Mostramos el modal de confirmación para limpiar inventario
  };

  // Limpiar todos los movimientos de inventario
  const clearInventory = async () => {
    try {
      await axios.post('http://localhost/webservSCI/clearInventory.php');
      toast.success('Inventario limpiado correctamente');
      setMovements([]); // Vaciar la lista de movimientos
      setShowClearModal(false); // Cerramos el modal de confirmación
    } catch (error) {
      toast.error('Error al limpiar el inventario');
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <ToastContainer />
        <h2 className="mb-4 text-center">Movimientos de Inventario</h2>

        <Table responsive="sm" striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Tipo de Movimiento</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Acciones</th> {/* Nueva columna para acciones */}
            </tr>
          </thead>
          <tbody>
            {movements.length > 0 ? (
              movements.map((movement) => (
                <tr key={movement.id}>
                  <td>{movement.product_name}</td>
                  <td>{movement.type === 'entry' ? 'Entrada' : 'Salida'}</td>
                  <td>{movement.quantity}</td>
                  <td>{new Date(movement.movement_date).toLocaleDateString()}</td>
                  <td>{movement.user_name}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleShowDeleteModal(movement)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron movimientos de inventario</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Botón para limpiar todo el inventario */}
        <div className="text-center mt-4">
          <Button variant="danger" onClick={handleShowClearModal}>
            Limpiar Inventario
          </Button>
        </div>
      </Container>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el movimiento de "{movementToDelete?.product_name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteMovement}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para limpiar inventario */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Limpieza de Inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas limpiar todos los movimientos del inventario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={clearInventory}>
            Limpiar Inventario
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
