'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

interface Jobseeker {
  id: string
  name: string
  email: string
  bio: string | null
  level: number
  totalXp: number
  medalsCount: number
  verifiedSkills: { skillName: string; level: number }[]
}

interface JobseekersData {
  jobseekers: Jobseeker[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<JobseekersData>

export default function CompanyClient() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useSWR(`/api/company/jobseekers?search=${search}`, fetcher)
  const jobseekers = data?.jobseekers ?? []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
            <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded">شرکت</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">داشبورد</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">پنل شرکت</p>
            <h1 className="text-4xl font-bold text-foreground mb-2">کارجویان</h1>
            <p className="text-muted-foreground">{jobseekers.length} کارجوی فعال</p>
          </div>
          <div className="flex gap-2">
            <Link href="/company/jobs" className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors">
              شغل‌های من
            </Link>
            <Link href="/company/jobs/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
              پست شغل جدید
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی نام یا ایمیل..."
            className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* List */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">در حال بارگذاری...</p>
          </div>
        ) : jobseekers.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-md">
            <p className="text-foreground mb-1">کارجویی پیدا نشد</p>
            <p className="text-sm text-muted-foreground">فیلترها را تغییر دهید.</p>
          </div>
        ) : (
          <div className="border-t border-border">
            {jobseekers.map((j) => (
              <div key={j.id} className="py-6 border-b border-border flex items-start gap-6">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{j.name}</h3>
                      <p className="text-sm text-muted-foreground" dir="ltr">{j.email}</p>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground flex-shrink-0">
                      <span>XP: <span className="font-semibold text-foreground">{j.totalXp}</span></span>
                      <span>لِوِل: <span className="font-semibold text-foreground">{j.level}</span></span>
                      <span>مدال: <span className="font-semibold text-foreground">{j.medalsCount}</span></span>
                    </div>
                  </div>

                  {j.bio && <p className="text-sm text-muted-foreground mb-3">{j.bio}</p>}

                  {j.verifiedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {j.verifiedSkills.map((s) => (
                        <span key={s.skillName} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                          {s.skillName} (L{s.level})
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                    ارسال پیشنهاد ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}