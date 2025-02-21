import { JwtPayload, verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import { WithId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'
import { Session } from '@/core/auth'
import { User } from '@/core/user'
import { FRONTEND_URL } from '@/infra/config'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { generateAccessToken, generateRefreshToken, setTokensOnNextResponse } from '@/lib/utils'

export async function POST(req: NextRequest) {
  // Si no hay refresh, redireccionamos a sign/out
  const refresh = req.cookies.get('refresh')?.value
  if (!refresh) return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/out`)

  try {
    const connection = await db()
    const sessionsCollection = connection.collection(COLLECTION_NAMES.sessions)

    let user: User

    try {
      const decoded = verify(refresh, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload & { user: User }
      user = decoded.user
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
        // Intentamos eliminar la sesión si el token es inválido o expiró
        await sessionsCollection.deleteOne({ refresh })
      }
      return NextResponse.json({}, { status: 403 })
    }

    // Buscamos la sesión basada en el `refresh` recibido
    const session = (await sessionsCollection.findOne({ refresh })) as WithId<Session> | null

    // No existe sesión válida
    if (!session) return NextResponse.json({}, { status: 404 })

    // Generamos nuevos tokens
    const newAccess = generateAccessToken(user)
    const newRefresh = generateRefreshToken(user)

    const sessionsRes = await sessionsCollection.updateOne({ _id: session._id }, { $set: { refresh: newRefresh, updatedAt: new Date() } })

    if (!sessionsRes.modifiedCount) return NextResponse.json({}, { status: 400 }) // No se pudo actualizar

    const res = NextResponse.json({}, { status: 200 })
    setTokensOnNextResponse(res, newAccess, newRefresh)
    return res
  } catch {
    // Error de conexión u otro problema inesperado
    return NextResponse.json({}, { status: 400 })
  }
}
