import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap'; // Usamos Offcanvas para menú lateral
import {User, Box, FileText, Power } from 'lucide-react'; // Iconos
import { Link } from 'react-router-dom'; // Enrutamiento
import logo from '../IMG/logoFond.png'; // Logo

export default function AdminHeader() {
  const [show, setShow] = useState(false); // Estado para controlar la visibilidad del Offcanvas

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '60px', width: '60px' }} // Tamaño del logo
            className="me-2"
          />
          <span className="fw-bold fs-4">InvControl</span>
        </Navbar.Brand>

        {/* Botón de menú hamburguesa siempre visible */}
        <Button variant="outline-light" onClick={handleShow}>
          <span className="navbar-toggler-icon" /> {/* Icono de hamburguesa */}
        </Button>

        {/* Menú lateral con Offcanvas */}
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {/* Panel */}
              <Link to="/admin-panel" className="mb-2">
                <Button variant="light" className="w-100 d-flex align-items-center">
                  <User className="me-2 h-4 w-4" />
                  Panel de control
                </Button>
              </Link>

              {/* Gestión de Usuarios */}
              <Link to="/admin/users" className="mb-2">
                <Button variant="light" className="w-100 d-flex align-items-center">
                  <User className="me-2 h-4 w-4" />
                  Gestión de Usuarios
                </Button>
              </Link>

              {/* Gestión de Productos */}
              <Link to="/admin/products" className="mb-2">
                <Button variant="light" className="w-100 d-flex align-items-center">
                  <Box className="me-2 h-4 w-4" />
                  Productos
                </Button>
              </Link>

              {/* Movimientos de Inventario */}
              <Link to="/admin/stock-movements" className="mb-2">
                <Button variant="light" className="w-100 d-flex align-items-center">
                  <FileText className="me-2 h-4 w-4" />
                  Movimientos de Inventario
                </Button>
              </Link>
              {/* Cerrar Sesión */}
              <Link to="/">
                <Button variant="danger" className="w-100 d-flex align-items-center">
                  <Power className="me-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}
