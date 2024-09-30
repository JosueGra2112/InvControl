import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import { Eye, EyeOff, CheckCircle } from 'lucide-react'; // Importamos el icono de palomita (CheckCircle)
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../HEAD/headerIndex'; // Importamos el header personalizado

export default function Register() {
  const [showPassword, setShowPassword] = useState(false); // Estado para la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const [processing, setProcessing] = useState(false); // Estado para el retraso de "Registrando..."
  const [success, setSuccess] = useState(false); // Estado para mostrar la palomita de éxito
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirigir

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna la visibilidad de la contraseña
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Alterna la visibilidad de la confirmación de la contraseña
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true); // Inicia el estado de carga

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setLoading(false); // Finaliza la carga si hay error
      toast.error('Las contraseñas no coinciden'); // Mostrar notificación de error
      return;
    }

    try {
      // Enviar los datos al web service
      const response = await axios.post('http://localhost/webservSCI/registerUser.php', {
        username,
        password
      });

      if (response.data.message === 'Usuario registrado con éxito') {
        // Mostrar el mensaje de "Registrando..." por 4 segundos
        setProcessing(true); // Mostrar el estado de "Registrando"
        setTimeout(() => {
          setProcessing(false); // Ocultar el estado de "Registrando"
          setSuccess(true); // Mostrar la palomita de éxito
          setTimeout(() => {
            toast.success('Cuenta creada con éxito'); // Mostrar notificación de éxito
            setTimeout(() => {
              navigate('/login'); // Redirigir a la página de login después de 2 segundos
            }, 2000); // Redirigir después de 2 segundos
          }, 1000); // Mostrar la notificación después de 1 segundo con la palomita visible
        }, 4000); // Retraso de 4 segundos para simular el registro
      } else {
        toast.error(response.data.message); // Mostrar notificación de error
      }
    } catch (error) {
      toast.error('Error al registrar el usuario'); // Mostrar notificación de error genérico
      console.error(error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <>
    <Header />
    <Container className="mt-5">
      <ToastContainer /> {/* Contenedor de las notificaciones */}
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <h2>Registro</h2>
          </div>
          {loading || processing ? ( // Si está en proceso o cargando, mostrar spinner
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Registrando...</span>
              </Spinner>
              <p>Registrando...</p> {/* Mensaje mientras se registra */}
            </div>
          ) : success ? ( // Si el registro fue exitoso, mostrar la palomita de confirmación
            <div className="text-center">
              <CheckCircle size={64} color="green" /> {/* Icono de la palomita */}
              <p>Cuenta creada con éxito</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
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
              <Form.Group className="mb-3">
                <Form.Label>Repetir Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Registrarse
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
        </>
  );
}
