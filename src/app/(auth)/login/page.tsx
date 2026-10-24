'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-12">
          <span className="text-2xl">🎮</span>
          <span className="font-bold text-xl text-foreground">کوئست‌آپ</span>
        </Link>

        {/* Form */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ثبت‌نام</h1>
          <p className="text-sm text-muted-foreground">
            یه حساب بسازید و مسیر حرفه‌ای‌تان را شروع کنید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selector */}
          <div className="space-y-2">
            <Label>نقش شما</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'JOBSEEKER' })}
                className={`p-3 rounded-md border text-right transition-colors ${
                  form.role === 'JOBSEEKER'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="font-semibold text-sm text-foreground">کارجو</div>
                <div className="text-xs text-muted-foreground mt-1">دنبال فرصت شغلی</div>
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'COMPANY' })}
                className={`p-3 rounded-md border text-right transition-colors ${
                  form.role === 'COMPANY'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="font-semibold text-sm text-foreground">شرکت</div>
                <div className="text-xs text-muted-foreground mt-1">دنبال استعداد</div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">نام و نام خانوادگی</Label>
            <Input
              id="name"
              type="text"
              placeholder="مثلاً علی رضایی"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              minLength={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">پسورد</Label>
            <Input
              id="password"
              type="password"
              placeholder="حداقل ۸ کاراکتر"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
              dir="ltr"
            />
          </div>

          {error && (
            <div className="p-3 border border-destructive/50 bg-destructive/5 rounded-md text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'در حال ساخت...' : 'ساخت حساب'}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-8">
          قبلاً ثبت‌نام کردید؟{' '}
          <Link href="/login" className="text-foreground font-medium hover:text-primary transition-colors">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  )
}