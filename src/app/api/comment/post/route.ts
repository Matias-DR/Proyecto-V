import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { AuthVerify } from '@/app/api/auth'
import { Comment } from '@/core/comment'
import { PostBodyComment, PostParamsComment } from '@/core/comment/api'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { getUserFromNextRequest } from '@/lib/utils'

async function handler(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const post = query.get('post') as PostParamsComment['post']
  const body = (await req.json()) as PostBodyComment
  const { nickname: user } = getUserFromNextRequest(req, process.env.ACCESS_TOKEN_SECRET!)
  const newPost: Omit<Comment, '_id'> = { post, user, ...body }

  try {
    const connection = await db()
    const collection = connection.collection(COLLECTION_NAMES.comments)
    await collection.insertOne(newPost)
    return NextResponse.json(true, { status: 200 })
  } catch {
    return NextResponse.json(false, { status: 400 })
  }
}

export const POST = AuthVerify(handler)
