'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

import { usePostSignOut } from '@/hooks/auth'

const Page = () => {
  const { mutate } = usePostSignOut()

  useEffect(() => {
    mutate()
    redirect('/auth/sign/in')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default Page
