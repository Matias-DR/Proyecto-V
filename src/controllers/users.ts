import api from '@/infra/axios'

import { GetResponseName } from '@/core/user/api'

export const getNameController = async (): Promise<GetResponseName> => {
  const res = await api.get('/api/user/name').then((res) => res.data)
  return res
}
