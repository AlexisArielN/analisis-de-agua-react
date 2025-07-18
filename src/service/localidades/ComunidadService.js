import axios from "axios"

export const getComunidades = () => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/comunidades')
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const getComunidadById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/comunidades/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const insertComunidad = (comunidad) => {
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'api/comunidades', comunidad)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const updateComunidad = (id, comunidad) => {
  return new Promise((resolve, reject) => {
    axios.put(import.meta.env.VITE_BASE_URL + 'api/comunidades/' + id, comunidad)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const deleteComunidad = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(import.meta.env.VITE_BASE_URL + 'api/comunidades/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}