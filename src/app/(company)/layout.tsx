"use client";

import { useEffect, useState } from "react";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  if (!mounted) return null;

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <div className="max-w-md rounded-xl2 border border-line bg-paper p-8 text-center shadow-soft">
          <div className="mb-4 text-6xl">💻</div>
          <h1 className="mb-3 text-2xl font-bold text-ink">
            این بخش فقط روی لپ‌تاپ یا دسکتاپ کار می‌کند
          </h1>
          <p className="mb-6 text-sm text-muted">
            برای مدیریت کارجوها و شغل‌ها، لطفاً از لپ‌تاپ یا کامپیوتر استفاده کنید.
          </p>
          <div className="rounded-xl bg-bg p-4 text-xs text-muted">
            <p>پنل شرکت با صفحه‌های بزرگ طراحی شده تا بتوانید همه اطلاعات را یک‌جا ببینید.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}