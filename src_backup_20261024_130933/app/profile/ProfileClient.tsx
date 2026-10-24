'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { SkillPicker } from '@/components/ui/SkillPicker'

interface User {
  id: string
  name: string
  email: string
  role: 'JOBSEEKER' | 'COMPANY' | 'ADMIN'
  avatar: string | null
  bio: string | null
  skills: string | null
  website: string | null
  createdAt: string
}

interface Stats {
  completedCount: number
  medalsCount: number
  totalXp: number
  level: number
  joinedAt: string
}

interface ProfileData {
  user: User
  stats: Stats
}

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()) as Promise<ProfileData>

const AVATARS = ['👧', '👦', '🧑', '👩', '👨', '🧕', '👱', '🧔', '👩‍💻', '👨‍💻', '🦊', '🐼', '🐯', '🦁', '🐸', '🐨']

export default function ProfileClient() {
  const { data, mutate, isLoading } = useSWR('/api/profile', fetcher)

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: '',
    bio: '',
    avatar: '👧',
    skills: [] as string[],
  })

  // پر کردن فرم با داده‌های فعلی
  useEffect(() => {
    if (data?.user) {
      let parsedSkills: string[] = []
      try {
        if (data.user.skills) {
          const parsed = JSON.parse(data.user.skills)
          if (Array.isArray(parsed)) {
            parsedSkills = parsed
          }
        }
      } catch {
        parsedSkills = []
      }

      setForm({
        name: data.user.name,
        bio: data.user.bio || '',
        avatar:
          data.user.avatar ||
          (data.user.role === 'JOBSEEKER' ? '👧' : '🏢'),
        skills: parsedSkills,
      })
    }
  }, [data])

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          bio: form.bio,
          avatar: form.avatar,
          skills: form.skills,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'خطا در ذخیره')
        return
      }

      await mutate()
      setEditing(false)
      setSuccess('اطلاعات با موفقیت ذخیره شد ✓')
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('خطای شبکه')
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    if (data?.user) {
      let parsedSkills: string[] = []
      try {
        if (data.user.skills) {
          const parsed = JSON.parse(data.user.skills)
          if (Array.isArray(parsed)) {
            parsedSkills = parsed
          }
        }
      } catch {
        parsedSkills = []
      }

      setForm({
        name: data.user.name,
        bio: data.user.bio || '',
        avatar:
          data.user.avatar ||
          (data.user.role === 'JOBSEEKER' ? '👧' : '🏢'),
        skills: parsedSkills,
      })
    }
    setEditing(false)
    setError('')
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری پروفایل...</p>
        </div>
      </div>
    )
  }

  const { user, stats } = data
  const currentAvatar =
    user.avatar || (user.role === 'JOBSEEKER' ? '👧' : '🏢')

  // مهارت‌های ذخیره‌شده برای نمایش
  let userSkills: string[] = []
  try {
    if (user.skills) {
      const parsed = JSON.parse(user.skills)
      if (Array.isArray(parsed)) {
        userSkills = parsed
      }
    }
  } catch {
    userSkills = []
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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-bg rounded-full px-3 py-1.5 border border-line">
              <span className="text-xs text-muted">XP</span>
              <span className="font-bold text-violet text-sm">
                {stats.totalXp}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-bg rounded-full px-3 py-1.5 border border-line">
              <span className="text-xs text-muted">لِوِل</span>
              <span className="font-bold text-ink text-sm">{stats.level}</span>
            </div>
            <Link href="/dashboard" className="text-sm text-muted hover:text-ink">
              داشبورد
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* پیام موفقیت */}
        {success && (
          <div className="mb-4 bg-lime/20 border border-lime/50 rounded-xl2 p-3 text-sm text-ink text-center">
            {success}
          </div>
        )}

        {/* کارت پروفایل */}
        <div className="bg-paper rounded-xl2 border border-line shadow-soft overflow-hidden mb-6">
          {/* پترن بالا */}
          <div className="h-24 bg-gradient-to-r from-violet via-lilac to-violet" />

          <div className="px-6 pb-6">
            {/* آواتار */}
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-paper border-4 border-paper shadow-lg flex items-center justify-center text-5xl">
                  {editing ? form.avatar : currentAvatar}
                </div>
                {editing && (
                  <div className="absolute -bottom-1 -right-1 bg-violet text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    در حال ویرایش
                  </div>
                )}
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-bg border border-line text-ink rounded-full font-semibold text-sm hover:border-violet/30 transition-all"
                >
                  ✏️ ویرایش
                </button>
              )}
            </div>

            {/* اطلاعات */}
            {!editing ? (
              <>
                <h1 className="text-2xl font-extrabold text-ink mb-1">
                  {user.name}
                </h1>
                <p className="text-sm text-muted mb-3" dir="ltr">
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-bg border border-line rounded-full text-xs font-semibold text-ink">
                    {user.role === 'JOBSEEKER' ? '🎯 کارجو' : '🏢 شرکت'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber/10 border border-amber/30 rounded-full text-xs font-semibold text-amber-deep">
                    📊 لِوِل {stats.level}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-semibold text-lime-deep">
                    🏅 {stats.medalsCount} مدال
                  </span>
                </div>

                {user.bio && (
                  <p className="text-sm text-muted leading-relaxed mt-3 p-3 bg-bg rounded-xl2 border border-line">
                    {user.bio}
                  </p>
                )}
                {!user.bio && (
                  <p className="text-sm text-muted italic">
                    هنوز بیویی نداری — یه چیزی درباره خودت بنویس که شرکت‌ها
                    ببینن.
                  </p>
                )}

                {/* مهارت‌ها */}
                {userSkills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-ink mb-2">
                      مهارت‌ها
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {userSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block px-3 py-1 bg-violet/10 text-violet border border-violet/30 rounded-full text-xs font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {userSkills.length === 0 && (
                  <p className="text-sm text-muted italic mt-4">
                    هنوز مهارتی اضافه نکردی — برو ویرایش کن و مهارت‌هات رو
                    اضافه کن.
                  </p>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {/* انتخاب آواتار */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    آواتار
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {AVATARS.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setForm({ ...form, avatar })}
                        className={`
                          aspect-square rounded-xl2 flex items-center justify-center text-2xl
                          border-2 transition-all
                          ${
                            form.avatar === avatar
                              ? 'border-violet bg-violet/10 scale-105'
                              : 'border-line bg-bg hover:border-violet/30'
                          }
                        `}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* نام */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    نام
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl2 border border-line bg-paper text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
                    maxLength={50}
                  />
                </div>

                {/* بیو */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    درباره من
                  </label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={4}
                    maxLength={300}
                    placeholder="مثلاً: کارجوی علاقه‌مند به فناوری، در حال یادگیری React، دنبال اولین فرصت شغلی."
                    className="w-full px-4 py-3 rounded-xl2 border border-line bg-paper text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 resize-none"
                  />
                  <p className="text-xs text-muted mt-1 text-left" dir="ltr">
                    {form.bio.length} / 300
                  </p>
                </div>

                {/* مهارت‌ها */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    مهارت‌ها
                  </label>
                  <SkillPicker
                    value={form.skills}
                    onChange={(skills) => setForm({ ...form, skills })}
                    maxSkills={10}
                  />
                </div>

                {error && (
                  <div className="bg-cherry/10 border border-cherry/30 rounded-xl2 p-3 text-sm text-cherry">
                    {error}
                  </div>
                )}

                {/* دکمه‌ها */}
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving || form.name.length < 2}
                    className="flex-1 py-3 bg-violet text-white rounded-xl2 font-semibold hover:bg-violet-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ذخیره...
                      </>
                    ) : (
                      'ذخیره تغییرات'
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-6 py-3 bg-bg border border-line text-ink rounded-xl2 font-semibold hover:bg-line transition-all"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* آمار */}
        <div className="bg-paper rounded-xl2 border border-line shadow-soft p-6 mb-6">
          <h2 className="text-lg font-extrabold text-ink mb-4 flex items-center gap-2">
            <span>📊</span>
            آمار من
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-bg rounded-xl2 p-4 border border-line text-center">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-2xl font-extrabold text-lime-deep">
                {stats.completedCount}
              </div>
              <div className="text-xs text-muted">مرحله تکمیل‌شده</div>
            </div>
            <div className="bg-bg rounded-xl2 p-4 border border-line text-center">
              <div className="text-2xl mb-1">🏅</div>
              <div className="text-2xl font-extrabold text-amber-deep">
                {stats.medalsCount}
              </div>
              <div className="text-xs text-muted">مدال</div>
            </div>
            <div className="bg-bg rounded-xl2 p-4 border border-line text-center">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-2xl font-extrabold text-violet">
                {stats.totalXp}
              </div>
              <div className="text-xs text-muted">XP</div>
            </div>
            <div className="bg-bg rounded-xl2 p-4 border border-line text-center">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-sm font-extrabold text-ink pt-2">
                {new Date(stats.joinedAt).toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: 'short',
                })}
              </div>
              <div className="text-xs text-muted">تاریخ عضویت</div>
            </div>
          </div>
        </div>

        {/* پیام انگیزشی */}
        <div className="bg-amber/10 border border-amber/30 rounded-xl2 p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-bold text-ink text-sm mb-1">
                پروفایل کامل = دیده شدن بیشتر
              </p>
              <p className="text-sm text-muted">
                هر چی پروفایلت کامل‌تر باشه، شرکت‌ها بیشتر بهت توجه می‌کنن.
                آواتار، اسم، بیو و مهارت‌ها رو جدی بگیر.
              </p>
            </div>
          </div>
        </div>

        {/* لینک‌ها */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/map"
            className="p-4 bg-paper border border-line rounded-xl2 hover:border-violet/30 hover:bg-bg transition-all text-center"
          >
            <div className="text-2xl mb-1">🗺️</div>
            <div className="font-bold text-sm text-ink">نقشه</div>
          </Link>
          <Link
            href="/medals"
            className="p-4 bg-paper border border-line rounded-xl2 hover:border-violet/30 hover:bg-bg transition-all text-center"
          >
            <div className="text-2xl mb-1">🏅</div>
            <div className="font-bold text-sm text-ink">مدال‌ها</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
