"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Save,
  Sparkles,
  Trophy,
  Target,
  Calendar,
  CheckCircle,
  Edit3,
  X,
} from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const AVATARS = [
  "👧", "👦", "🧑", "👩", "👨", "🧕", "👱", "🧔",
  "👩‍💻", "👨‍💻", "🦊", "🐼", "🐯", "🦁", "🐸", "🐨",
];

export default function ProfileClient() {
  const { data, mutate, isLoading } = useSWR("/api/profile", fetcher);
  const { data: progressData } = useSWR("/api/progress", fetcher);

  const user = data?.user;
  const stages = progressData?.stages || [];
  const medals = progressData?.medals || [];
  const totalXp = progressData?.totalXp || 0;
  const level = progressData?.level || 1;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [skills, setSkills] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setAvatar(user.avatar || "🧑");
      setSkills(user.skills ? JSON.parse(user.skills).join(", ") : "");
    }
  }, [user]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          avatar,
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      mutate();
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || !user) {
    return (
      <div className="p-6">
        <div className="h-40 animate-pulse rounded-xl2 bg-line/50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg px-4 pb-24 pt-6">
      {/* کارت پروفایل */}
      <div className="relative overflow-hidden rounded-xl2 border border-line bg-paper p-6 shadow-soft">
        {/* دکمه ویرایش */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-bg text-muted hover:text-ink"
        >
          {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
        </button>

        {/* آواتار و نام */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet/10 text-5xl">
              {avatar || "🧑"}
            </div>
            <Badge
              variant="violet"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2"
            >
              لِوِل {level}
            </Badge>
          </div>

          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام شما"
              className="text-center"
            />
          ) : (
            <h1 className="text-xl font-bold text-ink">{user.name}</h1>
          )}
          <p className="mt-1 text-xs text-muted">{user.email}</p>
        </div>

        {/* انتخاب آواتار (فقط در حالت ویرایش) */}
        {isEditing && (
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium text-muted">
              آواتار
            </label>
            <div className="grid grid-cols-8 gap-1.5">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xl transition-all ${
                    avatar === a
                      ? "bg-violet/20 ring-2 ring-violet"
                      : "bg-bg hover:bg-line"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* بیو */}
        <div className="mt-5">
          <label className="mb-2 block text-xs font-medium text-muted">
            درباره من
          </label>
          {isEditing ? (
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="چند خط درباره خودت بنویس..."
              rows={3}
              maxLength={300}
            />
          ) : (
            <p className="text-sm leading-7 text-ink">
              {user.bio || "هنوز بیویی نداری. یه چیزی درباره خودت بنویس!"}
            </p>
          )}
        </div>

        {/* مهارت‌ها */}
        <div className="mt-5">
          <label className="mb-2 block text-xs font-medium text-muted">
            مهارت‌ها
          </label>
          {isEditing ? (
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="مثلاً: React, طراحی, تیم‌ورک"
            />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {(user.skills ? JSON.parse(user.skills) : []).length > 0 ? (
                JSON.parse(user.skills).map((s: string) => (
                  <Badge key={s} variant="lime">
                    {s}
                  </Badge>
                ))
              ) : (
                <p className="text-xs text-muted">هنوز مهارتی اضافه نکردی.</p>
              )}
            </div>
          )}
        </div>

        {/* دکمه ذخیره */}
        {isEditing && (
          <Button
            onClick={handleSave}
            loading={saving}
            className="mt-5 w-full"
          >
            <Save className="ml-2 h-4 w-4" />
            ذخیره تغییرات
          </Button>
        )}
      </div>

      {/* آمار */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatBox
          icon={<Sparkles className="h-4 w-4" />}
          value={totalXp}
          label="XP"
          color="amber"
        />
        <StatBox
          icon={<Trophy className="h-4 w-4" />}
          value={medals.length}
          label="مدال"
          color="lime"
        />
        <StatBox
          icon={<Target className="h-4 w-4" />}
          value={`${stages.filter((s: any) => s.completed).length}/۱۰`}
          label="مرحله"
          color="violet"
        />
      </div>

      {/* پیشرفت XP */}
      <div className="mt-5 rounded-xl2 border border-line bg-paper p-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-ink">پیشرفت تا لِوِل بعدی</span>
          <span className="text-muted">{totalXp % 500} / 500</span>
        </div>
        <Progress value={(totalXp % 500) / 5} />
        <p className="mt-3 text-xs text-muted">
          {500 - (totalXp % 500)} XP تا لِوِل {level + 1}
        </p>
      </div>

      {/* پیام انگیزشی */}
      <div className="mt-5 rounded-xl2 bg-gradient-to-l from-violet to-violet-soft p-5 text-white">
        <p className="mb-1 text-xs opacity-80">پروفایل کامل = دیده شدن بیشتر</p>
        <p className="text-sm font-medium leading-6">
          هر چیزی که درباره خودت می‌نویسی، شانس دیده شدنت توسط شرکت‌ها رو بیشتر می‌کنه! 🚀
        </p>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: "violet" | "amber" | "lime";
}) {
  const colors = {
    violet: "bg-violet/10 text-violet",
    amber: "bg-amber/10 text-amber-deep",
    lime: "bg-lime/10 text-lime-deep",
  };

  return (
    <div className="rounded-xl2 border border-line bg-paper p-4 text-center">
      <div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-lg font-bold text-ink">{value}</p>
      <p className="text-[10px] text-muted">{label}</p>
    </div>
  );
}