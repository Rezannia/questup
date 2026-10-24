"use client";

import { useState } from "react";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Swords,
  Sparkles,
  CheckCircle,
  Lock,
  Trophy,
  Clock,
  ChevronLeft,
  X,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "task" | "skill";
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  stageTitle?: string;
}

export default function ChallengesClient() {
  const { data, mutate, isLoading } = useSWR("/api/challenges", fetcher);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const challenges: Challenge[] = data?.challenges || [];
  const completedCount = challenges.filter((c) => c.isCompleted).length;
  const totalCount = challenges.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  async function handleSubmit(challenge: Challenge) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: challenge.id }),
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedChallenge(null);
          mutate();
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  const difficultyColors = {
    easy: { bg: "bg-lime/10", text: "text-lime-deep", label: "آسان" },
    medium: { bg: "bg-amber/10", text: "text-amber-deep", label: "متوسط" },
    hard: { bg: "bg-cherry/10", text: "text-cherry", label: "سخت" },
  };

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
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-ink">چالش‌ها</h1>
            <p className="text-xs text-muted">
              {completedCount} از {totalCount} چالش تکمیل شده
            </p>
          </div>
          <Badge variant="violet">
            <Swords className="ml-1 h-3 w-3" />
            {completedCount}
          </Badge>
        </div>
        <Progress value={progressPercent} />
      </div>

      <div className="px-4 pt-6">
        {challenges.length === 0 ? (
          <div className="rounded-xl2 border border-line bg-paper p-12 text-center">
            <div className="mb-4 text-6xl">⚔️</div>
            <h3 className="mb-2 text-lg font-bold text-ink">
              هنوز چالشی نداری
            </h3>
            <p className="text-sm text-muted">
              با تکمیل مراحل نقشه، چالش‌های جدید باز می‌شوند.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {challenges.map((challenge, index) => {
              const diff = difficultyColors[challenge.difficulty];
              return (
                <motion.button
                  key={challenge.id}
                  onClick={() =>
                    !challenge.isLocked && setSelectedChallenge(challenge)
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={!challenge.isLocked ? { scale: 0.98 } : {}}
                  disabled={challenge.isLocked}
                  className={`w-full rounded-xl2 border p-4 text-right transition-all ${
                    challenge.isCompleted
                      ? "border-lime/30 bg-lime/5"
                      : challenge.isLocked
                      ? "border-line bg-bg/50 opacity-60"
                      : "border-line bg-paper hover:border-violet/30 hover:shadow-soft"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* آیکون */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                        challenge.isCompleted
                          ? "bg-lime/20 text-lime-deep"
                          : challenge.isLocked
                          ? "bg-line text-muted"
                          : "bg-violet/10 text-violet"
                      }`}
                    >
                      {challenge.isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : challenge.isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Swords className="h-5 w-5" />
                      )}
                    </div>

                    {/* محتوا */}
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-sm font-bold text-ink">
                          {challenge.title}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${diff.bg} ${diff.text}`}
                        >
                          {diff.label}
                        </span>
                      </div>
                      <p className="mb-2 line-clamp-2 text-xs leading-5 text-muted">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-3 text-[10px]">
                        <span className="flex items-center gap-1 text-amber-deep">
                          <Sparkles className="h-3 w-3" />
                          {challenge.xpReward} XP
                        </span>
                        {challenge.stageTitle && (
                          <span className="flex items-center gap-1 text-muted">
                            <Trophy className="h-3 w-3" />
                            {challenge.stageTitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* فلش */}
                    {!challenge.isLocked && !challenge.isCompleted && (
                      <ChevronLeft className="mt-1 h-5 w-5 flex-shrink-0 text-muted" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* پیام انگیزشی */}
        <div className="mt-6 rounded-xl2 bg-gradient-to-l from-violet to-violet-soft p-5 text-white">
          <p className="mb-1 text-xs opacity-80">هر چالش = یک مهارت جدید</p>
          <p className="text-sm font-medium leading-6">
            با هر چالشی که تکمیل می‌کنی، مهارت‌هات رو نشون می‌دی و XP بیشتری
            جمع می‌کنی! ⚔️
          </p>
        </div>
      </div>

      {/* مودال جزئیات چالش */}
      <AnimatePresence>
        {selectedChallenge && !showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
            onClick={() => setSelectedChallenge(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-3xl bg-paper p-6 sm:rounded-3xl"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-line sm:hidden" />
              <button
                onClick={() => setSelectedChallenge(null)}
                className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-bg text-muted"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-violet/10 text-5xl">
                  ⚔️
                </div>
                <h2 className="text-xl font-bold text-ink">
                  {selectedChallenge.title}
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      difficultyColors[selectedChallenge.difficulty].bg
                    } ${difficultyColors[selectedChallenge.difficulty].text}`}
                  >
                    {difficultyColors[selectedChallenge.difficulty].label}
                  </span>
                  <Badge variant="amber">
                    <Sparkles className="ml-1 h-3 w-3" />
                    {selectedChallenge.xpReward} XP
                  </Badge>
                </div>
              </div>

              <p className="mb-5 text-center text-sm leading-7 text-muted">
                {selectedChallenge.description}
              </p>

              {selectedChallenge.isCompleted ? (
                <div className="rounded-xl bg-lime/10 p-4 text-center text-sm font-medium text-lime-deep">
                  ✅ این چالش را قبلاً تکمیل کرده‌ای!
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleSubmit(selectedChallenge)}
                  loading={submitting}
                >
                  <Play className="ml-2 h-4 w-4" />
                  شروع چالش
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* جشن موفقیت */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="rounded-3xl bg-paper p-8 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
                className="mx-auto mb-4 text-7xl"
              >
                🎉
              </motion.div>
              <h2 className="mb-2 text-2xl font-bold text-ink">
                آفرین! چالش تکمیل شد
              </h2>
              <p className="text-sm text-muted">
                {selectedChallenge?.xpReward} XP گرفتی!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}