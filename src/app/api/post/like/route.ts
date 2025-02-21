import { Filter, ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { getUserNameFromNextRequest } from '@/lib/utils'

export async function PATCH(req: NextRequest) {
  const _id = req.nextUrl.searchParams.get('_id') as string
  const name = getUserNameFromNextRequest(req) as string

  try {
    const connection = await db()
    const postsCollection = connection.collection(COLLECTION_NAMES.posts)

    // Asegurar que 'likes' existe como array si no está presente
    await postsCollection.updateOne({ _id: new ObjectId(_id), likes: { $exists: false } }, { $set: { likes: [] } })

    // Intentar agregar el like
    const res = await postsCollection.updateOne({ _id: new ObjectId(_id), likes: { $ne: name } }, { $addToSet: { likes: name } })

    let like = true
    if (res.modifiedCount === 0) {
      // Si no se modificó, significa que el usuario ya había dado like, así que se elimina
      await postsCollection.updateOne({ _id: new ObjectId(_id) }, { $pull: { likes: name } as Filter<Document> })
      like = false
    }

    return NextResponse.json(like, { status: 200 })
  } catch (err) {
    console.error('Error handling request', err)
    return NextResponse.json(false, { status: 400 })
  }
}

export const config = { api: { bodyParser: false } }
