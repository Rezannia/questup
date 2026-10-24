import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { SpotifyPlayer } from '@/components/landing/SpotifyPlayer'
import { Stats } from '@/components/landing/Stats'
import { TopJobseekers } from '@/components/landing/TopJobseekers'
import { VerifiedCompanies } from '@/components/landing/VerifiedCompanies'
import { LatestJobs } from '@/components/landing/LatestJobs'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { JobCategories } from '@/components/landing/JobCategories'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

export default async function HomePage() {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <Hero />
        <SpotifyPlayer />
        <Stats />
        <TopJobseekers />
        <VerifiedCompanies />
        <LatestJobs />
        <Features />
        <HowItWorks />
        <JobCategories />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
