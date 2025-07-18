import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { getDepartamentoById, insertDepartamento, updateDepartamento } from "../../../service/localidades/DepartamentoService";
import Menu from "../../../Componentes/Menu";
import LabelBS from "../../../Componentes/LabelBS";


const DepartamentoForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDepartamentoById(id)
        .then(data => setNombre(data.nombre))
        .catch(() => setErrors({ formError: "Error al cargar el departamento" }));
    }
  }, [id]);

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    guardarDepartamento();
  };

  const guardarDepartamento = () => {
    const departamento = { nombre };

    const accion = id
      ? updateDepartamento(id, departamento)
      : insertDepartamento(departamento);

    accion
      .then(() => navigate("/departamento"))
      .catch(() =>
        setErrors({ formError: "Error al guardar el departamento" })
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
                  <h1>{id ? "Editar Departamento" : "Crear Departamento"}</h1>
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && (
                    <p className="text-danger">{errors.formError}</p>
                  )}

                  <FormGroup>
                    <LabelBS text="Nombre del Departamento" />
                    <FormControl
                      required
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      El nombre del departamento es requerido
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

export default DepartamentoForm;
