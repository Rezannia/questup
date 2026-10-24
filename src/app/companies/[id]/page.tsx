import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'

const PERKS = [
  { key: 'flexibleHours', icon: '⏰', label: 'ساعت منعطف' },
  { key: 'remoteWork', icon: '🏠', label: 'دورکاری' },
  { key: 'learningBudget', icon: '🎓', label: 'آموزش' },
  { key: 'transparentSalary', icon: '💰', label: 'حقوق شفاف' },
  { key: 'jobSecurity', icon: '🛡', label: 'امنیت شغلی' },
  { key: 'goodManager', icon: '🧠', label: 'مدیر خوب' },
  { key: 'realValues', icon: '💚', label: 'ارزش واقعی' },
  { key: 'meaningfulWork', icon: '🎯', label: 'کار معنادار' },
  { key: 'clearCareerPath', icon: '🚀', label: 'مسیر رشد' },
] as const

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const company = await db.company.findUnique({
    where: { id },
    include: {
      jobs: {
        where: { active: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!company || !company.verified) {
    notFound()
  }

  const activePerks = PERKS.filter((p) => (company as any)[p.key])

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* دکمه برگشت */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-violet mb-6 transition-colors"
        >
          <span>←</span>
          <span>برگشت به صفحه اصلی</span>
        </Link>

        {/* کارت هدر */}
        <div className="bg-paper rounded-xl border-2 border-line shadow-soft overflow-hidden mb-6">
          {/* هدر رنگی */}
          <div className="h-32 bg-gradient-to-br from-violet via-lilac to-violet-deep relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-10 text-6xl">✨</div>
              <div className="absolute bottom-4 left-10 text-5xl">🚀</div>
            </div>
          </div>

          <div className="px-6 pb-6">
            {/* لوگو + اسم */}
            <div className="flex items-end gap-4 -mt-12 mb-4 flex-wrap">
              <div className="w-24 h-24 rounded-lg bg-paper border-4 border-paper shadow-md flex items-center justify-center text-6xl">
                {company.logo || '🏢'}
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
                    {company.name}
                  </h1>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {company.featured && (
                    <span className="px-2 py-0.5 bg-amber text-ink rounded-full text-[10px] font-extrabold">
                      ⭐ ویژه
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
                  {company.industry && <span>🏭 {company.industry}</span>}
                  {company.foundedYear && (
                    <span>📅 تأسیس {company.foundedYear}</span>
                  )}
                  {company.size && <span>👥 {company.size} نفر</span>}
                </div>
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-violet/10 text-violet border border-violet/20 rounded-full text-xs font-bold hover:bg-violet/20 transition-all"
                >
                  🌐 وب‌سایت
                </a>
              )}
            </div>

            {/* توضیحات */}
            {company.description && (
              <p className="text-sm text-muted leading-relaxed">
                {company.description}
              </p>
            )}
          </div>
        </div>

        {/* داستان */}
        {company.story && (
          <div className="bg-paper rounded-lg border border-line p-6 mb-6 shadow-soft">
            <h2 className="text-lg font-extrabold text-ink mb-3 flex items-center gap-2">
              📖 داستان ما
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {company.story}
            </p>
          </div>
        )}

        {/* چرا نسل Z */}
        {company.whyGenZ && (
          <div className="bg-secondary rounded-lg border border-border p-6 mb-6">
            <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
              💚 چرا نسل Z اینجا رو دوست داره؟
            </h2>
            <p className="text-sm text-ink leading-relaxed">
              {company.whyGenZ}
            </p>
          </div>
        )}

        {/* نقل قول کارمند */}
        {company.employeeQuote && (
          <div className="bg-violet/5 rounded-lg border border-violet/20 p-6 mb-6">
            <p className="text-base text-ink leading-relaxed italic mb-4">
              «{company.employeeQuote}»
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet/20 flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <p className="text-sm font-bold text-ink">
                  {company.employeeName}
                </p>
                <p className="text-xs text-muted">{company.employeeRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* پرک‌ها */}
        <div className="bg-paper rounded-lg border border-line p-6 mb-6 shadow-soft">
          <h2 className="text-lg font-extrabold text-ink mb-4 flex items-center gap-2">
            ✨ پرک‌ها ({activePerks.length} از {PERKS.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PERKS.map((perk) => {
              const isActive = (company as any)[perk.key]
              return (
                <div
                  key={perk.key}
                  className={`
                    flex items-center gap-2 p-3 rounded-lg border-2 transition-all
                    ${
                      isActive
                        ? 'bg-secondary border-border'
                        : 'bg-bg border-line opacity-40'
                    }
                  `}
                >
                  <span className="text-xl">{perk.icon}</span>
                  <span
                    className={`text-xs font-bold ${
                      isActive ? 'text-primary' : 'text-muted line-through'
                    }`}
                  >
                    {perk.label}
                  </span>
                  {isActive && (
                    <span className="text-primary text-xs mr-auto">✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* شغل‌ها */}
        <div className="bg-paper rounded-lg border border-line p-6 shadow-soft">
          <h2 className="text-lg font-extrabold text-ink mb-4 flex items-center gap-2">
            💼 موقعیت‌های شغلی ({company.jobs.length})
          </h2>

          {company.jobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-sm text-muted">
                هنوز موقعیت فعالی نداریم. به زودی!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {company.jobs.map((job) => {
                const skills = job.skills ? JSON.parse(job.skills) : []
                return (
                  <div
                    key={job.id}
                    className="bg-bg rounded-lg border border-line p-4 hover:border-violet/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-extrabold text-ink">{job.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-violet/10 text-violet border border-violet/30 rounded-full font-bold">
                        {job.type === 'full-time'
                          ? 'تمام‌وقت'
                          : job.type === 'part-time'
                          ? 'پاره‌وقت'
                          : job.type === 'remote'
                          ? 'دورکاری'
                          : 'پیمانی'}
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-[10px] px-2 py-0.5 bg-bg border border-line rounded-full text-muted">
                        📍 {job.location}
                      </span>
                      {job.salary && (
                        <span className="text-[10px] px-2 py-0.5 bg-secondary text-primary border border-border rounded-full font-bold">
                          💰 {job.salary}
                        </span>
                      )}
                      {skills.slice(0, 3).map((s: string) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 bg-paper border border-line rounded-full text-ink"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1 px-4 py-2 bg-violet text-white rounded-full text-xs font-bold hover:bg-violet-deep transition-all"
                    >
                      درخواست
                      <span>←</span>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}