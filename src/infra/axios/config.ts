import { AxiosInstance } from 'axios'

import { postRefresh } from '@/controllers/auth'

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

      // Si el error es 401 y no viene de auth, refrescamos los tokens
      if (error.response && error.response.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('auth')) {
        // Bandera para evitar bucles infinitos
        originalRequest._retry = true

        try {
          await postRefresh()
          // Reintentamos la solicitud original
          return api(originalRequest)
        } catch (err) {
          window.location.href = '/auth/sign/in'
          return Promise.reject(err)
        }
      }
      return Promise.reject(error)
    }
  )
}

export default client
