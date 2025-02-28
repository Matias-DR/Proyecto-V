import { Post } from '@/core/post'
import { Comment } from './'

export interface GetParamsComments {
  post: Post['_id']
}

export type GetResponseComments = Comment[]

export interface PostParamsComment {
  post: Post['_id']
}

export type PostBodyComment = Pick<Comment, 'comment'>

export type PostResponseComment = boolean

export type DeleteParamsComment = Pick<Comment, '_id'>

export type DeleteResponseComment = boolean
