"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setError(data.errors.map((e: { message: string }) => e.message).join("، "));
        } else {
          setError(data.error || "خطا در ورود");
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
        <h1 className="mb-2 text-2xl font-bold text-ink">خوش برگشتی!</h1>
        <p className="mb-6 text-sm text-muted">ادامه مسیرت رو از همین‌جا برو</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="رمز عبورت"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            dir="ltr"
          />

          {error && (
            <div className="rounded-lg bg-cherry/10 p-3 text-sm text-cherry">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            ورود
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          حساب نداری؟{" "}
          <Link href="/register" className="font-medium text-violet hover:underline">
            ثبت‌نام کن
          </Link>
        </p>
      </div>
    </div>
  );
}