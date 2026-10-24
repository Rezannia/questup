'use client'

import Link from 'next/link'
import useSWR from 'swr'

interface Job {
  id: string
  title: string
  location: string
  type: string
  active: boolean
}

interface JobsData {
  jobs: Job[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<JobsData>

export default function JobsListClient() {
  const { data, isLoading } = useSWR('/api/company/jobs', fetcher)
  const jobs = data?.jobs ?? []

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <Link href="/company" className="text-sm text-muted-foreground hover:text-foreground transition-colors">پنل شرکت</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">موقعیت‌ها</p>
            <h1 className="text-4xl font-bold text-foreground mb-2">شغل‌های من</h1>
            <p className="text-muted-foreground">{jobs.length} موقعیت پست شده</p>
          </div>
          <Link href="/company/jobs/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
            پست شغل جدید
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-16"><p className="text-muted-foreground">در حال بارگذاری...</p></div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-md">
            <p className="text-foreground mb-1">هنوز شغلی پست نکرده‌اید</p>
            <p className="text-sm text-muted-foreground">اولین موقعیت شغلی خود را پست کنید.</p>
          </div>
        ) : (
          <div className="border-t border-border">
            {jobs.map((job) => (
              <div key={job.id} className="py-6 border-b border-border flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{job.location} • {job.active ? 'فعال' : 'غیرفعال'}</p>
                </div>
                <button className="text-sm text-muted-foreground hover:text-destructive transition-colors">حذف</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}