import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import Menu from "../../Componentes/Menu";
import LabelBS from "../../Componentes/LabelBS";
import { getCuerpoAguaById, insertCuerpoAgua, updateCuerpoAgua } from "../../service/cuerpo-agua/CuerpoAguaService";
import { getComunidades } from "../../service/localidades/ComunidadService";
import MapaSelector from "../../Componentes/MapaSelector";


const tipos = ["RIO", "ARROYO", "LAGO", "HUMEDAL"];

const CuerpoAguaForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [comunidadId, setComunidadId] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getComunidades().then(setComunidades)
      .catch(() => setErrors({ load: "Error cargando comunidades" }));

    if (id) {
      getCuerpoAguaById(id)
        .then(data => {
          setNombre(data.nombre);
          setTipo(data.tipo);
          setLatitud(data.latitud);
          setLongitud(data.longitud);
          setComunidadId(data.comunidad.id || data.comunidad_id);
        })
        .catch(() => setErrors({ formError: "Error cargando cuerpo de agua" }));
    }
  }, [id]);

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    const cuerpo = {
      nombre, tipo, latitud: parseFloat(latitud), longitud: parseFloat(longitud),
      comunidad_id: parseInt(comunidadId, 10)
    };

    const action = id ? updateCuerpoAgua(id, cuerpo) : insertCuerpoAgua(cuerpo);
    action.then(() => navigate("/cuerpos-agua"))
      .catch(() => setErrors({ formError: "Error guardando cuerpo de agua" }));
  };

  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title><h1>{id ? "Editar Cuerpo de Agua" : "Crear Cuerpo de Agua"}</h1></Card.Title>
                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                  {errors.formError && <p className="text-danger">{errors.formError}</p>}
                  <FormGroup>
                    <LabelBS text="Nombre" />
                    <FormControl required type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Requerido</Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Tipo" />
                    <Form.Select required value={tipo} onChange={e => setTipo(e.target.value)}>
                      <option value="">Seleccione un tipo</option>
                      {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Seleccione tipo</Form.Control.Feedback>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <LabelBS text="Ubicación (clic en el mapa para seleccionar)" />
                    <MapaSelector
                      latitud={latitud ? parseFloat(latitud) : undefined}
                      longitud={longitud ? parseFloat(longitud) : undefined}
                      onChange={({ lat, lng }) => {
                        setLatitud(lat.toFixed(6));
                        setLongitud(lng.toFixed(6));
                      }}
                    />
                  </FormGroup>


                  <FormGroup className="mt-3">
                    <LabelBS text="Comunidad" />
                    <Form.Select required value={comunidadId} onChange={e => setComunidadId(e.target.value)}>
                      <option value="">Seleccione comunidad</option>
                      {comunidades.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Seleccione comunidad</Form.Control.Feedback>
                  </FormGroup>

                  <div className="mt-3"><Button type="submit">Guardar</Button></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CuerpoAguaForm;
