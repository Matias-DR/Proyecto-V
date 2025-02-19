'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import { GetParamsPosts } from '@/core/post/api'
import { User } from '@/core/user'
import { useGetNameController } from '@/hooks/user'

interface PostsContextType {
  params: GetParamsPosts
  setParams: React.Dispatch<React.SetStateAction<GetParamsPosts>>
  name: User['name']
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<GetParamsPosts>({})
  const { data: name } = useGetNameController()

  return <PostsContext.Provider value={{ params, setParams, name: name ?? '' }}>{children}</PostsContext.Provider>
}

export const usePostsContext = () => {
  const context = useContext(PostsContext)
  if (context === undefined) throw new Error('Para instanciar usePostsContext en un componente, este debe estar contenido en PostsProvider')
  return context
}
