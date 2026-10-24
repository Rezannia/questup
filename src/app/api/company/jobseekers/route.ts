import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (session.role !== 'COMPANY' && session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'xp'

  const jobseekers = await db.user.findMany({
    where: {
      role: 'JOBSEEKER',
      OR: search
        ? [{ name: { contains: search } }, { email: { contains: search } }]
        : undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      bio: true,
      skills: true,
      createdAt: true,
      progress: {
        where: { completed: true },
        include: { stage: true },
      },
      medals: true,
      userSkills: {
        where: { verified: true },
        orderBy: { score: 'desc' },
      },
      challengeAttempts: {
        where: { passed: true },
      },
    },
    take: 50,
  })

  const enriched = jobseekers.map((j) => {
    const totalXp = j.progress.reduce(
      (sum, p) => sum + (p.stage?.xpReward ?? 0),
      0
    )
    const level = Math.floor(totalXp / 500) + 1
    const skills = j.skills ? JSON.parse(j.skills) : []

    return {
      id: j.id,
      name: j.name,
      email: j.email,
      avatar: j.avatar,
      bio: j.bio,
      skills,
      createdAt: j.createdAt,
      totalXp,
      level,
      completedCount: j.progress.length,
      medalsCount: j.medals.length,
      verifiedSkills: j.userSkills.map((s) => ({
        skillName: s.skillName,
        level: s.level,
        score: s.score,
      })),
      challengesPassed: j.challengeAttempts.length,
    }
  })

  // مرتب‌سازی
  if (sort === 'xp') {
    enriched.sort((a, b) => b.totalXp - a.totalXp)
  } else if (sort === 'medals') {
    enriched.sort((a, b) => b.medalsCount - a.medalsCount)
  } else if (sort === 'verified-skills') {
    enriched.sort(
      (a, b) => b.verifiedSkills.length - a.verifiedSkills.length
    )
  } else {
    enriched.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  return NextResponse.json({ jobseekers: enriched })
}