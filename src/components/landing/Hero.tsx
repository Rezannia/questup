'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative py-24 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Eyebrow */}
          <p className="text-sm font-medium text-primary mb-6 uppercase tracking-wider">
            پلتفرم استخدام نسل جدید
          </p>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-8">
            مسیر شغلی‌ات را
            <br />
            <span className="text-primary">شفاف</span> و
            <span className="text-primary"> هدفمند</span> بساز.
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10">
            کوئست‌آپ به شما کمک می‌کند مهارت‌هایتان را بسنجید، با شرکت‌های مناسب آشنا شوید و مسیر حرفه‌ای خود را با اطمینان طی کنید.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:opacity-90 transition-opacity"
            >
              شروع رایگان
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 text-foreground font-semibold text-base hover:text-primary transition-colors"
            >
              ورود به حساب ←
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border max-w-xl">
            <div>
              <div className="text-3xl font-bold text-foreground">۱۲۰K+</div>
              <div className="text-sm text-muted-foreground mt-1">کارجو</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">۳۴۰+</div>
              <div className="text-sm text-muted-foreground mt-1">شرکت</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">۹۲٪</div>
              <div className="text-sm text-muted-foreground mt-1">رضایت</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}