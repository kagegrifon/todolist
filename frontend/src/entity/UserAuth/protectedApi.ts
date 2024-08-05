import axios from 'axios'
import { userAuthStore } from './AuthStore'
import { ISuccessAuthDTO } from './type'
import { BASE_API_URL } from 'config'

export const protectedAPI = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL,
})

protectedAPI.interceptors.request.use((config) => {
    const token = userAuthStore.getToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})

protectedAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        // если пришел статус 401, то запоминаем прошлый запрос

        const originalRequest = error.request
        const isRepeatedRetry = '_isRetry' in originalRequest && originalRequest['_isRetry']

        if (error.response.status === 401 && !isRepeatedRetry) {
            originalRequest._isRetry = true
            // снова отправляем прошлый запрос

            try {
                const resData = await axios.get<ISuccessAuthDTO>(BASE_API_URL + '/auth/refresh', {
                    withCredentials: true,
                })
                const { accessToken } = resData.data.token
                userAuthStore.setToken(accessToken)

                await protectedAPI(originalRequest)
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }
        }

        throw error
    },
)
