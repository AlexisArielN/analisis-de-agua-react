import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
    console.log("Usuario cargado:", userData);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/login";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/login">ANÁLISIS DE AGUA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!usuario && (
              <>
                <NavLink className="nav-link" to="/login">
                  Iniciar sesión
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Registrarse
                </NavLink>
              </>
            )}

            {usuario && (
              <>
                {usuario.tipo === true ? (
                  <>
                    <NavDropdown title="Departamentos" id="nav-departamento">
                      <NavLink className="dropdown-item" to="/departamento/create">
                        Crear Departamento
                      </NavLink>
                      <NavLink className="dropdown-item" to="/departamento">
                        Lista de Departamentos
                      </NavLink>
                    </NavDropdown>

                    <NavDropdown title="Municipios" id="nav-municipio">
                      <NavLink className="dropdown-item" to="/municipio/create">
                        Crear Municipio
                      </NavLink>
                      <NavLink className="dropdown-item" to="/municipio">
                        Lista de Municipios
                      </NavLink>
                    </NavDropdown>

                    <NavDropdown title="Comunidades" id="nav-comunidad">
                      <NavLink className="dropdown-item" to="/comunidad/create">
                        Crear Comunidad
                      </NavLink>
                      <NavLink className="dropdown-item" to="/comunidad">
                        Lista de Comunidades
                      </NavLink>
                    </NavDropdown>

                    <NavDropdown title="Usuarios" id="nav-usuario">
                      <NavLink className="dropdown-item" to="/usuario/create">
                        Crear usuario
                      </NavLink>
                      <NavLink className="dropdown-item" to="/usuarios">
                        Lista de usuarios
                      </NavLink>
                    </NavDropdown>

                    <NavDropdown title="Cuerpo de Agua" id="nav-cuerpo-agua">
                      <NavLink className="dropdown-item" to="/cuerpos-agua/create">
                        Crear cuerpo de agua
                      </NavLink>
                      <NavLink className="dropdown-item" to="/cuerpos-agua">
                        Lista de cuerpos de agua
                      </NavLink>
                    </NavDropdown>

                    <NavDropdown title="Salida de Campo" id="nav-salida-campo">
                      <NavLink className="dropdown-item" to="/salida-campo/create">
                        Crear salida de campo
                      </NavLink>
                      <NavLink className="dropdown-item" to="/salida-campo">
                        Lista de salida de campo
                      </NavLink>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <NavDropdown title="Salida de Campo" id="nav-salida-campo-by-tecnico">
                      <NavLink className="dropdown-item" to="/salidas-campo/tecnico">
                        Ver tus salidas de campo
                      </NavLink>
                    </NavDropdown>

                    <NavDropdown title="Muestreo" id="nav-muestreo">
                      <NavLink className="dropdown-item" to="/muestreos">
                        ver muestreos
                      </NavLink>
                    </NavDropdown>
                  </>
                )}
                <NavLink className="nav-link" onClick={cerrarSesion}>
                  Cerrar sesión
                </NavLink>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
