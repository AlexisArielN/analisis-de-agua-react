import axios from "axios"

export const getUsuarios = () => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/usuario')
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/usuario/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const insertUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'api/usuario', usuario)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const updateUsuario = (id, usuario) => {
  return new Promise((resolve, reject) => {
    axios.put(import.meta.env.VITE_BASE_URL + 'api/usuario/' + id, usuario)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const darDeBajaUsuario = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(import.meta.env.VITE_BASE_URL + 'api/usuario/' + id)
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}

export const filtrarPorUsuariosTecnicos = () => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/usuario/tecnicos')
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
  })
}
