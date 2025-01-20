'use client'

import { FormComponent } from '@/components/auth/sign/form'
import { usePostSignInController } from '@/hooks/auth'
import { z } from 'zod'

const Page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='gradient-text animate-gradient text-center text-4xl'>Ingresar</h1>
      <FormComponent
        usePostController={usePostSignInController}
        schema={{
          name: z.string({ message: 'Inrese un nombre' }),
          password: z.string({ message: 'Inrese una contraseña' })
        }}
      />
    </div>
  )
}

export default Page
