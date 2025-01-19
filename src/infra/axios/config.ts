import { AxiosInstance } from 'axios'

import { postRefreshController } from '@/controllers/auth'

const client = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (!(config.url && ['sign/up', 'sign/in'].includes(config.url))) {
        const token = localStorage.getItem('access')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const refresh = localStorage.getItem('refresh')
        if (refresh) {
          try {
            const access = await postRefreshController({ refresh })
            localStorage.setItem('access', access)
            error.config.headers['Authorization'] = `Bearer ${access}`
            return api.request(error.config)
          } catch (err) {
            return Promise.reject(err)
          }
        }
      }
      return Promise.reject(error)
    }
  )
}

export default client
