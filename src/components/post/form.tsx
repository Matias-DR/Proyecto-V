'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseMutationResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { z, ZodRawShape } from 'zod'

import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/file-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { PostPostControllerProps } from '@/controllers/post'
import { CommonBodyPost } from '@/core/post/api'
import { CATEGORIES, CONTINENTS, COUNTRIES } from '@/lib/constants'

export interface Props {
  usePostController: () => UseMutationResult<unknown, Error, PostPostControllerProps, unknown>
  schema: ZodRawShape
}

export function PostForm({ usePostController, schema }: Props) {
  const { mutate } = usePostController()
  const formSchema = useMemo(() => z.object(schema), [schema])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: [],
      region: [],
      country: []
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ body: values as CommonBodyPost })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 pb-1'
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-blue-400'>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  className='text-blue-500 font-bold border-blue-400'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-blue-400'>Categoría</FormLabel>
              <FormControl>
                <MultiSelect
                  options={CATEGORIES.map((category) => ({ label: category, value: category }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  variant='inverted'
                  animation={2}
                  maxCount={3}
                  className='text-blue-500 font-bold border-blue-400'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='region'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-blue-400'>Región</FormLabel>
              <FormControl>
                <MultiSelect
                  options={CONTINENTS.map((continent) => ({ label: continent, value: continent }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  variant='inverted'
                  animation={2}
                  maxCount={3}
                  className='text-blue-500 font-bold border-blue-400'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-blue-400'>País</FormLabel>
              <FormControl>
                <MultiSelect
                  options={COUNTRIES.map((country) => ({ label: country, value: country }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  variant='inverted'
                  animation={2}
                  maxCount={3}
                  className='text-blue-500 font-bold border-blue-400'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FileInput
          control={form.control}
          error={form.formState.errors.file as FieldError | undefined}
        />
        <Button
          type='submit'
          className='text-white font-bold bg-blue-400 border-blue-400 hover:bg-blue-300 hover:text-blue-600'
        >
          ENVIAR
        </Button>
      </form>
    </Form>
  )
}
