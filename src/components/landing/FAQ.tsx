"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "کوئست‌آپ رایگانه؟",
    a: "آره، برای کارجویان صد در صد رایگانه. هیچ هزینه پنهانی وجود نداره. شرکت‌ها برای دیدن پروفایل کارجویان هزینه پرداخت می‌کنن، نه کارجویان.",
  },
  {
    q: "چطور می‌تونم شروع کنم؟",
    a: "کافیه توی سایت ثبت‌نام کنی (کمتر از ۲ دقیقه). بعد نقشه ۱۰ مرحله‌ای رو طی کن. هر مرحله یه مهارت جدید بهت اضافه می‌کنه.",
  },
  {
    q: "با موبایل هم کار می‌کنه؟",
    a: "آره، کوئست‌آپ کاملاً موبایل‌فرست طراحی شده. حتی می‌تونی از گوشی خودت ثبت‌نام کنی و همه مراحل رو طی کنی. بدون نیاز به لپ‌تاپ.",
  },
  {
    q: "چطور مطمئن باشم شرکت‌ها واقعی‌اند؟",
    a: "همه شرکت‌ها قبل از انتشار تایید می‌شن. همچنین می‌تونی نظرات واقعی کارکنان قبلی رو توی پروفایل شرکت ببینی. اسکی نرو، ما راست می‌گیم!",
  },
  {
    q: "می‌تونم با شرکت‌ها مستقیم صحبت کنم؟",
    a: "آره، وقتی پیشنهادی دریافت می‌کنی، می‌تونی پیام شرکت رو بخونی و بعد تصمیم بگیری. همچنین می‌تونی پیشنهاد رو رد یا قبول کنی.",
  },
  {
    q: "اطلاعات من امنه؟",
    a: "آره، ما از استانداردهای امنیتی بالا استفاده می‌کنیم. اطلاعاتت هرگز بدون اجازه‌ات با کسی به اشتراک گذاشته نمی‌شه. خیالت راحت.",
  },
  {
  q: "چه مشاغلی توی کوئست‌آپ هست؟",
  a: "از ۱۸ مسیر شغلی مختلف: برنامه‌نویسی، طراحی، بازاریابی، مالی، سلامت، آموزش، مدیریت، حقوق، هکر اخلاقی، طراح VR، هوش مصنوعی، گویندگی، تولید محتوا، مشاور پایداری، کشاورزی شهری، مربی سلامت، تجارت الکترونیک، و بازیافت. هر کدوم با نقشه اختصاصی.",
},
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-ink md:text-4xl">
            سوالات متداول
          </h2>
          <p className="text-sm text-muted md:text-base">
            هر چیزی که باید بدونی. اگه جواب سوالت اینجا نبود، بهمون پیام بده.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl2 border border-line bg-paper"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-right transition-colors hover:bg-bg/50"
              >
                <span className="text-sm font-bold text-ink md:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-muted transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-line p-4 text-sm leading-7 text-muted">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}