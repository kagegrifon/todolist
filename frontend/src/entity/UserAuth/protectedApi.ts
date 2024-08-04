import axios from 'axios'
import { userAuthStore } from './AuthStore'

export const protectedAPI = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/api/',
})

protectedAPI.interceptors.request.use((config) => {
    const token = userAuthStore.getToken()
    console.log({ token })
    config.headers.Authorization = `Bearer ${token}}`
    return config
})
