'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    id: 'gaming',
    title: 'گیمینگ و استریم',
    desc: 'استریمر، بازی‌ساز، eSports',
    icon: '🎮',
    image: '/gaming.png',
    tag: '⚡ نئون',
    tagColor: 'bg-fuchsia-500 text-white',
    glow: 'rgba(217, 70, 239, 0.6)',
    buttonClass: 'bg-fuchsia-500 text-white border-fuchsia-400 hover:bg-fuchsia-400',
  },
  {
    id: 'coffee',
    title: 'کافه و باریستا',
    desc: 'باریستا، لاته آرت',
    icon: '☕',
    image: '/coffee.jpg',
    tag: '☕ دنج',
    tagColor: 'bg-amber-800 text-amber-50',
    glow: 'rgba(217, 119, 6, 0.4)',
    buttonClass: 'bg-amber-800 text-amber-50 border-amber-700 hover:bg-amber-900',
  },
  {
    id: 'beauty',
    title: 'بیوتی و آرایش',
    desc: 'میکاپ، اسکین‌کر',
    icon: '💄',
    image: '/beauty.jpg',
    tag: '💖 محبوب',
    tagColor: 'bg-rose-600 text-white',
    glow: 'rgba(244, 114, 182, 0.6)',
    buttonClass: 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700',
  },
  {
    id: 'restaurant',
    title: 'رستوران و آشپزی',
    desc: 'سرآشپز، گارسون، پیک',
    icon: '🍽️',
    image: '/restaurant.jpg',
    tag: '🔥 داغ',
    tagColor: 'bg-white text-red-600',
    glow: 'rgba(251, 146, 60, 0.7)',
    buttonClass: 'bg-yellow-300 text-red-800 border-yellow-400 hover:bg-white',
  },
]

export function JobCategories() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-paper border border-line rounded-full text-xs font-semibold text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
            دنیای شغل‌ها
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink mb-3 leading-tight">
            چهار دنیای{' '}
            <span className="bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              کاملاً متفاوت
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            هر کدوم یه شخصیت، یه حس، یه دنیا. کدومش مال خودته؟
          </p>
        </motion.div>

        {/* ۴ کارت در یک خط */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <Link
                href={`/jobs?category=${cat.id}`}
                className="block group relative rounded-3xl overflow-hidden h-80 sm:h-[420px] border border-line shadow-soft hover:shadow-2xl transition-all"
              >
                {/* عکس پس‌زمینه */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.glow}, transparent 70%)`,
                  }}
                />

                {/* تگ بالا-راست */}
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`inline-block px-3 py-1 ${cat.tagColor} text-[10px] sm:text-[11px] font-bold rounded-full shadow-lg`}
                  >
                    {cat.tag}
                  </span>
                </div>

                {/* محتوا */}
                <div className="relative h-full p-5 flex flex-col justify-between z-10">
                  {/* آیکون */}
                  <motion.div
                    whileHover={{ rotate: -10, scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl sm:text-6xl drop-shadow-2xl"
                  >
                    {cat.icon}
                  </motion.div>

                  {/* متن پایین */}
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl mb-1 text-white drop-shadow-lg">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3 text-white/80">
                      {cat.desc}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 font-bold text-xs px-3 py-1.5 rounded-full border-2 transition-all ${cat.buttonClass}`}
                    >
                      <span>بزن بریم</span>
                      <span className="group-hover:translate-x-1 transition-transform">←</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/jobs"
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-500 text-white rounded-full font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              🎯 دیدن همه مشاغل
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 bg-paper text-ink border border-line rounded-full font-bold hover:border-fuchsia-300 hover:bg-bg transition-all"
            >
              🎮 شروع مسیر خودت
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
