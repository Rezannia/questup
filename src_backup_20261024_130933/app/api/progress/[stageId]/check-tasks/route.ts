import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { checkTask } from '@/lib/task-checker'

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

  const tasks = await db.stageTask.findMany({
    where: { stageId },
  })

  const results = await Promise.all(
    tasks.map(async (task) => {
      let isCompleted = false

      if (task.taskType === 'auto' && task.checkKey) {
        isCompleted = await checkTask(session.userId, task.checkKey)
      }

      // اگه auto و انجام شده، توی دیتابیس ثبت کن
      if (isCompleted) {
        await db.userTask.upsert({
          where: {
            userId_taskId: {
              userId: session.userId,
              taskId: task.id,
            },
          },
          update: {
            completed: true,
            completedAt: new Date(),
          },
          create: {
            userId: session.userId,
            taskId: task.id,
            completed: true,
            completedAt: new Date(),
          },
        })
      }

      return {
        taskId: task.id,
        completed: isCompleted,
      }
    })
  )

  return NextResponse.json({ results })
}