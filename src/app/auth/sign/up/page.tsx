'use client'

import Link from 'next/link'

import { z } from 'zod'

import { SignForm } from '@/components/auth/sign/form'
import { usePostSignUp } from '@/hooks/auth'

const Page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='gradient-text animate-gradient text-center text-4xl'>Registrate</h1>
      <p className='text-blue-400 font-bold text-center'>
        Ya tenés usuario?{' '}
        <Link
          href='/auth/sign/in'
          className='gradient-text animate-gradient'
        >
          Ingresa
        </Link>
      </p>
      <SignForm
        usePost={usePostSignUp}
        schema={{
          name: z.string().min(4, { message: 'Mínimo 4 caracteres.' }),
          password: z.string().min(4, { message: 'Mínimo 4 caracteres.' }).max(8, { message: 'Máximo 8 caracteres.' })
        }}
      />
    </div>
  )
}

export default Page
