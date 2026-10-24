'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import useSWR from 'swr'

interface Company {
  id: string
  name: string
  logo: string | null
  industry: string | null
  description: string | null
  featured: boolean
  foundedYear: number | null
  flexibleHours: boolean
  remoteWork: boolean
  learningBudget: boolean
  transparentSalary: boolean
  jobSecurity: boolean
  goodManager: boolean
  realValues: boolean
  meaningfulWork: boolean
  clearCareerPath: boolean
  _count: { jobs: number }
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<{ companies: Company[] }>

const PERKS = [
  { key: 'flexibleHours', icon: '⏰', label: 'ساعت آزاد', desc: 'هر وقت خواستی کار کن' },
  { key: 'remoteWork', icon: '🏠', label: 'وایب خونگی', desc: 'از خونه کار کن' },
  { key: 'learningBudget', icon: '🎓', label: 'یادگیری خفن', desc: 'همیشه در حال رشد' },
  { key: 'transparentSalary', icon: '💰', label: 'حقوق رو', desc: 'بدون بازی، شفاف' },
  { key: 'jobSecurity', icon: '🛡', label: 'خیالت راحت', desc: 'شغلت امنه' },
  { key: 'goodManager', icon: '🧠', label: 'مدیر خفن', desc: 'حالت رو می‌فهمه' },
  { key: 'realValues', icon: '💚', label: 'ارزشای واقعی', desc: 'نه شعار الکی' },
  { key: 'meaningfulWork', icon: '🎯', label: 'کار با معنی', desc: 'فقط تیک‌زدن نیست' },
  { key: 'clearCareerPath', icon: '🚀', label: 'لِوِل‌آپ', desc: 'همیشه یه پله بالاتر' },
] as const

const RANK_STYLES = [
  {
    badge: '🥇',
    badgeBg: 'bg-amber-400',
    border: 'border-amber-400',
    glow: 'shadow-amber-400/30',
    label: 'نفر اول',
    labelColor: 'bg-amber-400 text-amber-950',
    gradient: 'from-amber-50 to-yellow-50',
  },
  {
    badge: '🥈',
    badgeBg: 'bg-zinc-400',
    border: 'border-zinc-400',
    glow: 'shadow-zinc-400/30',
    label: 'نفر دوم',
    labelColor: 'bg-zinc-400 text-zinc-900',
    gradient: 'from-zinc-50 to-gray-50',
  },
  {
    badge: '🥉',
    badgeBg: 'bg-amber-600',
    border: 'border-amber-600',
    glow: 'shadow-amber-600/30',
    label: 'نفر سوم',
    labelColor: 'bg-amber-600 text-amber-50',
    gradient: 'from-orange-50 to-amber-50',
  },
]

export function VerifiedCompanies() {
  const { data, isLoading } = useSWR('/api/verified-companies', fetcher)

  const companies = (data?.companies ?? []).slice(0, 3)

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری...</p>
        </div>
      </section>
    )
  }

  if (companies.length === 0) return null

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* عنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-paper border border-line rounded-full text-xs font-semibold text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            سه شرکت برتر این ماه
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            شرکت‌های <span className="text-amber-deep">تأییدشده</span> 🏆
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
            بهترین شرکت‌ها با بالاترین رتبه — کلیک کن و ببین چه خبره
          </p>
        </motion.div>

        {/* ۳ کارت کنار هم */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {companies.map((company, i) => {
            const rank = RANK_STYLES[i]
            const activePerks = PERKS.filter((p) => company[p.key])

            return (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div
                  className={`
                    relative bg-paper rounded-3xl border-2 ${rank.border} p-5 sm:p-6
                    shadow-lg hover:shadow-2xl ${rank.glow} transition-all overflow-hidden
                    h-full flex flex-col
                  `}
                >
                  {/* تزئینات پس‌زمینه */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${rank.gradient} opacity-50`}
                  />

                  {/* رنک badge بالا-چپ */}
                  <div
                    className={`absolute top-3 left-3 w-10 h-10 rounded-full ${rank.badgeBg} flex items-center justify-center text-xl shadow-lg border-2 border-white z-10`}
                  >
                    {rank.badge}
                  </div>

                  {/* تیک تأییدشده بالا-راست */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-lime-deep flex items-center justify-center shadow-md z-10">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* محتوا */}
                  <div className="relative z-10 flex flex-col flex-1">
                    {/* لوگو */}
                    <div className="flex justify-center mb-3 mt-2">
                      <motion.div
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white flex items-center justify-center text-5xl sm:text-6xl border-2 border-line shadow-inner"
                      >
                        {company.logo || '🏢'}
                      </motion.div>
                    </div>

                    {/* برچسب رنک */}
                    <div className="flex justify-center mb-2">
                      <span
                        className={`inline-block px-3 py-1 ${rank.labelColor} rounded-full text-[10px] font-extrabold shadow-md`}
                      >
                        {rank.label}
                      </span>
                    </div>

                    {/* اسم */}
                    <h3 className="text-center text-xl sm:text-2xl font-extrabold text-ink mb-1">
                      {company.name}
                    </h3>

                    {/* صنعت */}
                    {company.industry && (
                      <p className="text-center text-xs text-muted mb-2">
                        🏭 {company.industry}
                      </p>
                    )}

                    {/* تعداد شغل */}
                    <div className="flex justify-center mb-3">
                      {company._count.jobs > 0 ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet/10 text-violet border border-violet/30 rounded-full text-[11px] font-bold">
                          💼 {company._count.jobs} شغل فعال
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-bg text-muted border border-line rounded-full text-[11px] font-bold">
                          ⏳ به زودی
                        </span>
                      )}
                    </div>

                    {/* پرک‌های فعال — ۳ تا نشون بده */}
                    {activePerks.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {activePerks.slice(0, 3).map((perk) => (
                          <span
                            key={perk.key}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-lime/10 text-lime-deep border border-lime/30 rounded-full text-[9px] font-bold"
                          >
                            <span>{perk.icon}</span>
                            <span>{perk.label}</span>
                          </span>
                        ))}
                        {activePerks.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-bg border border-line rounded-full text-[9px] font-bold text-muted">
                            +{activePerks.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* اسپیس‌ر */}
                    <div className="flex-1" />

                    {/* دکمه */}
                    <Link
                      href={`/companies/${company.id}`}
                      className="block text-center"
                    >
                      <span className="inline-flex items-center gap-1 px-5 py-2.5 bg-violet text-white rounded-full text-sm font-bold group-hover:bg-violet-deep group-hover:gap-2 transition-all shadow-soft group-hover:shadow-lg w-full justify-center">
                        مشاهده شرکت
                        <span className="group-hover:translate-x-1 transition-transform">
                          ←
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-paper border-2 border-line text-ink rounded-full font-bold text-sm hover:border-violet/30 hover:bg-bg transition-all"
          >
            🏢 شرکتت اینجا باشه
            <span>←</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
