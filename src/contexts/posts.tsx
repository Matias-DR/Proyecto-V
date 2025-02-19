'use client'

import { GetParamsPosts } from '@/core/post/api'
import { createContext, useState, useContext, type ReactNode } from 'react'

interface PostsContextType {
  params: GetParamsPosts
  setParams: React.Dispatch<React.SetStateAction<GetParamsPosts>>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<GetParamsPosts>({})

  return <PostsContext.Provider value={{ params, setParams }}>{children}</PostsContext.Provider>
}

export const usePostsContext = () => {
  const context = useContext(PostsContext)
  if (context === undefined) throw new Error('Para instanciar usePostsContext en un componente, este debe estar contenido en PostsProvider')
  return context
}
