import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "api/muestreos";

export const getMuestreos = () => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getMuestreoBy = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export const getMuestreoDetalle = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${id}/detalle`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const crearMuestreo = (muestreo) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL, muestreo)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const actualizarMuestreo = (id, muestreo) => {
  return new Promise((resolve, reject) => {
    axios.put(`${BASE_URL}/${id}`, muestreo)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const eliminarMuestreo = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const subirImagenesMuestreo = (id, files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("fotos", file);
  }

  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/${id}/imagenes`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err));
  });
};
