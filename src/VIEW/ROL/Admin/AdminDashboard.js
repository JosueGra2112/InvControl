import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../HEAD/AdminHeader'; // Importamos el header personalizado

export default function AdminDashboard() {
  const username = "Admin"; // Puedes obtener esto dinámicamente si tienes la información del usuario en tu sistema

  return (
    <>
      {/* Header fuera del Container */}
      <Header />

      {/* Mensaje de bienvenida y descripción del perfil de usuario */}
      <Container className="mt-5">
        <h1 className="text-center mb-4">Bienvenido, {username}</h1>
        <p className="text-center">Este es tu panel de administración, desde aquí puedes gestionar las principales funcionalidades del sistema de inventario:</p>
        
        <Row className="mb-4">
          <Col md={4}>
            <div className="p-3 border bg-light text-center">
              <h4>Gestión de Usuarios</h4>
              <p>Concede o revoca permisos a los empleados. Controla quién puede acceder y realizar operaciones en el sistema.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 border bg-light text-center">
              <h4>Gestión de Productos</h4>
              <p>Administra el inventario de productos: crea, edita o elimina productos para mantener el control del stock.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 border bg-light text-center">
              <h4>Movimientos de Inventario</h4>
              <p>Consulta los movimientos de entrada y salida de inventario para tener un historial detallado de cambios.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
