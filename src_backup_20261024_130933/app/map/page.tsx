import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import MapClient from './MapClient'

export default async function MapPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { name: true, role: true },
  })

  if (!user) redirect('/login')

  return (
    <MapClient
      userName={user.name}
      userRole={user.role}
    />
  )
}
