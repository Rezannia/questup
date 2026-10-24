"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const stages = [
  { order: 1, title: "پروفایلت رو بچین", icon: "🛡️", xp: 100, done: true },
  { order: 2, title: "رزومه‌ات رو آپدیت کن", icon: "📜", xp: 100, done: true },
  { order: 3, title: "کشف سوپرپاورها", icon: "🧭", xp: 150, done: true },
  { order: 4, title: "چک مهارت‌ها", icon: "⚔️", xp: 150, done: false, current: true },
  { order: 5, title: "مصاحبه رو تمرین کن", icon: "🤖", xp: 200, done: false },
  { order: 6, title: "شرکت‌ها رو زیرورو کن", icon: "🎯", xp: 150, done: false },
  { order: 7, title: "آفر بگیر", icon: "💼", xp: 200, done: false },
  { order: 8, title: "آفر رو سبک‌سنگین کن", icon: "🔍", xp: 150, done: false },
  { order: 9, title: "مذاکره کن", icon: "🤝", xp: 200, done: false },
  { order: 10, title: "شروع فصل جدید", icon: "👑", xp: 300, done: false },
];

export function JourneyPreview() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-sm font-medium text-amber-deep">
            نقشه سفر
          </div>
          <h2 className="mb-4 text-2xl font-bold text-ink md:text-4xl">
            ۱۰ مرحله تا شغل رویایی‌ات
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted md:text-base">
            هر مرحله یه مهارت جدید. با هر تکمیل، مدال و XP بگیر و به مرحله بعد برو. داری ترکوندی!
          </p>
        </div>

        <div className="relative overflow-x-auto pb-4">
          <div className="flex min-w-max gap-2 px-4 md:justify-center md:gap-3">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.order}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 text-2xl transition-all ${
                    stage.done
                      ? "border-lime bg-lime/20"
                      : stage.current
                      ? "border-violet bg-paper ring-4 ring-violet/20"
                      : "border-line bg-bg/50 opacity-60"
                  }`}
                >
                  {stage.done ? (
                    <span>{stage.icon}</span>
                  ) : stage.current ? (
                    <span>{stage.icon}</span>
                  ) : (
                    <Lock className="h-4 w-4 text-muted" />
                  )}

                  {stage.done && (
                    <div className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime text-white">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white">
                    {stage.order}
                  </div>
                </div>

                {i < stages.length - 1 && (
                  <div className="hidden h-0.5 w-4 bg-line md:block" />
                )}

                <p className="mt-3 w-20 text-center text-[10px] font-medium leading-tight text-ink">
                  {stage.title}
                </p>
                <p className="text-[9px] text-muted">{stage.xp} XP</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/register">
            <Button size="lg">
              شروع سفر من
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}