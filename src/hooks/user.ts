import { useQuery } from '@tanstack/react-query'

import { getNameController } from '@/controllers/users'

export const useGetNameController = () => {
  const query = useQuery({
    queryKey: ['name'],
    queryFn: getNameController
  })

  return query
}
