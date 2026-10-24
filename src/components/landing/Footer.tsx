"use client";

import Link from "next/link";
import { Heart, Mail, Send, Globe } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* برند */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet font-bold text-white">
                Q
              </div>
              <span className="text-lg font-bold text-ink">کوئست‌آپ</span>
            </div>
            <p className="text-xs leading-6 text-muted">
              پلتفرم گیم‌فای‌شده کاریابی برای نسل Z.
              <br />
              مسیر شغلی، ولی با وایب خودت.
            </p>
          </div>

          {/* لینک‌ها */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">کوئست‌آپ</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li><Link href="/about" className="hover:text-ink">درباره ما</Link></li>
              <li><Link href="/jobs" className="hover:text-ink">شغل‌ها</Link></li>
              <li><Link href="/register" className="hover:text-ink">ثبت‌نام</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">برای شرکت‌ها</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li><Link href="/register" className="hover:text-ink">ثبت شرکت</Link></li>
              <li><Link href="/company" className="hover:text-ink">پنل شرکت</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">ارتباط</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li><Link href="/about" className="hover:text-ink">تماس با ما</Link></li>
              <li><a href="mailto:hello@questup.ir" className="hover:text-ink">hello@questup.ir</a></li>
            </ul>
            <div className="mt-3 flex gap-2">
              <a href="mailto:hello@questup.ir" className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted hover:text-ink">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted hover:text-ink">
                <Send className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted hover:text-ink">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <p>© {year} کوئست‌آپ. تمامی حقوق محفوظ است.</p>
          <p className="flex items-center gap-1">
            ساخته شده با <Heart className="h-3 w-3 fill-cherry text-cherry" /> در ایران
          </p>
        </div>
      </div>
    </footer>
  );
}