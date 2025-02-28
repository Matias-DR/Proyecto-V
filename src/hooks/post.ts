'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { usePostsContext } from '@/contexts/posts'
import { deletePost, getPosts, GetPostsProps, likePost, postPost } from '@/controllers/post'
import { useToast } from './use-toast'

export type UseGetPostsProps = GetPostsProps

export const usePostPost = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postPost,
    onSuccess: (data) => push(`/?my-posts=${data._id}`),
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 409) toast({ title: 'Error', description: 'Ya realizó una publicación del héroe con el nombre ingresado.' })
        else toast({ title: 'Error', description: 'No se pudo realizar la publicación. Por favor intente más tarde.' })
      }
    }
  })

  return mutation
}

export const useGetPosts = ({ params }: UseGetPostsProps) => {
  const query = useQuery({
    queryKey: ['posts', params],
    queryFn: async () => await getPosts({ params })
  })

  return query
}

export const useDeletePost = () => {
  const { params } = usePostsContext()
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', params] })
      toast({ title: 'Éxito', description: 'La publicación fue eliminada.' })
    },
    onError: () => toast({ title: 'Error', description: 'No se pudo eliminar la publicación. Por favor intente más tarde.' })
  })

  return mutation
}

export const useLike = () => {
  const { params } = usePostsContext()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', params] })
  })

  return mutation
}
