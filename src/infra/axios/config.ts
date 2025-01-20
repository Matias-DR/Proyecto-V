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

      // Si el error es 401, intentamos refrescar el token
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true // Bandera para evitar bucles infinitos
        const refresh = localStorage.getItem('refresh')

        if (refresh) {
          try {
            // Llama al controlador para refrescar el token
            const res = await postRefreshController({ refresh })
            localStorage.setItem('access', res.access)
            localStorage.setItem('refresh', res.refresh)

            // Actualizamos el token en la solicitud original
            originalRequest.headers['Authorization'] = `Bearer ${res.access}`

            // Reintentamos la solicitud original
            return api.request(originalRequest)
          } catch (err) {
            // Si el refresh falla, limpiamos el almacenamiento y rechazamos el error
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return Promise.reject(err)
          }
        }
      }
      return Promise.reject(error)
    }
  )
}

export default client
