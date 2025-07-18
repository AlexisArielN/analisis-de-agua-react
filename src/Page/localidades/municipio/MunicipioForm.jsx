import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { getMunicipioById, insertMunicipio, updateMunicipio } from "../../../service/localidades/MunicipioService";
import { getDepartamentos } from "../../../service/localidades/DepartamentoService";
import Menu from "../../../Componentes/Menu";
import LabelBS from "../../../Componentes/LabelBS";

const MunicipioForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [departamentoId, setDepartamentoId] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getDepartamentos().then(setDepartamentos);

    if (id) {
      getMunicipioById(id)
        .then(data => {
          setNombre(data.nombre);
          setDepartamentoId(data.departamentoModel.id);
        })
        .catch(() => setErrors({ formError: "Error al cargar el municipio" }));
    }
  }, [id]);

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    guardarMunicipio();
  };

  const guardarMunicipio = () => {
    const municipio = {
      nombre,
      departamento_id: departamentoId
    };

    const accion = id
      ? updateMunicipio(id, municipio)
      : insertMunicipio(municipio);

    accion
      .then(() => navigate("/municipio"))
      .catch(() =>
        setErrors({ formError: "Error al guardar el municipio" })
      );
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
                  <h1>{id ? "Editar Municipio" : "Crear Municipio"}</h1>
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && (
                    <p className="text-danger">{errors.formError}</p>
                  )}

                  <FormGroup>
                    <LabelBS text="Nombre del Municipio" />
                    <FormControl
                      required
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      El nombre del municipio es requerido
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Departamento" />
                    <Form.Select
                      required
                      value={departamentoId}
                      onChange={(e) => setDepartamentoId(e.target.value)}
                    >
                      <option value="">Seleccione un departamento</option>
                      {departamentos.map(dep => (
                        <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Debe seleccionar un departamento
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

export default MunicipioForm;
