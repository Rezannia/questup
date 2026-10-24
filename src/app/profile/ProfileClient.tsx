'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  name: string
  email: string
  role: 'JOBSEEKER' | 'COMPANY' | 'ADMIN'
  bio: string | null
  skills: string | null
}

interface ProfileData {
  user: User
}

const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<ProfileData>

export default function ProfileClient() {
  const { data, mutate, isLoading } = useSWR('/api/profile', fetcher)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({ name: '', bio: '' })

  useEffect(() => {
    if (data?.user) {
      setForm({ name: data.user.name, bio: data.user.bio || '' })
    }
  }, [data])

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()
      if (!res.ok) { setError(result.error || 'خطا در ذخیره'); return }
      await mutate()
      setEditing(false)
      setSuccess('اطلاعات ذخیره شد')
      setTimeout(() => setSuccess(''), 3000)
    } catch { setError('خطای شبکه') } finally { setSaving(false) }
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">در حال بارگذاری...</p>
      </div>
    )
  }

  const { user } = data

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">داشبورد</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">حساب کاربری</p>
            <h1 className="text-4xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          {!editing && (
            <Button variant="outline" onClick={() => setEditing(true)}>
              ویرایش
            </Button>
          )}
        </div>

        {success && <div className="mb-6 p-3 border border-primary/30 bg-primary/5 rounded-md text-sm text-primary">{success}</div>}
        {error && <div className="mb-6 p-3 border border-destructive/30 bg-destructive/5 rounded-md text-sm text-destructive">{error}</div>}

        {/* Info */}
        {!editing ? (
          <div className="space-y-8 border-t border-border pt-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">نقش</p>
              <p className="font-semibold text-foreground">
                {user.role === 'JOBSEEKER' ? 'کارجو' : 'شرکت'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">درباره من</p>
              <p className="text-foreground leading-relaxed">
                {user.bio || 'هنوز توضیحی اضافه نکرده‌اید.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-2">
              <Label htmlFor="name">نام</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">درباره من</Label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                maxLength={300}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
              />
              <p className="text-xs text-muted-foreground">{form.bio.length} / 300</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'در حال ذخیره...' : 'ذخیره'}
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
                انصراف
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}