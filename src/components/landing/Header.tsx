"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "خانه" },
    { href: "/jobs", label: "شغل‌ها" },
    { href: "/about", label: "درباره ما" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-line/50 bg-paper/70 shadow-soft backdrop-blur-xl"
          : "bg-paper/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet text-white font-bold">
            Q
          </div>
          <span className="text-lg font-bold text-ink">کوئست‌آپ</span>
        </Link>

        {/* ناوبری دسکتاپ */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-violet/10 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* دکمه‌های ورود/ثبت‌نام (دسکتاپ) */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              ورود
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">ثبت‌نام</Button>
          </Link>
        </div>

        {/* دکمه منو (موبایل) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-line/50 bg-paper/90 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-violet/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-line/50 pt-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    ورود
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full">ثبت‌نام</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}