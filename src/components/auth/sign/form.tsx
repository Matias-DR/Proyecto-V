'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodRawShape } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CommonPostSignControllerProps } from '@/controllers/auth'
import { UseMutationResult } from '@tanstack/react-query'

export interface Props {
  usePostController: () => UseMutationResult<unknown, Error, CommonPostSignControllerProps, unknown>
  schema: ZodRawShape
}

export const FormComponent = ({ usePostController, schema }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const { mutate } = usePostController()
  const formSchema = useMemo(() => z.object(schema), [schema])
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { name: '', password: '' } })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setDisabled(true)
    mutate(
      { body: { name: values.name, password: values.password } },
      {
        onSettled() {
          setDisabled(false)
        }
      }
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-blue-400'>Nombre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='text-blue-500 font-bold border-blue-400'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-blue-400'>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  {...field}
                  className='text-blue-500 font-bold border-blue-400'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-1 flex justify-center'>
          <Button
            disabled={disabled}
            type='submit'
            className='text-blue-400 font-bold bg-transparent border-2 border-blue-400 hover:bg-blue-200 hover:text-blue-500'
          >
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  )
}
