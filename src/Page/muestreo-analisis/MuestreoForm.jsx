import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Menu from "../../Componentes/Menu";
import {
  crearMuestreo,
  getMuestreoDetalle,
  actualizarMuestreo
} from "../../service/muestreo-analisis/MuestreoService";
import { getSalidasCampo } from "../../service/salida-campo/SalidaCampoService";
import { useParams, useNavigate } from "react-router-dom";

const MuestreoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [salidas, setSalidas] = useState([]);
  const [formData, setFormData] = useState({
    turbidez: "",
    velocidadAgua: "",
    ancho: "",
    profundidad: "",
    salidaCampoId: ""
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getSalidasCampo()
      .then(setSalidas)
      .catch(() => setError("Error cargando salidas de campo"));

    if (id) {
      getMuestreoDetalle(id)
        .then(data => {
          setFormData({
            turbidez: data.turbidez,
            velocidadAgua: data.velocidadAgua,
            ancho: data.ancho,
            profundidad: data.profundidad,
            salidaCampoId: data.salidaCampoId
          });
        })
        .catch(() => setError("Error cargando datos del muestreo"));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    
    if (!formData.salidaCampoId) {
      setError("Debe seleccionar una salida de campo");
      return;
    }
    if (
      !formData.turbidez ||
      !formData.velocidadAgua ||
      !formData.ancho ||
      !formData.profundidad
    ) {
      setError("Todos los campos numéricos son obligatorios");
      return;
    }

    const payload = {
      turbidez: parseFloat(formData.turbidez),
      velocidadAgua: parseFloat(formData.velocidadAgua),
      ancho: parseFloat(formData.ancho),
      profundidad: parseFloat(formData.profundidad),
      salidaCampoId: parseInt(formData.salidaCampoId)
    };

    const action = id
      ? actualizarMuestreo(id, payload)
      : crearMuestreo(payload);

    action
      .then(() => {
        setSuccessMsg(id ? "Muestreo actualizado correctamente" : "Muestreo creado correctamente");
        setTimeout(() => navigate("/muestreos"), 1000);
      })
      .catch(() => setError("Error al guardar muestreo"));
  };

  return (
    <>
      <Menu />
      <Container>
        <h1 className="mt-3">{id ? "Editar" : "Registrar"} Muestreo</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="salidaCampoSelect">
            <Form.Label>Salida de Campo</Form.Label>
            <Form.Select
              name="salidaCampoId"
              value={formData.salidaCampoId}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleccione una salida de campo --</option>
              {salidas.map((s) => (
                <option key={s.id} value={s.id}>
                  {`ID ${s.id} - ${s.descripcion || "Sin descripción"}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3" controlId="turbidezInput">
                <Form.Label>Turbidez</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="turbidez"
                  value={formData.turbidez}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3" controlId="velocidadAguaInput">
                <Form.Label>Velocidad del Agua</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="velocidadAgua"
                  value={formData.velocidadAgua}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3" controlId="anchoInput">
                <Form.Label>Ancho</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="ancho"
                  value={formData.ancho}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3" controlId="profundidadInput">
                <Form.Label>Profundidad</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="profundidad"
                  value={formData.profundidad}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            {id ? "Actualizar" : "Guardar"} Muestreo
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default MuestreoForm;
