'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function ApplyButton({
  jobId,
  isLoggedIn,
  isJobseeker,
}: {
  jobId: string
  isLoggedIn: boolean
  isJobseeker: boolean
}) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const TEMPLATES = [
    'سلام! پروفایل و مهارت‌های اثبات‌شده من با نیازهای این موقعیت هماهنگه. خوشحال می‌شم بیشتر آشنا بشیم.',
    'سلام! خیلی به این موقعیت علاقه‌مندم. تجربه و مهارت‌هام رو توی کوئست‌آپ اثبات کردم و آماده‌ام. بزن بریم!',
    'سلام! فکر می‌کنم برای این نقش مناسب باشم. دوست دارم درباره‌ی پروژه‌ها و تیم بیشتر بدونم.',
  ]

  function handleClick() {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    if (!isJobseeker) {
      setStatus({ type: 'error', msg: 'فقط کارجوها می‌تونن درخواست بدن' })
      return
    }
    setShowModal(true)
  }

  async function handleSubmit() {
    if (message.trim().length < 10) {
      setStatus({ type: 'error', msg: 'پیام باید حداقل ۱۰ کاراکتر باشد' })
      return
    }

    setSending(true)
    setStatus(null)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, message }),
      })

      const result = await res.json()

      if (!res.ok) {
        setStatus({ type: 'error', msg: result.error || 'خطا در ارسال' })
        return
      }

      setStatus({ type: 'success', msg: 'درخواستت ارسال شد! ✓' })
      setMessage('')
      setTimeout(() => {
        setShowModal(false)
        setStatus(null)
      }, 2000)
    } catch {
      setStatus({ type: 'error', msg: 'خطای شبکه' })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full py-3 bg-gradient-to-r from-violet to-violet-deep text-white rounded-xl2 font-extrabold hover:opacity-90 transition-all shadow-soft hover:shadow-lg"
      >
        🎯 درخواست برای این شغل
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !sending && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-paper rounded-2xl border border-line shadow-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-extrabold text-ink mb-3">
                📨 پیام درخواست
              </h3>

              <div className="mb-3">
                <p className="text-xs font-bold text-ink mb-2">متن‌های آماده:</p>
                <div className="space-y-1.5">
                  {TEMPLATES.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(t)}
                      className="w-full text-right text-xs p-2 rounded-lg bg-bg border border-line hover:border-violet/30 transition-all"
                    >
                      {t.slice(0, 60)}...
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={500}
                placeholder="پیامت رو بنویس یا از متن‌های آماده انتخاب کن..."
                className="w-full px-4 py-3 rounded-xl2 border border-line bg-bg text-ink text-sm outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 resize-none mb-1"
              />
              <p className="text-xs text-muted mb-3 text-left" dir="ltr">
                {message.length} / 500
              </p>

              {status && (
                <div
                  className={`mb-3 p-3 rounded-xl2 text-sm ${
                    status.type === 'success'
                      ? 'bg-lime/20 border border-lime/50 text-lime-deep'
                      : 'bg-cherry/10 border border-cherry/30 text-cherry'
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={sending || message.trim().length < 10}
                  className="flex-1 py-3 bg-violet text-white rounded-xl2 font-bold hover:bg-violet-deep disabled:opacity-50 transition-all"
                >
                  {sending ? 'در حال ارسال...' : '📨 ارسال درخواست'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={sending}
                  className="px-6 py-3 bg-bg border border-line text-ink rounded-xl2 font-bold hover:bg-line transition-all"
                >
                  انصراف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}