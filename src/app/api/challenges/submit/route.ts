import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { challengeId, score, answers } = body

    if (!challengeId || typeof score !== 'number') {
      return NextResponse.json({ error: 'داده نامعتبر' }, { status: 400 })
    }

    const challenge = await db.skillChallenge.findUnique({
      where: { id: challengeId },
    })

    if (!challenge) {
      return NextResponse.json({ error: 'چالش پیدا نشد' }, { status: 404 })
    }

    const passed = score >= 70

    // ثبت تلاش
    await db.userChallengeAttempt.upsert({
      where: {
        userId_challengeId: {
          userId: session.userId,
          challengeId,
        },
      },
      update: {
        score,
        passed,
        answers: JSON.stringify(answers),
        completedAt: new Date(),
      },
      create: {
        userId: session.userId,
        challengeId,
        score,
        passed,
        answers: JSON.stringify(answers),
      },
    })

    // اگه پاس شد، مهارت رو تأیید کن
    if (passed) {
      const level = score >= 90 ? 3 : score >= 80 ? 2 : 1

      await db.userSkill.upsert({
        where: {
          userId_skillName: {
            userId: session.userId,
            skillName: challenge.skillName,
          },
        },
        update: {
          verified: true,
          score,
          level,
          updatedAt: new Date(),
        },
        create: {
          userId: session.userId,
          skillName: challenge.skillName,
          level,
          score,
          verified: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      passed,
      score,
    })
  } catch (error) {
    console.error('Challenge submit error:', error)
    return NextResponse.json(
      { error: 'خطا در ثبت نتیجه' },
      { status: 500 }
    )
  }
}