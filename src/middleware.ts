import { jwtVerify } from 'jose'

import { NextRequest, NextResponse } from 'next/server'

import { POST } from '@/app/api/auth/refresh/route'
import { FRONTEND_URL } from './infra/config'

export default async function middleware(req: NextRequest) {
  const access = req.cookies.get('access')?.value

  // if (!access) return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/in`)
  if (!access)
    try {
      await POST(req)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/out`)
    }

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
    jwtVerify(access, secret)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/out`)
  }
}

export const config = {
  matcher: ['/((?!auth|api/auth|heroes|_next/|favicon.ico|api/post/image/.*).*)']
}
