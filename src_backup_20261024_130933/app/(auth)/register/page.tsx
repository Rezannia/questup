'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RoleSelector } from '@/components/ui/RoleSelector'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'JOBSEEKER' as 'JOBSEEKER' | 'COMPANY',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'خطا در ثبت‌نام')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('خطای شبکه. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-xl">
              🎮
            </div>
            <span className="font-bold text-xl text-ink">QuestUp</span>
          </Link>
        </div>

        <div className="bg-paper rounded-xl2 shadow-soft p-8 border border-line">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-ink mb-2">
              خوش اومدی 👋
            </h1>
            <p className="text-sm text-muted">
              یه حساب بساز و مسیر شغلی‌ت رو شروع کن
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <RoleSelector
              value={form.role}
              onChange={(role) => setForm({ ...form, role })}
            />

            <Input
              label="نام و نام خانوادگی"
              type="text"
              placeholder="علی رضایی"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              minLength={2}
            />

            <Input
              label="ایمیل"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              dir="ltr"
            />

            <Input
              label="پسورد"
              type="password"
              placeholder="حداقل ۸ کاراکتر"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
              dir="ltr"
            />

            {error && (
              <div className="bg-cherry/10 border border-cherry/30 rounded-xl2 p-3 text-sm text-cherry">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
  {loading ? (
    <span className="flex items-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      در حال ساخت...
    </span>
  ) : (
    'ساخت حساب'
  )}
</Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            قبلاً ثبت‌نام کردی؟{' '}
            <Link
              href="/login"
              className="font-semibold text-violet hover:underline"
            >
              ورود
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          با ثبت‌نام، شرایط استفاده و حریم خصوصی را می‌پذیرید.
        </p>
      </div>
    </div>
  )
}
