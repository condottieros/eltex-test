import axios from 'axios'
import { BaseAPIURL } from '@/constats'
export default axios.create({ baseURL: `${BaseAPIURL}/api/v1`, withCredentials: true })