import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import JobsListClient from './JobsListClient'

export default async function CompanyJobsPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.role !== 'COMPANY') redirect('/dashboard')

  return <JobsListClient />
}
