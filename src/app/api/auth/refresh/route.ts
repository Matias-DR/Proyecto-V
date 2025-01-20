import { JwtPayload, verify } from 'jsonwebtoken'
import { WithId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { Session } from '@/core/auth'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { generateAccessToken, generateRefreshToken } from '@/lib/utils'

export async function POST(req: NextRequest) {
  // Si no hay refresh devolvemos 401
  const refresh = req.cookies.get('refresh')?.value
  if (!refresh) return NextResponse.json({}, { status: 401 })

  let name = ''
  try {
    const decoded = verify(refresh, process.env.REFRESH_TOKEN_SECRET!) as (JwtPayload & { name: string }) | null
    // Si el token no es válido o expiró, devolvemos 403
    if (!decoded) return NextResponse.json({}, { status: 403 })
    name = decoded.name
  } catch {
    return NextResponse.json({}, { status: 403 })
  }

  try {
    const connection = await db()
    const sessionsCollection = connection.collection(COLLECTION_NAMES.sessions)
    const session = (await sessionsCollection.findOne({ name: name, refresh })) as WithId<Session> | null
    // Si no hay sesión devolvemos 404
    if (!session) return NextResponse.json({}, { status: 404 })

    // Si está todo ok renovamos los tokens
    const newAccess = generateAccessToken(name)
    const newRefresh = generateRefreshToken(name)
    const res = await sessionsCollection.updateOne({ _id: session._id }, { $set: { refresh: newRefresh, updatedAt: new Date() } })

    // Si no se pudo actualizar devolvemos 500
    if (!res.modifiedCount) return NextResponse.json({}, { status: 500 })

    return NextResponse.json({ access: newAccess, refresh: newRefresh }, { status: 200 })
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
}
