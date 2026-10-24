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
  companySize: string | null
  createdAt: string
  company: {
    id: string
    name: string
    logo: string | null
    industry: string | null
    size: string | null
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const WORK_MODE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  onsite: { label: 'حضوری', icon: '🏢', color: 'bg-violet/10 text-violet border-violet/30' },
  hybrid: { label: 'ترکیبی', icon: '🔄', color: 'bg-amber/10 text-amber-deep border-amber/30' },
  remote: { label: 'دورکاری', icon: '🏠', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30' },
}

const LEVEL_LABELS: Record<string, string> = {
  junior: 'جونیور',
  mid: 'مید',
  senior: 'سنیور',
}

export function LatestJobs() {
  const [location, setLocation] = useState('')
  const [workMode, setWorkMode] = useState('')
  const [companySize, setCompanySize] = useState('')

  const queryString = new URLSearchParams({
    ...(location && { location }),
    ...(workMode && { workMode }),
    ...(companySize && { companySize }),
    limit: '6',
  }).toString()

  const { data, isLoading } = useSWR(`/api/jobs?${queryString}`, fetcher)
  const jobs = data?.jobs ?? []

  return (
    <section className="py-16 px-4 bg-paper border-y border-line">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-bg border border-line rounded-full text-xs font-semibold text-muted mb-4">
            مشاغل تازه
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            جدیدترین فرصت‌ها 🚀
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            موقعیت‌های شغلی که شرکت‌های خفن همین الان پست کردن
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-bg rounded-xl2 border border-line p-4 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">📍 شهر</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="مثلاً: تهران"
                className="w-full px-3 py-2 rounded-xl2 border border-line bg-paper text-ink text-sm outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">🏢 حالت کاری</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl2 border border-line bg-paper text-ink text-sm outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              >
                <option value="">همه</option>
                <option value="onsite">حضوری</option>
                <option value="hybrid">ترکیبی</option>
                <option value="remote">دورکاری</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">🏭 اندازه شرکت</label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full px-3 py-2 rounded-xl2 border border-line bg-paper text-ink text-sm outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              >
                <option value="">همه</option>
                <option value="small">کوچک (≤ ۲۵۰)</option>
                <option value="medium">متوسط (۲۵۱-۵۰۰۰)</option>
                <option value="large">بزرگ (۵۰۰۰+)</option>
              </select>
            </div>
          </div>

          {(location || workMode || companySize) && (
            <button
              onClick={() => {
                setLocation('')
                setWorkMode('')
                setCompanySize('')
              }}
              className="mt-3 text-xs text-cherry font-bold hover:underline"
            >
              ✕ پاک کردن فیلترها
            </button>
          )}
        </motion.div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">در حال بارگذاری...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-paper rounded-xl2 border border-line">
            <div className="text-6xl mb-3">🔍</div>
            <p className="text-lg font-bold text-ink mb-1">شغلی پیدا نشد</p>
            <p className="text-sm text-muted">فیلترها رو تغییر بده</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job, i) => {
              const skills = job.skills ? JSON.parse(job.skills) : []
              const workModeInfo = WORK_MODE_LABELS[job.workMode] || WORK_MODE_LABELS.onsite

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-bg rounded-xl2 border border-line p-5 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl2 bg-gradient-to-br from-violet/20 to-lilac/20 flex items-center justify-center text-2xl border border-line flex-shrink-0">
                      {job.company.logo || '🏢'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted truncate">{job.company.name}</p>
                      <h3 className="font-extrabold text-ink truncate">{job.title}</h3>
                    </div>
                    {job.isStable && (
                      <span className="text-[10px] px-2 py-0.5 bg-lime/10 text-lime-deep border border-lime/30 rounded-full font-bold">
                        🛡 پایدار
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${workModeInfo.color}`}>
                      {workModeInfo.icon} {workModeInfo.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-bg border border-line text-muted">
                      📍 {job.location}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-bg border border-line text-muted">
                      {LEVEL_LABELS[job.level] || job.level}
                    </span>
                  </div>

                  <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">
                    {job.description}
                  </p>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {skills.slice(0, 3).map((skill: string) => (
                        <span
                          key={skill}
                          className="text-[10px] px-2 py-0.5 bg-paper border border-line rounded-full text-ink font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 bg-paper border border-line rounded-full text-muted font-medium">
                          +{skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {job.salary && (
                    <p className="text-xs font-bold text-lime-deep mb-3">
                      💰 {job.salary}
                    </p>
                  )}

                  <div className="flex-1" />

                  <Link
                    href={`/jobs/${job.id}`}
                    className="block w-full py-2 bg-violet text-white rounded-xl2 font-semibold text-xs hover:bg-violet-deep transition-all text-center"
                  >
                    مشاهده و درخواست
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/jobs"
            className="inline-block px-8 py-3 bg-violet text-white rounded-full font-bold hover:bg-violet-deep transition-all shadow-soft hover:shadow-lg"
          >
            🎯 دیدن همه مشاغل
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
