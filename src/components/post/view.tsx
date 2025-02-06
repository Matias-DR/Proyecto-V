'use client'

import { Fragment, useState } from 'react'

import Filter from '@/components/post/filter'
import Grid from '@/components/post/grid'

import { GetParamsPosts } from '@/core/post/api'
import { useGetPostsController } from '@/hooks/post'

const View = () => {
  const [params, setParams] = useState<GetParamsPosts>({})
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

export default View
