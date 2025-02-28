import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { DeleteParamsComment } from '@/core/comment/api'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'

export async function DELETE(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const _id = query.get('_id') as DeleteParamsComment['_id']

  try {
    const connection = await db()
    const collection = connection.collection(COLLECTION_NAMES.comments)
    await collection.deleteOne({ _id: new ObjectId(_id) })
    return NextResponse.json(true, { status: 200 })
  } catch {
    return NextResponse.json(false, { status: 400 })
  }
}
