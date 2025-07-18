import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteCuerpoAgua, getCuerposAgua } from '../../service/cuerpo-agua/CuerpoAguaService';
import Menu from '../../Componentes/Menu';

const CuerpoAguaList = () => {
  const [cuerpos, setCuerpos] = useState([]);

  useEffect(() => fetchCuerpos(), []);

  const fetchCuerpos = () => {
    getCuerposAgua()
      .then(setCuerpos)
      .catch(err => console.error("Error cargando cuerpos de agua:", err));
  };

  const remove = (id) => {
    if (!window.confirm("¿Eliminar cuerpo de agua?")) return;
    deleteCuerpoAgua(id).then(fetchCuerpos).catch(err => console.error(err));
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
                  <h1>Cuerpos de Agua</h1>
                  <Link to="/cuerpos-agua/create" className="btn btn-success">Nuevo</Link>
                </Card.Title>
                <Table striped bordered hover>
                  <thead><tr>
                    <th>ID</th><th>Nombre</th><th>Tipo</th>
                    <th>Lat, Long</th><th>Comunidad</th><th>Imágenes</th><th></th><th></th>
                  </tr></thead>
                  <tbody>
                    {cuerpos.map(c => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>{c.tipo}</td>
                        <td>{c.latitud}, {c.longitud}</td>
                        <td>{c.comunidad.nombre}</td>
                        <td>
                          {c.imagenes && c.imagenes.length ? (
                            <Image src={c.imagenes[0]} thumbnail width={80} />
                          ) : 'Sin imágenes'}
                        </td>
                        <td>
                          <Link to={`/cuerpos-agua/${c.id}`} className="btn btn-primary btn-sm me-1">Editar</Link>
                          <Link to={`/cuerpos-agua/${c.id}/imagenes`} className="btn btn-secondary btn-sm">Subir Imagen</Link>
                          <Link to={`/cuerpos-agua/${c.id}/galeria`} className="btn btn-info btn-sm">Ver Imágenes</Link>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => remove(c.id)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                    {cuerpos.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center">No hay registros.</td>
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

export default CuerpoAguaList;
