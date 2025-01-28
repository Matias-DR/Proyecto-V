import { AxiosInstance } from 'axios'

import { postRefreshController } from '@/controllers/auth'

const client = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (!(config.url && ['sign/up', 'sign/in', 'refresh'].some((url) => config.url?.includes(url)))) {
        const access = localStorage.getItem('access')
        if (access) {
          config.headers.Authorization = `Bearer ${access}`
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      console.log('TENEMOS ESTE CODIGO DE ERROR', error.response && error.response.status)
      // Si el error es 401, refrescamos los tokens
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true // Bandera para evitar bucles infinitos

        try {
          await postRefreshController()
          // Reintentamos la solicitud original
          return api.request(originalRequest)
        } catch (err) {
          return Promise.reject(err)
        }
      }
      return Promise.reject(error)
    }
  )
}

export default client
