'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import useSWR from 'swr'

interface Job {
  id: string
  title: string
  description: string
  location: string
  type: string
  level: string
  salary: string | null
  workMode: string
  createdAt: string
  company: {
    id: string
    name: string
    logo: string | null
    industry: string | null
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const WORK_MODE_LABELS: Record<string, string> = {
  onsite: 'حضوری',
  hybrid: 'ترکیبی',
  remote: 'دورکاری',
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'تمام‌وقت',
  'part-time': 'پاره‌وقت',
  remote: 'دورکاری',
  contract: 'پیمانی',
}

export function LatestJobs() {
  const { data, isLoading } = useSWR('/api/jobs?limit=6', fetcher)
  const jobs: Job[] = data?.jobs ?? []

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">فرصت‌های شغلی</p>
            <h2 className="text-4xl font-bold text-foreground">جدیدترین موقعیت‌ها</h2>
          </div>
          <Link
            href="/jobs"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            مشاهده همه ←
          </Link>
        </motion.div>

        {/* List */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">در حال بارگذاری...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-lg">
            <p className="text-lg text-foreground mb-2">هنوز موقعیتی ثبت نشده</p>
            <p className="text-sm text-muted-foreground">به زودی فرصت‌های جدید اضافه می‌شوند.</p>
          </div>
        ) : (
          <div className="border-t border-border">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/jobs/${job.id}`}
                  className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2 rounded"
                >
                  <div className="flex items-start gap-6">
                    {/* Company Logo */}
                    <div className="w-12 h-12 rounded-lg border border-border bg-background flex items-center justify-center text-2xl flex-shrink-0">
                      {job.company.logo || '🏢'}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                        <div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {job.company.name} • {job.location}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {job.salary || 'حقوق توافقی'}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <span>{TYPE_LABELS[job.type] || job.type}</span>
                        <span>•</span>
                        <span>{WORK_MODE_LABELS[job.workMode] || job.workMode}</span>
                        <span>•</span>
                        <span>{job.level === 'senior' ? 'ارشد' : job.level === 'mid' ? 'میانی' : 'جونیور'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}