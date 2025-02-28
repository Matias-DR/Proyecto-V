import api from '@/infra/axios'

import {
  DeleteParamsComment,
  DeleteResponseComment,
  GetParamsComments,
  GetResponseComments,
  PostBodyComment,
  PostParamsComment,
  PostResponseComment
} from '@/core/comment/api'
import { formatURL } from '@/lib/utils'

export interface GetCommentsProps {
  params: GetParamsComments
}

export interface PostCommentProps {
  params: PostParamsComment
  body: PostBodyComment
}

export interface DeleteCommentProps {
  params: DeleteParamsComment
}

export const getComments = async ({ params }: GetCommentsProps): Promise<GetResponseComments> => {
  const url = formatURL('/api/comment/get', params)
  return await api.get(url).then((res) => res.data)
}

export const postComment = async ({ params, body }: PostCommentProps): Promise<PostResponseComment> => {
  const url = formatURL('/api/comment/post', params)
  return await api.post(url, body).then((res) => res.data)
}

export const deleteComment = async ({ params }: DeleteCommentProps): Promise<DeleteResponseComment> => {
  const url = formatURL('/api/comment/delete', params)
  return await api.delete<DeleteResponseComment>(url).then((res) => res.data)
}
