import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; // Importamos componentes de Bootstrap
import { Info, Play, Home } from 'lucide-react'; // Importamos el ícono de Home
import { Link } from 'react-router-dom'; // Usamos Link de React Router para navegación
import logo from '../IMG/logoFond.png';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3"> {/* Usamos el componente Navbar de Bootstrap */}
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '60px', width: '60px' }} // Logo más grande
            className="me-2"
          />
          <span className="fw-bold fs-4">InvControl</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Botón de menú hamburguesa */}
        <Navbar.Collapse id="basic-navbar-nav"> {/* Contenido del menú colapsable */}
          <Nav className="ms-auto d-flex align-items-center gap-3"> {/* Menú alineado a la derecha */}
            
            {/* Botón de Inicio */}
            <Link to="/">
              <Button variant="light" className="d-flex align-items-center">
                <Home className="me-2 h-4 w-4" />
                Inicio
              </Button>
            </Link>

            {/* Redirigir a Login cuando se hace clic en "Iniciar Sesión" */}
            <Link to="/login">
              <Button variant="light" className="d-flex align-items-center">
                <Play className="me-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            </Link>

            {/* Acerca de */}
            <Link to="/about">
              <Button variant="light" className="d-flex align-items-center">
                <Info className="me-2 h-4 w-4" />
                Acerca de
              </Button>
            </Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
