'use client'

import { useState } from 'react'
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
  skills: string | null
  workMode: string
  isStable: boolean
  createdAt: string
  company: {
    id: string
    name: string
    logo: string | null
    industry: string | null
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const WORK_MODE_LABELS: Record<string, { label: string; icon: string }> = {
  onsite: { label: 'حضوری', icon: '🏢' },
  hybrid: { label: 'ترکیبی', icon: '🔄' },
  remote: { label: 'دورکاری', icon: '🏠' },
}

export default function JobsClient() {
  const [location, setLocation] = useState('')
  const [workMode, setWorkMode] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [level, setLevel] = useState('')

  const queryString = new URLSearchParams({
    ...(location && { location }),
    ...(workMode && { workMode }),
    ...(companySize && { companySize }),
    ...(level && { level }),
    limit: '50',
  }).toString()

  const { data, isLoading } = useSWR(`/api/jobs?${queryString}`, fetcher)
  const jobs: Job[] = data?.jobs ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mb-2">
          همه مشاغل 💼
        </h1>
        <p className="text-muted">موقعیت‌های شغلی از شرکت‌های تأییدشده</p>
      </div>

      <div className="bg-paper rounded-xl2 border border-line p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="📍 شهر..."
            className="w-full px-3 py-2 rounded-xl2 border border-line bg-bg text-ink text-sm outline-none focus:border-violet"
          />
          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            className="w-full px-3 py-2 rounded-xl2 border border-line bg-bg text-ink text-sm"
          >
            <option value="">🏢 همه حالت‌ها</option>
            <option value="onsite">حضوری</option>
            <option value="hybrid">ترکیبی</option>
            <option value="remote">دورکاری</option>
          </select>
          <select
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className="w-full px-3 py-2 rounded-xl2 border border-line bg-bg text-ink text-sm"
          >
            <option value="">🏭 همه اندازه‌ها</option>
            <option value="small">کوچک</option>
            <option value="medium">متوسط</option>
            <option value="large">بزرگ</option>
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 rounded-xl2 border border-line bg-bg text-ink text-sm"
          >
            <option value="">📊 همه سطوح</option>
            <option value="junior">جونیور</option>
            <option value="mid">مید</option>
            <option value="senior">سنیور</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-paper rounded-xl2 border border-line">
          <div className="text-6xl mb-3">🔍</div>
          <p className="text-lg font-bold text-ink">شغلی پیدا نشد</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job, i) => {
            const workModeInfo = WORK_MODE_LABELS[job.workMode] || WORK_MODE_LABELS.onsite
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="bg-paper rounded-xl2 border border-line p-5 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl2 bg-gradient-to-br from-violet/20 to-lilac/20 flex items-center justify-center text-2xl">
                    {job.company.logo || '🏢'}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted">{job.company.name}</p>
                    <h3 className="font-extrabold text-ink">{job.title}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] px-2 py-0.5 bg-violet/10 text-violet border border-violet/30 rounded-full font-bold">
                    {workModeInfo.icon} {workModeInfo.label}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full text-muted">
                    📍 {job.location}
                  </span>
                </div>
                {job.salary && (
                  <p className="text-xs font-bold text-lime-deep mb-3">💰 {job.salary}</p>
                )}
                <Link
                  href={`/jobs/${job.id}`}
                  className="block w-full py-2 bg-violet text-white rounded-xl2 font-semibold text-xs hover:bg-violet-deep text-center"
                >
                  مشاهده
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
