import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import ApplyButton from './ApplyButton'

const WORK_MODE: Record<string, string> = { onsite: 'حضوری', hybrid: 'ترکیبی', remote: 'دورکاری' }
const TYPE: Record<string, string> = { 'full-time': 'تمام‌وقت', 'part-time': 'پاره‌وقت', remote: 'دورکاری', contract: 'پیمانی' }
const LEVEL: Record<string, string> = { junior: 'جونیور', mid: 'میانی', senior: 'ارشد' }

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  const job = await db.job.findUnique({ where: { id }, include: { company: true } })

  if (!job || !job.active) notFound()

  const skills = job.skills ? JSON.parse(job.skills) : []

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/jobs" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← همه مشاغل</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Job Header */}
        <div className="mb-10 pb-8 border-b border-border">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg border border-border bg-background flex items-center justify-center text-3xl">{job.company.logo || '🏢'}</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
              <Link href={`/companies/${job.company.id}`} className="text-sm text-primary hover:underline">{job.company.name}</Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>📍 {job.location}</span>
            <span>💼 {TYPE[job.type] || job.type}</span>
            <span>🏢 {WORK_MODE[job.workMode] || job.workMode}</span>
            <span>📊 {LEVEL[job.level] || job.level}</span>
            {job.salary && <span className="font-semibold text-foreground">💰 {job.salary}</span>}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-3">توضیحات</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">مهارت‌های مورد نیاز</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s: string) => (
                <span key={s} className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* About Company */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-3">درباره شرکت</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{job.company.description || 'توضیحی ثبت نشده است.'}</p>
          <Link href={`/companies/${job.company.id}`} className="inline-block text-sm text-primary hover:underline mt-2">مشاهده پروفایل شرکت ←</Link>
        </div>

        {/* Apply */}
        <div className="pt-8 border-t border-border">
          <ApplyButton jobId={job.id} isLoggedIn={!!session} isJobseeker={session?.role === 'JOBSEEKER'} />
        </div>
      </div>
    </div>
  )
}