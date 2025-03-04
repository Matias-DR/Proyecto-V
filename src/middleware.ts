import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { FRONTEND_URL } from './infra/config'

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('refresh')
  const isAuth = req.nextUrl.pathname.startsWith('/auth')
  const isRefresh = req.nextUrl.pathname === '/api/auth/refresh'

  // No interferimos refresh
  if (isRefresh) return NextResponse.next()

  if (isAuth) {
    // Si estamos en auth y hay refresh lo devolvemos al inicio
    if (cookie && cookie.value) return NextResponse.redirect(FRONTEND_URL!)
  } else {
    // Si no estamos en auth y no hay refresh lo devolvemos al ingreso
    if (!cookie || !cookie.value) return NextResponse.redirect(`${FRONTEND_URL!}/auth/sign/in`)
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|heroes/.*).*)'] }
