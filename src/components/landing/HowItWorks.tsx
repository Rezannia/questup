"use client";

import { motion } from "framer-motion";
import { UserPlus, Map, Send } from "lucide-react";

const steps = [
  {
    number: "۰۱",
    icon: UserPlus,
    title: "ثبت‌نام کن",
    description: "در کمتر از ۲ دقیقه، پروفایلت رو بساز. فقط نام، ایمیل و رمز. همین!",
    color: "violet",
  },
  {
    number: "۰۲",
    icon: Map,
    title: "مسیرت رو طی کن",
    description: "۱۰ مرحله تعاملی از ساخت رزومه تا تمرین مصاحبه. با هر مرحله، مدال و XP بگیر.",
    color: "amber",
  },
  {
    number: "۰۳",
    icon: Send,
    title: "به شرکت‌ها وصل شو",
    description: "شرکت‌های واقعی با شفافیت کامل. پیشنهاد بگیر، مقایسه کن، انتخاب کن.",
    color: "lime",
  },
];

const colorClasses: Record<string, { bg: string; text: string; line: string }> = {
  violet: { bg: "bg-violet/10", text: "text-violet", line: "border-violet/30" },
  amber: { bg: "bg-amber/10", text: "text-amber-deep", line: "border-amber/30" },
  lime: { bg: "bg-lime/10", text: "text-lime-deep", line: "border-lime/30" },
};

export function HowItWorks() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-ink md:text-4xl">
            در ۳ قدم ساده
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted md:text-base">
            بدون پیچیدگی. بدون فرم‌های طولانی. بدون هزینه. بزن بریم!
          </p>
        </div>

        <div className="relative">
          <div className="absolute right-0 left-0 top-16 hidden h-0.5 bg-line md:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => {
              const colors = colorClasses[step.color];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative text-center"
                >
                  <div className={`relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-paper ${colors.bg} ${colors.text}`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className={`mb-2 inline-block text-4xl font-bold ${colors.text} opacity-30`}>
                    {step.number}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm leading-6 text-muted">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}