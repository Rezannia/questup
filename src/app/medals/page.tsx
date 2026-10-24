import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import MedalsClient from './MedalsClient'

export default async function MedalsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { name: true, role: true },
  })

  if (!user) redirect('/login')

  return (
    <MedalsClient
      userName={user.name}
      userRole={user.role}
    />
  )
}
