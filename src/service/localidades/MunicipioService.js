import axios from "axios"

export const getMunicipios = () => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/municipios')
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const getMunicipioById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/municipios/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const insertMunicipio = (municipio) => {
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'api/municipios', municipio)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}


export const updateMunicipio = (id, municipio) => {
  return new Promise((resolve, reject) => {
    axios.put(import.meta.env.VITE_BASE_URL + 'api/municipios/' + id, municipio)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const deleteMunicipio = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(import.meta.env.VITE_BASE_URL + 'api/municipios/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}