'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'سارا محمدی',
    role: 'کارجوی فناوری',
    avatar: '👩‍💻',
    quote: 'قبلاً نمی‌دونستم از کجا شروع کنم. نقشه کوئست‌آپ مثل یه GPS بود که قدم‌به‌قدم من رو جلو برد. الان توی یه استارتاپ کار می‌کنم و وایبم عالیه!',
    rating: 5,
    color: 'from-violet to-lilac',
  },
  {
    name: 'امیر رضایی',
    role: 'طراح UI/UX',
    avatar: '👨‍🎨',
    quote: 'مدال‌ها و XP باعث می‌شد انگیزه‌ام رو حفظ کنم. وقتی ۱۰ مرحله رو تموم کردم، حس کردم واقعاً یه چیزی رو فتح کردم. خیلی خفن بود!',
    rating: 5,
    color: 'from-amber to-cherry',
  },
  {
    name: 'نگار کریمی',
    role: 'مدیر منابع انسانی',
    avatar: '👩‍💼',
    quote: 'به عنوان شرکت، مدال‌ها و XP کارجوها بهترین معیار برای ما بود. خیلی بهتر از یه رزومه خشک و خالی. اینطوری بامرام‌ها رو هم پیدا می‌کنیم.',
    rating: 5,
    color: 'from-lime to-lime-deep',
  },
]

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-paper border-y border-line">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 bg-bg border border-line rounded-full text-xs font-semibold text-muted mb-4">
            نظرات کاربران
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            آدم‌هایی که مسیر رو رفتن
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            داستان‌های واقعی از کارجوها و شرکت‌هایی که کوئست‌آپ رو انتخاب کردن.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-bg rounded-xl2 border border-line p-6 hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-3 left-3 text-5xl text-violet/10 font-serif leading-none select-none">
                "
              </div>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-ink leading-relaxed mb-6 relative z-10">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
