'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

import { usePostSignOutController } from '@/hooks/auth'

const Page = () => {
  const { mutate } = usePostSignOutController()

  useEffect(() => {
    mutate()
    redirect('/auth/sign/in')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default Page
