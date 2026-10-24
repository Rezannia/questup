'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await res.json()

      if (!res.ok) {
        setStatus({ type: 'error', msg: result.error || 'خطا در ارسال' })
        return
      }

      setStatus({
        type: 'success',
        msg: 'پیام شما دریافت شد! به زودی پاسخ می‌دیم. ✨',
      })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({ type: 'error', msg: 'خطای شبکه. دوباره تلاش کنید.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* هدر */}
      <header className="bg-paper border-b border-line sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-lg">
              🎮
            </div>
            <span className="font-bold text-ink">کوئست‌آپ</span>
          </Link>
          <nav className="flex items-center gap-3">
            <a href="#story" className="hidden sm:block text-sm text-muted hover:text-ink">
              داستان ما
            </a>
            <a href="#values" className="hidden sm:block text-sm text-muted hover:text-ink">
              ارزش‌ها
            </a>
            <a href="#contact" className="hidden sm:block text-sm text-muted hover:text-ink">
              تماس
            </a>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-violet text-white rounded-full font-semibold text-sm hover:bg-violet-deep transition-all"
              >
                داشبورد
              </Link>
            ) : (
              <Link
                href="/register"
                className="px-4 py-2 bg-violet text-white rounded-full font-semibold text-sm hover:bg-violet-deep transition-all"
              >
                شروع رایگان
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero — با عکس لنداسکیپ */}
      <section className="relative w-full overflow-hidden">
        {/* عکس پس‌زمینه */}
        <div className="absolute inset-0">
          <img
  src="/about-bg.png"
  alt=""
  className="w-full h-full object-cover"
/>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/20" />
        </div>

        {/* محتوا */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-right"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full text-xs font-semibold text-white mb-6 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cherry animate-pulse" />
                داستان ما
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                کاریابی قرار نیست{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">کرینج</span>
                  <span className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-amber/70 -z-0 rounded-sm -rotate-1" />
                </span>{' '}
                باشه.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-xl mb-8 leading-relaxed drop-shadow-lg">
                ما یه تیم کوچیک از آدم‌هایی هستیم که خودمون توی همین مسیر بودیم — بدون نقشه، بدون راهنما، فقط با یه رزومه و کلی استرس. حالا اومدیم یه مسیر باحال‌تر بسازیم.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#story"
                  className="px-8 py-4 bg-violet text-white rounded-full font-bold text-base hover:bg-violet-deep transition-all shadow-2xl hover:-translate-y-0.5 text-center"
                >
                  📖 داستان ما
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-white/15 backdrop-blur-md text-white border-2 border-white/30 rounded-full font-bold text-base hover:bg-white/25 transition-all text-center"
                >
                  💬 تماس با ما
                </a>
              </div>
            </motion.div>

            <div className="hidden lg:block" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* داستان */}
      <section id="story" className="px-4 -mt-16 relative z-20 mb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-paper rounded-xl2 border border-line shadow-soft p-6 sm:p-10"
          >
            <div className="inline-block px-3 py-1 bg-amber/10 border border-amber/30 rounded-full text-xs font-bold text-amber-deep mb-4">
              چرا کوئست‌آپ؟
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-4">
              از یه مشکل واقعی شروع شد
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>وقتی خودمون دنبال کار بودیم، این سوالا رو داشتیم:</p>
              <ul className="space-y-2 pr-2">
                <li className="flex items-start gap-2">
                  <span className="text-cherry mt-1">✗</span>
                  <span>از کجا شروع کنم؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cherry mt-1">✗</span>
                  <span>چرا هیچ‌کس جواب ایمیل‌هام رو نمی‌ده؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cherry mt-1">✗</span>
                  <span>چطور بفهمم برای چه شغلی مناسبه‌ام؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cherry mt-1">✗</span>
                  <span>چرا حس می‌کنم هیچ‌کس من رو نمی‌بینه؟</span>
                </li>
              </ul>
              <p className="pt-4">
                <strong className="text-ink">کوئست‌آپ</strong> جواب این سوالاست. یه مسیر واضح، گام‌به‌گام، با انگیزه و پاداش. جایی که هر قدمت دیده می‌شه و هر پیشرفتت جشن گرفته می‌شه. حتی اگه یه روز پَکَر شدی یا لش بودی، ما کنارتم — بزن بریم!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section id="values" className="py-16 px-4 bg-paper border-y border-line">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-bg border border-line rounded-full text-xs font-semibold text-muted mb-4">
              ارزش‌های ما
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
              چی برامون مهمه
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              این سه اصل، همه‌ی تصمیم‌های ما رو شکل می‌ده.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '🤝',
                title: 'انسان‌محوری',
                desc: 'هر کاربر یه داستانه، نه یه عدد. ما به پیشرفت هر کس اهمیت می‌دیم — چه سینگل باشه، چه رل.',
                color: 'from-violet to-lilac',
              },
              {
                icon: '🎯',
                title: 'شفافیت',
                desc: 'بدون وعده‌های الکی و فیک. مسیر واضحه، معیارها روشنه، و نتیجه واقعیه.',
                color: 'from-amber to-cherry',
              },
              {
                icon: '💪',
                title: 'انگیزه‌بخشی',
                desc: 'جشن گرفتن هر پیروزی کوچیک، و همراهی توی سختی‌ها. چون همه گاهی پَکَر می‌شن.',
                color: 'from-lime to-lime-deep',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-bg rounded-xl2 border border-line p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl2 bg-gradient-to-br ${v.color} flex items-center justify-center text-2xl mb-4`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-extrabold text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* آمار */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">
              کوئست‌آپ در یک نگاه
            </h2>
            <p className="text-muted">اعداد پشت این مسیر</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '۱۲۰K+', label: 'کارجوی فعال', color: 'text-violet' },
              { num: '۳۴۰+', label: 'شرکت همکار', color: 'text-cherry' },
              { num: '۱۰', label: 'مرحله مسیر', color: 'text-lime-deep' },
              { num: '۹۲٪', label: 'وایب مثبت کاربرا', color: 'text-pink' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-paper rounded-xl2 border border-line p-6 text-center shadow-soft"
              >
                <div className={`text-3xl sm:text-4xl font-extrabold ${s.color} mb-1`}>
                  {s.num}
                </div>
                <div className="text-xs sm:text-sm text-muted font-semibold">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* تماس */}
      <section id="contact" className="py-16 px-4 bg-paper border-t border-line">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-block px-3 py-1 bg-bg border border-line rounded-full text-xs font-semibold text-muted mb-4">
              تماس با ما
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
              حرفی داری؟ بشنویم 🎧
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              سوال، پیشنهاد، انتقاد، یا حتی فقط یه سلام — همه رو خوشحال می‌شیم بشنویم. اگه هم پَکَر شدی، حرف بزن.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="bg-bg rounded-xl2 border border-line p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">نام</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        minLength={2}
                        className="w-full px-4 py-3 rounded-xl2 border border-line bg-paper text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
                        placeholder="اسمت چیه؟"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">ایمیل</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl2 border border-line bg-paper text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">موضوع</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      minLength={3}
                      className="w-full px-4 py-3 rounded-xl2 border border-line bg-paper text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10"
                      placeholder="مثلاً: پیشنهاد همکاری"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">پیام</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      minLength={10}
                      maxLength={1000}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl2 border border-line bg-paper text-ink outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 resize-none"
                      placeholder="هر چی می‌خوای بگو..."
                    />
                    <p className="text-xs text-muted mt-1 text-left" dir="ltr">
                      {form.message.length} / 1000
                    </p>
                  </div>

                  {status && (
                    <div
                      className={`p-3 rounded-xl2 text-sm ${
                        status.type === 'success'
                          ? 'bg-lime/20 border border-lime/50 text-lime-deep'
                          : 'bg-cherry/10 border border-cherry/30 text-cherry'
                      }`}
                    >
                      {status.msg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 bg-violet text-white rounded-xl2 font-bold hover:bg-violet-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ارسال...
                      </>
                    ) : (
                      '📨 ارسال پیام'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="bg-bg rounded-xl2 border border-line p-4">
                <div className="text-2xl mb-2">📧</div>
                <p className="text-xs text-muted mb-1">ایمیل</p>
                <p className="text-sm font-bold text-ink" dir="ltr">hello@questup.app</p>
              </div>
              <div className="bg-bg rounded-xl2 border border-line p-4">
                <div className="text-2xl mb-2">💬</div>
                <p className="text-xs text-muted mb-1">پاسخگویی</p>
                <p className="text-sm font-bold text-ink">ظرف ۲۴ ساعت — قول می‌دیم!</p>
              </div>
              <div className="bg-bg rounded-xl2 border border-line p-4">
                <div className="text-2xl mb-2">🌍</div>
                <p className="text-xs text-muted mb-1">شبکه‌های اجتماعی</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-lg" title="اینستاگرام">📸</span>
                  <span className="text-lg" title="توییتر">🐦</span>
                  <span className="text-lg" title="لینکدین">💼</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA پایانی */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-violet via-violet-soft to-violet-deep rounded-3xl p-8 sm:p-12 text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-lime/20 rounded-full blur-2xl" />

            <div className="relative">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                آماده‌ای شروع کنی؟
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                همین حالا ثبت‌نام کن، اولین مدالت رو بگیر و مسیرت رو به سمت شغل رویایی‌ت بزن بریم. سینگل بودن هم عیب نداره — این مسیر مال خودته!
              </p>
              <Link
                href={isLoggedIn ? '/dashboard' : '/register'}
                className="inline-block px-8 py-4 bg-amber text-ink rounded-full font-extrabold text-base hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {isLoggedIn ? '🎯 برو به داشبورد' : '🎮 شروع رایگان'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-sm">
              🎮
            </div>
            <span className="font-bold text-ink text-sm">کوئست‌آپ</span>
          </Link>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} کوئست‌آپ. همه حقوق محفوظه.
          </p>
          <div className="flex gap-3 text-sm">
            <Link href="/" className="text-muted hover:text-violet">خانه</Link>
            <Link href={isLoggedIn ? '/dashboard' : '/register'} className="text-muted hover:text-violet">
              {isLoggedIn ? 'داشبورد' : 'ثبت‌نام'}
            </Link>
            <Link href="/about" className="text-violet font-bold">درباره ما</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
