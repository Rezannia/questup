'use client'

import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
          آماده‌ای مسیر حرفه‌ای‌ات را شروع کنی؟
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          همین حالا ثبت‌نام کن، مهارت‌هایت را بسنج و به فرصت‌های واقعی متصل شو.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold text-base hover:opacity-90 transition-opacity"
          >
            شروع رایگان
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-foreground font-semibold text-base hover:text-primary transition-colors"
          >
            ورود ←
          </Link>
        </div>
      </div>
    </section>
  )
}