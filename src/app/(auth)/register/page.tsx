"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleSelector } from "@/components/ui/RoleSelector";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"JOBSEEKER" | "COMPANY">("JOBSEEKER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setError(data.errors.map((e: { message: string }) => e.message).join("، "));
        } else {
          setError(data.error || "خطا در ثبت‌نام");
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("خطای شبکه");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-md rounded-xl2 border border-line bg-paper p-8 shadow-soft">
        <h1 className="mb-2 text-2xl font-bold text-ink">خوش اومدی به کوئست‌آپ!</h1>
        <p className="mb-6 text-sm text-muted">
          مسیر شغلیت رو با حال‌وهوای خودت شروع کن
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <RoleSelector value={role} onChange={setRole} />

          <Input
            label="نام"
            type="text"
            placeholder="مثلاً سارا"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />

          <Input
            label="ایمیل"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            dir="ltr"
          />

          <Input
            label="رمز عبور"
            type="password"
            placeholder="حداقل ۶ کاراکتر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            dir="ltr"
          />

          {error && (
            <div className="rounded-lg bg-cherry/10 p-3 text-sm text-cherry">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            ثبت‌نام
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          قبلاً ثبت‌نام کردی؟{" "}
          <Link href="/login" className="font-medium text-violet hover:underline">
            وارد شو
          </Link>
        </p>
      </div>
    </div>
  );
}