import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const topUsers = await db.user.findMany({
      where: {
        role: 'JOBSEEKER',
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        skills: true,
        medals: {
          select: { id: true },
        },
        userSkills: {
          where: { verified: true },
          select: { skillName: true, level: true },
        },
        progress: {
          where: { completed: true },
          select: { stage: { select: { xpReward: true } } },
        },
      },
      take: 100,
    })

    // محاسبه آمار و مرتب‌سازی
    const enriched = topUsers
      .map((u) => {
        const medalsCount = u.medals.length
        const verifiedSkillsCount = u.userSkills.length
        const totalXp = u.progress.reduce(
          (sum, p) => sum + (p.stage?.xpReward ?? 0),
          0
        )
        const level = Math.floor(totalXp / 500) + 1
        const skills = u.skills ? JSON.parse(u.skills) : []

        return {
          id: u.id,
          name: u.name,
          avatar: u.avatar,
          bio: u.bio,
          skills,
          medalsCount,
          verifiedSkillsCount,
          verifiedSkills: u.userSkills,
          totalXp,
          level,
        }
      })
      .filter((u) => u.medalsCount > 0) // فقط کسایی که مدال دارن
      .sort((a, b) => {
        // ۱. اول بر اساس مدال
        if (b.medalsCount !== a.medalsCount) {
          return b.medalsCount - a.medalsCount
        }
        // ۲. بعد بر اساس XP
        return b.totalXp - a.totalXp
      })
      .slice(0, 5) // فقط ۵ نفر برتر

    return NextResponse.json({ topUsers: enriched })
  } catch (error) {
    console.error('Top users error:', error)
    return NextResponse.json({ topUsers: [] }, { status: 500 })
  }
}