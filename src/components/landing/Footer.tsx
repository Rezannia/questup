import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* برند */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-xl">🎮</span>
              <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              پلتفرم استخدام برای نسل جدید. مسیر شغلی‌ات را شفاف و هدفمند بساز.
            </p>
          </div>

          {/* لینک‌ها */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">محصول</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">ویژگی‌ها</a></li>
              <li><a href="#how" className="text-muted-foreground hover:text-foreground transition-colors">چطور کار می‌کنه</a></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">درباره ما</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">ثبت‌نام</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">حساب</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">ورود</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">ثبت‌نام</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">داشبورد</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} کوئست‌آپ. همه حقوق محفوظ است.
          </p>
          <p className="text-xs text-muted-foreground">
            ساخته‌شده برای نسل جدید
          </p>
        </div>
      </div>
    </footer>
  )
}