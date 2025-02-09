import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
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
      <div className='relative w-full h-48 overflow-hidden border border-blue-300 rounded-md'>
        <Image
          src={`${FRONTEND_URL}/api/post/image/${image}`}
          alt={name}
          fill
          className='absolute object-contain'
        />
      </div>
      <h1 className='text-center text-2xl font-bold'>{name}</h1>
      <ScrollArea
        vpClassName='p-0'
        className='flex-1'
      >
        <p className='max-h-32 text-wrap break-words'>{description}</p>
      </ScrollArea>
      <div className='flex items-center gap-2'>
        {category && category.length > 0 && (
          <Badge className='max-w-[31%]'>
            <span className='truncate'>{category}</span>
          </Badge>
        )}
        {region && region.length > 0 && (
          <Badge className='max-w-[31%]'>
            <span className='truncate'>{region}</span>
          </Badge>
        )}
        {country && country.length > 0 && (
          <Badge className='max-w-[31%]'>
            <span className='truncate'>{country}</span>
          </Badge>
        )}
      </div>
    </div>
  )
}

export default Post
