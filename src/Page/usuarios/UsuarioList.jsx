import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { darDeBajaUsuario, getUsuarios } from '../../service/usuarios/UsuarioService';
import Menu from '../../Componentes/Menu';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    getUsuarios()
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  };

  const removeUsuario = (id) => {
    if (!window.confirm("¿Estás seguro de dar de baja al usuario?")) return;
    darDeBajaUsuario(id)
      .then(() => fetchUsuarios())
      .catch(err => console.error("Error al eliminar usuario:", err));
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
                  <h1>Lista de Usuarios</h1>
                  <Link to="/usuario/create" className="btn btn-success">Nuevo</Link>
                </Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Activo</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.tipo ? "Administrador" : "Técnico"}</td>
                        <td>{u.activo ? "Sí" : "No"}</td>
                        <td>
                          <Link className="btn btn-primary" to={`/usuario/${u.id}`}>Editar</Link>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => removeUsuario(u.id)}>
                            Dar de baja al usuario
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {usuarios.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">No hay usuarios registrados.</td>
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

export default UsuarioList;
