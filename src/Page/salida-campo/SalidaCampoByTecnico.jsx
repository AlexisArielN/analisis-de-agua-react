import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Menu from "../../Componentes/Menu";
import axios from "axios";

const SalidaCampoByTecnico = () => {
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const tecnicoId = usuario.id;

    axios.get(`${import.meta.env.VITE_BASE_URL}api/salidas-campo/filtrar?tecnicoId=${tecnicoId}`)
      .then(res => {
        setSalidas(res.data);
      })
      .catch(() => alert("Error al cargar las salidas de campo"));
  }, []);

  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1>Mis Salidas de Campo</h1>
                </Card.Title>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Descripción</th>
                      <th>Cuerpo de Agua</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salidas.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">No tienes salidas de campo.</td>
                      </tr>
                    ) : (
                      salidas.map(s => (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td>{s.descripcionSalidaCampo || s.descripcion}</td>
                          <td>{s.cuerpoAguaNombre || (s.cuerpoAgua && s.cuerpoAgua.nombre)}</td>
                          <td>{s.fechaInicio}</td>
                          <td>{s.fechaFin}</td>
                        </tr>
                      ))
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

export default SalidaCampoByTecnico;
