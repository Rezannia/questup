import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (session.role !== 'JOBSEEKER') {
    return NextResponse.json({ error: 'فقط کارجوها' }, { status: 403 })
  }

  try {
    const { jobId, message } = await req.json()

    if (!jobId || !message || message.length < 10) {
      return NextResponse.json({ error: 'داده نامعتبر' }, { status: 400 })
    }

    const job = await db.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return NextResponse.json({ error: 'شغل پیدا نشد' }, { status: 404 })
    }

    const existing = await db.application.findFirst({
      where: {
        userId: session.userId,
        companyId: job.companyId,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'قبلاً به این شرکت درخواست دادی' },
        { status: 409 }
      )
    }

    const application = await db.application.create({
      data: {
        userId: session.userId,
        companyId: job.companyId,
        message,
        status: 'pending',
      },
    })

    return NextResponse.json({ application }, { status: 201 })
  } catch (error) {
    console.error('Apply error:', error)
    return NextResponse.json({ error: 'خطا' }, { status: 500 })
  }
}