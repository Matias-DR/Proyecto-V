import { Post } from '@/core/post'
import { User } from '@/core/user'

export interface Comment {
  _id: string
  comment: string
  user: User['nickname']
  post: Post['_id']
}
