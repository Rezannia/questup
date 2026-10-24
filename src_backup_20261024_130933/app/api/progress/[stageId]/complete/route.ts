import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ stageId: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { stageId: stageIdStr } = await params
  const stageId = parseInt(stageIdStr, 10)

  if (isNaN(stageId)) {
    return NextResponse.json({ error: 'invalid stage id' }, { status: 400 })
  }

  const stage = await db.stage.findUnique({ where: { id: stageId } })
  if (!stage) {
    return NextResponse.json({ error: 'stage not found' }, { status: 404 })
  }

  // چک کن مرحله قبلی کامل شده (به‌جز مرحله ۱)
  if (stage.order > 1) {
    const prevStage = await db.stage.findUnique({
      where: { order: stage.order - 1 },
    })
    if (prevStage) {
      const prevProgress = await db.userProgress.findUnique({
        where: {
          userId_stageId: {
            userId: session.userId,
            stageId: prevStage.id,
          },
        },
      })
      if (!prevProgress?.completed) {
        return NextResponse.json(
          { error: 'مرحله قبلی را اول کامل کن' },
          { status: 400 }
        )
      }
    }
  }

  // تکمیل یا آپدیت پیشرفت
  const progress = await db.userProgress.upsert({
    where: {
      userId_stageId: {
        userId: session.userId,
        stageId,
      },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId: session.userId,
      stageId,
      completed: true,
      completedAt: new Date(),
    },
  })

  // ثبت مدال (اگه قبلاً نبوده)
  const medal = await db.userMedal.upsert({
    where: {
      userId_stageId: {
        userId: session.userId,
        stageId,
      },
    },
    update: {},
    create: {
      userId: session.userId,
      stageId,
    },
  })

  return NextResponse.json({
    success: true,
    progress,
    medal,
    stage,
  })
}