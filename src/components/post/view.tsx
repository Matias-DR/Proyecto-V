'use client'

import { Fragment } from 'react'

import Filter from '@/components/post/filter'
import Grid from '@/components/post/grid'

import { PostsProvider, usePostsContext } from '@/contexts/posts'
import { useGetPostsController } from '@/hooks/post'

const View = () => {
  const { params, setParams } = usePostsContext()
  const { data, isError } = useGetPostsController({ params })

  return (
    <Fragment>
      <Grid
        posts={data}
        isError={isError}
      />
      <Filter setParams={setParams} />
    </Fragment>
  )
}

const WithContext = () => (
  <PostsProvider>
    <View />
  </PostsProvider>
)

export default WithContext
