import axios, { AxiosError } from 'axios'
import { BaseAPIURL } from '@/constats'
const instance = axios.create({ baseURL: `${BaseAPIURL}/api/v1`, withCredentials: true })


instance.interceptors.response.use(r => r, err => {
    if (err.message === 'Network Error') alert('Ошибка соединения! Перезагрузите страницу!')
    const response = (err as AxiosError).response
    if (response && response.status >= 500) alert('Ошибка сервера! Перезагрузите страницу!')
    console.log('axios interceptor  error===>>> ', err)
    return { data: { result: false } }
})

export default instance