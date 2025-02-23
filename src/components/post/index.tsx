'use client'

import Image from 'next/image'

import { MessageCircleIcon, ThumbsDownIcon, ThumbsUpIcon, TrashIcon } from 'lucide-react'
import { HTMLAttributes, useMemo, useRef } from 'react'

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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { usePostsContext } from '@/contexts/posts'
import { Post as PostType } from '@/core/post'
import { useDeletePostController, useLikeController } from '@/hooks/post'
import { FRONTEND_URL } from '@/infra/config'
import { cn } from '@/lib/utils'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  data: PostType
}

const Post = ({ data, className }: Props) => {
  const { _id, description, image, name, category, country, region, nickname } = data
  const { user } = usePostsContext()

  const likes = useMemo(() => data.likes ?? [], [data])

  const closeRef = useRef<HTMLButtonElement>(null)

  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeletePostController()
  const { mutate: mutateLike, isPending: isPendingLike } = useLikeController()

  const LikeIcon = useMemo(() => (likes.includes(user.nickname) ? ThumbsDownIcon : ThumbsUpIcon), [likes, user.nickname])

  return (
    <div className={cn('size-full p-2 flex flex-col gap-1 border border-blue-300 rounded-lg', className)}>
      <Dialog>
        <DialogClose
          asChild
          className='hidden'
        >
          <Button
            type='button'
            ref={closeRef}
            className='hidden'
          />
        </DialogClose>
        <DialogTrigger>
          <div className='relative w-full h-48 overflow-hidden border border-blue-300 rounded-md hover:cursor-pointer'>
            <Image
              src={`${FRONTEND_URL}/api/post/image/${image}`}
              alt={name}
              fill
              sizes='100%'
              className='absolute object-contain'
            />
            <div className='relative size-full'>
              <p className='absolute right-0 bottom-0 px-1 text-xs bg-[rgba(_255,_255,_255,_0_)] [box-shadow:0_8px_32px_0_rgba(_31,_38,_135,_0.37_)] backdrop-filter backdrop-blur-[20px] rounded-tl-xs rounded-br-sm'>
                <span className='text-muted-foreground'>{nickname}</span>
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='max-w-[97.5%] flex flex-row bg-transparent border-blue-300'>
          <div className='flex flex-col gap-2'>
            <div className='relative !size-[28vw] overflow-hidden border border-blue-300 rounded-md'>
              <Image
                src={`${FRONTEND_URL}/api/post/image/${image}`}
                alt={name}
                fill
                sizes='100%'
                className='absolute object-contain'
              />
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <Button
                  size='icon'
                  disabled={isPendingLike}
                  onClick={() => mutateLike({ params: { _id } })}
                  className='relative bg-blue-500 text-white hover:bg-blue-600 !fill-white'
                >
                  <LikeIcon className='!size-6' />
                  <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-white text-blue-500 text-[10px]'>
                    +{likes.length > 9 ? 9 : likes.length}
                  </span>
                </Button>
                <Button
                  size='icon'
                  onClick={() => {}}
                  className='bg-blue-500 text-white hover:bg-blue-600'
                >
                  <MessageCircleIcon className='!size-6' />
                </Button>
                {(nickname ?? '') === user.nickname && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size='icon'
                        onClick={() => {}}
                        className='bg-red-400 text-white hover:bg-red-500'
                      >
                        <TrashIcon className='!size-6' />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Está seguro que desea realizar la siguiente acción?</AlertDialogTitle>
                        <AlertDialogDescription className='line-clamp-1'>
                          Eliminar la publicación <span className='font-bold'>{`"${name}"`}</span>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isPendingDelete}
                          onClick={() => mutateDelete({ params: { _id } }, { onSuccess: () => closeRef && closeRef.current?.click() })}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              <p>
                Autor <span className='italic font-bold'>{nickname}</span>
              </p>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-3'>
            <DialogHeader>
              <DialogTitle className='text-4xl line-clamp-1'>{name}</DialogTitle>
              <ScrollArea
                vpClassName='p-0'
                className='flex-1'
              >
                <DialogDescription className='max-h-[40vh] text-base text-white'>{description}</DialogDescription>
              </ScrollArea>
            </DialogHeader>
            <div className='flex flex-col gap-2'>
              <ScrollArea
                vpClassName='p-0'
                className='flex-1 pb-3'
              >
                <div className='max-w-[64vw] flex gap-1'>
                  <span>Categorías:</span>
                  {category &&
                    category.map((category) => (
                      <Badge key={`${category}-${_id}`}>
                        <span className='truncate'>{category}</span>
                      </Badge>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
              <ScrollArea
                vpClassName='p-0'
                className='flex-1 pb-3'
              >
                <div className='max-w-[64vw] flex gap-1'>
                  <span>Continentes:</span>
                  {region &&
                    region.map((region) => (
                      <Badge key={`${region}-${_id}`}>
                        <span className='truncate'>{region}</span>
                      </Badge>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>

              <ScrollArea
                vpClassName='p-0'
                className='flex-1 pb-3'
              >
                <div className='max-w-[64vw] flex gap-1'>
                  <span>Países:</span>
                  {country &&
                    country.map((country) => (
                      <Badge key={`${country}-${_id}`}>
                        <span className='truncate'>{country}</span>
                      </Badge>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <h1 className='text-center text-2xl font-bold line-clamp-1'>{name}</h1>
      <ScrollArea
        vpClassName='p-0'
        className='flex-1'
      >
        <p className='max-h-32 text-wrap break-words'>{description}</p>
      </ScrollArea>
      <div className='flex items-center gap-2'>
        {category && category.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{category}</span>
            {category.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{category.length - 1}
              </span>
            )}
          </Badge>
        )}
        {region && region.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{region}</span>
            {region.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{region.length - 1}
              </span>
            )}
          </Badge>
        )}
        {country && country.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{country}</span>
            {country.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{country.length - 1}
              </span>
            )}
          </Badge>
        )}
      </div>
    </div>
  )
}

export default Post
