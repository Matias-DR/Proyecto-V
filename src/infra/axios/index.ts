import axios from 'axios'

import client from './config'

import { BACKEND_URL } from '@/infra/config'

const api = axios.create({ baseURL: BACKEND_URL })

if (typeof window === 'undefined') client(api)

export default api
