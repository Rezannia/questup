'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AboutClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: 'تماس از صفحه درباره ما' }),
      })
      const result = await res.json()
      if (!res.ok) { setStatus({ type: 'error', msg: result.error || 'خطا' }); return }
      setStatus({ type: 'success', msg: 'پیام شما دریافت شد. به زودی پاسخ می‌دهیم.' })
      setForm({ name: '', email: '', message: '' })
    } catch { setStatus({ type: 'error', msg: 'خطای شبکه' }) } finally { setSending(false) }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-foreground font-medium">درباره ما</Link>
            {isLoggedIn ? (
              <Link href="/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">داشبورد</Link>
            ) : (
              <Link href="/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">شروع رایگان</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-20">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">درباره ما</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-8">
            کاریابی باید
            <br />
            <span className="text-primary">شفاف</span> و
            <span className="text-primary"> منصفانه</span> باشد.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            کوئست‌آپ با این باور ساخته شد که هر کسی حق دارد مسیر حرفه‌ای خود را با اطلاعات کافی و ابزارهای درست انتخاب کند.
          </p>
        </div>

        {/* Story */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">داستان ما</h2>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              وقتی خودمان در حال جستجوی کار بودیم، با سوالات زیادی روبه‌رو شدیم: از کجا شروع کنیم؟ چطور مهارت‌هایمان را اثبات کنیم؟ چطور بفهمیم یک شرکت برای ما مناسب است یا نه؟
            </p>
            <p>
              پاسخ این سوالات پراکنده بود و پیدا کردنشان زمان و انرژی زیادی می‌گرفت. بنابراین تصمیم گرفتیم پلتفرمی بسازیم که این مسیر را شفاف، قابل اندازه‌گیری و منصفانه کند.
            </p>
            <p>
              کوئست‌آپ امروز ابزاری است برای کارجویان و شرکت‌هایی که به جای رزومه‌های کلیشه‌ای، به دنبال مهارت‌های واقعی و پیشرفت قابل اثبات هستند.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8">ارزش‌های ما</h2>
          <div className="space-y-8">
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">شفافیت</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                اطلاعات باید روشن و قابل دسترس باشد. هیچ وعده‌ای بدون پشتوانه نمی‌دهیم.
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">انصاف</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                فرصت‌ها باید بر اساس شایستگی و مهارت واقعی توزیع شوند، نه بر اساس شبکه‌های شخصی.
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">احترام</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                هر کاربر، چه کارجو و چه شرکت، شایسته رفتار محترمانه و ابزارهای باکیفیت است.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">تماس با ما</h2>
          <p className="text-base text-muted-foreground mb-8">
            سوال، پیشنهاد یا انتقادی دارید؟ برای ما بنویسید.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">نام</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">ایمیل</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  dir="ltr"
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">پیام</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
              />
            </div>

            {status && (
              <div className={`p-3 rounded-md text-sm border ${status.type === 'success' ? 'border-primary/30 bg-primary/5 text-primary' : 'border-destructive/30 bg-destructive/5 text-destructive'}`}>
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {sending ? 'در حال ارسال...' : 'ارسال پیام'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-foreground">کوئست‌آپ</span>
          </Link>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} کوئست‌آپ. همه حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  )
}