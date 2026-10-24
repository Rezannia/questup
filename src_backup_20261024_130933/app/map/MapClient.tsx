'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'

interface Task {
  id: number
  order: number
  title: string
  description: string | null
  xpReward: number
  taskType: 'auto' | 'semi' | 'manual'
  checkKey: string | null
  actionUrl: string | null
  actionLabel: string | null
  completed: boolean
}

interface Stage {
  id: number
  order: number
  title: string
  description: string
  icon: string
  badgeName: string
  medalIcon: string
  x: number
  y: number
  xpReward: number
  completed: boolean
  tasks: Task[]
  completedTasks: number
  totalTasks: number
}

interface Medal {
  id: string
  stageId: number
  earnedAt: string
}

interface ProgressData {
  stages: Stage[]
  medals: Medal[]
  totalXp: number
  level: number
  completedCount: number
  totalStages: number
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<ProgressData>

export default function MapClient({
  userName,
  userRole,
}: {
  userName: string
  userRole: string
}) {
  const { data, mutate, isLoading } = useSWR('/api/progress', fetcher)
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null)
  const [celebrating, setCelebrating] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [togglingTask, setTogglingTask] = useState<number | null>(null)
  const [skippingTask, setSkippingTask] = useState<number | null>(null)
  const [completing, setCompleting] = useState(false)

  const stages = data?.stages ?? []
  const completedCount = data?.completedCount ?? 0
  const totalXp = data?.totalXp ?? 0
  const level = data?.level ?? 1

  const currentStage = useMemo(
    () => stages.find((s) => !s.completed),
    [stages]
  )

  const selectedStage = useMemo(() => {
    if (selectedStageId === null) return null
    return stages.find((s) => s.id === selectedStageId) ?? null
  }, [selectedStageId, stages])

  const playerPosition = useMemo(() => {
    if (stages.length === 0) return { x: 50, y: 50 }
    if (currentStage) return { x: currentStage.x, y: currentStage.y }
    const last = stages[stages.length - 1]
    return { x: last.x, y: last.y }
  }, [stages, currentStage])

  useEffect(() => {
    const interval = setInterval(() => {
      mutate()
    }, 30000)

    return () => clearInterval(interval)
  }, [mutate])

  async function toggleTask(taskId: number) {
    setTogglingTask(taskId)
    setErrorMsg('')

    try {
      const res = await fetch(`/api/progress/tasks/${taskId}/toggle`, {
        method: 'POST',
      })
      const result = await res.json()

      if (!res.ok) {
        setErrorMsg(result.error || 'خطا در بروزرسانی')
        return
      }

      await mutate()
    } catch {
      setErrorMsg('خطای شبکه')
    } finally {
      setTogglingTask(null)
    }
  }

  async function skipTask(taskId: number) {
    setSkippingTask(taskId)
    setErrorMsg('')

    try {
      const res = await fetch(`/api/progress/tasks/${taskId}/skip`, {
        method: 'POST',
      })
      const result = await res.json()

      if (!res.ok) {
        setErrorMsg(result.error || 'خطا در رد کردن')
        return
      }

      await mutate()
    } catch {
      setErrorMsg('خطای شبکه')
    } finally {
      setSkippingTask(null)
    }
  }

