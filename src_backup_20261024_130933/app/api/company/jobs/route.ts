import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const jobSchema = z.object({
  title: z.string().min(3, 'عنوان باید حداقل ۳ کاراکتر باشد').max(100),
  description: z.string().min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد').max(2000),
  location: z.string().min(2).max(50),
  type: z.enum(['full-time', 'part-time', 'remote', 'contract']),
  level: z.enum(['junior', 'mid', 'senior']),
  salary: z.string().max(50).optional().or(z.literal('')),
  skills: z.array(z.string().max(30)).max(10).optional(),
})

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (session.role !== 'COMPANY') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const company = await db.company.findUnique({
    where: { userId: session.userId },
  })

  if (!company) {
    return NextResponse.json({ jobs: [] })
  }

  const jobs = await db.job.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ jobs })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (session.role !== 'COMPANY') {
    return NextResponse.json(
      { error: 'فقط شرکت‌ها می‌تونن شغل پست کنن' },
      { status: 403 }
    )
  }

  const company = await db.company.findUnique({
    where: { userId: session.userId },
  })

  if (!company) {
    return NextResponse.json(
      { error: 'پروفایل شرکت پیدا نشد' },
      { status: 404 }
    )
  }

  try {
    const body = await req.json()
    const parsed = jobSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { title, description, location, type, level, salary, skills } =
      parsed.data

    const job = await db.job.create({
      data: {
        companyId: company.id,
        title,
        description,
        location,
        type,
        level,
        salary: salary || null,
        skills: skills && skills.length > 0 ? JSON.stringify(skills) : null,
        active: true,
      },
    })

    return NextResponse.json({ job }, { status: 201 })
  } catch (error) {
    console.error('Job create error:', error)
    return NextResponse.json({ error: 'خطا در ساخت شغل' }, { status: 500 })
  }
}