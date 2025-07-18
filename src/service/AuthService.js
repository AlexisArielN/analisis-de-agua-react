import axios from "axios"

export const registerUser = (user) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'auth/register', user)
            .then((res) => {
                resolve(res.data)
            }
            ).catch((error) => {
                reject(error.response?.data || error)
            })
    })
}

export const loginUser = (credentials) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'auth/login', credentials)
            .then((res) => {
                resolve(res.data)
            }
            ).catch((error) => {
                reject(error.response?.data || error)
            }
        )
    })
}