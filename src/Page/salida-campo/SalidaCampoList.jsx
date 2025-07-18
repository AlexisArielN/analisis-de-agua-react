import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../../Componentes/Menu";

import { getSalidasCampo, deleteSalidaCampo, filtrarSalidasCampo } from "../../service/salida-campo/SalidaCampoService";
import { getDepartamentos } from "../../service/localidades/DepartamentoService";
import { getCuerposAgua } from "../../service/cuerpo-agua/CuerpoAguaService";
import { filtrarPorUsuariosTecnicos } from "../../service/usuarios/UsuarioService";

const SalidaCampoList = () => {
  const [salidas, setSalidas] = useState([]);

  const [departamentos, setDepartamentos] = useState([]);
  const [cuerposAgua, setCuerposAgua] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  const [filtros, setFiltros] = useState({
    departamentoId: "",
    cuerpoAguaId: "",
    tecnicoId: ""
  });

  useEffect(() => {
    cargarFiltros();
    fetchSalidas();
  }, []);

  const cargarFiltros = () => {
    getDepartamentos().then(setDepartamentos);
    getCuerposAgua().then(setCuerposAgua);
    filtrarPorUsuariosTecnicos().then(setTecnicos);
  };

  const fetchSalidas = () => {
    getSalidasCampo()
      .then(setSalidas)
      .catch(() => alert("Error al cargar salidas de campo"));
  };

  const aplicarFiltro = () => {
  filtrarSalidasCampo(filtros)
    .then((data) => {
      const mapped = data.map(item => ({
        id: item.id,
        descripcion: item.descripcionSalidaCampo,
        tecnico: { nombre: item.nombreTecnico },
        cuerpoAgua: { nombre: item.cuerpoAguaNombre },
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin
      }));
      setSalidas(mapped);
    })
    .catch(() => alert("Error al aplicar filtros"));
};

  const eliminar = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta salida de campo?")) return;

    deleteSalidaCampo(id)
      .then(() => fetchSalidas())
      .catch(() => alert("No se pudo eliminar porque tiene una muestreo asociado"));
  };

  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1>Salidas de Campo</h1>
                  <Link to="/salida-campo/create" className="btn btn-success mt-2">
                    Nueva Salida
                  </Link>
                </Card.Title>

                {/* Filtros */}
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Select
                      value={filtros.departamentoId}
                      onChange={(e) => setFiltros({ ...filtros, departamentoId: e.target.value })}
                    >
                      <option value="">-- Filtrar por Departamento --</option>
                      {departamentos.map((d) => (
                        <option key={d.id} value={d.id}>{d.nombre}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={filtros.cuerpoAguaId}
                      onChange={(e) => setFiltros({ ...filtros, cuerpoAguaId: e.target.value })}
                    >
                      <option value="">-- Filtrar por Cuerpo de Agua --</option>
                      {cuerposAgua.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={filtros.tecnicoId}
                      onChange={(e) => setFiltros({ ...filtros, tecnicoId: e.target.value })}
                    >
                      <option value="">-- Filtrar por Técnico --</option>
                      {tecnicos.map((t) => (
                        <option key={t.id} value={t.id}>{t.nombre}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={12} className="mt-2">
                    <Button variant="primary" onClick={aplicarFiltro}>Aplicar Filtros</Button>
                  </Col>
                </Row>

                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Descripción</th>
                      <th>Técnico</th>
                      <th>Cuerpo de Agua</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {salidas.map((s) => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.descripcion}</td>
                        <td>{s.tecnico?.nombre}</td>
                        <td>{s.cuerpoAgua?.nombre}</td>
                        <td>{s.fechaInicio}</td>
                        <td>{s.fechaFin}</td>
                        <td>
                          <Link to={`/salida-campo/${s.id}`} className="btn btn-primary btn-sm">Editar</Link>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => eliminar(s.id)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                    {salidas.length === 0 && (
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

export default SalidaCampoList;
