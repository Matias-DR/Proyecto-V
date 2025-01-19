import { CommonPostSignBody, PostRefreshResponse, PostSignUpBody } from '@/core/auth/api'
import api from '@/infra/axios'

export interface CommonPostSignControllerProps {
  body: CommonPostSignBody
}

export interface PostSignUpControllerProps {
  body: PostSignUpBody
}

export interface PostRefreshControllerProps {
  refresh: string
}

export const postSignUpController = async ({ body }: PostSignUpControllerProps) => {
  return api.post('/api/auth/sign/up', body).then((res) => res.data)
}

export const postRefreshController = async ({ refresh }: PostRefreshControllerProps): Promise<PostRefreshResponse> => {
  return await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  }).then(async (res) => await res.json().then((res) => res.data))
}
