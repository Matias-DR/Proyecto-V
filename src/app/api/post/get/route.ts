import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { getUserFromNextRequest } from '@/lib/utils'

// AGREGAR EL CASO "myPosts"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams

  const conditions = []
  const keys = ['category', 'region', 'country']
  keys.forEach((key) => {
    const value = query.get(key)
    if (value && value.length > 0) conditions.push({ [key]: { $in: value.split(',') } })
  })
  const search = query.get('search')
  if (search) {
    conditions.push({ $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] })
  }
  const myPosts = query.get('myPosts')
  if (myPosts) {
    const { name } = getUserFromNextRequest(req, process.env.ACCESS_TOKEN_SECRET!)
    conditions.push({ user: { $eq: name } })
  }
  // @example
  // {
  //   "$and": [
  //     { "category": { "$in": ["Mitología"] } },
  //     {
  //       "$or": [
  //         { "name": { "$regex": "mat", "$options": "i" } },
  //         { "description": { "$regex": "mat", "$options": "i" } }
  //       ]
  //     }
  //   ]
  // }
  const filter = conditions.length > 0 ? { $and: conditions } : {}

  try {
    const connection = await db()
    const collection = connection.collection(COLLECTION_NAMES.posts)
    const res = collection.find().sort({ _id: -1 })
    // si hay al menos un parámetro fitra
    if (Object.values(filter).some((value) => value !== undefined)) {
      try {
        const data = await collection
          .find({
            $or: Object.entries(filter).map(([key, value]) => ({ [key]: value }))
          })
          .sort({ _id: -1 })
          .toArray()
        return NextResponse.json(data, { status: 200 })
      } catch {
        // Falló el filtrado
        return NextResponse.json({}, { status: 400 })
      }
    } else {
      // si no hay ningún parámetro devuelve la lista entera
      const data = await res.toArray()
      return NextResponse.json(data, { status: 200 })
    }
  } catch {
    // Falló la conexión o la búsqueda
    return NextResponse.json({}, { status: 400 })
  }
}

export const config = { api: { bodyParser: false } }
