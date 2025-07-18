import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteComunidad, getComunidades } from '../../../service/localidades/ComunidadService';
import Menu from '../../../Componentes/Menu';

const ComunidadList = () => {
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    fetchComunidades();
  }, []);

  const fetchComunidades = () => {
    getComunidades()
      .then(data => setComunidades(data))
      .catch(err => console.error("Error al cargar comunidades:", err));
  };

  const removeComunidad = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta comunidad?")) return;
    deleteComunidad(id)
      .then(() => fetchComunidades())
      .catch(err => console.error("Error al eliminar comunidad:", err));
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
                  <h1>Lista de Comunidades</h1>
                  <Link to="/comunidad/create" className="btn btn-success">Nueva</Link>
                </Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Municipio</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {comunidades.map(c => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>{c.municipioModel?.nombre || "N/A"}</td>
                        <td>
                          <Link className="btn btn-primary" to={`/comunidad/${c.id}`}>Editar</Link>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => removeComunidad(c.id)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {comunidades.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">No hay comunidades registradas.</td>
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

export default ComunidadList;
