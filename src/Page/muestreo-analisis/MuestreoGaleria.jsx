import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Image, Alert } from "react-bootstrap";
import Menu from "../../Componentes/Menu";
import { getMuestreoBy } from "../../service/muestreo-analisis/MuestreoService";

const MuestreoGaleria = () => {
  const { id } = useParams();
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState("");
  const [turbidez, setTurbidez] = useState(null);

  useEffect(() => {
    getMuestreoBy(id)
      .then(data => {
        setImagenes(data.imagenes || []);
        setTurbidez(data.turbidez);
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
                  <h2>Galería de Imágenes - Muestreo #{id}</h2>
                  {turbidez !== null && <p><strong>Turbidez:</strong> {turbidez}</p>}
                  <Link to={`/muestreos`} className="btn btn-outline-secondary btn-sm mt-2">Volver a la lista</Link>
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

export default MuestreoGaleria;
