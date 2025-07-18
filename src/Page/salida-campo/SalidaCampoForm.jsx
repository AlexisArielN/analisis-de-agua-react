import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button, Card, Col, Container, Form, FormControl,
  FormGroup, Row
} from "react-bootstrap";
import Menu from "../../Componentes/Menu";
import LabelBS from "../../Componentes/LabelBS";

import {
  insertSalidaCampo,
  updateSalidaCampo,
  getSalidaCampoById
} from "../../service/salida-campo/SalidaCampoService";

import { getCuerposAgua } from "../../service/cuerpo-agua/CuerpoAguaService";
import { filtrarPorUsuariosTecnicos } from "../../service/usuarios/UsuarioService";

const SalidaCampoForm = () => {
  const { id } = useParams();
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tecnicoId, setTecnicoId] = useState("");
  const [cuerpoAguaId, setCuerpoAguaId] = useState("");

  const [tecnicos, setTecnicos] = useState([]);
  const [cuerposAgua, setCuerposAgua] = useState([]);

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    filtrarPorUsuariosTecnicos().then(setTecnicos);
    getCuerposAgua().then(setCuerposAgua);

    if (id) {
      getSalidaCampoById(id)
        .then(data => {
          setDescripcion(data.descripcion);
          setFechaInicio(data.fechaInicio);
          setFechaFin(data.fechaFin);
          setTecnicoId(data.tecnico.id);
          setCuerpoAguaId(data.cuerpoAgua.id);
        })
        .catch(() => setErrors({ load: "Error al cargar la salida de campo" }));
    }
  }, [id]);

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    const salida = {
      descripcion,
      fechaInicio,
      fechaFin,
      tecnico_id: parseInt(tecnicoId),
      cuerpo_agua_id: parseInt(cuerpoAguaId)
    };

    const action = id
      ? updateSalidaCampo(id, salida)
      : insertSalidaCampo(salida);

    action
      .then(() => navigate("/salida-campo"))  
      .catch(() => setErrors({ formError: "Error al guardar la salida debido a que tiene muestreo asociado" }));
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
                  <h1>{id ? "Editar Salida de Campo" : "Crear Salida de Campo"}</h1>
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && <p className="text-danger">{errors.formError}</p>}

                  <FormGroup>
                    <LabelBS text="Descripción" />
                    <FormControl
                      required
                      type="text"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      La descripción es requerida
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Fecha de Inicio" />
                    <FormControl
                      required
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Fecha de inicio requerida
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Fecha Fin" />
                    <FormControl
                      required
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Fecha fin requerida
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Técnico asignado" />
                    <Form.Select
                      required
                      value={tecnicoId}
                      onChange={(e) => setTecnicoId(e.target.value)}
                    >
                      <option value="">Seleccione un técnico</option>
                      {tecnicos.map(t => (
                        <option key={t.id} value={t.id}>{t.nombre} - {t.email}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione un técnico
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Cuerpo de Agua" />
                    <Form.Select
                      required
                      value={cuerpoAguaId}
                      onChange={(e) => setCuerpoAguaId(e.target.value)}
                    >
                      <option value="">Seleccione cuerpo de agua</option>
                      {cuerposAgua.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione cuerpo de agua
                    </Form.Control.Feedback>
                  </FormGroup>

                  <div className="mt-3">
                    <Button type="submit">Guardar</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SalidaCampoForm;
