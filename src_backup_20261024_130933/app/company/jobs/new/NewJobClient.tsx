'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NewJobClient() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: 'تهران',
    type: 'full-time',
    level: 'mid',
    salary: '',
    skills: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const skillsArray = form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const res = await fetch('/api/company/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          skills: skillsArray,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'خطا در ذخیره')
        return
      }

      router.push('/company/jobs')
      router.refresh()
    } catch {
      setError('خطای شبکه. دوباره تلاش کنید.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg pb-12">
      <header className="bg-paper border-b border-line sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/company/jobs" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-lg">
              💼
            </div>
            <span className="font-bold text-ink">پست شغل جدید</span>
          </Link>
          <Link href="/company/jobs" className="text-sm text-muted hover:text-ink">
            ← برگشت
          </Link>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 pt-6"
      >
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-1">
            شغل جدید پست کن 💼
          </h1>
          <p className="text-sm text-muted">
            کارجوها این شغل رو توی صفحه اول می‌بینن.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-paper rounded-xl2 border border-line shadow-soft p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              عنوان شغل *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              minLength={3}
              maxLength={100}
              placeholder="مثلاً: برنامه‌نویس Frontend"
              className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              توضیحات *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              placeholder="درباره شغل، مسئولیت‌ها، شرایط و مزایا بنویس..."
              className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 resize-none"
            />
            <p className="text-xs text-muted mt-1 text-left" dir="ltr">
              {form.description.length} / 2000
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                مکان
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                maxLength={50}
                placeholder="تهران"
                className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                نوع شغل
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              >
                <option value="full-time">تمام‌وقت</option>
                <option value="part-time">پاره‌وقت</option>
                <option value="remote">دورکاری</option>
                <option value="contract">پیمانی</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                سطح تجربه
              </label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              >
                <option value="junior">جونیور (۰-۲ سال)</option>
                <option value="mid">مید (۲-۵ سال)</option>
                <option value="senior">سنیور (۵+ سال)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                حقوق (اختیاری)
              </label>
              <input
                type="text"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                maxLength={50}
                placeholder="مثلاً: ۲۵-۳۵ میلیون تومان"
                className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              مهارت‌ها (با کاما جدا کن)
            </label>
            <input
              type="text"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="React, TypeScript, Tailwind"
              className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
            />
            <p className="text-xs text-muted mt-1">
              مثال: React, TypeScript, Tailwind
            </p>
          </div>

          {error && (
            <div className="bg-cherry/10 border border-cherry/30 rounded-xl2 p-3 text-sm text-cherry">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-violet text-white rounded-xl2 font-bold hover:bg-violet-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                '✅ پست شغل'
              )}
            </button>
            <Link
              href="/company/jobs"
              className="px-6 py-3 bg-bg border border-line text-ink rounded-xl2 font-semibold hover:bg-line transition-all text-center"
            >
              انصراف
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
