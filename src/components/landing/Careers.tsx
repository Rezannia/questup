"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Megaphone,
  Stethoscope,
  GraduationCap,
  Shield,
  Leaf,
  Gamepad2,
  Mic,
  Brain,
  Camera,
  Heart,
  Globe,
  ChefHat,
} from "lucide-react";

type Category = "all" | "tech" | "creative" | "business" | "sustainability" | "health";

const careers = [
  // فناوری (فقط هکر اخلاقی)
  { icon: Shield, title: "هکر اخلاقی", description: "امنیت، تست نفوذ", color: "violet", category: "tech" },
  
  // خلاقیت
  { icon: Palette, title: "طراحی", description: "UI/UX، گرافیک، محصول", color: "pink", category: "creative" },
  { icon: Mic, title: "گویندگی", description: "پادکست، ویدیو، تبلیغات", color: "pink", category: "creative" },
  { icon: Camera, title: "تولید محتوای دیجیتال", description: "یوتیوب، تیک‌تاک، اینستاگرام", color: "pink", category: "creative" },
  { icon: Megaphone, title: "بازاریابی", description: "دیجیتال، محتوا، برند", color: "amber", category: "creative" },

  // کسب‌وکار (خالی شده)
  // هیچ شغلی در این دسته باقی نمانده

  // پایداری
  { icon: Leaf, title: "مشاور پایداری", description: "محیط زیست، انرژی سبز", color: "lime", category: "sustainability" },
  { icon: Leaf, title: "کشاورز شهری", description: "کشت عمودی، غذای محلی", color: "lime", category: "sustainability" },
  { icon: Leaf, title: "بازیافت و بازفروش", description: "وینتیج، مد پایدار", color: "lime", category: "sustainability" },

  // سلامت
  { icon: Stethoscope, title: "سلامت", description: "پزشکی، پرستاری، دارو", color: "cherry", category: "health" },
  { icon: Heart, title: "مربی سلامت", description: "تغذیه، ورزش، ذهن", color: "cherry", category: "health" },
  { icon: GraduationCap, title: "آموزش", description: "تدریس، محتوا، پداگوژی", color: "cherry", category: "health" },
  { icon: ChefHat, title: "آشپز شخصی", description: "غذای سالم، سفارشی، تجربه خصوصی", color: "cherry", category: "health" },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  violet: { bg: "bg-violet/10", text: "text-violet" },
  pink: { bg: "bg-pink/10", text: "text-pink" },
  amber: { bg: "bg-amber/10", text: "text-amber-deep" },
  lime: { bg: "bg-lime/10", text: "text-lime-deep" },
  cherry: { bg: "bg-cherry/10", text: "text-cherry" },
  lilac: { bg: "bg-lilac/10", text: "text-lilac" },
};

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "tech", label: "فناوری" },
  { value: "creative", label: "خلاقیت" },
  { value: "business", label: "کسب‌وکار" },
  { value: "sustainability", label: "پایداری" },
  { value: "health", label: "سلامت" },
];

export function Careers() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredCareers = careers.filter(
    (career) => activeCategory === "all" || career.category === activeCategory
  );

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet">
            مسیرهای شغلی
          </div>
          <h2 className="mb-4 text-2xl font-bold text-ink md:text-4xl">
            مسیر شغلی‌ات رو پیدا کن
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted md:text-base">
            از طراحی تا آشپزی شخصی، از هکر اخلاقی تا مربی سلامت.
            هر کدوم با نقشه اختصاصی. کدومش شاخ‌تره؟
          </p>
        </div>

        {/* فیلتر دسته‌بندی */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-violet text-white"
                  : "bg-bg text-muted hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* گرید مشاغل */}
        {filteredCareers.length === 0 ? (
          <div className="rounded-xl2 border border-line bg-bg p-12 text-center">
            <p className="text-sm text-muted">
              هنوز شغلی در این دسته نیست. به زودی اضافه می‌شود.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {filteredCareers.map((career, i) => {
              const colors = colorClasses[career.color];
              return (
                <motion.div
                  key={career.title + i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer rounded-xl2 border border-line bg-bg p-4 text-center transition-all hover:border-violet/30 hover:shadow-soft"
                >
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                    <career.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-ink">{career.title}</h3>
                  <p className="text-[10px] text-muted">{career.description}</p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* پیام انگیزشی */}
        <div className="mt-10 rounded-xl2 bg-gradient-to-l from-violet to-violet-soft p-5 text-center text-white">
          <p className="text-sm font-medium">
            هر مسیری که انتخاب کنی، کوئست‌آپ کنارته. فقط کافیه شروع کنی! 🚀
          </p>
        </div>
      </div>
    </section>
  );
}