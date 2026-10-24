import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ApplicationsClient from './ApplicationsClient'

export default async function ApplicationsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  if (session.role === 'COMPANY') {
    redirect('/company')
  }

  return <ApplicationsClient />
}
