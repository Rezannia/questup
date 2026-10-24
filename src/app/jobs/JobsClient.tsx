'use client'

import Link from 'next/link'
import useSWR from 'swr'

interface Job {
  id: string
  title: string
  description: string
  location: string
  type: string
  workMode: string
  salary: string | null
  company: { name: string; logo: string | null }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const WORK_MODE: Record<string, string> = { onsite: 'حضوری', hybrid: 'ترکیبی', remote: 'دورکاری' }
const TYPE: Record<string, string> = { 'full-time': 'تمام‌وقت', 'part-time': 'پاره‌وقت', remote: 'دورکاری', contract: 'پیمانی' }

export default function JobsClient() {
  const { data, isLoading } = useSWR('/api/jobs?limit=50', fetcher)
  const jobs: Job[] = data?.jobs ?? []

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">ورود</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">فرصت‌ها</p>
          <h1 className="text-4xl font-bold text-foreground mb-2">همه مشاغل</h1>
          <p className="text-muted-foreground">{jobs.length} موقعیت شغلی</p>
        </div>

        {isLoading ? (
          <div className="text-center py-16"><p className="text-muted-foreground">در حال بارگذاری...</p></div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-md">
            <p className="text-foreground">هنوز شغلی ثبت نشده است.</p>
          </div>
        ) : (
          <div className="border-t border-border">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2 rounded">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg border border-border bg-background flex items-center justify-center text-2xl flex-shrink-0">
                    {job.company.logo || '🏢'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{job.company.name} • {job.location}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{job.salary || 'توافقی'}</span>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{TYPE[job.type] || job.type}</span><span>•</span><span>{WORK_MODE[job.workMode] || job.workMode}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}