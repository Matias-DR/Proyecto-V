import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { FRONTEND_URL } from './infra/config'

export function middleware(req: NextRequest) {
  const access = req.cookies.get('access')?.value

  const isAuth = req.nextUrl.pathname.startsWith('/auth')
  if (isAuth && access) return NextResponse.redirect(FRONTEND_URL!)
  if (!isAuth && !access) return NextResponse.redirect(`${FRONTEND_URL!}/auth/sign/in`)

  return NextResponse.next()
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|heroes/.*).*)'] }
