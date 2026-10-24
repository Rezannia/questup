'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '۱',
    title: 'ثبت‌نام کن',
    desc: 'یه حساب بساز و نقش خودت رو انتخاب کن (کارجو یا شرکت). کمتر از ۱ دقیقه — بزن بریم!',
    icon: '✍️',
    color: 'from-violet to-lilac',
  },
  {
    num: '۲',
    title: 'نقشه رو طی کن',
    desc: 'مرحله به مرحله پیش برو، هر ایستگاه رو باز کن و مدال بگیر. ۱۰ مرحله تا موفقیت — خیلی خفنه!',
    icon: '🗺️',
    color: 'from-amber to-cherry',
  },
  {
    num: '۳',
    title: 'به شغل وصل شو',
    desc: 'با شرکت‌های هم‌وایب خودت آشنا شو، پیشنهاد بگیر و آفر قبول کن. بامرام‌ها همیشه پیدا می‌شن.',
    icon: '🚀',
    color: 'from-lime to-lime-deep',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-16 px-4 bg-paper border-y border-line">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 bg-bg border border-line rounded-full text-xs font-semibold text-muted mb-4">
            چطور کار می‌کنه؟
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            سه قدم تا شغل رویایی
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            ساده، سریع، و بدون استرس — دقیقاً همون چیزی که لازمی.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block absolute top-12 right-[16%] left-[16%] h-0.5 bg-gradient-to-l from-violet via-lilac to-lime-deep opacity-30 origin-right"
          />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-bg border-2 border-violet/30 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl text-white shadow-lg`}
                >
                  {s.icon}
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.2, type: 'spring' }}
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber text-ink font-extrabold text-sm flex items-center justify-center border-2 border-paper"
                >
                  {s.num}
                </motion.div>
              </div>
              <h3 className="text-lg font-extrabold text-ink mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet hover:text-violet-deep transition-colors"
          >
            <span>ویژگی‌های بیشتر</span>
            <span>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
