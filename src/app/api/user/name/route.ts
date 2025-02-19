import { NextRequest, NextResponse } from 'next/server'

import { getNameFromNextRequest } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    const name = getNameFromNextRequest(req)
    return name === undefined ? NextResponse.json(null, { status: 400 }) : NextResponse.json(name, { status: 200 })
  } catch {
    return NextResponse.json(null, { status: 400 })
  }
}
