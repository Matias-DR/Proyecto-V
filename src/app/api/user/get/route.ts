import { NextRequest, NextResponse } from 'next/server'

import { FRONTEND_URL } from '@/infra/config'
import { getUserFromNextRequest } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromNextRequest(req, process.env.ACCESS_TOKEN_SECRET!)
    return NextResponse.json(user, { status: 200 })
  } catch {
    return NextResponse.redirect(`${FRONTEND_URL}/auth/sign/out`)
  }
}
