import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
          </Link>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">داشبورد</p>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            سلام، {user?.name}
          </h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">XP</p>
            <p className="text-3xl font-bold text-foreground">{totalXp}</p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">لِوِل</p>
            <p className="text-3xl font-bold text-foreground">{level}</p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">مدال</p>
            <p className="text-3xl font-bold text-foreground">{medals}</p>
          </div>
        </div>

        {/* Role */}
        <div className="border border-border rounded-lg p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">نقش شما</p>
            <p className="font-semibold text-foreground">
              {user?.role === 'JOBSEEKER' ? 'کارجو' : 'شرکت'}
            </p>
          </div>
        </div>

        {/* Action List */}
        <div className="border-t border-border">
          {user?.role === 'COMPANY' ? (
            <Link href="/company" className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">پنل شرکت</h3>
                  <p className="text-sm text-muted-foreground mt-1">کارجوها را ببینید و پیشنهاد بفرستید</p>
                </div>
                <span className="text-muted-foreground group-hover:translate-x-[-4px] transition-transform">←</span>
              </div>
            </Link>
          ) : (
            <Link href="/map" className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">نقشه ۱۰ مرحله‌ای</h3>
                  <p className="text-sm text-muted-foreground mt-1">{completedCount} از ۱۰ مرحله تکمیل شده</p>
                </div>
                <span className="text-muted-foreground group-hover:translate-x-[-4px] transition-transform">←</span>
              </div>
            </Link>
          )}

          <Link href="/medals" className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">مدال‌ها</h3>
                <p className="text-sm text-muted-foreground mt-1">{medals} مدال کسب شده</p>
              </div>
              <span className="text-muted-foreground group-hover:translate-x-[-4px] transition-transform">←</span>
            </div>
          </Link>

          <Link href="/profile" className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">پروفایل</h3>
                <p className="text-sm text-muted-foreground mt-1">اطلاعات، آواتار و بیو</p>
              </div>
              <span className="text-muted-foreground group-hover:translate-x-[-4px] transition-transform">←</span>
            </div>
          </Link>

          {user?.role === 'JOBSEEKER' && (
            <Link href="/applications" className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">پیشنهادهای دریافتی</h3>
                  <p className="text-sm text-muted-foreground mt-1">پیشنهاد شرکت‌ها را ببینید</p>
                </div>
                <span className="text-muted-foreground group-hover:translate-x-[-4px] transition-transform">←</span>
              </div>
            </Link>
          )}

          <Link href="/challenges" className="block py-6 border-b border-border hover:bg-secondary/30 transition-colors group px-2 -mx-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">چالش‌های مهارتی</h3>
                <p className="text-sm text-muted-foreground mt-1">مهارت‌هایتان را اثبات کنید</p>
              </div>
              <span className="text-muted-foreground group-hover:translate-x-[-4px] transition-transform">←</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}