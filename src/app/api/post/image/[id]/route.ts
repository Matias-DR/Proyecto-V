import { COLLECTION_NAMES } from '@/infra/mongodb/config'
import { ObjectId } from 'mongodb'
import { type NextRequest, NextResponse } from 'next/server'

import db from '@/infra/mongodb'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let connection
  try {
    const { id } = await params

    connection = await db()

    const file = await connection.collection(COLLECTION_NAMES.buckets).findOne({ _id: new ObjectId(id) })

    if (!file) return NextResponse.json({ message: 'Archivo no encontrado' }, { status: 404 })

    const buffer = Buffer.from(file.content.buffer)

    const response = new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': file.contentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Content-Length': buffer.length.toString()
      }
    })

    return response
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
}
