import api from '@/infra/axios'

import { CommonPostSignBody, PostSignInBody, PostSignUpBody } from '@/core/auth/api'

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

export const postSignUpController = async ({ body }: PostSignUpControllerProps): Promise<void> => {
  return await api.post('/api/auth/sign/up', body).then((res) => res.data)
}

export const postSignInController = async ({ body }: PostSignInControllerProps): Promise<void> => {
  return await api.post('/api/auth/sign/in', body).then((res) => res.data)
}

export const postRefreshController = async (): Promise<void> => {
  return await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(async (res) => await res.json().then((res) => res.data))
}

export const postSignOutController = async (): Promise<void> => await api.post('/api/auth/sign/out').then((res) => res.data)
