'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import { GetParamsPosts } from '@/core/post/api'
import { User } from '@/core/user'
import { useGetUser } from '@/hooks/user'

interface PostsContextType {
  params: GetParamsPosts
  setParams: React.Dispatch<React.SetStateAction<GetParamsPosts>>
  user: User
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<GetParamsPosts>({})
  const { data: user } = useGetUser()

  return user && <PostsContext.Provider value={{ params, setParams, user }}>{children}</PostsContext.Provider>
}

export const usePostsContext = () => {
  const context = useContext(PostsContext)
  if (context === undefined) throw new Error('Para instanciar usePostsContext en un componente, este debe estar dentro de PostsProvider')
  return context
}
