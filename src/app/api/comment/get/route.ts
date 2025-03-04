import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { AuthVerify } from '@/app/api/auth'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'

async function handler(req: NextRequest) {
  const query = req.nextUrl.searchParams

  const post = query.get('post')

  try {
    const connection = await db()
    const collection = connection.collection(COLLECTION_NAMES.comments)
    const res = await collection.find({ post }).sort({ _id: -1 }).toArray()
    return NextResponse.json(res, { status: 200 })
  } catch {
    return NextResponse.json({}, { status: 400 })
  }
}

export const GET = AuthVerify(handler)
