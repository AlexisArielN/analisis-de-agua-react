import axios from "axios"

export const getDepartamentos = () => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/departamento')
    .then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getDepartamentoById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'api/departamento/' + id)
    .then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const insertDepartamento = (departamento) => {
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'api/departamento', departamento)
    .then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const updateDepartamento = (id, departamento) => {
  return new Promise((resolve, reject) => {
    axios.put(import.meta.env.VITE_BASE_URL + 'api/departamento/' + id, departamento)
    .then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const deleteDepartamento = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(import.meta.env.VITE_BASE_URL + 'api/departamento/' + id)
    .then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}