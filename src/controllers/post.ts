import api from '@/infra/axios'

import { GetParamsPosts, GetResponsePosts, PostBodyPost } from '@/core/post/api'
import { formatURL } from '@/lib/utils'

export interface PostPostControllerProps {
  body: PostBodyPost
}

export interface GetPostsControllerProps {
  params: GetParamsPosts
}

export const postPostController = async ({ body }: PostPostControllerProps) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((item) => formData.append(`${key}[]`, item))
    else formData.append(key, value)
  })
  return await api.post('/api/post/create', formData).then((res) => res.data)
}

export const getPostsController = async ({ params }: GetPostsControllerProps): Promise<GetResponsePosts> => {
  const url = formatURL('/api/post/get', params)
  return await api.get(url).then((res) => res.data)
}
