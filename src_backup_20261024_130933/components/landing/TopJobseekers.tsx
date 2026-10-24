'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import useSWR from 'swr'

interface TopUser {
  id: string
  name: string
  avatar: string | null
  medalsCount: number
  totalXp: number
  level: number
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<{ topUsers: TopUser[] }>

const RANK_STYLES = [
  {
    bg: 'from-amber-400 to-yellow-600',
    border: 'border-amber-400',
    text: 'text-amber-950',
    badge: '🥇',
    badgeBg: 'bg-amber-400',
  },
  {
    bg: 'from-zinc-300 to-zinc-500',
    border: 'border-zinc-400',
    text: 'text-zinc-900',
    badge: '🥈',
    badgeBg: 'bg-zinc-400',
  },
  {
    bg: 'from-amber-600 to-amber-800',
    border: 'border-amber-600',
    text: 'text-amber-50',
    badge: '🥉',
    badgeBg: 'bg-amber-600',
  },
  {
    bg: 'from-violet to-lilac',
    border: 'border-violet',
    text: 'text-white',
    badge: '4',
    badgeBg: 'bg-violet',
  },
  {
    bg: 'from-violet to-lilac',
    border: 'border-violet',
    text: 'text-white',
    badge: '5',
    badgeBg: 'bg-violet',
  },
]

export function TopJobseekers() {
  const { data, isLoading } = useSWR('/api/top-jobseekers', fetcher)

  const topUsers = data?.topUsers ?? []

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری قهرمان‌ها...</p>
        </div>
      </section>
    )
  }

  // همیشه ۵ جایگاه نمایش بده
  const slots = Array.from({ length: 5 }, (_, i) => topUsers[i] || null)

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* عنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-paper border border-line rounded-full text-xs font-semibold text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            قهرمان‌های این ماه
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-2">
            پر مدال‌ترین کارجوها 🏆
          </h2>
          <p className="text-muted text-sm sm:text-base">
            اینا کسایی‌ان که بیشترین مدال رو گرفتن
          </p>
        </motion.div>

        {/* ۵ کارت کنار هم */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {slots.map((user, i) => {
            const style = RANK_STYLES[i]

            // Placeholder
            if (!user) {
              return (
                <motion.div
                  key={`empty-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative bg-bg rounded-2xl border-2 border-dashed border-line p-4 flex flex-col items-center justify-center min-h-[200px] opacity-60"
                >
                  {/* رتبه */}
                  <div
                    className={`absolute top-2 left-2 w-8 h-8 rounded-full ${style.badgeBg} flex items-center justify-center text-sm font-extrabold text-white shadow-md`}
                  >
                    {style.badge}
                  </div>

                  <div className="w-16 h-16 rounded-full bg-line flex items-center justify-center text-3xl mb-3">
                    ❓
                  </div>
                  <p className="text-xs font-bold text-muted text-center">
                    این جایگاه منتظر توئه!
                  </p>
                </motion.div>
              )
            }

            // کارت واقعی
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`relative bg-gradient-to-br ${style.bg} rounded-2xl border-2 ${style.border} p-4 shadow-lg overflow-hidden`}
              >
                {/* رتبه */}
                <div
                  className={`absolute top-2 left-2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-sm font-extrabold shadow-md ${style.text}`}
                >
                  {style.badge}
                </div>

                {/* آواتار */}
                <div className="flex justify-center mb-3 mt-2">
                  <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center text-4xl shadow-lg border-2 border-white">
                    {user.avatar || '👧'}
                  </div>
                </div>

                {/* نام */}
                <h3
                  className={`text-center font-extrabold text-sm mb-2 truncate px-1 ${style.text}`}
                >
                  {user.name}
                </h3>

                {/* مدال */}
                <div className="flex items-center justify-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full ${style.text}`}
                  >
                    🏅 {user.medalsCount}
                  </span>
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
          className="text-center mt-10"
        >
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber to-orange-500 text-ink rounded-full font-bold text-sm hover:from-orange-500 hover:to-amber transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            🏆 تو هم قهرمان شو
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
