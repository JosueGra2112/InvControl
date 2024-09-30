import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Header from './HEAD/headerIndex'; // Importamos el header personalizado

export default function About() {
  return (
      <>
            <Header />

    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Acerca de</Card.Title>
          <Card.Text>
            <strong>Desarrollador:</strong> Josué Granados Cortés
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> granadoscortesjosue@gmail.com
          </Card.Text>
          <Card.Text>
            <strong>Teléfono:</strong> +52 771 105 5280
          </Card.Text>
          <Card.Footer className="text-muted">Todos los derechos reservados © 2024</Card.Footer>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}
