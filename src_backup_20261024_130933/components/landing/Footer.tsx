import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-paper border-t border-line py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl2 bg-gradient-to-br from-violet to-lilac flex items-center justify-center text-lg">
                🎮
              </div>
              <span className="font-extrabold text-lg text-ink">کوئست‌آپ</span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              مسیر شغلی، ولی با حال‌وهوای خودت. گیم‌فیکیشن، مدال، و اتصال مستقیم
              به شرکت‌های خفن. بزن بریم!
            </p>
          </div>

          <div>
            <h4 className="font-bold text-ink mb-3 text-sm">محصول</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted hover:text-violet">ویژگی‌ها</a></li>
              <li><a href="#how" className="text-muted hover:text-violet">چطور کار می‌کنه</a></li>
              <li><Link href="/about" className="text-muted hover:text-violet">درباره ما</Link></li>
              <li><Link href="/register" className="text-muted hover:text-violet">ثبت‌نام</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-ink mb-3 text-sm">حساب</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="text-muted hover:text-violet">ورود</Link></li>
              <li><Link href="/register" className="text-muted hover:text-violet">ثبت‌نام</Link></li>
              <li><Link href="/dashboard" className="text-muted hover:text-violet">داشبورد</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} کوئست‌آپ. همه حقوق محفوظه.
          </p>
          <p className="text-xs text-muted flex items-center gap-1">
            ساخته‌شده با <span className="text-cherry">♥</span> برای نسل Z
          </p>
        </div>
      </div>
    </footer>
  )
}
