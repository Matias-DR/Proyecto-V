import { MongoServerError } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { getUserFromNextRequest } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('image') as File
  const buffer = await file.arrayBuffer()

  const fileDoc = { filename: file.name, contentType: file.type, size: file.size, uploadDate: new Date(), content: Buffer.from(buffer) }

  const { nickname } = getUserFromNextRequest(req, process.env.ACCESS_TOKEN_SECRET!)

  try {
    const connection = await db()

    const bucketsColletion = connection.collection(COLLECTION_NAMES.buckets)
    const postsCollection = connection.collection(COLLECTION_NAMES.posts)

    const bucketRes = await bucketsColletion.insertOne(fileDoc)

    const body: Record<string, unknown> = { image: bucketRes.insertedId.toString(), nickname }
    for (const [key, value] of formData) if (key !== 'image') body[key] = value

    const res = await postsCollection.insertOne({ ...body })

    return NextResponse.json({ _id: res.insertedId }, { status: 201 })
  } catch (err) {
    console.error('Error establishing server connection', err)
    if (err instanceof MongoServerError) return NextResponse.json({}, { status: err.code === 11000 ? 409 : 500 })
    return NextResponse.json({}, { status: 500 })
  }
}

export const config = { api: { bodyParser: false } }
