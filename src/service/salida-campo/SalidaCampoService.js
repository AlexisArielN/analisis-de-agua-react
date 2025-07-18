import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + 'api/salidas-campo';

export const getSalidasCampo = () => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getSalidaCampoById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const insertSalidaCampo = (salida) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL, salida)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const updateSalidaCampo = (id, salida) => {
  return new Promise((resolve, reject) => {
    axios.put(`${BASE_URL}/${id}`, salida)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const deleteSalidaCampo = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const filtrarSalidasCampo = (filtros) => {
  const params = new URLSearchParams();

  if (filtros.departamentoId) params.append("departamentoId", filtros.departamentoId);
  if (filtros.cuerpoAguaId) params.append("cuerpoAguaId", filtros.cuerpoAguaId);
  if (filtros.tecnicoId) params.append("tecnicoId", filtros.tecnicoId);

  return axios.get(import.meta.env.VITE_BASE_URL + 'api/salidas-campo/filtrar?' + params.toString())
    .then(res => res.data);
};
