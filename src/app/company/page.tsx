import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CompanyClient from './CompanyClient'

export default async function CompanyPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  if (session.role !== 'COMPANY' && session.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return <CompanyClient />
}
