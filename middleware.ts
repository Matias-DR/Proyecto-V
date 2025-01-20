import jwt from 'jsonwebtoken'

import { NextRequest, NextResponse } from 'next/server'

export function authMiddleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]

  if (!token) return NextResponse.json({}, { status: 401 })

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
  } catch {
    return NextResponse.json({}, { status: 403 })
  }
}

export const config = {
  matcher: ['/((?!auth/sign/in).*)', '/((?!auth/sign/up).*)', '/((?!auth/refresh).*)']
}
