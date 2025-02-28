'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SendIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { PostBodyComment } from '@/core/comment/api'
import { Post } from '@/core/post'
import { usePostComment } from '@/hooks/comment'

export interface Props {
  _id: Post['_id']
}

const FormSchema = z.object({ comment: z.string().min(1) })

export const CommentForm = ({ _id }: Props) => {
  const { mutate } = usePostComment({ params: { post: _id } })

  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema), defaultValues: { comment: '' } })

  const onSubmit = (values: z.infer<typeof FormSchema>) => mutate(values as PostBodyComment)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-end gap-2'
      >
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Textarea
                  rows={1}
                  variant='simple'
                  placeholder='Ingrese un comentario...'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          size='icon'
          className='bg-blue-500 text-white hover:bg-blue-600'
        >
          <SendIcon className='!size-6' />
        </Button>
      </form>
    </Form>
  )
}
