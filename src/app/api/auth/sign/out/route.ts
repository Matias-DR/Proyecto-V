import { JwtPayload, verify } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

import { COLLECTION_NAMES } from '@/infra/mongodb/config'

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get('refresh')

  if (!cookie || !cookie.value) return NextResponse.json({}, { status: 200 })

  const refresh = cookie.value

  try {
    const connection = await db()
    const sessionsCollection = connection.collection(COLLECTION_NAMES.sessions)

    try {
      const decoded = verify(refresh, process.env.REFRESH_TOKEN_SECRET!) as (JwtPayload & { name: string }) | null
      await sessionsCollection.deleteOne({ name: decoded?.name, refresh })
    } catch {}
  } catch {}

  const response = NextResponse.json({}, { status: 200 })
  response.cookies.set('access', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0)
  })
  response.cookies.set('refresh', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0)
  })
  return response
}
