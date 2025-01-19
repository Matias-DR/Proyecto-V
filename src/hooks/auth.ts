'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { postSignUpController } from '@/controllers/auth'
import { useMutation } from '@tanstack/react-query'
import { useToast } from './use-toast'

export const usePostSignUpController = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postSignUpController,
    onSuccess: () => push('auth/sign/in?registered=true'),
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 409) toast({ title: 'Error', description: 'Usuario existente. Por favor ingrese otro nombre.' })
        else toast({ title: 'Error', description: 'No se pudo crear el usuario. Por favor intente mas tarde.' })
      }
      console.log(error)
    }
  })

  return mutation
}
