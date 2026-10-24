'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

type AppStatus = 'pending' | 'accepted' | 'rejected' | 'reviewed'

interface Application {
  id: string
  userId: string
  companyId: string
  status: AppStatus
  message: string | null
  createdAt: string
  company: {
    id: string
    name: string
    logo: string | null
    industry: string | null
    website: string | null
  }
}

interface Stats {
  total: number
  pending: number
  accepted: number
  rejected: number
}

interface ApplicationsData {
  applications: Application[]
  stats: Stats
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<ApplicationsData>

const STATUS_LABELS: Record<AppStatus, string> = {
  pending: 'در انتظار',
  accepted: 'پذیرفته‌شده',
  rejected: 'رد‌شده',
  reviewed: 'بررسی‌شده',
}

const STATUS_COLORS: Record<AppStatus, string> = {
  pending: 'bg-amber/10 text-amber-deep border-amber/30',
  accepted: 'bg-lime/10 text-lime-deep border-lime/30',
  rejected: 'bg-cherry/10 text-cherry border-cherry/30',
  reviewed: 'bg-violet/10 text-violet border-violet/30',
}

type Filter = 'all' | 'pending' | 'accepted' | 'rejected'

export default function ApplicationsClient() {
  const { data, mutate, isLoading } = useSWR('/api/applications', fetcher)
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [updating, setUpdating] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const applications = data?.applications ?? []
  const stats = data?.stats ?? { total: 0, pending: 0, accepted: 0, rejected: 0 }

  const filtered = applications.filter((a) =>
    filter === 'all' ? true : a.status === filter
  )

  async function handleResponse(appId: string, status: 'accepted' | 'rejected') {
    setUpdating(true)
    setErrorMsg('')

    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      const result = await res.json()

      if (!res.ok) {
        setErrorMsg(result.error || 'خطا در بروزرسانی')
        return
      }

      await mutate()
      setSelectedApp(null)
    } catch {
      setErrorMsg('خطای شبکه')
    } finally {
      setUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری پیشنهادها...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg pb-8">
      {/* هدر */}
      <header className="bg-paper border-b border-line sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-lg">
              🎮
            </div>
            <span className="font-bold text-ink">QuestUp</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-muted hover:text-ink">
            داشبورد
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* عنوان */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-1">
            پیشنهادهای دریافتی 📨
          </h1>
          <p className="text-sm text-muted">
            شرکت‌هایی که بهت پیشنهاد دادن — با آرامش بررسی کن
          </p>
        </div>

        {/* پیام DNA محصول */}
        <div className="bg-amber/10 border border-amber/30 rounded-xl2 p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-bold text-ink text-sm mb-1">
                هیچ عجله‌ای نیست
              </p>
              <p className="text-sm text-muted">
                می‌تونی پیام‌ها رو بخونی، شرکت‌ها رو بررسی کنی و بعد تصمیم بگیری. این مسیر مال خودته.
              </p>
            </div>
          </div>
        </div>

        {/* آمار */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`bg-paper rounded-xl2 border p-4 shadow-soft text-right transition-all ${
              filter === 'all' ? 'border-violet ring-2 ring-violet/20' : 'border-line'
            }`}
          >
            <div className="text-2xl mb-1">📨</div>
            <div className="text-2xl font-extrabold text-ink">{stats.total}</div>
            <div className="text-xs text-muted">کل</div>
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`bg-paper rounded-xl2 border p-4 shadow-soft text-right transition-all ${
              filter === 'pending' ? 'border-amber ring-2 ring-amber/20' : 'border-line'
            }`}
          >
            <div className="text-2xl mb-1">⏳</div>
            <div className="text-2xl font-extrabold text-amber-deep">{stats.pending}</div>
            <div className="text-xs text-muted">در انتظار</div>
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`bg-paper rounded-xl2 border p-4 shadow-soft text-right transition-all ${
              filter === 'accepted' ? 'border-lime ring-2 ring-lime/20' : 'border-line'
            }`}
          >
            <div className="text-2xl mb-1">✅</div>
            <div className="text-2xl font-extrabold text-lime-deep">{stats.accepted}</div>
            <div className="text-xs text-muted">پذیرفته</div>
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`bg-paper rounded-xl2 border p-4 shadow-soft text-right transition-all ${
              filter === 'rejected' ? 'border-cherry ring-2 ring-cherry/20' : 'border-line'
            }`}
          >
            <div className="text-2xl mb-1">❌</div>
            <div className="text-2xl font-extrabold text-cherry">{stats.rejected}</div>
            <div className="text-xs text-muted">رد‌شده</div>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-cherry/10 border border-cherry/30 rounded-xl2 p-3 text-sm text-cherry">
            {errorMsg}
          </div>
        )}

        {/* لیست */}
        {filtered.length === 0 ? (
          <div className="bg-paper rounded-xl2 border border-line p-12 text-center shadow-soft">
            <div className="text-6xl mb-3">
              {filter === 'all' ? '📭' : filter === 'pending' ? '⏳' : filter === 'accepted' ? '✅' : '❌'}
            </div>
            <p className="text-lg font-bold text-ink mb-1">
              {filter === 'all'
                ? 'هنوز پیشنهادی نداری'
                : `هیچ پیشنهاد ${STATUS_LABELS[filter as AppStatus] || ''} نداری`}
            </p>
            <p className="text-sm text-muted mb-4">
              {filter === 'all'
                ? 'نقشه رو ادامه بده تا شرکت‌ها تو رو ببینن.'
                : 'فیلتر رو تغییر بده تا بقیه پیشنهادها رو ببینی.'}
            </p>
            {filter === 'all' && (
              <Link
                href="/map"
                className="inline-block px-6 py-3 bg-violet text-white rounded-full font-bold text-sm hover:bg-violet-deep transition-all"
              >
                🗺️ برو به نقشه
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="bg-paper rounded-xl2 border border-line p-5 shadow-soft hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* لوگو */}
                  <div className="w-14 h-14 rounded-xl2 bg-gradient-to-br from-violet/20 to-lilac/20 flex items-center justify-center text-3xl border border-line flex-shrink-0">
                    {app.company.logo || '🏢'}
                  </div>

                  {/* محتوا */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-extrabold text-ink">
                          {app.company.name}
                        </h3>
                        {app.company.industry && (
                          <p className="text-xs text-muted">
                            {app.company.industry}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[app.status]}`}
                      >
                        {app.status === 'pending' && '⏳'}
                        {app.status === 'accepted' && '✅'}
                        {app.status === 'rejected' && '❌'}
                        {app.status === 'reviewed' && '👀'}
                        {STATUS_LABELS[app.status]}
                      </span>
                    </div>

                    {app.message && (
                      <p className="text-sm text-muted leading-relaxed mt-2 mb-3 line-clamp-2">
                        {app.message}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-xs text-muted">
                        📅 {new Date(app.createdAt).toLocaleDateString('fa-IR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app)
                            setErrorMsg('')
                          }}
                          className="px-4 py-2 bg-bg border border-line text-ink rounded-xl2 font-semibold text-xs hover:border-violet/30 transition-all"
                        >
                          مشاهده
                        </button>

                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleResponse(app.id, 'accepted')}
                              disabled={updating}
                              className="px-4 py-2 bg-lime-deep text-white rounded-xl2 font-semibold text-xs hover:bg-lime-deep/90 disabled:opacity-50 transition-all"
                            >
                              ✅ پذیرش
                            </button>
                            <button
                              onClick={() => handleResponse(app.id, 'rejected')}
                              disabled={updating}
                              className="px-4 py-2 bg-cherry text-white rounded-xl2 font-semibold text-xs hover:bg-cherry/90 disabled:opacity-50 transition-all"
                            >
                              ❌ رد
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* مودال جزئیات */}
      {selectedApp && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !updating && setSelectedApp(null)}
        >
          <div
            className="bg-paper rounded-xl2 border border-line shadow-soft max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl2 bg-gradient-to-br from-violet/20 to-lilac/20 flex items-center justify-center text-4xl border border-line">
                {selectedApp.company.logo || '🏢'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-extrabold text-ink">
                  {selectedApp.company.name}
                </h3>
                {selectedApp.company.industry && (
                  <p className="text-sm text-muted">{selectedApp.company.industry}</p>
                )}
                <span
                  className={`inline-flex items-center gap-1 mt-1 px-3 py-0.5 rounded-full text-xs font-bold border ${STATUS_COLORS[selectedApp.status]}`}
                >
                  {STATUS_LABELS[selectedApp.status]}
                </span>
              </div>
            </div>

            {/* پیام */}
            <div className="bg-bg rounded-xl2 p-4 border border-line mb-4">
              <p className="text-xs text-muted mb-2">پیام از شرکت:</p>
              <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                {selectedApp.message || '—'}
              </p>
            </div>

            {/* تاریخ */}
            <p className="text-xs text-muted mb-4">
              📅 دریافت: {new Date(selectedApp.createdAt).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>

            {selectedApp.company.website && (
              <a
                href={selectedApp.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-violet hover:underline mb-4"
                dir="ltr"
              >
                🌐 {selectedApp.company.website}
              </a>
            )}

            {/* دکمه‌ها */}
            {selectedApp.status === 'pending' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleResponse(selectedApp.id, 'accepted')}
                  disabled={updating}
                  className="flex-1 py-3 bg-lime-deep text-white rounded-xl2 font-bold hover:bg-lime-deep/90 disabled:opacity-50 transition-all"
                >
                  ✅ پذیرش پیشنهاد
                </button>
                <button
                  onClick={() => handleResponse(selectedApp.id, 'rejected')}
                  disabled={updating}
                  className="flex-1 py-3 bg-cherry text-white rounded-xl2 font-bold hover:bg-cherry/90 disabled:opacity-50 transition-all"
                >
                  ❌ رد
                </button>
                <button
                  onClick={() => setSelectedApp(null)}
                  disabled={updating}
                  className="px-4 py-3 bg-bg border border-line text-ink rounded-xl2 font-semibold hover:bg-line transition-all"
                >
                  بستن
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedApp(null)}
                className="w-full py-3 bg-bg border border-line text-ink rounded-xl2 font-semibold hover:bg-line transition-all"
              >
                بستن
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
