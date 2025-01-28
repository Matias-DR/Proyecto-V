import { MongoServerError, WithId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { PostSignInBody } from '@/core/auth/api'
import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { Credentials } from '@/core/auth'
import { generateAccessToken, generateRefreshToken, verifyPassword } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const body = (await req.json()) as PostSignInBody

  try {
    const connection = await db()

    // Buscamos el usuario
    const usersCollection = connection.collection(COLLECTION_NAMES.users)
    const user = (await usersCollection.findOne({ name: body.name })) as WithId<Credentials> | null
    // Si no existe devolvermos 404
    if (!user) return NextResponse.json({}, { status: 404 })

    // Verificamos que las contraseñas coincidan
    const verification = await verifyPassword(body.password, user.password)
    // Si no coinciden devolvemos 401
    if (!verification) return NextResponse.json({}, { status: 401 })

    // Si está todo ok genero los tokens
    const access = generateAccessToken(body.name)
    const refresh = generateRefreshToken(body.name)
    const sessionsCollection = connection.collection(COLLECTION_NAMES.sessions)
    // Guardamos el nombre de usuario y el refresh en la base de datos
    sessionsCollection.insertOne({ name: body.name, refresh })
    // Guardamos las cookies y respondemos 200
    const res = NextResponse.json({}, { status: 200 })
    res.cookies.set('access', access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60
    })
    res.cookies.set('refresh', refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60
    })
    return res
  } catch (err) {
    console.error('Error establishing server connection', err)
    if (err instanceof MongoServerError) return NextResponse.json({}, { status: err.code === 11000 ? 409 : 500 })
    return NextResponse.json({}, { status: 500 })
  }
}
