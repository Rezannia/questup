import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const offerSchema = z.object({
  jobseekerId: z.string(),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد').max(500),
})

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (session.role !== 'COMPANY') {
    return NextResponse.json(
      { error: 'فقط شرکت‌ها می‌تونن پیشنهاد بدن' },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()
    const parsed = offerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { jobseekerId, message } = parsed.data

    const company = await db.company.findUnique({
      where: { userId: session.userId },
    })

    if (!company) {
      return NextResponse.json(
        { error: 'پروفایل شرکت پیدا نشد. اول پروفایل شرکت رو بساز.' },
        { status: 404 }
      )
    }

    const existing = await db.application.findFirst({
      where: {
        userId: jobseekerId,
        companyId: company.id,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'قبلاً به این کارجو پیشنهاد دادی' },
        { status: 409 }
      )
    }

    const application = await db.application.create({
      data: {
        userId: jobseekerId,
        companyId: company.id,
        message,
        status: 'pending',
      },
    })

    return NextResponse.json({ application }, { status: 201 })
  } catch (error) {
    console.error('Offer error:', error)
    return NextResponse.json(
      { error: 'خطا در ارسال پیشنهاد' },
      { status: 500 }
    )
  }
}