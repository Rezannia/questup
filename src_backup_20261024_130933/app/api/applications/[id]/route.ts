import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const updateSchema = z.object({
  status: z.enum(['accepted', 'rejected']),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await req.json()
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'وضعیت نامعتبر است' },
        { status: 400 }
      )
    }

    // چک کن این application مال همین کاربره
    const application = await db.application.findUnique({
      where: { id },
    })

    if (!application) {
      return NextResponse.json({ error: 'پیشنهاد پیدا نشد' }, { status: 404 })
    }

    if (application.userId !== session.userId) {
      return NextResponse.json({ error: 'دسترسی ندارید' }, { status: 403 })
    }

    if (application.status !== 'pending') {
      return NextResponse.json(
        { error: 'این پیشنهاد قبلاً بررسی شده' },
        { status: 400 }
      )
    }

    const updated = await db.application.update({
      where: { id },
      data: { status: parsed.data.status },
    })

    return NextResponse.json({ application: updated })
  } catch (error) {
    console.error('Application update error:', error)
    return NextResponse.json(
      { error: 'خطا در بروزرسانی' },
      { status: 500 }
    )
  }
}