'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '۰۱',
    title: 'ثبت‌نام کن',
    desc: 'یه حساب بساز و نقش خودت را انتخاب کن (کارجو یا شرکت).',
  },
  {
    num: '۰۲',
    title: 'مهارت‌هایت را بسنج',
    desc: 'با چالش‌های واقعی، مهارت‌هایت را اثبات کن و پیشرفتت را ببین.',
  },
  {
    num: '۰۳',
    title: 'به فرصت‌ها متصل شو',
    desc: 'با شرکت‌های مناسب آشنا شو و درخواست بفرست.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">فرآیند</p>
          <h2 className="text-4xl font-bold text-foreground">سه قدم تا شروع</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t-2 border-border pt-6"
            >
              <div className="text-3xl font-bold text-primary mb-4">{s.num}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}