import { NextRequest, NextResponse } from 'next/server'

import { AuthVerify } from '@/app/api/auth'
import { FRONTEND_URL } from '@/infra/config'
import { getUserFromNextRequest } from '@/lib/utils'

async function handler(req: NextRequest) {
  try {
    const user = getUserFromNextRequest(req, process.env.ACCESS_TOKEN_SECRET!)
    return NextResponse.json(user, { status: 200 })
  } catch {
    return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/out`)
  }
}

export const GET = AuthVerify(handler)
