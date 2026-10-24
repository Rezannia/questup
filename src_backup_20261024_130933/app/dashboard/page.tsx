import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations'
import { HeroLandscape } from '@/components/HeroLandscape'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true, role: true },
  })

  const [completedCount, medals, totalXp] = await Promise.all([
    db.userProgress.count({
      where: { userId: session.userId, completed: true },
    }),
    db.userMedal.count({ where: { userId: session.userId } }),
    db.userProgress
      .findMany({
        where: { userId: session.userId, completed: true },
        include: { stage: true },
      })
      .then((rows) =>
        rows.reduce((sum, r) => sum + (r.stage?.xpReward ?? 0), 0)
      ),
  ])

  const level = Math.floor(totalXp / 500) + 1

  return (
    <div className="min-h-screen bg-bg">
      {/* هدر Hero با لنداسکیپ */}
      <HeroLandscape variant="violet">
        <div className="px-4 sm:px-8 pt-8">
          {/* نوار بالا */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl2 bg-white/20 backdrop-blur-md flex items-center justify-center text-xl border border-white/30">
                  🎮
                </div>
                <span className="font-extrabold text-lg text-white">کوئست‌آپ</span>
              </Link>
              <LogoutButton />
            </div>
          </div>

          {/* خوش‌آمد */}
          <div className="max-w-4xl mx-auto pb-24">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
              سلام، {user?.name} 👋
            </h1>
            <p className="text-white/70 text-sm sm:text-base mb-8">
              {user?.email}
            </p>

            {/* آمار */}
            <StaggerChildren className="grid grid-cols-3 gap-3">
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md rounded-xl2 p-4 border border-white/20 text-center">
                  <p className="text-2xl font-extrabold text-white">{totalXp}</p>
                  <p className="text-xs text-white/70 mt-1">XP</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md rounded-xl2 p-4 border border-white/20 text-center">
                  <p className="text-2xl font-extrabold text-white">{level}</p>
                  <p className="text-xs text-white/70 mt-1">لِوِل</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-md rounded-xl2 p-4 border border-white/20 text-center">
                  <p className="text-2xl font-extrabold text-white">{medals}</p>
                  <p className="text-xs text-white/70 mt-1">مدال</p>
                </div>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </div>
      </HeroLandscape>

      {/* محتوای اصلی — با -mt-16 روی Hero می‌شینه */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 -mt-16 relative z-20">
        <FadeIn>
          <div className="bg-paper rounded-xl2 shadow-soft p-6 sm:p-8 border border-line">
            {/* نقش */}
            <div className="bg-bg rounded-xl2 p-4 border border-line mb-6">
              <p className="text-sm text-muted mb-1">نقش شما:</p>
              <p className="font-bold text-ink">
                {user?.role === 'JOBSEEKER' ? '🎯 کارجو' : '🏢 شرکت'}
              </p>
            </div>

            {/* کارت‌های اصلی */}
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <StaggerItem>
                {user?.role === 'COMPANY' ? (
                  <Link
                    href="/company"
                    className="block p-6 bg-gradient-to-br from-amber to-cherry rounded-xl2 text-white hover:scale-[1.02] transition-transform"
                  >
                    <div className="text-3xl mb-2">🏢</div>
                    <p className="font-bold text-lg">پنل شرکت</p>
                    <p className="text-sm text-white/80 mt-1">
                      کارجوها رو ببین و پیشنهاد بده
                    </p>
                  </Link>
                ) : (
                  <Link
                    href="/map"
                    className="block p-6 bg-gradient-to-br from-violet to-violet-deep rounded-xl2 text-white hover:scale-[1.02] transition-transform"
                  >
                    <div className="text-3xl mb-2">🗺️</div>
                    <p className="font-bold text-lg">نقشه ۱۰ مرحله‌ای</p>
                    <p className="text-sm text-white/80 mt-1">
                      {completedCount} از ۱۰ مرحله تکمیل شده
                    </p>
                  </Link>
                )}
              </StaggerItem>

              <StaggerItem>
                <Link
                  href="/medals"
                  className="block p-6 bg-paper rounded-xl2 border border-line hover:border-violet/30 hover:bg-bg transition-all"
                >
                  <div className="text-3xl mb-2">🏅</div>
                  <p className="font-bold text-lg text-ink">مدال‌ها</p>
                  <p className="text-sm text-muted mt-1">
                    {medals} مدال کسب شده
                  </p>
                </Link>
              </StaggerItem>
            </StaggerChildren>

            {/* پروفایل */}
            <FadeIn delay={0.4} className="mb-3">
              <Link
                href="/profile"
                className="block p-4 bg-paper rounded-xl2 border border-line hover:border-violet/30 hover:bg-bg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👤</div>
                  <div className="flex-1">
                    <p className="font-bold text-ink">پروفایل من</p>
                    <p className="text-xs text-muted mt-0.5">
                      ویرایش اطلاعات، آواتار و بیو
                    </p>
                  </div>
                  <div className="text-muted">←</div>
                </div>
              </Link>
            </FadeIn>

            {/* پیشنهادها */}
            {user?.role === 'JOBSEEKER' && (
              <FadeIn delay={0.5}>
                <Link
                  href="/applications"
                  className="block p-4 bg-paper rounded-xl2 border border-line hover:border-violet/30 hover:bg-bg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📨</div>
                    <div className="flex-1">
                      <p className="font-bold text-ink">پیشنهادهای دریافتی</p>
                      <p className="text-xs text-muted mt-0.5">
                        پیشنهاد شرکت‌ها رو ببین
                      </p>
                    </div>
                    <div className="text-muted">←</div>
                  </div>
                </Link>
              </FadeIn>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
