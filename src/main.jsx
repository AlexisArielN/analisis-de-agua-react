import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Page404 from './Page/Page404';
import App from './App';
import LoginForm from './InicioSesion/LoginForm';
import RegisterForm from './InicioSesion/RegisterForm';
import DepartamentoForm from './Page/localidades/Departamento/DepartamentoForm';
import DepartamentoList from './Page/localidades/Departamento/DepartamentoList';
import MunicipioList from './Page/localidades/municipio/MunicipioList';
import MunicipioForm from './Page/localidades/municipio/MunicipioForm';
import ComunidadList from './Page/localidades/Comunidad/ComunidadList';
import ComunidadForm from './Page/localidades/Comunidad/ComunidadForm';
import UsuarioForm from './Page/usuarios/UsuarioForm';
import UsuarioList from './Page/usuarios/UsuarioList';
import CuerpoAguaList from './Page/cuerpo-agua/CuerpoAguaList';
import CuerpoAguaForm from './Page/cuerpo-agua/CuerpoAguaForm';
import CuerpoAguaImagenesForm from './Page/cuerpo-agua/CuerpoAguaImagenesForm';
import CuerpoAguaGaleria from './Page/cuerpo-agua/CuerpoAguaGaleria';
import SalidaCampoForm from './Page/salida-campo/SalidaCampoForm';
import SalidaCampoList from './Page/salida-campo/SalidaCampoList';
import SalidaCampoByTecnico from './Page/salida-campo/SalidaCampoByTecnico';
import MuestreoList from './Page/muestreo-analisis/MuestreoList';
import MuestreoForm from './Page/muestreo-analisis/MuestreoForm';
import MuestreoImagenesForm from './Page/muestreo-analisis/MuestreoImagenesForm';
import MuestreoGaleria from './Page/muestreo-analisis/MuestreoGaleria';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "*",
    element: <Page404 />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <RegisterForm />
  },
  {
    path: "/departamento",
    element: <DepartamentoList />
  },
  {
    path: "/departamento/create",
    element: <DepartamentoForm />
  },
  {
    path: "/departamento/:id",
    element: <DepartamentoForm />
  },
  {
    path: "/municipio",
    element: <MunicipioList />
  },
  {
    path: "/municipio/create",
    element: <MunicipioForm />
  },
  {
    path: "/municipio/:id",
    element: <MunicipioForm />
  },
  {
    path: "/comunidad",
    element: <ComunidadList />
  },
  {
    path: "/comunidad/create",
    element: <ComunidadForm />
  },
  {
    path: "/comunidad/:id",
    element: <ComunidadForm />
  },
  {
    path: "/usuarios",
    element: <UsuarioList />
  },
  {
    path: "/usuario/create",
    element: <UsuarioForm />
  },
  {
    path: "/usuario/:id",
    element: <UsuarioForm />
  },
  {
    path: "/cuerpos-agua",
    element: <CuerpoAguaList />
  },
  {
    path: "/cuerpos-agua/create",
    element: <CuerpoAguaForm />
  },
  {
    path: "/cuerpos-agua/:id",
    element: <CuerpoAguaForm />
  },
  {
    path: "/cuerpos-agua/:id/imagenes",
    element: <CuerpoAguaImagenesForm />
  },
  {
    path: "/cuerpos-agua/:id/galeria",
    element: <CuerpoAguaGaleria />
  },
  {
    path: "/salida-campo",
    element: <SalidaCampoList />
  },
  {
    path: "/salida-campo/create",
    element: <SalidaCampoForm />
  },
  {
    path: "/salida-campo/:id",
    element: <SalidaCampoForm />
  },
  {
    path: "/salidas-campo/tecnico",
    element: <SalidaCampoByTecnico />
  },
  {
    path: "/muestreos",
    element: <MuestreoList />
  },
  {
    path: "/muestreos/create",
    element: <MuestreoForm />
  },
  {
    path: "/muestreos/:id",
    element: <MuestreoForm />
  },
  {
    path: "/muestreos/:id/galeria",
    element: <MuestreoGaleria />
  },
  {
    path: "muestreos/:id/imagenes",
    element: <MuestreoImagenesForm />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
