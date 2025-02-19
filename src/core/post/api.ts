import { Post } from '.'

export type CommonBodyPost = PostBodyPost

export type PostBodyPost = Omit<Post, '_id' | 'image'> & {
  image: File
}

export type PatchBodyPost = PostBodyPost

export type GetResponsePost = Omit<Post, 'image'> & {
  image: string
}

export type GetParamsPosts = Partial<Pick<Post, 'category' | 'region' | 'country'>> & { search?: string }

export type GetResponsePosts = GetResponsePost[]

export type DeleteParamsPost = Pick<Post, '_id'>

export type DeleteResponsePost = boolean

export type LikeParamsPost = Pick<Post, '_id'>

export type LikeResponsePost = boolean
