import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { checkTask } from '@/lib/task-checker'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const [stages, progress, medals, userTasks] = await Promise.all([
    db.stage.findMany({
      orderBy: { order: 'asc' },
      include: {
        tasks: { orderBy: { order: 'asc' } },
      },
    }),
    db.userProgress.findMany({
      where: { userId: session.userId },
    }),
    db.userMedal.findMany({
      where: { userId: session.userId },
      orderBy: { earnedAt: 'desc' },
    }),
    db.userTask.findMany({
      where: { userId: session.userId, completed: true },
    }),
  ])

  const completedStageIds = new Set(
    progress.filter((p) => p.completed).map((p) => p.stageId)
  )
  const completedTaskIds = new Set(userTasks.map((ut) => ut.taskId))

  // چک خودکار برای تسک‌های auto
  const autoCheckResults = new Map<number, boolean>()

  for (const stage of stages) {
    for (const task of stage.tasks) {
      if (task.taskType === 'auto' && task.checkKey) {
        const isCompleted = await checkTask(session.userId, task.checkKey)
        autoCheckResults.set(task.id, isCompleted)

        // اگه انجام شده ولی توی DB نیست، ثبت کن
        if (isCompleted && !completedTaskIds.has(task.id)) {
          await db.userTask.upsert({
            where: {
              userId_taskId: {
                userId: session.userId,
                taskId: task.id,
              },
            },
            update: { completed: true, completedAt: new Date() },
            create: {
              userId: session.userId,
              taskId: task.id,
              completed: true,
              completedAt: new Date(),
            },
          })
          completedTaskIds.add(task.id)
        }

        // اگه انجام نشده ولی توی DB هست، پاک کن
        if (!isCompleted && completedTaskIds.has(task.id)) {
          await db.userTask.deleteMany({
            where: {
              userId: session.userId,
              taskId: task.id,
            },
          })
          completedTaskIds.delete(task.id)
        }
      }
    }
  }

  const stageXp = stages
    .filter((s) => completedStageIds.has(s.id))
    .reduce((sum, s) => sum + s.xpReward, 0)

  const taskXp = stages.reduce((sum, stage) => {
    return (
      sum +
      stage.tasks
        .filter((t) => completedTaskIds.has(t.id))
        .reduce((s, t) => s + t.xpReward, 0)
    )
  }, 0)

  const totalXp = stageXp + taskXp
  const level = Math.floor(totalXp / 500) + 1

  return NextResponse.json({
    stages: stages.map((s) => ({
      id: s.id,
      order: s.order,
      title: s.title,
      description: s.description,
      icon: s.icon,
      badgeName: s.badgeName,
      medalIcon: s.medalIcon,
      x: s.x,
      y: s.y,
      xpReward: s.xpReward,
      completed: completedStageIds.has(s.id),
      tasks: s.tasks.map((t) => ({
        id: t.id,
        order: t.order,
        title: t.title,
        description: t.description,
        xpReward: t.xpReward,
        taskType: t.taskType,
        checkKey: t.checkKey,
        actionUrl: t.actionUrl,
        actionLabel: t.actionLabel,
        completed: completedTaskIds.has(t.id),
      })),
      completedTasks: s.tasks.filter((t) => completedTaskIds.has(t.id)).length,
      totalTasks: s.tasks.length,
    })),
    medals,
    totalXp,
    level,
    completedCount: completedStageIds.size,
    totalStages: stages.length,
  })
}