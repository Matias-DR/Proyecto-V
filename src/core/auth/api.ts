import { Credentials } from '.'

export type CommonPostSignBody = Credentials

export type PostSignUpBody = CommonPostSignBody

export type PostSignInBody = CommonPostSignBody

export interface PostSignInResponse {
  access: string
  refresh: string
}

export type PostRefreshResponse = string
