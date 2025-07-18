import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteDepartamento, getDepartamentos } from '../../../service/localidades/DepartamentoService';
import Menu from '../../../Componentes/Menu';

const DepartamentoList = () => {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = () => {
    getDepartamentos ()
      .then(data => setDepartamentos(data))
      .catch(err => console.error("Error al cargar departamentos:", err));
  };

  const removeDepartamento = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este departamento?")) return;
    deleteDepartamento(id)
      .then(() => fetchDepartamentos())
      .catch(err => console.error("Error al eliminar:", err));
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
                  <h1>Lista de Departamentos</h1>
                  <Link to="/departamento/create" className="btn btn-success">Nuevo</Link>
                </Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {departamentos.map(dep => (
                      <tr key={dep.id}>
                        <td>{dep.id}</td>
                        <td>{dep.nombre}</td>
                        <td>
                          <Link className="btn btn-primary" to={`/departamento/${dep.id}`}>Editar</Link>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => removeDepartamento(dep.id)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {departamentos.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center">No hay departamentos registrados.</td>
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
export default DepartamentoList;
