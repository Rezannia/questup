import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { taskId: taskIdStr } = await params
  const taskId = parseInt(taskIdStr, 10)

  if (isNaN(taskId)) {
    return NextResponse.json({ error: 'invalid task id' }, { status: 400 })
  }

  const task = await db.stageTask.findUnique({ where: { id: taskId } })
  if (!task) {
    return NextResponse.json({ error: 'task not found' }, { status: 404 })
  }

  // فقط تسک‌های manual و auto قابل رد کردن هستن
  // (semi رو نمی‌شه رد کرد)
  if (task.taskType === 'semi') {
    return NextResponse.json(
      { error: 'این تسک قابل رد کردن نیست' },
      { status: 400 }
    )
  }

  // ثبت به‌عنوان تکمیل‌شده (ولی بدون XP)
  await db.userTask.upsert({
    where: {
      userId_taskId: {
        userId: session.userId,
        taskId,
      },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId: session.userId,
      taskId,
      completed: true,
      completedAt: new Date(),
    },
  })

  return NextResponse.json({ success: true })
}