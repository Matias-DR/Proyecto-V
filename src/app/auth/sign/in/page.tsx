'use client'

import { SignForm } from '@/components/auth/sign/form'
import { usePostSignIn } from '@/hooks/auth'
import Link from 'next/link'
import { z } from 'zod'

const Page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='gradient-text animate-gradient text-center text-4xl'>Ingresar</h1>
      <p className='text-blue-400 font-bold text-center'>
        No tenés usuario?{' '}
        <Link
          href='/auth/sign/up'
          className='gradient-text animate-gradient'
        >
          Registrate
        </Link>
      </p>
      <SignForm
        usePost={usePostSignIn}
        schema={{
          name: z.string({ message: 'Inrese un nombre' }),
          password: z.string({ message: 'Inrese una contraseña' })
        }}
      />
    </div>
  )
}

export default Page
