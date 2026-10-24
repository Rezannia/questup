"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "دسترسی به کارجویانی که مهارت‌شون رو اثبات کرده‌اند",
  "پروفایل کامل با مدال، XP و نمونه کار",
  "ارسال پیشنهاد مستقیم بدون واسطه",
  "فیلتر بر اساس مهارت، سطح و موقعیت",
];

export function ForEmployers() {
  return (
    <section className="bg-violet py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Building2 className="h-4 w-4" />
              برای شرکت‌ها
            </div>
            <h2 className="mb-4 text-2xl font-bold md:text-4xl">
              کارجویانی که مهارت‌شون رو اثبات کرده‌اند
            </h2>
            <p className="mb-6 text-sm leading-7 text-white/80 md:text-base md:leading-8">
  کوئست‌آپ به شما کمک می‌کنه کارجویانی رو پیدا کنید که واقعاً آماده‌اند.
  نه ادعا، نه رزومه خالی — بلکه مهارت اثبات‌شده با مدال و XP.
  از برنامه‌نویس و هکر اخلاقی تا طراح VR و مربی سلامت — همه اینجا هستن.
</p>

            <ul className="mb-8 space-y-3">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
                  <span className="text-white/90">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-violet hover:bg-white/90"
              >
                شرکت خود را ثبت کنید
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-xl2 border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                    🏢
                  </div>
                  <div>
                    <p className="text-sm font-bold">شرکت نمونه</p>
                    <p className="text-xs text-white/60">صنعت فناوری</p>
                  </div>
                </div>
                <div className="rounded-full bg-lime/20 px-3 py-1 text-xs font-medium text-lime">
                  تایید شده
                </div>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/60">موقعیت شغلی</p>
                  <p className="text-sm font-medium">برنامه‌نویس ارشد</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/60">حقوق</p>
                  <p className="text-sm font-medium">۲۵-۳۵ میلیون تومان</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/60">مهارت‌های موردنیاز</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["React", "TypeScript", "Node.js"].map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}