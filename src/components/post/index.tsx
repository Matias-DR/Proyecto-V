import Image from 'next/image'

import { Post as PostType } from '@/core/post'
import { FRONTEND_URL } from '@/infra/config'

export interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  const { category, country, description, image, name, region } = data

  return (
    <div className='size-full px-2 flex flex-col gap-1 border border-blue-300 rounded-lg'>
      <h1 className='text-center text-2xl font-bold'>{name}</h1>
      <div className='relative w-full h-48'>
        <Image
          src={`${FRONTEND_URL}/api/post/image/${image}`}
          alt={name}
          fill
          className='absolute object-cover rounded-md'
        />
      </div>
      <p className='text-wrap break-words'>{description}</p>
    </div>
  )
}

export default Post
