"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Users,
  Briefcase,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  ArrowLeft,
  Filter,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Jobseeker {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills?: string;
  level: number;
  totalXp: number;
  medalsCount: number;
  completedStages: number;
}

export default function CompanyClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"xp" | "medals" | "newest">("xp");
  const [selectedJobseeker, setSelectedJobseeker] = useState<Jobseeker | null>(null);
  const [offerMessage, setOfferMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [offerSent, setOfferSent] = useState<string | null>(null);

  const { data: jobseekersData, isLoading } = useSWR(
    "/api/company/jobseekers",
    fetcher
  );

  const { data: statsData } = useSWR("/api/company/stats", fetcher);

  const jobseekers: Jobseeker[] = jobseekersData?.jobseekers || [];
  const stats = statsData || {
    totalJobseekers: 0,
    offersSent: 0,
    pendingOffers: 0,
    acceptedOffers: 0,
  };

  // فیلتر و مرتب‌سازی
  const filteredJobseekers = jobseekers
    .filter(
      (j) =>
        j.name.toLowerCase().includes(search.toLowerCase()) ||
        j.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "xp") return b.totalXp - a.totalXp;
      if (sortBy === "medals") return b.medalsCount - a.medalsCount;
      return 0;
    });

  async function handleSendOffer() {
    if (!selectedJobseeker || !offerMessage.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/company/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobseekerId: selectedJobseeker.id,
          message: offerMessage,
        }),
      });
      if (res.ok) {
        setOfferSent(selectedJobseeker.name);
        setOfferMessage("");
        setSelectedJobseeker(null);
        setTimeout(() => setOfferSent(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* هدر */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className="mb-2 flex items-center gap-1 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            بازگشت به داشبورد
          </button>
          <h1 className="text-3xl font-bold text-ink">پنل شرکت</h1>
          <p className="mt-1 text-sm text-muted">
            کارجوهای مستعد را پیدا کنید و به آن‌ها پیشنهاد شغلی بدهید
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => router.push("/company/jobs")}
          >
            <Briefcase className="ml-2 h-4 w-4" />
            شغل‌های من
          </Button>
          <Button onClick={() => router.push("/company/jobs/new")}>
            <Plus className="ml-2 h-4 w-4" />
            پست شغل جدید
          </Button>
        </div>
      </div>

      {/* آمار */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="کارجوی فعال"
          value={stats.totalJobseekers}
          color="violet"
        />
        <StatCard
          icon={<Send className="h-5 w-5" />}
          label="پیشنهاد ارسالی"
          value={stats.offersSent}
          color="lilac"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="در انتظار"
          value={stats.pendingOffers}
          color="amber"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          label="پذیرفته"
          value={stats.acceptedOffers}
          color="lime"
        />
      </div>

      {/* فیلتر و جستجو */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="جستجوی نام یا ایمیل کارجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          <SortButton
            active={sortBy === "xp"}
            onClick={() => setSortBy("xp")}
            icon={<TrendingUp className="h-4 w-4" />}
          >
            XP
          </SortButton>
          <SortButton
            active={sortBy === "medals"}
            onClick={() => setSortBy("medals")}
            icon={<Sparkles className="h-4 w-4" />}
          >
            مدال
          </SortButton>
          <SortButton
            active={sortBy === "newest"}
            onClick={() => setSortBy("newest")}
            icon={<Clock className="h-4 w-4" />}
          >
            جدیدترین
          </SortButton>
        </div>
      </div>

      {/* لیست کارجوها */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl2 bg-line/50" />
          ))}
        </div>
      ) : filteredJobseekers.length === 0 ? (
        <div className="rounded-xl2 border border-line bg-paper p-12 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-lg font-bold text-ink">کارجویی پیدا نشد</h3>
          <p className="text-sm text-muted">فیلتر یا جستجو را تغییر دهید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobseekers.map((j) => (
            <div
              key={j.id}
              className="group rounded-xl2 border border-line bg-paper p-5 transition-all hover:border-violet/30 hover:shadow-soft"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={j.avatar}
                    name={j.name}
                    size="lg"
                  />
                  <div>
                    <h3 className="font-bold text-ink">{j.name}</h3>
                    <p className="text-xs text-muted">{j.email}</p>
                  </div>
                </div>
                <Badge variant="violet">لِوِل {j.level}</Badge>
              </div>

              {j.bio && (
                <p className="mb-3 line-clamp-2 text-sm text-muted">{j.bio}</p>
              )}

              {/* XP و مدال */}
              <div className="mb-3 flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-amber-deep">
                  <Sparkles className="h-3.5 w-3.5" />
                  {j.totalXp} XP
                </span>
                <span className="flex items-center gap-1 text-lime-deep">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {j.medalsCount} مدال
                </span>
              </div>

              {/* پیشرفت */}
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-[10px] text-muted">
                  <span>پیشرفت نقشه</span>
                  <span>{j.completedStages}/۱۰</span>
                </div>
                <Progress value={(j.completedStages / 10) * 100} />
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => setSelectedJobseeker(j)}
              >
                <Send className="ml-2 h-4 w-4" />
                ارسال پیشنهاد
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* مودال ارسال پیشنهاد */}
      {selectedJobseeker && (
        <Dialog
          open={!!selectedJobseeker}
          onClose={() => setSelectedJobseeker(null)}
          title={`ارسال پیشنهاد به ${selectedJobseeker.name}`}
        >
          <Textarea
            placeholder="پیام پیشنهاد خود را بنویسید..."
            value={offerMessage}
            onChange={(e) => setOfferMessage(e.target.value)}
            rows={5}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setSelectedJobseeker(null)}
            >
              انصراف
            </Button>
            <Button
              onClick={handleSendOffer}
              loading={sending}
              disabled={!offerMessage.trim()}
            >
              <Send className="ml-2 h-4 w-4" />
              ارسال
            </Button>
          </div>
        </Dialog>
      )}

      {/* پیام موفقیت */}
      {offerSent && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl bg-lime px-6 py-3 text-sm font-medium text-white shadow-soft">
          ✅ پیشنهاد به {offerSent} ارسال شد!
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "violet" | "lilac" | "amber" | "lime";
}) {
  const colors = {
    violet: "bg-violet/10 text-violet",
    lilac: "bg-lilac/10 text-lilac",
    amber: "bg-amber/10 text-amber-deep",
    lime: "bg-lime/10 text-lime-deep",
  };

  return (
    <div className="rounded-xl2 border border-line bg-paper p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-ink">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function SortButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
        active
          ? "bg-violet text-white"
          : "bg-paper text-muted hover:text-ink"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}