"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/ui/BottomNav";

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  if (!isMobile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <div className="max-w-md rounded-xl2 border border-line bg-paper p-8 text-center shadow-soft">
          <div className="mb-4 text-6xl">📱</div>
          <h1 className="mb-3 text-2xl font-bold text-ink">
            این بخش فقط روی موبایل کار می‌کند
          </h1>
          <p className="mb-6 text-sm text-muted">
            برای بهترین تجربه، لطفاً کوئست‌آپ را روی گوشی موبایل خود باز کنید.
          </p>
          <div className="rounded-xl bg-bg p-4 text-xs text-muted">
            <p className="mb-2 font-medium text-ink">چطور گوشی را باز کنم؟</p>
            <p>۱. کد QR را اسکن کنید یا لینک را در مرورگر موبایل باز کنید.</p>
            <p>۲. یا از DevTools مرورگر (F12) حالت موبایل را فعال کنید.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* محتوا با فاصله از پایین برای BottomNav */}
      <main className="mx-auto max-w-md pb-24">{children}</main>
      
      {/* نوار ناوبری پایین */}
      <BottomNav />
    </div>
  );
}