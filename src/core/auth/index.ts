import { User } from '@/core/user'

export type Credentials = Pick<User, 'name'> & {
  password: string
}

export type Session = Pick<User, 'name'> & {
  refresh: string
}
