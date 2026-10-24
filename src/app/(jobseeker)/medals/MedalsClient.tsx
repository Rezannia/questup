"use client";

import { useState } from "react";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Lock, Sparkles, Award, Star, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Medal {
  id: string;
  stageId: number;
  stageTitle: string;
  badgeName: string;
  medalIcon: string;
  xpReward: number;
  earnedAt: string | null;
  isEarned: boolean;
}

export default function MedalsClient() {
  const { data, isLoading } = useSWR("/api/medals", fetcher);
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const medals: Medal[] = data?.medals || [];
  const totalMedals = medals.length;
  const earnedMedals = medals.filter((m) => m.isEarned).length;
  const totalXp = data?.totalXp || 0;
  const level = data?.level || 1;
  const nextLevelXp = level * 500;
  const xpProgress = totalXp % 500;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* هدر */}
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-ink">کلکسیون مدال‌ها</h1>
            <p className="text-xs text-muted">
              {earnedMedals} از {totalMedals} مدال کسب شده
            </p>
          </div>
          <Badge variant="amber">
            <Sparkles className="ml-1 h-3 w-3" />
            {totalXp} XP
          </Badge>
        </div>
      </div>

      <div className="px-4 pt-6">
        {/* کارت پیشرفت کلی */}
        <div className="mb-6 rounded-xl2 border border-line bg-paper p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">لِوِل {level}</p>
                <p className="text-[10px] text-muted">
                  {500 - xpProgress} XP تا لِوِل {level + 1}
                </p>
              </div>
            </div>
            <span className="text-xs text-muted">{xpProgress} / 500</span>
          </div>
          <Progress value={xpProgress / 5} />
        </div>

        {/* گرید مدال‌ها */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {medals.map((medal, index) => (
            <motion.button
              key={medal.id}
              onClick={() => setSelectedMedal(medal)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center rounded-xl2 border-2 p-4 transition-all ${
                medal.isEarned
                  ? "border-lime/30 bg-gradient-to-b from-lime/5 to-paper shadow-soft"
                  : "border-line bg-bg/50 opacity-60 grayscale"
              }`}
            >
              {/* نشان قفل */}
              {!medal.isEarned && (
                <div className="absolute right-2 top-2 text-muted">
                  <Lock className="h-3.5 w-3.5" />
                </div>
              )}

              {/* آیکون مدال */}
              <div className="mb-2 text-4xl">{medal.medalIcon}</div>

              {/* نام مدال */}
              <h3 className="mb-1 text-center text-xs font-bold text-ink">
                {medal.badgeName}
              </h3>

              {/* XP */}
              <p className="text-[10px] text-muted">+{medal.xpReward} XP</p>
            </motion.button>
          ))}
        </div>

        {/* پیام انگیزشی */}
        <div className="mt-6 rounded-xl2 bg-gradient-to-l from-violet to-violet-soft p-5 text-white">
          <p className="mb-1 text-xs opacity-80">هر مدال = یک قدم به جلو</p>
          <p className="text-sm font-medium leading-6">
            هر مدالی که کسب می‌کنی، نشان‌دهنده مهارت و تلاش توست. کلکسیونت رو کامل کن! 🏆
          </p>
        </div>
      </div>

      {/* مودال جزئیات مدال */}
      <AnimatePresence>
        {selectedMedal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
            onClick={() => setSelectedMedal(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-3xl bg-paper p-6 sm:rounded-3xl"
            >
              {/* دستگیره */}
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-line sm:hidden" />

              <div className="mb-4 text-center">
                <div
                  className={`mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full text-6xl ${
                    selectedMedal.isEarned
                      ? "bg-lime/10"
                      : "bg-bg grayscale opacity-50"
                  }`}
                >
                  {selectedMedal.medalIcon}
                </div>
                <h2 className="text-xl font-bold text-ink">
                  {selectedMedal.badgeName}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  مرحله {selectedMedal.stageId}: {selectedMedal.stageTitle}
                </p>
              </div>

              {/* وضعیت */}
              <div className="mb-5">
                {selectedMedal.isEarned ? (
                  <div className="rounded-xl bg-lime/10 p-4 text-center">
                    <p className="mb-1 flex items-center justify-center gap-1 text-sm font-medium text-lime-deep">
                      <Award className="h-4 w-4" />
                      مدال کسب شده!
                    </p>
                    <p className="text-xs text-muted">
                      در تاریخ {new Date(selectedMedal.earnedAt!).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber/10 p-4 text-center">
                    <p className="mb-1 flex items-center justify-center gap-1 text-sm font-medium text-amber-deep">
                      <Lock className="h-4 w-4" />
                      هنوز قفل است
                    </p>
                    <p className="text-xs text-muted">
                      برای کسب این مدال، مرحله {selectedMedal.stageId} را تکمیل کن.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedMedal(null)}
                className="w-full rounded-xl border border-line bg-paper py-3 text-sm font-medium text-ink hover:bg-bg"
              >
                بستن
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}