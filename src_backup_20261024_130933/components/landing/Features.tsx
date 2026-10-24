'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '🗺️',
    title: 'نقشه ۱۰ مرحله‌ای',
    desc: 'یه مسیر تعاملی از ساخت پروفایل تا دریافت آفر شغلی. هر مرحله رو باز کن و جلو برو — دقیقاً می‌دونی کجایی، حتی اگه سینگل باشی!',
    color: 'from-violet to-lilac',
    points: ['مرحله ۱ تا ۱۰', 'پیشرفت قابل ذخیره', 'باز شدن مرحله بعدی'],
  },
  {
    icon: '🏅',
    title: 'مدال و XP',
    desc: 'با هر مرحله، مدال بگیر و XP جمع کن. لِوِل‌ت رو بالا ببر و پیشرفتت رو ببین — دقیقاً مثل یه بازی، ولی باحال‌تر.',
    color: 'from-amber to-cherry',
    points: ['۱۰ مدال ویژه', 'لِوِل‌بندی', 'انیمیشن جذاب'],
  },
  {
    icon: '🏢',
    title: 'اتصال به شرکت‌ها',
    desc: 'مستقیم به شرکت‌های خفنی که دنبال استعدادهایی مثل توئن وصل شو. مدال‌هات بهترین معرف توئه — نه یه رزومه خز!',
    color: 'from-lime to-lime-deep',
    points: ['پیشنهاد مستقیم', 'بدون واسطه', 'پاسخ شفاف'],
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 bg-paper border border-line rounded-full text-xs font-semibold text-muted mb-4">
            ویژگی‌ها
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            چرا کوئست‌آپ؟
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            کاریابی سنتی حوصله‌سربره — خیلی خز شده. ما یه تجربه کاملاً متفاوت ساختیم.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-paper rounded-xl2 border border-line p-6 shadow-soft hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
                className={`w-14 h-14 rounded-xl2 bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4`}
              >
                {f.icon}
              </motion.div>
              <h3 className="text-lg font-extrabold text-ink mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4">
                {f.desc}
              </p>
              <ul className="space-y-1.5">
                {f.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-xs text-ink font-medium"
                  >
                    <span className="text-lime-deep">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
