import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const [stages, medals, progress] = await Promise.all([
    db.stage.findMany({ orderBy: { order: 'asc' } }),
    db.userMedal.findMany({
      where: { userId: session.userId },
      select: { stageId: true, earnedAt: true },
    }),
    db.userProgress.findMany({
      where: { userId: session.userId, completed: true },
      select: { stageId: true },
    }),
  ])

  const earnedStageIds = new Set(medals.map((m) => m.stageId))
  const completedStageIds = new Set(progress.map((p) => p.stageId))

  const totalXp = stages
    .filter((s) => completedStageIds.has(s.id))
    .reduce((sum, s) => sum + s.xpReward, 0)

  const level = Math.floor(totalXp / 500) + 1
  const xpToNextLevel = 500 - (totalXp % 500)
  const xpInCurrentLevel = totalXp % 500

  return NextResponse.json({
    stages: stages.map((s) => ({
      id: s.id,
      order: s.order,
      title: s.title,
      description: s.description,
      icon: s.icon,
      badgeName: s.badgeName,
      medalIcon: s.medalIcon,
      xpReward: s.xpReward,
      earned: earnedStageIds.has(s.id),
      completed: completedStageIds.has(s.id),
      earnedAt: medals.find((m) => m.stageId === s.id)?.earnedAt ?? null,
    })),
    totalXp,
    level,
    xpToNextLevel,
    xpInCurrentLevel,
    earnedCount: earnedStageIds.size,
    totalStages: stages.length,
  })
}