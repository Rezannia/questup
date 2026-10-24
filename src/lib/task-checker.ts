import { db } from './db'

export async function checkTask(
  userId: string,
  checkKey: string
): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      applications: true,
      company: true,
    },
  })

  if (!user) return false

  const skills = user.skills ? JSON.parse(user.skills) : []

  switch (checkKey) {
    case 'has_name':
      return user.name.trim().length >= 2

    case 'has_avatar':
      return !!user.avatar && user.avatar.length > 0

    case 'has_bio':
      return !!user.bio && user.bio.trim().length >= 50

    case 'has_skills_3':
      return skills.length >= 3

    case 'has_website':
      return !!user.website && user.website.length > 0

    case 'has_application':
      return user.applications.length >= 1

    case 'has_company_profile':
      return !!user.company

    case 'has_challenge_attempt':
      return (
        (await db.userChallengeAttempt.count({
          where: { userId },
        })) >= 1
      )

    case 'has_verified_skills_3':
      return (
        (await db.userSkill.count({
          where: { userId, verified: true },
        })) >= 3
      )

    case 'has_passed_challenge':
      return (
        (await db.userChallengeAttempt.count({
          where: { userId, passed: true },
        })) >= 1
      )

    default:
      return false
  }
}