'use client'

import { TrashIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { usePostsContext } from '@/contexts/posts'
import { Comment as CommentType } from '@/core/comment'
import { useDeleteComment } from '@/hooks/comment'

export type Props = CommentType

export const Comment = ({ _id, post, user, comment }: Props) => {
  const { user: currentUser } = usePostsContext()
  const { mutate, isPending } = useDeleteComment({ params: { _id, post } })

  return (
    <div className='relative pt-6 flex flex-col justify-center gap-2 slide-left'>
      <p className='absolute -top-0 w-min px-2 font-bold italic bg-blue-950 rounded-t-md border-l border-t border-r border-blue-400'>
        {user}
      </p>
      <div className='w-full pr-1 py-1 flex justify-between items-center gap-2 bg-blue-950 rounded-tr-md rounded-b-md border border-blue-400'>
        <p className='w-full pl-6 pr-2'>{comment}</p>
        {currentUser.nickname === user && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size='icon'
                variant='ghost'
                disabled={isPending}
                className='text-red-400 hover:text-white hover:bg-red-500'
              >
                <TrashIcon className='size-6' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Desea realizar la siguiente acción?</AlertDialogTitle>
                <AlertDialogDescription>
                  Eliminar el comentario: <span className='italic'>{comment}</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isPending}
                  onClick={() => mutate()}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
