import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteMunicipio, getMunicipios } from '../../../service/localidades/MunicipioService';
import Menu from '../../../Componentes/Menu';

const MunicipioList = () => {
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    fetchMunicipios();
  }, []);

  const fetchMunicipios = () => {
    getMunicipios()
      .then(data => setMunicipios(data))
      .catch(err => console.error("Error al cargar municipios:", err));
  };

  const removeMunicipio = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este municipio?")) return;
    deleteMunicipio(id)
      .then(() => fetchMunicipios())
      .catch(err => console.error("Error al eliminar municipio:", err));
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
                  <h1>Lista de Municipios</h1>
                  <Link to="/municipio/create" className="btn btn-success">Nuevo</Link>
                </Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Departamento</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {municipios.map(m => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.nombre}</td>
                        <td>{m.departamentoModel?.nombre || "N/A"}</td>
                        <td>
                          <Link className="btn btn-primary" to={`/municipio/${m.id}`}>Editar</Link>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => removeMunicipio(m.id)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {municipios.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">No hay municipios registrados.</td>
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

export default MunicipioList;
