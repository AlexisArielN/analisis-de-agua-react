import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { getMunicipios } from "../../../service/localidades/MunicipioService";
import { getComunidadById, insertComunidad, updateComunidad } from "../../../service/localidades/ComunidadService";
import Menu from "../../../Componentes/Menu";
import LabelBS from "../../../Componentes/LabelBS";

const ComunidadForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMunicipios().then(setMunicipios);

    if (id) {
      getComunidadById(id)
        .then(data => {
          setNombre(data.nombre);
          setMunicipioId(data.municipioModel.id);
        })
        .catch(() => setErrors({ formError: "Error al cargar la comunidad" }));
    }
  }, [id]);

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    guardarComunidad();
  };

  const guardarComunidad = () => {
    const comunidad = {
      nombre,
      municipio_id: municipioId
    };

    const accion = id
      ? updateComunidad(id, comunidad)
      : insertComunidad(comunidad);

    accion
      .then(() => navigate("/comunidad"))
      .catch(() =>
        setErrors({ formError: "Error al guardar la comunidad" })
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
                  <h1>{id ? "Editar Comunidad" : "Crear Comunidad"}</h1>
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && (
                    <p className="text-danger">{errors.formError}</p>
                  )}

                  <FormGroup>
                    <LabelBS text="Nombre de la Comunidad" />
                    <FormControl
                      required
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      El nombre es requerido
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Municipio" />
                    <Form.Select
                      required
                      value={municipioId}
                      onChange={(e) => setMunicipioId(e.target.value)}
                    >
                      <option value="">Seleccione un municipio</option>
                      {municipios.map(m => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Debe seleccionar un municipio
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

export default ComunidadForm;
