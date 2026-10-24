"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  CheckCircle,
  Star,
  Sparkles,
  ChevronLeft,
  X,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Stage {
  id: number;
  order: number;
  title: string;
  description: string;
  icon: string;
  badgeName: string;
  medalIcon: string;
  xpReward: number;
  x: number;
  y: number;
  completed: boolean;
}

export default function MapClient() {
  const router = useRouter();
  const { data, mutate, isLoading } = useSWR("/api/progress", fetcher);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completing, setCompleting] = useState(false);

  const stages: Stage[] = data?.stages || [];
  const totalXp = data?.totalXp || 0;
  const completedCount = stages.filter((s) => s.completed).length;
  const progressPercent = (completedCount / 10) * 100;

  // پیدا کردن مرحله فعلی (اولین مرحله تکمیل‌نشده)
  const currentStageIndex = stages.findIndex((s) => !s.completed);
  const currentStage = currentStageIndex !== -1 ? stages[currentStageIndex] : null;

  async function handleComplete(stage: Stage) {
    setCompleting(true);
    try {
      const res = await fetch(`/api/progress/${stage.id}/complete`, {
        method: "POST",
      });
      if (res.ok) {
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setSelectedStage(null);
          mutate();
        }, 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCompleting(false);
    }
  }

  // بررسی قفل بودن مرحله
  function isLocked(stage: Stage): boolean {
    if (stage.completed) return false;
    if (stage.order === 1) return false;
    const prevStage = stages.find((s) => s.order === stage.order - 1);
    return !prevStage?.completed;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* هدر با پیشرفت */}
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 px-4 py-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-ink">نقشه سفر تو</h1>
            <p className="text-xs text-muted">
              {completedCount} از ۱۰ مرحله طی شده
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="amber">
              <Sparkles className="ml-1 h-3 w-3" />
              {totalXp} XP
            </Badge>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full bg-gradient-to-l from-violet to-lilac"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* نقشه */}
      <div className="relative mx-auto mt-6 max-w-md px-4">
        <div className="relative h-[600px] w-full rounded-3xl border border-line bg-gradient-to-b from-paper to-bg p-4">
          {/* مسیر (SVG) */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {stages.map((stage, i) => {
              if (i === stages.length - 1) return null;
              const next = stages[i + 1];
              const isPathCompleted = stage.completed && next.completed;
              return (
                <line
                  key={stage.id}
                  x1={`${stage.x}%`}
                  y1={`${stage.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke={isPathCompleted ? "#8b9d5a" : "#e8e2d4"}
                  strokeWidth="0.8"
                  strokeDasharray={isPathCompleted ? "0" : "2,2"}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* ایستگاه‌ها */}
          {stages.map((stage) => {
            const locked = isLocked(stage);
            return (
              <motion.button
                key={stage.id}
                onClick={() => !locked && setSelectedStage(stage)}
                className="absolute"
                style={{
                  left: `${stage.x}%`,
                  top: `${stage.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={!locked ? { scale: 1.1 } : {}}
                whileTap={!locked ? { scale: 0.95 } : {}}
              >
                <div className="relative">
                  {/* هاله برای مرحله فعلی */}
                  {currentStage?.id === stage.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-violet/30"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* دایره اصلی */}
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl shadow-soft transition-all ${
                      stage.completed
                        ? "border-lime bg-lime/20"
                        : locked
                        ? "border-line bg-bg opacity-60"
                        : currentStage?.id === stage.id
                        ? "border-violet bg-paper ring-4 ring-violet/20"
                        : "border-violet/40 bg-paper"
                    }`}
                  >
                    {locked ? (
                      <Lock className="h-5 w-5 text-muted" />
                    ) : stage.completed ? (
                      <span>{stage.medalIcon}</span>
                    ) : (
                      <span>{stage.icon}</span>
                    )}

                    {/* نشان تکمیل */}
                    {stage.completed && (
                      <div className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime text-white">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>

                  {/* شماره */}
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white">
                    {stage.order}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* کارت مرحله فعلی */}
      {currentStage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-6 rounded-xl2 border border-violet/20 bg-gradient-to-l from-violet/5 to-paper p-5"
        >
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="violet">مرحله بعدی</Badge>
            <span className="text-xs text-muted">
              {currentStage.xpReward} XP
            </span>
          </div>
          <h3 className="mb-1 text-base font-bold text-ink">
            {currentStage.title}
          </h3>
          <p className="mb-4 text-sm leading-6 text-muted">
            {currentStage.description}
          </p>
          <Button
            className="w-full"
            onClick={() => setSelectedStage(currentStage)}
          >
            ادامه مسیر
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* مودال جزئیات مرحله */}
      <AnimatePresence>
        {selectedStage && !showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
            onClick={() => setSelectedStage(null)}
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

              <button
                onClick={() => setSelectedStage(null)}
                className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-bg text-muted"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-violet/10 text-5xl">
                  {selectedStage.icon}
                </div>
                <Badge variant="violet">مرحله {selectedStage.order}</Badge>
                <h2 className="mt-3 text-xl font-bold text-ink">
                  {selectedStage.title}
                </h2>
              </div>

              <p className="mb-5 text-center text-sm leading-7 text-muted">
                {selectedStage.description}
              </p>

              <div className="mb-5 rounded-xl bg-amber/10 p-4 text-center">
                <p className="text-xs text-muted">پاداش این مرحله</p>
                <p className="mt-1 text-lg font-bold text-amber-deep">
                  {selectedStage.xpReward} XP + مدال {selectedStage.badgeName}
                </p>
              </div>

              {selectedStage.completed ? (
                <div className="rounded-xl bg-lime/10 p-4 text-center text-sm font-medium text-lime-deep">
                  ✅ این مرحله را قبلاً تکمیل کرده‌ای!
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleComplete(selectedStage)}
                  loading={completing}
                >
                  <Star className="ml-2 h-4 w-4" />
                  تکمیل مرحله
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* جشن تکمیل */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-md"
          >
            {/* کانفتی */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  backgroundColor: [
                    "#8b9d5a",
                    "#f4c95d",
                    "#1e3a8a",
                    "#7c9ad9",
                    "#a8324a",
                  ][i % 5],
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: 0,
                }}
                transition={{ duration: 1.5, delay: i * 0.02 }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative z-10 rounded-3xl bg-paper p-8 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
                className="mx-auto mb-4 text-7xl"
              >
                🎉
              </motion.div>
              <h2 className="mb-2 text-2xl font-bold text-ink">
                آفرین! مرحله تکمیل شد
              </h2>
              <p className="text-sm text-muted">
                {selectedStage?.xpReward} XP گرفتی و مدال{" "}
                <span className="font-medium text-ink">
                  {selectedStage?.badgeName}
                </span>{" "}
                رو به دست آوردی!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}