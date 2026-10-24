'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'کوئست‌آپ رایگانه؟',
    a: 'بله! همه‌ی مراحل، مدال‌ها و ابزارها کاملاً رایگان‌اند. ما معتقدیم که هیچ‌کس نباید برای شروع مسیر شغلی‌اش پول بده.',
  },
  {
    q: 'چطور می‌تونم شروع کنم؟',
    a: 'فقط کافیه ثبت‌نام کنی (کمتر از ۱ دقیقه)، نقش خودت رو انتخاب کنی (کارجو یا شرکت) و وارد نقشه ۱۰ مرحله‌ای بشی. هر مرحله رو که تکمیل کنی، یه مدال و XP می‌گیری. بزن بریم!',
  },
  {
    q: 'مدال‌ها و XP چه فایده‌ای دارن؟',
    a: 'مدال‌ها معیار واقعی پیشرفت و تعهد هستن. شرکت‌ها می‌تونن این‌ها رو ببینن و بفهمن که تو واقعاً روی خودت کار کردی — نه فقط یه رزومه فرستادی. این خیلی ارزشمندتر از کلمات تو رزومه‌ست.',
  },
  {
    q: 'چطور یه شرکت می‌تونه با کوئست‌آپ همکاری کنه؟',
    a: 'شرکت‌ها می‌تونن ثبت‌نام کنن، پروفایل شرکت بسازن، کارجوها رو ببینن (با XP و مدال‌هاشون) و پیشنهاد شغلی بفرستن. اینطوری استعدادهای واقعی رو پیدا می‌کنن — بامرام‌ها رو نمی‌شه از دست داد.',
  },
  {
    q: 'آیا داده‌های من محفوظه؟',
    a: 'کاملاً. ما از پروتکل‌های امنیتی استاندارد استفاده می‌کنیم و اطلاعات شخصی تو هرگز با شخص سوم به اشتراک گذاشته نمی‌شه. پروفایلت فقط برای شرکت‌هایی که پیشنهاد می‌فرستن قابل دیدن‌ه.',
  },
  {
    q: 'مراحل چقدر طول می‌کشن؟',
    a: 'کاملاً به خودت بستگی داره. می‌تونی توی یه روز همه رو تموم کنی یا هر روز یه مرحله. هیچ عجله‌ای نیست — این مسیر مال خودته. اگه لش شدی، فردا ادامه بده!',
  },
  {
    q: 'اگه یه مرحله رو نتونم کامل کنم چی؟',
    a: 'هیچ فشاری نیست. می‌تونی برگردی، دوباره تلاش کنی، یا از منابع و آموزش‌های ما استفاده کنی. ما همیشه کنارتم — پَکَر نشو!',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-card border border-border rounded-full text-xs font-semibold text-muted-foreground mb-4">
            سوالات متداول
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            هر چی می‌خوای بدونی
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            اگه جوابت رو پیدا نکردی، از صفحه تماس با ما بپرس.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card rounded-lg border border-border overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-right p-5 flex items-center justify-between gap-3 hover:bg-background transition-colors"
                >
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
