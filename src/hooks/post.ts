'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { usePostsContext } from '@/contexts/posts'
import {
  deletePostController,
  getPostsController,
  GetPostsControllerProps,
  likePostController,
  postPostController
} from '@/controllers/post'
import { useToast } from './use-toast'

export type UseGetPostsControllerProps = GetPostsControllerProps

export const usePostPostController = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postPostController,
    onSuccess: () => push('/?search=my-posts'),
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 409) toast({ title: 'Error', description: 'Ya realizó una publicación del héroe con el nombre ingresado.' })
        else toast({ title: 'Error', description: 'No se pudo realizar la publicación. Por favor intente mas tarde.' })
      }
    }
  })

  return mutation
}

export const useGetPostsController = ({ params }: UseGetPostsControllerProps) => {
  const query = useQuery({
    queryKey: ['posts', params],
    queryFn: async () => await getPostsController({ params })
  })

  return query
}

export const useDeletePostController = () => {
  const { params } = usePostsContext()
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deletePostController,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', params] })
      toast({ title: 'Éxito', description: 'La publicación fue eliminada.' })
    },
    onError: () => toast({ title: 'Error', description: 'No se pudo eliminar la publicación. Por favor intente mas tarde.' })
  })

  return mutation
}

export const useLikeController = () => {
  const { params } = usePostsContext()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: likePostController,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', params] })
  })

  return mutation
}
