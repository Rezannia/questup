import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { LatestJobs } from '@/components/landing/LatestJobs'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LatestJobs />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}