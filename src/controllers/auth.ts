import api from '@/infra/axios'

import { CommonPostSignBody, PostRefreshResponse, PostSignInBody, PostSignUpBody } from '@/core/auth/api'

export interface CommonPostSignControllerProps {
  body: CommonPostSignBody
}

export interface PostSignUpControllerProps {
  body: PostSignUpBody
}

export interface PostSignInControllerProps {
  body: PostSignInBody
}

export interface PostRefreshControllerProps {
  refresh: string
}

export const postSignUpController = async ({ body }: PostSignUpControllerProps) => {
  return api.post('/api/auth/sign/up', body).then((res) => res.data)
}

export const postSignInController = async ({ body }: PostSignInControllerProps) => {
  return api.post('/api/auth/sign/in', body).then((res) => res.data)
}

export const postRefreshController = async ({ refresh }: PostRefreshControllerProps): Promise<PostRefreshResponse> => {
  return await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  }).then(async (res) => await res.json().then((res) => res.data))
}
