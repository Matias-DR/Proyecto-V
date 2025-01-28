'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { postPostController } from '@/controllers/post'
import { useMutation } from '@tanstack/react-query'
import { useToast } from './use-toast'

export const usePostPostController = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postPostController,
    onSuccess: () => push('/?search=my-posts'),
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 409) toast({ title: 'Error', description: 'Ya realizó una publicación del héroe con el nombre ingresado.' })
        else toast({ title: 'Error', description: 'No se pudo realizar la publicación. Por favor intente mas tarde.' })
      }
    }
  })

  return mutation
}
