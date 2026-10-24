'use client'

import { motion } from 'framer-motion'

const stats = [
  { num: '۱۲۰K+', label: 'کارجوی فعال', color: 'text-violet', icon: '👥' },
  { num: '۳۴۰+', label: 'شرکت همکار', color: 'text-cherry', icon: '🏢' },
  { num: '۱۰', label: 'مدال خفن', color: 'text-lime-deep', icon: '🏅' },
  { num: '۹۲٪', label: 'وایب مثبت کاربرا', color: 'text-pink', icon: '💚' },
]

export function Stats() {
  return (
    <section id="stats" className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-paper rounded-xl2 border border-line p-6 text-center shadow-soft hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-3xl sm:text-4xl font-extrabold ${s.color} mb-1`}>
                {s.num}
              </div>
              <div className="text-xs sm:text-sm text-muted font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
