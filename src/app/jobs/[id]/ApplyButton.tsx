'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ApplyButton({ jobId, isLoggedIn, isJobseeker }: { jobId: string; isLoggedIn: boolean; isJobseeker: boolean }) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  function handleClick() {
    if (!isLoggedIn) { router.push('/login'); return }
    if (!isJobseeker) { setStatus({ type: 'error', msg: 'فقط کارجوها می‌توانند درخواست بدهند' }); return }
    setShowModal(true)
  }

  async function handleSubmit() {
    if (message.trim().length < 10) { setStatus({ type: 'error', msg: 'پیام باید حداقل ۱۰ کاراکتر باشد' }); return }
    setSending(true); setStatus(null)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, message }),
      })
      const result = await res.json()
      if (!res.ok) { setStatus({ type: 'error', msg: result.error || 'خطا در ارسال' }); return }
      setStatus({ type: 'success', msg: 'درخواست شما ارسال شد' })
      setMessage('')
      setTimeout(() => { setShowModal(false); setStatus(null) }, 2000)
    } catch { setStatus({ type: 'error', msg: 'خطای شبکه' }) } finally { setSending(false) }
  }

  return (
    <>
      <button onClick={handleClick} className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 transition-opacity">
        ارسال درخواست
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => !sending && setShowModal(false)}>
          <div className="bg-background rounded-lg border border-border max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">پیام درخواست</h3>
              <button onClick={() => !sending && setShowModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="پیام خود را بنویسید..."
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none mb-1"
            />
            <p className="text-xs text-muted-foreground mb-4 text-left" dir="ltr">{message.length} / 500</p>

            {status && <div className={`mb-4 p-3 rounded-md text-sm border ${status.type === 'success' ? 'border-primary/30 bg-primary/5 text-primary' : 'border-destructive/30 bg-destructive/5 text-destructive'}`}>{status.msg}</div>}

            <div className="flex gap-3">
              <button onClick={handleSubmit} disabled={sending || message.trim().length < 10} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
                {sending ? 'در حال ارسال...' : 'ارسال'}
              </button>
              <button onClick={() => setShowModal(false)} disabled={sending} className="px-5 py-2.5 border border-border text-foreground rounded-md font-semibold text-sm hover:bg-secondary/30 transition-colors">
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}