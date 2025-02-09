import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Post as PostType } from '@/core/post'
import { FRONTEND_URL } from '@/infra/config'

export interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  const { description, image, name, category, country, region } = data
  // const { description, image, name } = data

  return (
    <div className='size-full p-2 flex flex-col gap-1 border border-blue-300 rounded-lg'>
      <Dialog>
        <DialogTrigger>
          <div className='relative w-full h-48 overflow-hidden border border-blue-300 rounded-md hover:cursor-pointer'>
            <Image
              src={`${FRONTEND_URL}/api/post/image/${image}`}
              alt={name}
              fill
              className='absolute object-contain'
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
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
                +{category.length}9
              </span>
            )}
          </Badge>
        )}
        {region && region.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{region}</span>
            {region.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{region.length}
              </span>
            )}
          </Badge>
        )}
        {country && country.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{country}</span>
            {country.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{country.length}
              </span>
            )}
          </Badge>
        )}
      </div>
    </div>
  )
}

export default Post
