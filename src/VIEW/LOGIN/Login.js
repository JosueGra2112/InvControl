import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import { Eye, EyeOff, User } from 'lucide-react'; // Para mostrar/ocultar contraseña y agregar ícono de usuario
import { useNavigate, Link } from 'react-router-dom'; // Para redirigir después del login
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../HEAD/headerIndex'; // Importamos el header personalizado

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate(); // Hook para redirigir

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna la visibilidad de la contraseña
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Iniciar estado de carga

    try {
      // Enviar los datos al web service
      const response = await axios.post('http://localhost/webservSCI/login.php', {
        username,
        password
      });

      const data = response.data;

      if (data.message === "Acceso concedido") {
        // Acceso exitoso, redirigir según el rol del usuario
        toast.success("Acceso concedido. Bienvenido!");
        setTimeout(() => {
          if (data.user.role_name === "Admin") {
            navigate('/admin-panel'); // Redirigir a panel de Admin
          } else {
            navigate('/employee-dashboard'); // Redirigir a panel de Empleado
          }
        }, 2000); // Redirigir después de mostrar la notificación de éxito
      } else {
        toast.error(data.message); // Mostrar mensaje de error
      }
    } catch (error) {
      toast.error("Error en el servidor. Inténtalo de nuevo.");
      console.error(error);
    } finally {
      setLoading(false); // Detener el estado de carga
    }
  };

  return (
    <>
    <Header />

    <Container className="mt-5">
      <ToastContainer /> {/* Contenedor de notificaciones */}
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <User size={50} className="mb-3" /> {/* Logo de usuario */}
            <h2>Iniciar Sesión</h2>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p>Cargando...</p> {/* Mensaje de carga */}
            </div>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ingresa tu usuario" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Iniciar Sesión
              </Button>
            </Form>
          )}
          <div className="text-center mt-3">
            {/* Botón para redirigir al registro */}
            <Link to="/register">
              <Button variant="secondary" className="w-100">
                Registrarse
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}
