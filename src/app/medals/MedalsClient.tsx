'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroLandscape } from '@/components/HeroLandscape'

interface Stage {
  id: number
  order: number
  title: string
  description: string
  icon: string
  badgeName: string
  medalIcon: string
  xpReward: number
  earned: boolean
  completed: boolean
  earnedAt: string | null
}

interface MedalsData {
  stages: Stage[]
  totalXp: number
  level: number
  xpToNextLevel: number
  xpInCurrentLevel: number
  earnedCount: number
  totalStages: number
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<MedalsData>

export default function MedalsClient({
  userName,
  userRole,
}: {
  userName: string
  userRole: string
}) {
  const { data, isLoading } = useSWR('/api/medals', fetcher)
  const [selectedMedal, setSelectedMedal] = useState<Stage | null>(null)

  const stages = data?.stages ?? []
  const totalXp = data?.totalXp ?? 0
  const level = data?.level ?? 1
  const xpToNextLevel = data?.xpToNextLevel ?? 500
  const xpInCurrentLevel = data?.xpInCurrentLevel ?? 0
  const earnedCount = data?.earnedCount ?? 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">در حال بارگذاری مدال‌ها...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background pb-8"
    >
      {/* Hero با لنداسکیپ */}
      <HeroLandscape variant="amber">
        <div className="px-4 pt-8">
          {/* نوار بالا */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white/20  flex items-center justify-center text-xl border border-white/30">
                  🎮
                </div>
                <span className="font-extrabold text-lg text-white">کوئست‌آپ</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-white/10  rounded-full px-3 py-1.5 border border-white/20">
                  <span className="text-xs text-white/70">XP</span>
                  <span className="font-bold text-white text-sm">{totalXp}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10  rounded-full px-3 py-1.5 border border-white/20">
                  <span className="text-xs text-white/70">لِوِل</span>
                  <span className="font-bold text-white text-sm">{level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* عنوان */}
          <div className="max-w-5xl mx-auto pb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10  border border-white/20 rounded-full text-xs font-semibold text-white mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 " />
              کلکسیون مدال‌ها
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
              مدال‌های {userName} 🏅
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              {earnedCount} از {stages.length} مدال کسب شده — هر مدال یه قدم واقعیه
            </p>
          </div>
        </div>
      </HeroLandscape>

      {/* محتوای اصلی */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        {/* آمار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          <div className="bg-card rounded-lg border border-border p-4 text-center shadow-sm">
            <div className="text-3xl mb-1">🏅</div>
            <div className="text-2xl font-extrabold text-foreground">{earnedCount}</div>
            <div className="text-xs text-muted-foreground">مدال</div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center shadow-sm">
            <div className="text-3xl mb-1">⭐</div>
            <div className="text-2xl font-extrabold text-primary">{totalXp}</div>
            <div className="text-xs text-muted-foreground">XP</div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center shadow-sm">
            <div className="text-3xl mb-1">📊</div>
            <div className="text-2xl font-extrabold text-primary-foreground0-600">{level}</div>
            <div className="text-xs text-muted-foreground">لِوِل</div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center shadow-sm">
            <div className="text-3xl mb-1">🎯</div>
            <div className="text-2xl font-extrabold text-green-600">
              {Math.round((earnedCount / stages.length) * 100)}٪
            </div>
            <div className="text-xs text-muted-foreground">پیشرفت</div>
          </div>
        </motion.div>

        {/* نوار XP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-lg border border-border p-4 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">تا لِوِل {level + 1}</span>
            <span className="text-xs font-bold text-foreground">
              {xpToNextLevel} XP مونده
            </span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(xpInCurrentLevel / 500) * 100}%` }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber to-cherry rounded-full"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 text-center">
            {xpInCurrentLevel} / 500 XP
          </p>
        </motion.div>

        {/* پیام انگیزشی */}
        {earnedCount === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-secondary0-500/10 border border-amber-500-500/30 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">
                  هنوز هیچ مدالی نگرفتی — ولی این عالیه!
                </p>
                <p className="text-sm text-muted-foreground">
                  هر کسی از یه جایی شروع می‌کنه. اولین مدالت فقط یه قدم فاصله داره — بزن بریم!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {earnedCount > 0 && earnedCount < stages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔥</div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">
                  داری ترکوندی!
                </p>
                <p className="text-sm text-muted-foreground">
                  {stages.length - earnedCount} مدال دیگه مونده تا کلکسیون کامل بشه. خیلی خفنه!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* کلکسیون مدال‌ها */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card rounded-lg border border-border p-4 sm:p-6 shadow-sm mb-6"
        >
          <h2 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
            <span>🏆</span>
            کلکسیون کامل
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {stages.map((stage, idx) => (
              <motion.button
                key={stage.id}
                onClick={() => setSelectedMedal(stage)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + idx * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative aspect-square rounded-lg border-2 p-3
                  flex flex-col items-center justify-center
                  transition-colors duration-300 group
                  ${
                    stage.earned
                      ? 'bg-gradient-to-br from-amber/20 to-amber/5 border-amber-500 hover:shadow-lg'
                      : 'bg-background border-border opacity-60 hover:opacity-80'
                  }
                `}
              >
                <div
                  className={`
                    text-4xl sm:text-5xl mb-2 transition-transform
                    ${stage.earned ? 'group-hover:scale-110' : 'grayscale opacity-40'}
                  `}
                >
                  {stage.earned ? stage.medalIcon : '🔒'}
                </div>

                <div
                  className={`
                    text-[10px] sm:text-xs font-bold text-center leading-tight px-1
                    ${stage.earned ? 'text-foreground' : 'text-muted-foreground'}
                  `}
                >
                  {stage.badgeName}
                </div>

                <div
                  className={`
                    absolute top-1 right-1 w-5 h-5 rounded-full
                    flex items-center justify-center text-[9px] font-bold
                    ${
                      stage.earned
                        ? 'bg-green-600 text-white'
                        : 'bg-line text-muted-foreground'
                    }
                  `}
                >
                  {stage.order}
                </div>

                {stage.earned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.05, type: 'spring' }}
                    className="absolute top-1 left-1 w-4 h-4 rounded-full bg-green-600 flex items-center justify-center"
                  >
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={4}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          {earnedCount < stages.length ? (
            <div className="space-y-3">
              <Link
                href="/map"
                className="inline-block px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-lg"
              >
                🗺️ ادامه مسیر تا مدال بعدی
              </Link>
              <p className="text-xs text-muted-foreground">
                فقط {stages.length - earnedCount} مدال مونده — تو می‌تونی!
              </p>
            </div>
          ) : (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6">
              <div className="text-4xl mb-2">👑</div>
              <p className="text-lg font-extrabold text-foreground mb-1">
                همه مدال‌ها رو گرفتی! تبریک!
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                رسماً قهرمان مسیر شدی. حالا وقتشه بری سراغ شغل رویایی‌ت — بزن بریم!
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all"
              >
                برگشت به داشبورد
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* مودال */}
      <AnimatePresence>
        {selectedMedal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/40  z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-card rounded-lg border border-border shadow-sm max-w-md w-full p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={
                  selectedMedal.earned
                    ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  repeat: selectedMedal.earned ? Infinity : 0,
                  repeatDelay: 2,
                }}
                className={`text-7xl mb-3 ${selectedMedal.earned ? '' : 'grayscale opacity-40'}`}
              >
                {selectedMedal.earned ? selectedMedal.medalIcon : '🔒'}
              </motion.div>

              <h3 className="text-xl font-extrabold text-foreground mb-2">
                {selectedMedal.earned
                  ? `مدال «${selectedMedal.badgeName}»`
                  : 'این مدال قفله'}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {selectedMedal.earned
                  ? selectedMedal.description
                  : `برای باز کردن این مدال، مرحله ${selectedMedal.order} رو توی نقشه تکمیل کن. این مدال بهت ${selectedMedal.xpReward} XP می‌ده.`}
              </p>

              {selectedMedal.earned && selectedMedal.earnedAt && (
                <div className="bg-background rounded-lg p-3 mb-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">تاریخ دریافت:</p>
                  <p className="text-sm font-bold text-foreground" dir="ltr">
                    {new Date(selectedMedal.earnedAt).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              {!selectedMedal.earned && (
                <div className="bg-secondary0-500/10 border border-amber-500-500/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-foreground">
                    💡 <strong>نکته:</strong> این مرحله بهت کمک می‌کنه{' '}
                    {selectedMedal.order === 1
                      ? 'پروفایلت رو بسازی'
                      : selectedMedal.order === 2
                      ? 'رزومه‌ات رو آماده کنی'
                      : selectedMedal.order === 3
                      ? 'توانمندی‌هات رو کشف کنی'
                      : selectedMedal.order === 4
                      ? 'مهارت‌هات رو بسنجی'
                      : selectedMedal.order === 5                      ? 'برای مصاحبه آماده بشی'
                      : selectedMedal.order === 6
                      ? 'شرکت مناسب رو پیدا کنی'
                      : selectedMedal.order === 7
                      ? 'آفر بگیری'
                      : selectedMedal.order === 8
                      ? 'آفرها رو مقایسه کنی'
                      : selectedMedal.order === 9
                      ? 'مذاکره کنی'
                      : 'وارد فصل جدید بشی'}
                    .
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {!selectedMedal.earned && (
                  <Link
                    href="/map"
                    className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 text-sm text-center"
                  >
                    برو به نقشه
                  </Link>
                )}
                <button
                  onClick={() => setSelectedMedal(null)}
                  className={`py-3 ${
                    selectedMedal.earned ? 'w-full' : 'flex-1'
                  } bg-background border border-border text-foreground rounded-lg font-semibold hover:bg-line text-sm`}
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
