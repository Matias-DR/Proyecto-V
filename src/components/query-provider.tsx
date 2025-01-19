'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface Props {
  children: React.ReactNode
}

export const QueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
}
