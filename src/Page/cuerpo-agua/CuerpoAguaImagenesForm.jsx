import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import Menu from "../../Componentes/Menu";
import { uploadCuerpoAguaImagenes } from "../../service/cuerpo-agua/CuerpoAguaService";

const CuerpoAguaImagenesForm = () => {
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFiles.length) {
      setError("Debe seleccionar al menos una imagen");
      return;
    }

    uploadCuerpoAguaImagenes(id, selectedFiles)
      .then(res => {
        setMessage("Imágenes subidas correctamente");
        setError("");
      })
      .catch(() => {
        setMessage("");
        setError("Error al subir imágenes");
      });
  };

  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title><h2>Subir Imágenes para Cuerpo de Agua #{id}</h2></Card.Title>
                <Form onSubmit={handleUpload}>
                  <Form.Group>
                    <Form.Label>Selecciona una o más imágenes</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                  </Form.Group>

                  <Button className="mt-3" type="submit">Subir</Button>
                </Form>

                {message && <Alert className="mt-3" variant="success">{message}</Alert>}
                {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CuerpoAguaImagenesForm;
