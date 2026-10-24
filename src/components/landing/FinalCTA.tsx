"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-violet to-violet-soft py-16 text-white md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            همین حالا شروع کن
          </div>
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            مسیر شغلیت رو
            <br />
            خفن شروع کن
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
            ۱۰ مرحله، ۱۰ مدال، ۱ شغل رویایی. همه با موبایل، همه رایگان. بزن بریم!
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full bg-white text-violet hover:bg-white/90 sm:w-auto"
              >
                ثبت‌نام رایگان
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                مشاهده شغل‌ها
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}