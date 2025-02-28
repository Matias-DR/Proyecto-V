'use client'

import { z } from 'zod'

import { PostForm } from '@/components/post/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePostPost } from '@/hooks/post'
import { CATEGORIES, CONTINENTS, COUNTRIES } from '@/lib/constants'

const Page = () => {
  return (
    <ScrollArea className='h-full'>
      <article className='max-w-80'>
        <h1 className='text-center text-xl gradient-text animate-gradient'>
          ¡INGRESÁ LOS DATOS DE TU HÉROE Y SELECCIONÁ{' '}
          <span className='relative font-bold text-blue-500'>
            <span className='top-[0.9] absolute animate-bounce'>ENVIAR</span>
            <span className='invisible'>ENVIAR</span>
          </span>{' '}
          PARA PUBLICARLO!
        </h1>
        <PostForm
          usePost={usePostPost}
          schema={{
            name: z.string().min(3, { message: 'Mínimo 3 caracteres.' }),
            description: z.string().min(24, { message: 'Mínimo 24 caracteres.' }),
            category: z.enum(CATEGORIES).array(),
            region: z.enum(CONTINENTS).array().optional(),
            country: z.enum(COUNTRIES).array().optional(),
            image: z
              .instanceof(File)
              .refine((file) => !!file, 'Ingrese una imagen.')
              .refine((file) => file.size <= 5242880, 'Máximo 5MB.')
          }}
        />
      </article>
    </ScrollArea>
  )
}

export default Page
