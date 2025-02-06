import Post from '.'

import { Post as PostType } from '@/core/post'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface Props {
  posts?: PostType[]
  isError: boolean
}

const Grid = ({ posts }: Props) => {
  return (
    <ScrollArea
      vpClassName='px-0'
      className='w-full border'
    >
      <article className='w-full p-2 flex flex-wrap gap-6 bg-blue-300/20 rounded-xl shadow-lg'>
        {posts?.map((post) => (
          <div
            key={post._id}
            className='flex-1 basis-64 max-w-64 h-96'
          >
            <Post data={post} />
          </div>
        ))}
      </article>
    </ScrollArea>
  )
}

export default Grid
