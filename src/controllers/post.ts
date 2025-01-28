import { PostBodyPost } from '@/core/post/api'
import api from '@/infra/axios'

export interface PostPostControllerProps {
  body: PostBodyPost
}

export const postPostController = async ({ body }: PostPostControllerProps) => {
  const formData = new FormData()
  Object.entries(body).map(([key, value]) => formData.append(key, value))
  return api.post('/api/post/create', formData).then((res) => res.data)
}
