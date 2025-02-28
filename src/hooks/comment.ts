'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { GetCommentsProps, deleteComment, getComments, postComment } from '@/controllers/comment'
import { Comment } from '@/core/comment'
import { PostBodyComment } from '@/core/comment/api'
import { Post } from '@/core/post'
import { useToast } from './use-toast'

export type Props = GetCommentsProps

export interface UseDeleteCommentProps {
  params: Pick<Comment, '_id'> & { post: Post['_id'] }
}

export const usePostComment = ({ params }: Props) => {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (body: PostBodyComment) => postComment({ params, body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post-comments', params], refetchActive: true }),
    onError: () => toast({ title: 'Error', description: 'No se pudo publicar el comentario. Por favor intente más tarde.' })
  })

  return mutation
}

export const useGetComments = ({ params }: Props) => {
  const query = useQuery({
    queryKey: ['post-comments', params],
    queryFn: async () => await getComments({ params })
  })

  return query
}

export const useDeleteComment = ({ params }: UseDeleteCommentProps) => {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => await deleteComment({ params: { _id: params._id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post-comments', { post: params.post }], refetchActive: true }),
    onError: () => toast({ title: 'Error', description: 'No se pudo eliminar el comentario. Por favor intente más tarde.' })
  })

  return mutation
}
