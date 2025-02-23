import Post from '.'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Post as PostType } from '@/core/post'

export interface Props {
  posts?: PostType[]
  isError: boolean
  postId?: PostType['_id']
}

const Grid = ({ posts, postId }: Props) => {
  return (
    <ScrollArea
      vpClassName='px-0'
      className='w-full'
    >
      <article className='w-full p-2 flex flex-wrap justify-center gap-6 bg-blue-300/20 rounded-xl shadow-lg '>
        {posts?.map((post) => (
          <div
            key={post._id}
            className='flex-1 basis-64 max-w-64 h-96'
          >
            <Post
              data={post}
              className={postId && postId === post._id ? 'flip-vertical-fwd slide-in-elliptic-top-fwd' : ''}
            />
          </div>
        ))}
      </article>
    </ScrollArea>
  )
}

export default Grid
