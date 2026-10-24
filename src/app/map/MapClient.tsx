'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

interface Task {
  id: number
  title: string
  completed: boolean
}

interface Stage {
  id: number
  order: number
  title: string
  description: string
  completed: boolean
  tasks: Task[]
  completedTasks: number
  totalTasks: number
}

interface ProgressData {
  stages: Stage[]
  totalXp: number
  level: number
  completedCount: number
  totalStages: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<ProgressData>

export default function MapClient({ userName, userRole }: { userName: string; userRole: string }) {
  const { data, mutate, isLoading } = useSWR('/api/progress', fetcher)
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [togglingTask, setTogglingTask] = useState<number | null>(null)
  const [completing, setCompleting] = useState(false)

  const stages = data?.stages ?? []
  const completedCount = data?.completedCount ?? 0
  const totalXp = data?.totalXp ?? 0
  const level = data?.level ?? 1

  const currentStage = useMemo(() => stages.find((s) => !s.completed), [stages])
  const selectedStage = useMemo(() => stages.find((s) => s.id === selectedStageId) ?? null, [selectedStageId, stages])

  async function toggleTask(taskId: number) {
    setTogglingTask(taskId)
    setErrorMsg('')
    try {
      const res = await fetch(`/api/progress/tasks/${taskId}/toggle`, { method: 'POST' })
      const result = await res.json()
      if (!res.ok) { setErrorMsg(result.error || 'خطا'); return }
      await mutate()
    } catch { setErrorMsg('خطای شبکه') } finally { setTogglingTask(null) }
  }

  async function completeStage() {
    if (!selectedStage) return
    if (selectedStage.completedTasks < selectedStage.totalTasks) {
      setErrorMsg(`هنوز ${selectedStage.totalTasks - selectedStage.completedTasks} تسک باقی مانده`)
      return
    }
    setCompleting(true)
    setErrorMsg('')
    try {
      const res = await fetch(`/api/progress/${selectedStage.id}/complete`, { method: 'POST' })
      const result = await res.json()
      if (!res.ok) { setErrorMsg(result.error || 'خطا'); return }
      await mutate()
      setSelectedStageId(null)
    } catch { setErrorMsg('خطای شبکه') } finally { setCompleting(false) }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">در حال بارگذاری...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-muted-foreground">XP: <span className="font-semibold text-foreground">{totalXp}</span></span>
            <span className="text-muted-foreground">لِوِل: <span className="font-semibold text-foreground">{level}</span></span>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">داشبورد</Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">مسیر شغلی</p>
          <h1 className="text-4xl font-bold text-foreground mb-2">سلام، {userName}</h1>
          <p className="text-muted-foreground">{completedCount} از {stages.length} مرحله تکمیل شده</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">پیشرفت کلی</span>
            <span className="font-semibold text-foreground">{Math.round((completedCount / stages.length) * 100)}٪</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(completedCount / stages.length) * 100}%` }} />
          </div>
        </div>

        {/* Stages List */}
        <div className="border-t border-border">
          {stages.map((stage, idx) => {
            const prevCompleted = idx === 0 || stages[idx - 1]?.completed
            const isLocked = !prevCompleted && !stage.completed
            const isCurrent = currentStage?.id === stage.id

            return (
              <div
                key={stage.id}
                onClick={() => !isLocked && setSelectedStageId(stage.id)}
                className={`py-6 border-b border-border flex items-start gap-6 transition-colors ${
                  isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-secondary/30'
                } ${isCurrent ? 'bg-secondary/20' : ''}`}
              >
                {/* Number */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  stage.completed ? 'bg-primary border-primary text-primary-foreground' : isCurrent ? 'border-primary text-primary' : 'border-border text-muted-foreground'
                }`}>
                  {stage.completed ? '✓' : stage.order}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                    </div>
                    {!isLocked && (
                      <span className="text-sm text-muted-foreground flex-shrink-0">
                        {stage.completedTasks}/{stage.totalTasks} تسک
                      </span>
                    )}
                  </div>
                  {isLocked && <p className="text-xs text-muted-foreground mt-2">برای باز شدن، مرحله قبل را کامل کنید</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedStage && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => !togglingTask && !completing && setSelectedStageId(null)}>
          <div className="bg-background rounded-lg border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">مرحله {selectedStage.order}</p>
                  <h3 className="text-xl font-bold text-foreground">{selectedStage.title}</h3>
                </div>
                <button onClick={() => setSelectedStageId(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <p className="text-sm text-muted-foreground">{selectedStage.description}</p>
            </div>

            <div className="p-6 space-y-3">
              {selectedStage.tasks.map((task) => (
                <label key={task.id} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    disabled={togglingTask === task.id || selectedStage.completed}
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{task.title}</span>
                </label>
              ))}

              {errorMsg && <p className="text-sm text-destructive">{errorMsg}</p>}

              {!selectedStage.completed && (
                <button
                  onClick={completeStage}
                  disabled={completing || selectedStage.completedTasks < selectedStage.totalTasks}
                  className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {completing ? 'در حال تکمیل...' : 'تکمیل مرحله'}
                </button>
              )}

              {selectedStage.completed && (
                <p className="text-sm text-primary font-semibold text-center py-3">این مرحله تکمیل شده است</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}