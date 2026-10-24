"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Award,
  Eye,
  Target,
  Heart,
  Smartphone,
} from "lucide-react";

const problems = [
  {
    icon: Compass,
    problem: "نمی‌دونی از کجا شروع کنی؟",
    solution: "نقشه ۱۰ مرحله‌ای",
    description: "از ساخت پروفایل تا پذیرش شغلی، قدم‌به‌قدم هدایتت می‌کنیم. دیگه سردرگم نمی‌مونی.",
    color: "violet",
  },
  {
    icon: Award,
    problem: "مهارتت دیده نمی‌شه؟",
    solution: "مدال و XP",
    description: "هر مهارت رو با مدال و امتیاز اثبات کن؛ شرکت‌ها می‌بینن. دیگه لازم نیست خودت رو ثابت کنی.",
    color: "amber",
  },
  {
    icon: Eye,
    problem: "شرکت‌ها شفاف نیستن؟",
    solution: "شفافیت کامل",
    description: "حقوق، فرهنگ و نظرات واقعی کارکنان، همه قبل از درخواست. بدون سورپرایز.",
    color: "lime",
  },
  {
    icon: Target,
    problem: "مصاحبه بلد نیستی؟",
    solution: "چالش‌های تعاملی",
    description: "با چالش‌های کوتاه، مهارت مصاحبه و ارتباطت رو تقویت کن. نوب نباش!",
    color: "cherry",
  },
  {
    icon: Heart,
    problem: "می‌ترسی پذیرفته نشی؟",
    solution: "محیط فراگیر",
    description: "کوئست‌آپ برای همه‌ست؛ بدون تبعیض، بدون قضاوت. اینجا جای همه‌ست.",
    color: "pink",
  },
  {
    icon: Smartphone,
    problem: "لپ‌تاپ نداری؟",
    solution: "فقط موبایل",
    description: "همه چیز با گوشی. سریع، ساده، بدون نیاز به کامپیوتر. همیشه همراهت.",
    color: "lilac",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  violet: { bg: "bg-violet/10", text: "text-violet", border: "border-violet/20" },
  amber: { bg: "bg-amber/10", text: "text-amber-deep", border: "border-amber/20" },
  lime: { bg: "bg-lime/10", text: "text-lime-deep", border: "border-lime/20" },
  cherry: { bg: "bg-cherry/10", text: "text-cherry", border: "border-cherry/20" },
  pink: { bg: "bg-pink/10", text: "text-pink", border: "border-pink/20" },
  lilac: { bg: "bg-lilac/10", text: "text-lilac", border: "border-lilac/20" },
};

export function WhyQuestUp() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet">
            چرا کوئست‌آپ؟
          </div>
          <h2 className="mb-4 text-2xl font-bold text-ink md:text-4xl">
            ۶ مشکلی که داری، ۶ راه‌حلی که داریم
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted md:text-base">
  بر اساس نظرسنجی از هزاران جوان، این ۶ چالش اصلی‌ترین موانع ورود به بازار کارن.
  ما برای هر کدوم یه راه‌حل عملی داریم. از <strong className="text-ink">هکر اخلاقی</strong> تا{" "}
  <strong className="text-ink">کشاورز شهری</strong>، از <strong className="text-ink">طراح VR</strong> تا{" "}
  <strong className="text-ink">مربی سلامت</strong> — هر مسیری که انتخاب کنی، اینجا شروع می‌شه.
</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {problems.map((item, i) => {
            const colors = colorClasses[item.color];
            return (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl2 border ${colors.border} bg-paper p-6 transition-all hover:shadow-soft`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="mb-2 text-sm text-muted line-through">{item.problem}</p>
                <h3 className="mb-2 text-lg font-bold text-ink">{item.solution}</h3>
                <p className="text-sm leading-6 text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}