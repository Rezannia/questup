'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Challenge {
  id: string
  skillName: string
  title: string
  description: string
  type: string
  difficulty: string
  xpReward: number
  questions: string
}

interface Attempt {
  id: string
  challengeId: string
  score: number
  passed: boolean
}

interface UserSkill {
  id: string
  skillName: string
  level: number
  score: number
  verified: boolean
}

export default function ChallengesClient({
  challenges,
  attempts,
  userSkills,
}: {
  challenges: Challenge[]
  attempts: Attempt[]
  userSkills: UserSkill[]
}) {
  const router = useRouter()
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const attemptsMap = new Map(attempts.map((a) => [a.challengeId, a]))
  const skillsMap = new Map(userSkills.map((s) => [s.skillName, s]))

  function startChallenge(challenge: Challenge) {
    setActiveChallenge(challenge)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResult(false)
    setScore(0)
  }

  function selectAnswer(answerIndex: number) {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  function nextQuestion() {
    if (!activeChallenge) return
    const questions = JSON.parse(activeChallenge.questions)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const correct = questions.filter(
        (q: any, i: number) => selectedAnswers[i] === q.correct
      ).length
      const finalScore = Math.round((correct / questions.length) * 100)
      setScore(finalScore)
      setShowResult(true)
    }
  }

  async function submitChallenge() {
    if (!activeChallenge) return

    setSubmitting(true)

    try {
      const res = await fetch('/api/challenges/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: activeChallenge.id,
          score,
          answers: selectedAnswers,
        }),
      })

      if (!res.ok) {
        alert('خطا در ثبت نتیجه')
        return
      }

      setActiveChallenge(null)
      router.refresh()
    } catch {
      alert('خطای شبکه')
    } finally {
      setSubmitting(false)
    }
  }

  const questions = activeChallenge
    ? JSON.parse(activeChallenge.questions)
    : []
  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* هدر */}
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/map" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br bg-primary flex items-center justify-center text-lg">
              🎮
            </div>
            <span className="font-bold text-foreground">کوئست‌آپ</span>
          </Link>
          <Link href="/map" className="text-sm text-muted-foreground hover:text-foreground">
            ← برگشت به نقشه
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        {/* عنوان */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            چالش‌های مهارتی ⚔️
          </h1>
          <p className="text-sm text-muted-foreground">
            مهارت‌هات رو با چالش‌های واقعی ثابت کن — بدون نیاز به سابقه کار
          </p>
        </div>

        {/* مهارت‌های اثبات‌شده */}
        {userSkills.filter((s) => s.verified).length > 0 && (
          <div className="bg-card rounded-lg border border-border p-4 mb-6 shadow-sm">
            <p className="text-sm font-bold text-foreground mb-3">
              ✅ مهارت‌های اثبات‌شده تو ({userSkills.filter((s) => s.verified).length})
            </p>
            <div className="flex flex-wrap gap-2">
              {userSkills
                .filter((s) => s.verified)
                .map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 border border-green-500/30 rounded-full text-xs font-bold"
                  >
                    {skill.skillName}
                    <span className="text-[10px] opacity-70">
                      L{skill.level} • {skill.score}%
                    </span>
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* پیام انگیزشی */}
        {userSkills.filter((s) => s.verified).length === 0 && (
          <div className="bg-secondary0-500/10 border border-amber-500-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">
                  هنوز مهارتی اثبات نکردی
                </p>
                <p className="text-sm text-muted-foreground">
                  یه چالش رو شروع کن. اگه ۷۰٪ بگیری، مهارتت تأیید می‌شه و
                  شرکت‌ها می‌بینن!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* لیست چالش‌ها */}
        <div className="grid sm:grid-cols-2 gap-4">
          {challenges.map((challenge, i) => {
            const attempt = attemptsMap.get(challenge.id)
            const skill = skillsMap.get(challenge.skillName)
            const questionsCount = JSON.parse(challenge.questions || '[]').length

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/30 rounded-full font-bold">
                        {challenge.skillName}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                          challenge.difficulty === 'easy'
                            ? 'bg-green-500/10 text-green-600 border-green-500/30'
                            : challenge.difficulty === 'medium'
                            ? 'bg-secondary0-500/10 text-primary-foreground0-600 border-amber-500-500/30'
                            : 'bg-destructive/10 text-destructive border-destructive/30'
                        }`}
                      >
                        {challenge.difficulty === 'easy'
                          ? 'آسان'
                          : challenge.difficulty === 'medium'
                          ? 'متوسط'
                          : 'سخت'}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-foreground">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {challenge.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {questionsCount} سوال
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-primary-foreground0-600 font-bold">
                      +{challenge.xpReward} XP
                    </span>
                    {attempt && (
                      <span
                        className={`font-bold ${
                          attempt.passed ? 'text-green-600' : 'text-destructive'
                        }`}
                      >
                        {attempt.passed ? '✅' : '❌'} {attempt.score}%
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => startChallenge(challenge)}
                    className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                      attempt?.passed
                        ? 'bg-background border border-border text-foreground hover:border-primary/30'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {attempt?.passed ? '🔁 تکرار' : 'شروع چالش →'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* مودال چالش */}
      <AnimatePresence>
        {activeChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50  z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg border border-border shadow-lg max-w-lg w-full"
            >
              {!showResult ? (
                <>
                  {/* هدر */}
                  <div className="p-5 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">
                        سوال {currentQuestion + 1} از {questions.length}
                      </p>
                      <button
                        onClick={() => setActiveChallenge(null)}
                        className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-line"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((currentQuestion + 1) / questions.length) * 100
                          }%`,
                        }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* سوال */}
                  <div className="p-5">
                    <h3 className="font-extrabold text-foreground text-lg mb-4">
                      {currentQ.question}
                    </h3>

                    <div className="space-y-2">
                      {currentQ.options.map((option: string, idx: number) => {
                        const isSelected =
                          selectedAnswers[currentQuestion] === idx
                        return (
                          <button
                            key={idx}
                            onClick={() => selectAnswer(idx)}
                            className={`
                              w-full text-right p-4 rounded-lg border-2 transition-all
                              ${
                                isSelected
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-background border-border text-foreground hover:border-primary/30'
                              }
                            `}
                          >
                            <span className="font-bold text-sm">
                              {String.fromCharCode(65 + idx)}. {option}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {selectedAnswers[currentQuestion] !== undefined && (
                      <button
                        onClick={nextQuestion}
                        className="w-full mt-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all"
                      >
                        {currentQuestion < questions.length - 1
                          ? 'سوال بعدی →'
                          : 'دیدن نتیجه'}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* نتیجه */}
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className={`text-7xl mb-4 ${
                        score >= 70 ? '' : 'grayscale'
                      }`}
                    >
                      {score >= 70 ? '🏆' : score >= 50 ? '🎯' : '😅'}
                    </motion.div>

                    <h3 className="text-2xl font-extrabold text-foreground mb-2">
                      {score >= 70
                        ? 'عالی بود!'
                        : score >= 50
                        ? 'خوبه، ولی می‌تونی بهتر کنی'
                        : 'دوباره تلاش کن'}
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      {
                        questions.filter(
                          (q: any, i: number) =>
                            selectedAnswers[i] === q.correct
                        ).length
                      }{' '}
                      از {questions.length} درست
                    </p>

                    <div
                      className={`text-5xl font-extrabold mb-6 ${
                        score >= 70
                          ? 'text-green-600'
                          : score >= 50
                          ? 'text-primary-foreground0-600'
                          : 'text-destructive'
                      }`}
                    >
                      {score}%
                    </div>

                    {score >= 70 && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                        <p className="text-sm font-bold text-green-600">
                          ✅ مهارت «{activeChallenge.skillName}» تأیید شد!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          +{activeChallenge.xpReward} XP
                        </p>
                      </div>
                    )}

                    {score < 70 && (
                      <div className="bg-secondary0-500/10 border border-amber-500-500/30 rounded-lg p-3 mb-4">
                        <p className="text-sm font-bold text-primary-foreground0-600">
                          💡 برای تأیید مهارت، حداقل ۷۰٪ نیازه
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => startChallenge(activeChallenge)}
                        className="flex-1 py-3 bg-background border border-border text-foreground rounded-lg font-bold hover:bg-line transition-all"
                      >
                        🔁 تکرار
                      </button>
                      <button
                        onClick={submitChallenge}
                        disabled={submitting}
                        className="flex-1 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-all"
                      >
                        {submitting ? 'در حال ثبت...' : 'ثبت و بستن'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
