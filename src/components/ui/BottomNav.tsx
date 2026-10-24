"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Medal, Swords, Inbox, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/map", label: "نقشه", icon: Map },
  { href: "/medals", label: "مدال‌ها", icon: Medal },
  { href: "/challenges", label: "چالش‌ها", icon: Swords },
  { href: "/applications", label: "پیشنهادها", icon: Inbox },
  { href: "/profile", label: "پروفایل", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-paper/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors",
                isActive
                  ? "text-violet"
                  : "text-muted hover:text-ink"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}