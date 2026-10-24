"use client";

import { motion } from "framer-motion";
import { Users, Building2, Star, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "۱۲K+", label: "کارجوی فعال" },
  { icon: Building2, value: "۳۴۰+", label: "شرکت همکار" },
  { icon: TrendingUp, value: "۹۲٪", label: "رضایت کاربران" },
  { icon: Star, value: "۸.۷/۱۰", label: "امتیاز کاربران" },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <p className="mb-6 text-center text-xs text-muted">
          اعدادی که بهشون افتخار می‌کنیم (و واقعی‌اند!)
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-ink md:text-3xl">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}