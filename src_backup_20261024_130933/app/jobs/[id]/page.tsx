import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import ApplyButton from './ApplyButton'

const WORK_MODE_LABELS: Record<string, { label: string; icon: string }> = {
  onsite: { label: 'حضوری', icon: '🏢' },
  hybrid: { label: 'ترکیبی', icon: '🔄' },
  remote: { label: 'دورکاری', icon: '🏠' },
}

const LEVEL_LABELS: Record<string, string> = {
  junior: 'جونیور (۰-۲ سال)',
  mid: 'مید (۲-۵ سال)',
  senior: 'سنیور (۵+ سال)',
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'تمام‌وقت',
  'part-time': 'پاره‌وقت',
  remote: 'دورکاری',
  contract: 'پیمانی',
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getSession()

  const job = await db.job.findUnique({
    where: { id },
    include: { company: true },
  })

  if (!job || !job.active) {
    notFound()
  }

  const skills = job.skills ? JSON.parse(job.skills) : []
  const workModeInfo = WORK_MODE_LABELS[job.workMode] || WORK_MODE_LABELS.onsite

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-violet mb-6 transition-colors"
        >
          <span>←</span>
          <span>برگشت</span>
        </Link>

        <div className="bg-paper rounded-3xl border-2 border-line shadow-soft p-6 mb-6">
          <div className="flex items-start gap-4 mb-4 flex-wrap">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet/10 to-lilac/10 flex items-center justify-center text-5xl border-2 border-line">
              {job.company.logo || '🏢'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
                  {job.title}
                </h1>
                {job.isStable && (
                  <span className="px-2 py-0.5 bg-lime/10 text-lime-deep border border-lime/30 rounded-full text-[10px] font-bold">
                    🛡 شغل پایدار
                  </span>
                )}
              </div>
              <Link
                href={`/companies/${job.company.id}`}
                className="text-sm text-violet hover:underline"
              >
                {job.company.name}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1.5 bg-violet/10 text-violet border border-violet/30 rounded-full text-xs font-bold">
              {workModeInfo.icon} {workModeInfo.label}
            </span>
            <span className="px-3 py-1.5 bg-bg border border-line rounded-full text-xs font-bold text-muted">
              📍 {job.location}
            </span>
            <span className="px-3 py-1.5 bg-bg border border-line rounded-full text-xs font-bold text-muted">
              💼 {TYPE_LABELS[job.type] || job.type}
            </span>
            <span className="px-3 py-1.5 bg-bg border border-line rounded-full text-xs font-bold text-muted">
              📊 {LEVEL_LABELS[job.level] || job.level}
            </span>
          </div>

          {job.salary && (
            <div className="bg-lime/10 border border-lime/30 rounded-xl2 p-3 mb-4">
              <p className="text-sm font-bold text-lime-deep">
                💰 حقوق: {job.salary}
              </p>
            </div>
          )}

          <ApplyButton
            jobId={job.id}
            isLoggedIn={!!session}
            isJobseeker={session?.role === 'JOBSEEKER'}
          />
        </div>

        <div className="bg-paper rounded-2xl border border-line p-6 mb-6 shadow-soft">
          <h2 className="text-lg font-extrabold text-ink mb-3">📝 توضیحات</h2>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {skills.length > 0 && (
          <div className="bg-paper rounded-2xl border border-line p-6 mb-6 shadow-soft">
            <h2 className="text-lg font-extrabold text-ink mb-3">
              🎯 مهارت‌های مورد نیاز
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-violet/10 text-violet border border-violet/30 rounded-full text-sm font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-paper rounded-2xl border border-line p-6 shadow-soft">
          <h2 className="text-lg font-extrabold text-ink mb-3">🏢 درباره شرکت</h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            {job.company.description || 'توضیحی ثبت نشده'}
          </p>
          <Link
            href={`/companies/${job.company.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 bg-violet/10 text-violet border border-violet/20 rounded-full text-xs font-bold hover:bg-violet/20 transition-all"
          >
            دیدن پروفایل کامل شرکت
            <span>←</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}