import { JwtPayload, verify } from 'jsonwebtoken'
import { WithId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { Session } from '@/core/auth'
import { FRONTEND_URL } from '@/infra/config'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { generateAccessToken, generateRefreshToken, setTokensOnNextResponse } from '@/lib/utils'

export async function POST(req: NextRequest) {
  // Si no hay refresh redireccionamos a sign/out
  const refresh = req.cookies.get('refresh')?.value
  if (!refresh) return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/out`)

  try {
    const connection = await db()
    const sessionsCollection = connection.collection(COLLECTION_NAMES.sessions)
    let name = ''
    try {
      const decoded = verify(refresh, process.env.REFRESH_TOKEN_SECRET!) as (JwtPayload & { name: string }) | null
      // Si el token expiró, eliminamos la sesión y devolvemos 403
      if (!decoded) {
        await sessionsCollection.deleteOne({ name, refresh })
        return NextResponse.json({}, { status: 403 })
      }
      name = decoded.name
    } catch {
      // Si el token no es válido, eliminamos la sesión y devolvemos 403
      await sessionsCollection.deleteOne({ name, refresh })
      return NextResponse.json({}, { status: 403 })
    }

    try {
      const session = (await sessionsCollection.findOne({ name: name, refresh })) as WithId<Session> | null
      // Si no hay sesión devolvemos 404
      if (!session) return NextResponse.json({}, { status: 404 })

      // Si está todo ok renovamos los tokens
      const newAccess = generateAccessToken(name)
      const newRefresh = generateRefreshToken(name)
      const sessionsRes = await sessionsCollection.updateOne({ _id: session._id }, { $set: { refresh: newRefresh, updatedAt: new Date() } })

      // Si no se pudo actualizar devolvemos 500
      if (!sessionsRes.modifiedCount) return NextResponse.json({}, { status: 500 })

      const res = NextResponse.json({}, { status: 200 })
      setTokensOnNextResponse(res, newAccess, newRefresh)
      return res
    } catch {
      return NextResponse.json({}, { status: 500 })
    }
  } catch {
    // Si hubo error en cualquier conexión o en la decodificación del token, devolvemos 500
    return NextResponse.json({}, { status: 500 })
  }
}
