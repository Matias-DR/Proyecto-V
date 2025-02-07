import Image from 'next/image'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Post as PostType } from '@/core/post'
import { FRONTEND_URL } from '@/infra/config'

export interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  // const { description, image, name, category, country, region } = data
  const { description, image, name } = data

  return (
    <div className='size-full p-2 flex flex-col gap-1 border border-blue-300 rounded-lg'>
      <div className='relative w-full h-48 overflow-hidden border border-blue-300 rounded-md'>
        <Image
          src={`${FRONTEND_URL}/api/post/image/${image}`}
          alt={name}
          fill
          className='absolute object-contain'
        />
      </div>
      <h1 className='text-center text-2xl font-bold'>{name}</h1>
      <ScrollArea vpClassName='p-0'>
        <p className='max-h-32 text-wrap break-words'>{description}</p>
      </ScrollArea>
    </div>
  )
}

export default Post
