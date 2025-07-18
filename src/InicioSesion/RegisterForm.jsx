import { useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/AuthService";
import Menu from "../Componentes/Menu";
import LabelBS from "../Componentes/LabelBS";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: ""
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    const datosAEnviar = {
      ...formData,
      tipo: false
    };

    try {
      const result = await registerUser(datosAEnviar);
      console.log("Registro exitoso:", result);
      navigate("/login");
    } catch (err) {
      setErrors({ formError: err.message || "Error al registrar" });
    }
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
                  <h1>Registro de Técnico</h1>
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && (
                    <p className="text-danger">{errors.formError}</p>
                  )}

                  <FormGroup>
                    <LabelBS text="Nombre completo" />
                    <FormControl
                      required
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nombre requerido
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup>
                    <LabelBS text="Correo electrónico" />
                    <FormControl
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Email requerido
                    </Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup>
                    <LabelBS text="Contraseña" />
                    <FormControl
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Contraseña requerida
                    </Form.Control.Feedback>
                  </FormGroup>

                  <div className="mt-3">
                    <Button type="submit">Registrarse</Button>
                    <Button variant="link" onClick={() => navigate("/login")}>
                      ¿Ya tienes cuenta? Inicia sesión
                    </Button>
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

export default RegisterForm;
