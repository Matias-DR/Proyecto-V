import api from '@/infra/axios'

import { GetResponseUser } from '@/core/user/api'

export const getUserController = async (): Promise<GetResponseUser> => {
  return await api.get('/api/user/get').then((res) => res.data)
}
