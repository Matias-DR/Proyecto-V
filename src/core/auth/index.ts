import { User } from '@/core/user'

export type Credentials = Pick<User, 'name'> & {
  password: string
}
