import { MongoServerError } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { PostSignUpBody } from '@/core/auth/api'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { generateRandomNickname, hashPassword } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const body = (await req.json()) as PostSignUpBody

  try {
    const connection = await db()
    const collection = connection.collection(COLLECTION_NAMES.users)
    body.password = await hashPassword(body.password)
    await collection.insertOne({ ...body, nickname: generateRandomNickname() })
    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    console.error('Error establishing server connection', err)
    if (err instanceof MongoServerError) return NextResponse.json({}, { status: err.code === 11000 ? 409 : 500 })
    return NextResponse.json({}, { status: 500 })
  }
}