  async function completeStage() {
    if (!selectedStage || selectedStage.completed) return

    if (selectedStage.completedTasks < selectedStage.totalTasks) {
      setErrorMsg(
        `اول ${selectedStage.totalTasks - selectedStage.completedTasks} تسک باقی‌مونده رو تموم کن`
      )
      return
    }

    setCompleting(true)
    setErrorMsg('')

    try {
      const res = await fetch(`/api/progress/${selectedStage.id}/complete`, {
        method: 'POST',
      })
      const result = await res.json()

      if (!res.ok) {
        setErrorMsg(result.error || 'خطا در تکمیل مرحله')
        return
      }

      setCelebrating(true)
      await mutate()
      setSelectedStageId(null)
      setTimeout(() => setCelebrating(false), 3000)
    } catch {
      setErrorMsg('خطای شبکه')
    } finally {
      setCompleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری نقشه...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg pb-8">
      {/* هدر */}
      <header className="bg-paper border-b border-line sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-lg">
              🎮
            </div>
            <span className="font-bold text-ink">کوئست‌آپ</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-bg rounded-full px-3 py-1.5 border border-line">
              <span className="text-xs text-muted">XP</span>
              <span className="font-bold text-violet text-sm">{totalXp}</span>
            </div>
            <div className="flex items-center gap-2 bg-bg rounded-full px-3 py-1.5 border border-line">
              <span className="text-xs text-muted">لِوِل</span>
              <span className="font-bold text-ink text-sm">{level}</span>
            </div>
            <Link href="/dashboard" className="text-sm text-muted hover:text-ink">
              داشبورد
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        {/* عنوان */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-1">
            سلام، {userName} 👋
          </h1>
          <p className="text-sm text-muted">
            {completedCount} از {stages.length} مرحله تکمیل شده
          </p>
        </div>

        {/* نوار پیشرفت */}
        <div className="bg-paper rounded-xl2 border border-line p-4 mb-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">پیشرفت کلی</span>
            <span className="text-xs font-bold text-ink">
              {Math.round((completedCount / stages.length) * 100)}٪
            </span>
          </div>
          <div className="h-3 bg-bg rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / stages.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet to-lilac rounded-full"
            />
          </div>
        </div>

        {/* نقشه */}
        <div className="bg-paper rounded-xl2 border border-line shadow-soft overflow-hidden">
          <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#d4cfc2" opacity="0.5" />
                </pattern>
                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="50%" stopColor="#7c9ad9" />
                  <stop offset="100%" stopColor="#8b9d5a" />
                </linearGradient>
              </defs>
              <rect width="1000" height="1000" fill="#fffdf7" />
              <rect width="1000" height="1000" fill="url(#dots)" />

              <path
                d="M 220 320 C 300 260, 360 260, 400 280 S 500 320, 560 300 S 680 300, 720 400 S 780 540, 780 580 S 740 720, 620 780 S 480 800, 420 760 S 280 720, 240 620 S 180 480, 220 400 S 400 500, 500 500"
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="6"
                strokeDasharray="14 12"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>

            {stages.map((stage, idx) => {
              const prevCompleted = idx === 0 || stages[idx - 1]?.completed
              const isLocked = !prevCompleted && !stage.completed
              const isCurrent = currentStage?.id === stage.id
              const taskProgress =
                stage.totalTasks > 0
                  ? (stage.completedTasks / stage.totalTasks) * 100
                  : 0

              return (
                <motion.button
                  key={stage.id}
                  onClick={() => !isLocked && setSelectedStageId(stage.id)}
                  disabled={isLocked}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={!isLocked ? { scale: 1.15 } : {}}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${stage.x}%`,
                    top: `${stage.y}%`,
                  }}
                >
                  <div
                    className={`
                      relative w-14 h-14 sm:w-16 sm:h-16 rounded-full
                      flex items-center justify-center text-2xl sm:text-3xl
                      border-2 transition-all duration-300
                      ${
                        stage.completed
                          ? 'bg-lime border-lime-deep text-ink shadow-lg'
                          : isCurrent
                          ? 'bg-amber border-amber-deep text-ink animate-pulse shadow-lg'
                          : isLocked
                          ? 'bg-gray-200 border-gray-300 opacity-40 grayscale'
                          : 'bg-paper border-line hover:border-violet'
                      }
                    `}
                  >
                    {isLocked ? '🔒' : stage.icon}

                    {!isLocked && !stage.completed && stage.totalTasks > 0 && (
                      <svg
                        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#8b9d5a"
                          strokeWidth="4"
                          strokeDasharray={`${(taskProgress / 100) * 283} 283`}
                          strokeLinecap="round"
                          opacity="0.7"
                        />
                      </svg>
                    )}

                    <div
                      className={`
                        absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1
                        rounded-full flex items-center justify-center
                        text-[10px] font-bold
                        ${
                          stage.completed
                            ? 'bg-white text-lime-deep'
                            : isCurrent
                            ? 'bg-white text-amber-deep'
                            : 'bg-white text-muted'
                        }
                      `}
                    >
                      {stage.completed ? '✓' : stage.order}
                    </div>
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] sm:text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded-full border border-line opacity-0 group-hover:opacity-100 transition-opacity">
                    {stage.title}
                  </div>
                </motion.button>
              )
            })}

            {/* کاراکتر */}
            <motion.div
              key={`${playerPosition.x}-${playerPosition.y}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              style={{
                left: `${playerPosition.x}%`,
                top: `${playerPosition.y - 6}%`,
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-ink flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
                  {userRole === 'JOBSEEKER' ? '👧' : '🏢'}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* راهنمای مرحله فعلی */}
        {currentStage && (
          <div className="mt-4 bg-amber/10 border border-amber/30 rounded-xl2 p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{currentStage.icon}</div>
              <div className="flex-1">
                <p className="text-xs text-muted mb-1">
                  مرحله فعلی — {currentStage.order} از {stages.length}
                </p>
                <p className="font-bold text-ink mb-1">{currentStage.title}</p>
                <p className="text-sm text-muted mb-2">
                  {currentStage.description}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-amber-deep">
                    {currentStage.completedTasks} / {currentStage.totalTasks} تسک
                  </span>
                  <div className="flex-1 h-1.5 bg-bg rounded-full overflow-hidden max-w-[120px]">
                    <div
                      className="h-full bg-amber-deep rounded-full transition-all"
                      style={{
                        width: `${
                          (currentStage.completedTasks /
                            currentStage.totalTasks) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStageId(currentStage.id)}
                className="px-4 py-2 bg-violet text-white rounded-full font-semibold text-sm hover:bg-violet-deep transition-all"
              >
                ادامه
              </button>
            </div>
          </div>
        )}

        {completedCount === stages.length && stages.length > 0 && (
          <div className="mt-4 bg-lime/20 border border-lime/50 rounded-xl2 p-6 text-center">
            <div className="text-5xl mb-2">👑</div>
            <p className="text-xl font-extrabold text-ink mb-1">
              تبریک! همه مراحل رو رفتی!
            </p>
            <p className="text-sm text-muted">
              رسماً لِول‌آپ کردی. حالا وقتشه بری سراغ شغل رویایی‌ت.
            </p>
          </div>
        )}
      </div>

      {/* مودال جزئیات مرحله */}
      <AnimatePresence>
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() =>
              !togglingTask &&
              !skippingTask &&
              !completing &&
              setSelectedStageId(null)
            }
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-paper rounded-2xl border border-line shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* هدر مودال */}
              <div className="sticky top-0 bg-paper z-10 p-5 border-b border-line">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-12 h-12 rounded-xl2 flex items-center justify-center text-2xl
                        ${
                          selectedStage.completed
                            ? 'bg-lime border-2 border-lime-deep'
                            : 'bg-amber border-2 border-amber-deep'
                        }
                      `}
                    >
                      {selectedStage.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted">
                        مرحله {selectedStage.order} از {stages.length}
                      </p>
                      <h3 className="text-lg font-extrabold text-ink">
                        {selectedStage.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStageId(null)}
                    disabled={
                      togglingTask !== null ||
                      skippingTask !== null ||
                      completing
                    }
                    className="w-8 h-8 rounded-full bg-bg border border-line flex items-center justify-center text-muted hover:bg-line transition-all disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {selectedStage.description}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          selectedStage.totalTasks > 0
                            ? (selectedStage.completedTasks /
                                selectedStage.totalTasks) *
                              100
                            : 0
                        }%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${
                        selectedStage.completed
                          ? 'bg-lime-deep'
                          : 'bg-amber-deep'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-bold text-ink">
                    {selectedStage.completedTasks}/{selectedStage.totalTasks}
                  </span>
                </div>
              </div>

              {/* تسک‌ها */}
              <div className="p-5">
                <p className="text-sm font-bold text-ink mb-3">
                  📋 چک‌لیست مرحله
                </p>

                <div className="space-y-2">
                  {selectedStage.tasks.map((task) => {
                    const isAuto = task.taskType === 'auto'
                    const isManual = task.taskType === 'manual'

                    return (
                      <div
                        key={task.id}
                        className={`
                          p-3 rounded-xl2 border-2 transition-all
                          ${
                            task.completed
                              ? 'bg-lime/10 border-lime/30'
                              : 'bg-bg border-line'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`
                              w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                              ${
                                task.completed
                                  ? 'bg-lime-deep border-lime-deep'
                                  : 'bg-paper border-line'
                              }
                            `}
                          >
                            {task.completed ? (
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
                            ) : isAuto ? (
                              <span className="text-[10px]">⚙️</span>
                            ) : null}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-semibold ${
                                task.completed
                                  ? 'text-muted line-through'
                                  : 'text-ink'
                              }`}
                            >
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-xs text-amber-deep font-bold">
                                +{task.xpReward} XP
                              </span>
                              {isAuto && (
                                <span className="text-[10px] px-2 py-0.5 bg-violet/10 text-violet border border-violet/30 rounded-full font-bold">
                                  ⚙️ خودکار
                                </span>
                              )}
                              {isManual && (
                                <span className="text-[10px] px-2 py-0.5 bg-bg border border-line text-muted rounded-full font-bold">
                                  ✋ دستی
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* دکمه‌های auto */}
                        {!task.completed && isAuto && !selectedStage.completed && (
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            {task.actionUrl && (
                              <Link
                                href={task.actionUrl}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet text-white rounded-full text-xs font-bold hover:bg-violet-deep transition-all"
                              >
                                {task.actionLabel || 'برو انجام بده'}
                                <span>←</span>
                              </Link>
                            )}

                            <button
                              onClick={() => skipTask(task.id)}
                              disabled={skippingTask === task.id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-bg border border-line text-muted rounded-full text-xs font-bold hover:border-cherry/30 hover:text-cherry transition-all disabled:opacity-50 cursor-pointer"
                            >
                              {skippingTask === task.id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-muted border-t-transparent rounded-full animate-spin" />
                                  در حال رد...
                                </>
                              ) : (
                                <>⏭ رد کردن</>
                              )}
                            </button>
                          </div>
                        )}

                        {/* دکمه‌های manual */}
                        {!task.completed &&
                          isManual &&
                          !selectedStage.completed && (
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => toggleTask(task.id)}
                                disabled={
                                  togglingTask === task.id ||
                                  skippingTask === task.id
                                }
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet text-white rounded-full text-xs font-bold hover:bg-violet-deep transition-all disabled:opacity-50 cursor-pointer"
                              >
                                {togglingTask === task.id ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    در حال ثبت...
                                  </>
                                ) : (
                                  <>✅ انجام دادم</>
                                )}
                              </button>

                              <button
                                onClick={() => skipTask(task.id)}
                                disabled={
                                  skippingTask === task.id ||
                                  togglingTask === task.id
                                }
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-bg border border-line text-muted rounded-full text-xs font-bold hover:border-cherry/30 hover:text-cherry transition-all disabled:opacity-50 cursor-pointer"
                              >
                                {skippingTask === task.id ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-muted border-t-transparent rounded-full animate-spin" />
                                    در حال رد...
                                  </>
                                ) : (
                                  <>⏭ رد کردن</>
                                )}
                              </button>
                            </div>
                          )}

                        {/* دکمه لغو — manual تکمیل‌شده */}
                        {task.completed &&
                          isManual &&
                          !selectedStage.completed && (
                            <button
                              onClick={() => toggleTask(task.id)}
                              disabled={togglingTask === task.id}
                              className="mt-2 text-xs text-muted hover:text-cherry transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              ↩ لغو
                            </button>
                          )}
                      </div>
                    )
                  })}
                </div>

                {/* پیام راهنما — auto */}
                {selectedStage.tasks.some(
                  (t) => t.taskType === 'auto' && !t.completed
                ) && (
                  <div className="mt-3 bg-violet/10 border border-violet/30 rounded-xl2 p-3">
                    <p className="text-xs text-ink leading-relaxed">
                      <strong>💡 نکته:</strong> تسک‌های «⚙️ خودکار» رو باید توی
                      سایت انجام بدی. سیستم خودش چک می‌کنه. اگه سخت بود، رد کن.
                    </p>
                  </div>
                )}

                {/* پیام راهنما — manual */}
                {selectedStage.tasks.some(
                  (t) => t.taskType === 'manual' && !t.completed
                ) && (
                  <div className="mt-3 bg-amber/10 border border-amber/30 rounded-xl2 p-3">
                    <p className="text-xs text-ink leading-relaxed">
                      <strong>💡 نکته:</strong> تسک‌های دستی رو می‌تونی «انجام
                      دادم» بزنی یا «رد کنی». اگه رد کنی، XP نمی‌گیری ولی مرحله
                      باز می‌شه.
                    </p>
                  </div>
                )}

                {errorMsg && (
                  <div className="mt-3 bg-cherry/10 border border-cherry/30 rounded-xl2 p-3 text-sm text-cherry">
                    {errorMsg}
                  </div>
                )}

                {selectedStage.completed && (
                  <div className="mt-4 bg-lime/20 border border-lime/50 rounded-xl2 p-4 text-center">
                    <div className="text-3xl mb-1">
                      {selectedStage.medalIcon}
                    </div>
                    <p className="text-sm font-bold text-ink">
                      مدال «{selectedStage.badgeName}» گرفته شد!
                    </p>
                    <p className="text-xs text-muted mt-1">
                      قبلاً این مرحله رو تکمیل کردی
                    </p>
                  </div>
                )}

                {/* دکمه تکمیل */}
                {!selectedStage.completed && (
                  <div className="mt-5">
                    {selectedStage.completedTasks <
                    selectedStage.totalTasks ? (
                      <div className="bg-amber/10 border border-amber/30 rounded-xl2 p-3 text-center">
                        <p className="text-sm font-bold text-ink mb-1">
                          🎯 هنوز{' '}
                          {selectedStage.totalTasks -
                            selectedStage.completedTasks}{' '}
                          تسک مونده
                        </p>
                        <p className="text-xs text-muted">
                          تسک‌ها رو تیک بزن یا رد کن
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={completeStage}
                        disabled={completing}
                        className="w-full py-3 bg-gradient-to-r from-lime to-lime-deep text-white rounded-xl2 font-extrabold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        {completing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            در حال تکمیل...
                          </>
                        ) : (
                          <>🎉 تکمیل مرحله و دریافت مدال</>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {celebrating && <Confetti />}
    </div>
  )
}

function Confetti() {
  const colors = ['#1e3a8a', '#7c9ad9', '#8b9d5a', '#f4c95d', '#a8324a', '#c98a7a']
  const emojis = ['🎉', '✨', '⭐', '🏅', '🎊', '💫']

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => {
        const color = colors[i % colors.length]
        const left = Math.random() * 100
        const delay = Math.random() * 0.5
        const duration = 1.8 + Math.random() * 1.5
        const size = 6 + Math.random() * 8

        return (
          <div
            key={`confetti-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              animation: `fall ${duration}s linear ${delay}s forwards`,
            }}
          />
        )
      })}

      {Array.from({ length: 15 }).map((_, i) => {
        const emoji = emojis[i % emojis.length]
        const left = Math.random() * 100
        const delay = Math.random() * 0.8
        const duration = 2 + Math.random() * 1.5
        const size = 20 + Math.random() * 20

        return (
          <div
            key={`emoji-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-30px',
              fontSize: `${size}px`,
              animation: `fall ${duration}s linear ${delay}s forwards`,
            }}
          >
            {emoji}
          </div>
        )
      })}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
