'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'

interface Job {
  id: string
  title: string
  description: string
  location: string
  type: string
  level: string
  salary: string | null
  skills: string | null
  active: boolean
  createdAt: string
}

interface JobsData {
  jobs: Job[]
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<JobsData>

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'تمام‌وقت',
  'part-time': 'پاره‌وقت',
  remote: 'دورکاری',
  contract: 'پیمانی',
}

const LEVEL_LABELS: Record<string, string> = {
  junior: 'جونیور',
  mid: 'مید',
  senior: 'سنیور',
}

export default function JobsListClient() {
  const { data, mutate, isLoading } = useSWR('/api/company/jobs', fetcher)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')

  const jobs = data?.jobs ?? []

  async function toggleActive(job: Job) {
    try {
      const res = await fetch(`/api/company/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !job.active }),
      })
      if (!res.ok) throw new Error()
      await mutate()
    } catch {
      setError('خطا در بروزرسانی')
    }
  }

  async function handleDelete(jobId: string) {
    if (!confirm('مطمئنی می‌خوای این شغل رو پاک کنی؟')) return

    setDeleting(jobId)
    try {
      const res = await fetch(`/api/company/jobs/${jobId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      await mutate()
    } catch {
      setError('خطا در حذف')
    } finally {
      setDeleting(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg pb-12">
      <header className="bg-paper border-b border-line sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/company" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-lg">
              🏢
            </div>
            <span className="font-bold text-ink">پنل شرکت</span>
          </Link>
          <Link href="/company" className="text-sm text-muted hover:text-ink">
            ← برگشت
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-1">
              شغل‌های من 💼
            </h1>
            <p className="text-sm text-muted">{jobs.length} شغل پست شده</p>
          </div>
          <Link
            href="/company/jobs/new"
            className="px-6 py-3 bg-violet text-white rounded-full font-bold text-sm hover:bg-violet-deep transition-all shadow-soft hover:shadow-lg"
          >
            ➕ پست شغل جدید
          </Link>
        </div>

        {error && (
          <div className="mb-4 bg-cherry/10 border border-cherry/30 rounded-xl2 p-3 text-sm text-cherry">
            {error}
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="bg-paper rounded-xl2 border border-line p-12 text-center shadow-soft">
            <div className="text-6xl mb-3">📭</div>
            <p className="text-lg font-bold text-ink mb-1">هنوز شغلی پست نکردی</p>
            <p className="text-sm text-muted mb-6">
              اولین موقعیت شغلی‌ت رو پست کن تا کارجوها ببینن.
            </p>
            <Link
              href="/company/jobs/new"
              className="inline-block px-6 py-3 bg-violet text-white rounded-full font-bold text-sm hover:bg-violet-deep"
            >
              ➕ پست اولین شغل
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {jobs.map((job, i) => {
                const skills = job.skills ? JSON.parse(job.skills) : []
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`bg-paper rounded-xl2 border p-5 shadow-soft ${
                      job.active ? 'border-line' : 'border-cherry/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-extrabold text-ink">{job.title}</h3>
                          {!job.active && (
                            <span className="text-[10px] px-2 py-0.5 bg-cherry/10 text-cherry border border-cherry/30 rounded-full font-bold">
                              غیرفعال
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 bg-violet/10 text-violet border border-violet/30 rounded-full font-bold">
                            {TYPE_LABELS[job.type] || job.type}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full font-bold text-muted">
                            📍 {job.location}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full font-bold text-muted">
                            {LEVEL_LABELS[job.level] || job.level}
                          </span>
                          {job.salary && (
                            <span className="text-[10px] px-2 py-0.5 bg-lime/10 text-lime-deep border border-lime/30 rounded-full font-bold">
                              💰 {job.salary}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleActive(job)}
                          className="px-3 py-2 bg-bg border border-line text-ink rounded-xl2 font-semibold text-xs hover:border-violet/30 transition-all"
                        >
                          {job.active ? '⏸ غیرفعال' : '▶️ فعال'}
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          disabled={deleting === job.id}
                          className="px-3 py-2 bg-cherry/10 border border-cherry/30 text-cherry rounded-xl2 font-semibold text-xs hover:bg-cherry/20 transition-all disabled:opacity-50"
                        >
                          {deleting === job.id ? '...' : '🗑'}
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
                      {job.description}
                    </p>

                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 5).map((skill: string) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full text-ink font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {skills.length > 5 && (
                          <span className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full text-muted font-medium">
                            +{skills.length - 5}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-[10px] text-muted mt-3">
                      📅{' '}
                      {new Date(job.createdAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
