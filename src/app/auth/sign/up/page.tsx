'use client'

import { FormComponent } from '@/components/auth/sign/form'
import { usePostSignUpController } from '@/hooks/auth'
import { z } from 'zod'

const Page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='gradient-text animate-gradient text-center text-4xl'>Registrate</h1>
      <FormComponent
        usePostController={usePostSignUpController}
        schema={{
          name: z.string().min(4, { message: 'Mínimo 4 caracteres.' }),
          password: z.string().min(4, { message: 'Mínimo 4 caracteres.' }).max(8, { message: 'Máximo 8 caracteres.' })
        }}
      />
    </div>
  )
}

export default Page
