import { getSession } from '@/lib/auth'
import AboutClient from './AboutClient'

export default async function AboutPage() {
  const session = await getSession()

  return <AboutClient isLoggedIn={!!session} />
}
