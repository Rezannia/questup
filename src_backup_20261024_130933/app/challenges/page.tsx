import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ChallengesClient from './ChallengesClient'

export default async function ChallengesPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const [challenges, attempts, userSkills] = await Promise.all([
    db.skillChallenge.findMany({
      orderBy: { createdAt: 'asc' },
    }),
    db.userChallengeAttempt.findMany({
      where: { userId: session.userId },
    }),
    db.userSkill.findMany({
      where: { userId: session.userId },
    }),
  ])

  return (
    <ChallengesClient
      challenges={JSON.parse(JSON.stringify(challenges))}
      attempts={JSON.parse(JSON.stringify(attempts))}
      userSkills={JSON.parse(JSON.stringify(userSkills))}
    />
  )
}
