'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* عکس پس‌زمینه */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/20" />
      </div>

      {/* محتوا */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ستون متن */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-right"
          >
            {/* بج */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full text-xs font-semibold text-white mb-6 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              وایب جدید کاریابی
            </motion.div>

            {/* تیتر */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
              مسیر شغلی‌ت رو{' '}
              <span className="relative inline-block">
                <span className="relative z-10">گیم</span>
                <span className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-primary/70 -z-0 rounded-sm -rotate-1" />
              </span>{' '}
              کن،
              <br />
              شغلت رو{' '}
              <span className="relative inline-block">
                <span className="relative z-10">بزن بریم</span>
                <span className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-secondary/70 -z-0 rounded-sm rotate-1" />
              </span>{' '}
              کن!
            </h1>

            {/* زیرتیتر */}
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-xl mb-8 leading-relaxed drop-shadow-lg">
              دیگه کاریابی کرینج و خسته‌کننده نیست! یه نقشه گیم‌فای‌شده رو طی کن،
              مدال جمع کن، مهارت‌هات رو بسنج و مستقیم به شرکت‌های خفن وصل شو. 💅
            </p>

            {/* دکمه‌ها */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
              <Link
                href="/register"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5 text-center"
              >
                🎮 شروع فاز!
              </Link>
              <a
                href="#how"
                className="px-8 py-4 bg-white/15 backdrop-blur-md text-white border-2 border-white/30 rounded-full font-bold text-base hover:bg-white/25 transition-all text-center"
              >
                🗺️ چطور کار می‌کنه؟
              </a>
            </div>

            {/* آمار */}
            <div className="flex items-center gap-6 sm:gap-8 pt-6 border-t border-white/20">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">۱۲۰K+</div>
                <div className="text-xs sm:text-sm text-white/70">کارجوی فعال</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">۳۴۰+</div>
                <div className="text-xs sm:text-sm text-white/70">شرکت همکار</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">۹۲٪</div>
                <div className="text-xs sm:text-sm text-white/70">وایب مثبت</div>
              </div>
            </div>
          </motion.div>

          {/* ستون خالی */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* فید پایین */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}