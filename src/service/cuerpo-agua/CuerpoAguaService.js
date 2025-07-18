import axios from "axios"

export const getCuerposAgua = () => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/cuerpos-agua')
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const getCuerpoAguaById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/cuerpos-agua/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const insertCuerpoAgua = (cuerpoAgua) => {
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'api/cuerpos-agua', cuerpoAgua)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const updateCuerpoAgua = (id, cuerpoAgua) => {
  return new Promise((resolve, reject) => {
    axios.put(import.meta.env.VITE_BASE_URL + 'api/cuerpos-agua/' + id, cuerpoAgua)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const deleteCuerpoAgua = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(import.meta.env.VITE_BASE_URL + 'api/cuerpos-agua/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const uploadCuerpoAguaImagenes = (id, files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append("fotos", file);
  });

  return new Promise((resolve, reject) => {
    axios.post(
      import.meta.env.VITE_BASE_URL + `api/cuerpos-agua/${id}/imagenes`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      reject(error);
    });
  });
};

