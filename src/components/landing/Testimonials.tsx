"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "سارا م.",
    role: "برنامه‌نویس فرانت‌اند",
    text: "قبل از کوئست‌آپ نمی‌دونستم از کجا شروع کنم. نقشه ۱۰ مرحله‌ای کمکم کرد قدم‌به‌قدم برم. الان ۳ ماهه که استخدام شدم. پشمام ریخت!",
    rating: 5,
    color: "violet",
  },
  {
    name: "رضا ک.",
    role: "طراح UI/UX",
    text: "چیزی که کوئست‌آپ رو متفاوت می‌کنه، شفافیتشه. قبل از درخواست، حقوق و نظرات کارکنان رو می‌بینم. این خیلی بامرامه.",
    rating: 5,
    color: "lime",
  },
  {
    name: "مریم ح.",
    role: "کارشناس بازاریابی",
    text: "من فقط با موبایل کار می‌کنم. کوئست‌آپ کاملاً برای موبایل طراحی شده. هیچ‌جا گیر نکردم. تجربه خفنی بود.",
    rating: 4,
    color: "amber",
  },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  violet: { bg: "bg-violet/10", text: "text-violet" },
  lime: { bg: "bg-lime/10", text: "text-lime-deep" },
  amber: { bg: "bg-amber/10", text: "text-amber-deep" },
};

export function Testimonials() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-ink md:text-4xl">
            داستان‌های واقعی
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted md:text-base">
            از زبون کسایی که مسیر رو طی کردن. بدون فیلتر، بدون اغراق.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => {
            const colors = colorClasses[t.color];
            return (
              <motion.div
                key={t.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl2 border border-line bg-paper p-6"
              >
                <Quote className={`mb-3 h-8 w-8 ${colors.text}`} />
                <p className="mb-4 text-sm leading-7 text-ink">{t.text}</p>
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${
                        j < t.rating ? "fill-amber text-amber" : "text-line"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.bg} ${colors.text} text-lg font-bold`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}