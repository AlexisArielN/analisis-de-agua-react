import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../../Componentes/Menu";
import { eliminarMuestreo, getMuestreos } from "../../service/muestreo-analisis/MuestreoService";

const MuestreoList = () => {
  const [muestreos, setMuestreos] = useState([]);

  useEffect(() => {
    fetchMuestreos();
  }, []);

  const fetchMuestreos = () => {
    getMuestreos()
      .then(setMuestreos)
      .catch(err => console.error("Error cargando muestreos:", err));
  };

  const remove = (id) => {
    if (!window.confirm("¿Eliminar muestreo?")) return;
    eliminarMuestreo(id)
      .then(fetchMuestreos)
      .catch(err => console.error("Error eliminando muestreo:", err));
  };

  const clasificarTurbidez = (ntu) => {
    if (ntu < 1) {
      return "Agua muy clara, casi cristalina";
    } else if (ntu <= 5) {
      return "Agua clara, ideal para consumo humano";
    } else if (ntu <= 10) {
      return "Agua ligeramente turbia";
    } else if (ntu <= 50) {
      return "Agua turbia, no recomendable para consumo";
    } else {
      return "Agua muy turbia, no apta para consumo";
    }
  };

  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1>Muestreos</h1>
                  <Link to="/muestreos/create" className="btn btn-success">Nuevo</Link>
                </Card.Title>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Turbidez</th>
                      <th>Clasificación</th>
                      <th>Velocidad Agua</th>
                      <th>Ancho</th>
                      <th>Profundidad</th>
                      <th>Caudal</th>
                      <th>Salida de Campo ID</th>
                      <th>Imágenes</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {muestreos.map(m => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.turbidez}</td>
                        <td>{clasificarTurbidez(m.turbidez)}</td>
                        <td>{m.velocidadAgua}</td>
                        <td>{m.ancho}</td>
                        <td>{m.profundidad}</td>
                        <td>{m.caudal}</td>
                        <td>{m.salidaCampo?.id || "N/A"}</td>
                        <td>
                          {m.imagenes && m.imagenes.length > 0 ? (
                            <Image src={m.imagenes[0]} thumbnail width={80} />
                          ) : (
                            "Sin imágenes"
                          )}
                        </td>
                        <td>
                          <Link to={`/muestreos/${m.id}`} className="btn btn-primary btn-sm me-1">Editar</Link>
                          <Link to={`/muestreos/${m.id}/imagenes`} className="btn btn-secondary btn-sm">Subir Imagen</Link>
                          <Link to={`/muestreos/${m.id}/galeria`} className="btn btn-info btn-sm me-1">Ver Galería</Link>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => remove(m.id)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                    {muestreos.length === 0 && (
                      <tr>
                        <td colSpan="11" className="text-center">No hay registros.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MuestreoList;
