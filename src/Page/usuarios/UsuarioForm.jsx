import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { getUsuarioById, insertUsuario, updateUsuario } from "../../service/usuarios/UsuarioService";
import Menu from "../../Componentes/Menu";
import LabelBS from "../../Componentes/LabelBS";

const UsuarioForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState(false);
  const [activo, setActivo] = useState(true);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUsuarioById(id)
        .then(data => {
          setNombre(data.nombre);
          setEmail(data.email);
          setPassword(data.password);
          setTipo(data.tipo);
          setActivo(data.activo);
        })
        .catch(() => setErrors({ formError: "Error al cargar el usuario" }));
    }
  }, [id]);

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    guardarUsuario();
  };

  const guardarUsuario = () => {
    const usuario = {
      nombre,
      email,
      password,
      tipo,
      activo
    };

    const accion = id
      ? updateUsuario(id, usuario)
      : insertUsuario(usuario);

    accion
      .then(() => navigate("/usuarios"))
      .catch(() =>
        setErrors({ formError: "Error al guardar el usuario" })
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
                  <h1>{id ? "Editar Usuario" : "Crear Usuario"}</h1>
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && (
                    <p className="text-danger">{errors.formError}</p>
                  )}

                  <FormGroup>
                    <LabelBS text="Nombre" />
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
                    <LabelBS text="Email" />
                    <FormControl
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      El email es requerido y debe ser válido
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Contraseña" />
                    <FormControl
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      La contraseña es requerida
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Tipo de Usuario" />
                    <Form.Check
                      type="switch"
                      label={tipo ? "Administrador" : "Técnico"}
                      checked={tipo}
                      onChange={(e) => setTipo(e.target.checked)}
                    />
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Activo" />
                    <Form.Check
                      type="switch"
                      label={activo ? "Sí" : "No"}
                      checked={activo}
                      onChange={(e) => setActivo(e.target.checked)}
                    />
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

export default UsuarioForm;
