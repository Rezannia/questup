import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').max(50).optional(),
  bio: z
    .string()
    .max(300, 'بیو نمی‌تواند بیش از ۳۰۰ کاراکتر باشد')
    .optional(),
  avatar: z.string().max(10).optional(),
  skills: z.array(z.string().max(30)).max(10, 'حداکثر ۱۰ مهارت').optional(),
})

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      bio: true,
      skills: true,
      website: true,
      createdAt: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 })
  }

  const [completedCount, medalsCount, progress] = await Promise.all([
    db.userProgress.count({
      where: { userId: session.userId, completed: true },
    }),
    db.userMedal.count({ where: { userId: session.userId } }),
    db.userProgress.findMany({
      where: { userId: session.userId, completed: true },
      include: { stage: true },
    }),
  ])

  const totalXp = progress.reduce(
    (sum, p) => sum + (p.stage?.xpReward ?? 0),
    0
  )
  const level = Math.floor(totalXp / 500) + 1

  return NextResponse.json({
    user,
    stats: {
      completedCount,
      medalsCount,
      totalXp,
      level,
      joinedAt: user.createdAt,
    },
  })
}

export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = parsed.data

    const user = await db.user.update({
      where: { id: session.userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.avatar && { avatar: data.avatar }),
        ...(data.skills !== undefined && {
          skills:
            data.skills.length > 0 ? JSON.stringify(data.skills) : null,
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        skills: true,
        website: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'خطا در ذخیره اطلاعات' },
      { status: 500 }
    )
  }
}