import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Image, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../../Componentes/Menu";
import { getCuerpoAguaById } from "../../service/cuerpo-agua/CuerpoAguaService";

const CuerpoAguaGaleria = () => {
  const { id } = useParams();
  const [imagenes, setImagenes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCuerpoAguaById(id)
      .then(data => {
        setImagenes(data.imagenes || []);
        setNombre(data.nombre);
      })
      .catch(() => setError("Error al cargar la galería"));
  }, [id]);

  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h2>Galería de Imágenes - {nombre}</h2>
                  <Link to={`/cuerpos-agua`} className="btn btn-outline-secondary btn-sm mt-2">Volver a la lista</Link>
                </Card.Title>

                {error && <Alert variant="danger">{error}</Alert>}

                <Row className="mt-3">
                  {imagenes.length > 0 ? (
                    imagenes.map((imgUrl, idx) => (
                      <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <Image src={imgUrl} thumbnail fluid />
                      </Col>
                    ))
                  ) : (
                    <Col><p>No hay imágenes registradas.</p></Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CuerpoAguaGaleria;
