import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import JobsClient from './JobsClient'

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JobsClient />
      <Footer />
    </div>
  )
}
