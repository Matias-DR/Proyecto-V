import { verify } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export const AuthVerify = (handler: (req: NextRequest) => Promise<NextResponse>) => async (req: NextRequest) => {
  const cookie = req.cookies.get('access')

  // Si no hay access, devuelve 401
  if (!cookie || !cookie.value) return NextResponse.json(null, { status: 401 })

  try {
    const validation = verify(cookie.value, process.env.ACCESS_TOKEN_SECRET!)
    // Si el token es inválido o expiró, devolvemos 401
    if (!validation) return NextResponse.json(null, { status: 401 })
  } catch {
    // Si el token es inválido o expiró, devolvemos 401
    return NextResponse.json(null, { status: 401 })
  }

  return handler(req)
}
