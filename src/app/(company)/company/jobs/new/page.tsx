import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import NewJobClient from './NewJobClient'

export default async function NewJobPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.role !== 'COMPANY') redirect('/dashboard')

  return <NewJobClient />
}
