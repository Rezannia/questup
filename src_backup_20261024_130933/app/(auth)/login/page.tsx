'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'خطا در ورود')
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
              خوش برگشتی 👋
            </h1>
            <p className="text-sm text-muted">
              وارد شو و از جایی که موندی ادامه بده
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
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
      در حال ورود...
    </span>
  ) : (
    'ورود'
  )}
</Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            حساب نداری؟{' '}
            <Link
              href="/register"
              className="font-semibold text-violet hover:underline"
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
