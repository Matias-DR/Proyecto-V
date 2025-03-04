import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { AuthVerify } from '@/app/api/auth'
import { dbClient } from '@/infra/mongodb'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'

async function handler(req: NextRequest) {
  const _id = req.nextUrl.searchParams.get('_id') as string

  try {
    const { client, connection } = await dbClient()

    const session = client.startSession()
    session.startTransaction()
    try {
      const postsCollection = connection.collection(COLLECTION_NAMES.posts)
      const bucketsColletion = connection.collection(COLLECTION_NAMES.buckets)

      await postsCollection.deleteOne({ _id: new ObjectId(_id) }, { session })
      await bucketsColletion.deleteOne({ _id: new ObjectId(_id) }, { session })

      await session.commitTransaction()
    } catch {
      await session.abortTransaction()
      return NextResponse.json(false, { status: 400 })
    } finally {
      session.endSession()
    }

    return NextResponse.json(true, { status: 200 })
  } catch (err) {
    console.error('Error establishing server connection', err)
    return NextResponse.json(false, { status: 400 })
  }
}

export const DELETE = AuthVerify(handler)
