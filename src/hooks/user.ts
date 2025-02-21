import { useQuery } from '@tanstack/react-query'

import { getUserController } from '@/controllers/users'

export const useGetUserController = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserController,
    refetchOnMount: 'always'
  })

  return query
}
