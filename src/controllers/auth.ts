import api from '@/infra/axios'

import { CommonPostSignBody, PostSignInBody, PostSignUpBody } from '@/core/auth/api'

export interface CommonPostSignProps {
  body: CommonPostSignBody
}

export interface PostSignUpProps {
  body: PostSignUpBody
}

export interface PostSignInProps {
  body: PostSignInBody
}

export interface PostRefreshProps {
  refresh: string
}

export const postSignUp = async ({ body }: PostSignUpProps): Promise<void> => {
  return await api.post('/api/auth/sign/up', body).then((res) => res.data)
}

export const postSignIn = async ({ body }: PostSignInProps): Promise<void> => {
  return await api.post('/api/auth/sign/in', body).then((res) => res.data)
}

export const postRefresh = async (): Promise<void> => {
  return await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(async (res) => await res.json().then((res) => res.data))
}

export const postSignOut = async (): Promise<void> => await api.post('/api/auth/sign/out').then((res) => res.data)
