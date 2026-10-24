"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, MapPin, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* ستون راست: متن */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet">
              <Sparkles className="h-4 w-4" />
              مسیر شغلی، ولی با وایب خودت
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
              مسیر شغلیت رو
              <span className="text-violet"> خفن</span>
              شروع کن
            </h1>

            <p className="mb-6 max-w-lg text-base leading-8 text-muted md:text-lg md:leading-9">
              کوئست‌آپ بهت کمک می‌کنه مهارت‌هات رو <strong className="text-ink">اثبات کنی</strong>،
              شرکت‌های واقعی رو با <strong className="text-ink">شفافیت کامل</strong> بشناسی،
              و با <strong className="text-ink">نقشه ۱۰ مرحله‌ای</strong> برسی به شغلی که
              واقعاً بهت می‌خوره. بدون کرینج، بدون کلک.
            </p>

            {/* ارزش‌های کلیدی */}
            <div className="mb-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <CheckCircle className="h-4 w-4 text-lime-deep" />
                صد در صد رایگان
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Shield className="h-4 w-4 text-violet" />
                شفافیت کامل حقوق
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-4 w-4 text-amber-deep" />
                فیلتر موقعیت مکانی
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  بزن بریم!
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  چطور کار می‌کنه؟
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted">
              فقط با موبایل. بدون نیاز به لپ‌تاپ. بدون هزینه پنهان. ردی.
            </p>
          </motion.div>

          {/* ستون چپ: تصویر */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-violet/20 to-lilac/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-xl2 border border-line bg-paper shadow-soft">
                <Image
                  src="/hero-bg.png"
                  alt="کوئست‌آپ - مسیر شغلی گیم‌فای‌شده"
                  width={600}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>

              {/* کارت شناور: شفافیت */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 rounded-xl border border-line bg-paper p-4 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10 text-violet">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">شفافیت</p>
                    <p className="text-sm font-bold text-ink">صد در صد حقوق</p>
                  </div>
                </div>
              </motion.div>

              {/* کارت شناور: پیشرفت */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-4 top-8 rounded-xl border border-line bg-paper p-4 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 text-amber-deep">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">پیشرفت</p>
                    <p className="text-sm font-bold text-ink">مرحله ۳ از ۱۰</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}