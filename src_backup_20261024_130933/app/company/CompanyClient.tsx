'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { HeroLandscape } from '@/components/HeroLandscape'
import { OfferTemplates } from '@/components/ui/OfferTemplates'

interface VerifiedSkill {
  skillName: string
  level: number
  score: number
}

interface Jobseeker {
  id: string
  name: string
  email: string
  avatar: string | null
  bio: string | null
  skills: string[]
  createdAt: string
  totalXp: number
  level: number
  completedCount: number
  medalsCount: number
  verifiedSkills: VerifiedSkill[]
  challengesPassed: number
}

interface JobseekersData {
  jobseekers: Jobseeker[]
}

interface StatsData {
  hasProfile: boolean
  company?: { name: string; industry: string | null }
  stats: {
    totalApplications: number
    pending: number
    accepted: number
    rejected: number
    totalJobseekers: number
  }
}

const jobseekersFetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<JobseekersData>
const statsFetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<StatsData>

type SortOption = 'recent' | 'xp' | 'medals' | 'verified-skills'

export default function CompanyClient() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('xp')
  const [selectedJobseeker, setSelectedJobseeker] = useState<Jobseeker | null>(
    null
  )
  const [offerMessage, setOfferMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [offerStatus, setOfferStatus] = useState<{
    type: 'success' | 'error'
    msg: string
  } | null>(null)

  const queryString = new URLSearchParams({ search, sort }).toString()
  const { data: jobseekersData, isLoading } = useSWR(
    `/api/company/jobseekers?${queryString}`,
    jobseekersFetcher
  )
  const { data: statsData } = useSWR('/api/company/stats', statsFetcher)

  const jobseekers = jobseekersData?.jobseekers ?? []
  const stats = statsData?.stats

  function openOffer(jobseeker: Jobseeker) {
    setSelectedJobseeker(jobseeker)
    setOfferMessage('')
    setOfferStatus(null)
  }

  function closeOffer() {
    if (sending) return
    setSelectedJobseeker(null)
    setOfferMessage('')
    setOfferStatus(null)
  }

  async function handleSendOffer() {
    if (!selectedJobseeker) {
      setOfferStatus({ type: 'error', msg: 'کارجو انتخاب نشده' })
      return
    }

    if (offerMessage.trim().length < 10) {
      setOfferStatus({
        type: 'error',
        msg: 'پیام باید حداقل ۱۰ کاراکتر باشد',
      })
      return
    }

    setSending(true)
    setOfferStatus(null)

    try {
      const res = await fetch('/api/company/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobseekerId: selectedJobseeker.id,
          message: offerMessage,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setOfferStatus({
          type: 'error',
          msg: result.error || 'خطا در ارسال',
        })
        return
      }

      setOfferStatus({
        type: 'success',
        msg: `پیشنهاد به ${selectedJobseeker.name} ارسال شد! ✓`,
      })

      setTimeout(() => {
        setSelectedJobseeker(null)
        setOfferMessage('')
        setOfferStatus(null)
      }, 2000)
    } catch (err) {
      setOfferStatus({ type: 'error', msg: 'خطای شبکه. دوباره تلاش کنید.' })
    } finally {
      setSending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg pb-8">
      {/* Hero */}
      <HeroLandscape variant="cherry">
        <div className="px-4 pt-8">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl2 bg-white/20 backdrop-blur-md flex items-center justify-center text-xl border border-white/30">
                  🎮
                </div>
                <span className="font-extrabold text-lg text-white">
                  کوئست‌آپ
                </span>
                <span className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-md text-white rounded-full font-bold border border-white/20">
                  پنل شرکت
                </span>
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-white/80 hover:text-white"
              >
                داشبورد
              </Link>
            </div>
          </div>

          <div className="max-w-6xl mx-auto pb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white mb-4">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              پنل شرکت
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
              {statsData?.company?.name || 'پنل شرکت'} 🏢
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mb-6">
              استعدادهای گیم‌فای‌شده رو کشف کن — پیشرفت واقعی، نه فقط رزومه
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/company/jobs"
                className="px-6 py-3 bg-white/20 backdrop-blur-md text-white border-2 border-white/30 rounded-full font-bold text-sm hover:bg-white/30 transition-all"
              >
                💼 شغل‌های من
              </Link>
              <Link
                href="/company/jobs/new"
                className="px-6 py-3 bg-amber text-ink rounded-full font-bold text-sm hover:bg-white transition-all"
              >
                ➕ پست شغل جدید
              </Link>
            </div>
          </div>
        </div>
      </HeroLandscape>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        {/* پیام DNA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-amber/10 border border-amber/30 rounded-xl2 p-4 mb-6 backdrop-blur-md"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-bold text-ink text-sm mb-1">چرا کوئست‌آپ؟</p>
              <p className="text-sm text-muted">
                این کارجوها تعهد و پیشرفت واقعی نشون دادن. مهارت‌های اثبات‌شده‌شون
                معیار واقعی مهارته — نه فقط یه رزومه.
              </p>
            </div>
          </div>
        </motion.div>

        {/* آمار */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            <div className="bg-paper rounded-xl2 border border-line p-4 shadow-soft">
              <div className="text-2xl mb-1">👥</div>
              <div className="text-2xl font-extrabold text-violet">
                {stats.totalJobseekers}
              </div>
              <div className="text-xs text-muted">کارجوی فعال</div>
            </div>
            <div className="bg-paper rounded-xl2 border border-line p-4 shadow-soft">
              <div className="text-2xl mb-1">📨</div>
              <div className="text-2xl font-extrabold text-amber-deep">
                {stats.totalApplications}
              </div>
              <div className="text-xs text-muted">پیشنهاد ارسالی</div>
            </div>
            <div className="bg-paper rounded-xl2 border border-line p-4 shadow-soft">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-2xl font-extrabold text-amber">
                {stats.pending}
              </div>
              <div className="text-xs text-muted">در انتظار</div>
            </div>
            <div className="bg-paper rounded-xl2 border border-line p-4 shadow-soft">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-2xl font-extrabold text-lime-deep">
                {stats.accepted}
              </div>
              <div className="text-xs text-muted">پذیرفته‌شده</div>
            </div>
          </motion.div>
        )}

        {/* فیلتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-paper rounded-xl2 border border-line p-4 mb-6 shadow-soft"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 جستجوی نام یا ایمیل..."
                className="w-full px-4 py-2.5 rounded-xl2 border border-line bg-bg text-ink text-sm outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSort('xp')}
                className={`px-3 py-2.5 rounded-xl2 text-xs sm:text-sm font-semibold transition-all ${
                  sort === 'xp'
                    ? 'bg-violet text-white'
                    : 'bg-bg border border-line text-ink hover:border-violet/30'
                }`}
              >
                ⭐ XP
              </button>
              <button
                onClick={() => setSort('verified-skills')}
                className={`px-3 py-2.5 rounded-xl2 text-xs sm:text-sm font-semibold transition-all ${
                  sort === 'verified-skills'
                    ? 'bg-violet text-white'
                    : 'bg-bg border border-line text-ink hover:border-violet/30'
                }`}
              >
                ✅ مهارت اثبات‌شده
              </button>
              <button
                onClick={() => setSort('medals')}
                className={`px-3 py-2.5 rounded-xl2 text-xs sm:text-sm font-semibold transition-all ${
                  sort === 'medals'
                    ? 'bg-violet text-white'
                    : 'bg-bg border border-line text-ink hover:border-violet/30'
                }`}
              >
                🏅 مدال
              </button>
              <button
                onClick={() => setSort('recent')}
                className={`px-3 py-2.5 rounded-xl2 text-xs sm:text-sm font-semibold transition-all ${
                  sort === 'recent'
                    ? 'bg-violet text-white'
                    : 'bg-bg border border-line text-ink hover:border-violet/30'
                }`}
              >
                🆕 جدید
              </button>
            </div>
          </div>
        </motion.div>

        {/* لیست */}
        {jobseekers.length === 0 ? (
          <div className="bg-paper rounded-xl2 border border-line p-12 text-center shadow-soft">
            <div className="text-6xl mb-3">🔍</div>
            <p className="text-lg font-bold text-ink mb-1">
              کارجوی فعالی پیدا نشد
            </p>
            <p className="text-sm text-muted">
              {search
                ? 'جستجو رو تغییر بده یا فیلتر رو بردار.'
                : 'به زودی کارجوهای جدید اضافه می‌شن.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobseekers.map((j, idx) => (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-paper rounded-xl2 border border-line p-5 shadow-soft hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet/20 to-lilac/20 flex items-center justify-center text-3xl border border-line">
                    {j.avatar || '👧'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-ink truncate">
                      {j.name}
                    </h3>
                    <p className="text-xs text-muted truncate" dir="ltr">
                      {j.email}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber/10 border border-amber/30 rounded-full text-[10px] font-bold text-amber-deep">
                        لِوِل {j.level}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet/10 border border-violet/20 rounded-full text-[10px] font-bold text-violet">
                        {j.totalXp} XP
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-lime/10 border border-lime/30 rounded-full text-[10px] font-bold text-lime-deep">
                        {j.medalsCount} مدال
                      </span>
                    </div>
                  </div>
                </div>

                {j.bio && (
                  <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">
                    {j.bio}
                  </p>
                )}

                {j.verifiedSkills.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-1.5">
                      <span className="text-[10px] font-bold text-lime-deep">
                        ✅ مهارت‌های اثبات‌شده
                      </span>
                      <span className="text-[9px] text-muted">
                        ({j.verifiedSkills.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {j.verifiedSkills.slice(0, 5).map((skill) => (
                        <span
                          key={skill.skillName}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-lime/10 border border-lime/30 rounded-full text-lime-deep font-bold"
                        >
                          {skill.skillName}
                          <span className="opacity-60">L{skill.level}</span>
                        </span>
                      ))}
                      {j.verifiedSkills.length > 5 && (
                        <span className="text-[10px] px-2 py-0.5 bg-lime/10 border border-lime/30 rounded-full text-lime-deep font-bold">
                          +{j.verifiedSkills.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {j.verifiedSkills.length === 0 && j.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {j.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full text-ink font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {j.skills.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full text-muted font-medium">
                        +{j.skills.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] text-muted mb-1">
                    <span>پیشرفت مسیر</span>
                    <span className="font-bold text-ink">
                      {j.completedCount}/10
                    </span>
                  </div>
                  <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet to-lilac rounded-full"
                      style={{ width: `${(j.completedCount / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openOffer(j)}
                  className="w-full py-2.5 bg-violet text-white rounded-xl2 font-semibold text-sm hover:bg-violet-deep active:scale-[0.98] transition-all cursor-pointer"
                >
                  📨 ارسال پیشنهاد
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* مودال پیشنهاد */}
      {selectedJobseeker && (
        <div
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeOffer}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-paper rounded-2xl border border-line shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet/20 to-lilac/20 flex items-center justify-center text-3xl border border-line">
                {selectedJobseeker.avatar || '👧'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-ink">
                  پیشنهاد به {selectedJobseeker.name}
                </h3>
                <p className="text-xs text-muted">
                  لِوِل {selectedJobseeker.level} •{' '}
                  {selectedJobseeker.totalXp} XP •{' '}
                  {selectedJobseeker.medalsCount} مدال
                </p>
              </div>
              <button
                type="button"
                onClick={closeOffer}
                disabled={sending}
                className="w-8 h-8 rounded-full bg-bg border border-line flex items-center justify-center text-muted hover:bg-line transition-all disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {/* مهارت‌های اثبات‌شده */}
            {selectedJobseeker.verifiedSkills.length > 0 && (
              <div className="bg-lime/10 border border-lime/30 rounded-xl2 p-3 mb-4">
                <p className="text-xs font-bold text-lime-deep mb-2">
                  ✅ مهارت‌های اثبات‌شده (
                  {selectedJobseeker.verifiedSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobseeker.verifiedSkills.map((skill) => (
                    <span
                      key={skill.skillName}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white/60 border border-lime/30 rounded-full text-lime-deep font-bold"
                    >
                      {skill.skillName}
                      <span className="opacity-60 text-[10px]">
                        L{skill.level} • {skill.score}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* قالب‌های آماده */}
            <OfferTemplates onSelect={(msg) => setOfferMessage(msg)} />

            {/* پیام */}
            <label className="block text-sm font-semibold text-ink mb-2">
              پیام پیشنهاد
            </label>
            <textarea
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="یه متن انتخاب کن یا خودت بنویس..."
              className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink text-sm outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 resize-none mb-1"
            />
            <p className="text-xs text-muted mb-3 text-left" dir="ltr">
              {offerMessage.length} / 500
            </p>

            {offerStatus && (
              <div
                className={`mb-3 p-3 rounded-xl2 text-sm ${
                  offerStatus.type === 'success'
                    ? 'bg-lime/20 border border-lime/50 text-lime-deep'
                    : 'bg-cherry/10 border border-cherry/30 text-cherry'
                }`}
              >
                {offerStatus.msg}
              </div>
            )}

            {/* دکمه‌ها */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSendOffer}
                disabled={sending || offerMessage.trim().length < 10}
                className="flex-1 py-3 bg-violet text-white rounded-xl2 font-semibold hover:bg-violet-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  '📨 ارسال پیشنهاد'
                )}
              </button>
              <button
                type="button"
                onClick={closeOffer}
                disabled={sending}
                className="px-6 py-3 bg-bg border border-line text-ink rounded-xl2 font-semibold hover:bg-line transition-all disabled:opacity-50 cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
