import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/controllers/users'

export const useGetUser = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    refetchOnMount: 'always'
  })

  return query
}
