import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { name: true, role: true },
  })

  if (!user) redirect('/login')

  return <ProfileClient />
}
