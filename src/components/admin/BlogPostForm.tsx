"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Save, X } from "lucide-react";

interface BlogPostFormProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    categoryLabel: string;
    categoryColor: string;
    author: string;
    authorRole: string;
    readTime: number;
    image: string | null;
    tags: string[];
    featured: boolean;
    published: boolean;
  };
}

const categories = [
  { value: "career", label: "کاریابی", color: "violet" },
  { value: "skills", label: "مهارت", color: "amber" },
  { value: "path", label: "مسیر شغلی", color: "lime" },
  { value: "inspiration", label: "الهام‌بخش", color: "cherry" },
  { value: "genz", label: "نسل Z", color: "pink" },
];

export function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "career",
    categoryLabel: initialData?.categoryLabel || "کاریابی",
    categoryColor: initialData?.categoryColor || "violet",
    author: initialData?.author || "تیم کوئست‌آپ",
    authorRole: initialData?.authorRole || "تولید محتوا",
    readTime: initialData?.readTime || 5,
    image: initialData?.image || "",
    tags: initialData?.tags?.join(", ") || "",
    featured: initialData?.featured || false,
    published: initialData?.published ?? true,
  });

  function updateField(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCategoryChange(value: string) {
    const cat = categories.find((c) => c.value === value);
    if (cat) {
      setForm((prev) => ({
        ...prev,
        category: cat.value,
        categoryLabel: cat.label,
        categoryColor: cat.color,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      readTime: Number(form.readTime),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: form.image || null,
    };

    try {
      const url = isEdit
        ? `/api/blog/${initialData!.id}`
        : "/api/blog";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطا در ذخیره");
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError("خطای شبکه");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        {/* هدر */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.push("/admin/blog")}
              className="mb-2 flex items-center gap-1 text-sm text-muted hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به لیست
            </button>
            <h1 className="text-2xl font-bold text-ink md:text-3xl">
              {isEdit ? "ویرایش پست" : "پست جدید"}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* عنوان */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              عنوان *
            </label>
            <Input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="مثلاً: چطور در ۳۰ روز مصاحبه رو بترکونی"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Slug (آدرس یکتا) *
            </label>
            <Input
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="how-to-ace-interview"
              required
              dir="ltr"
            />
            <p className="mt-1 text-xs text-muted">
              فقط حروف انگلیسی، اعداد و خط تیره. مثال: how-to-ace-interview
            </p>
          </div>

          {/* خلاصه */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              خلاصه (۲-۳ جمله) *
            </label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="خلاصه‌ای کوتاه از پست..."
              rows={3}
              required
            />
          </div>

          {/* محتوا */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              محتوا (HTML) *
            </label>
            <Textarea
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="<h2>عنوان بخش</h2><p>محتوا...</p>"
              rows={15}
              required
              dir="ltr"
              className="font-mono text-xs"
            />
            <p className="mt-1 text-xs text-muted">
              می‌توانید از تگ‌های HTML مثل &lt;h2&gt;، &lt;p&gt;، &lt;ul&gt;، &lt;strong&gt; استفاده کنید.
            </p>
          </div>

          {/* دسته‌بندی */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              دسته‌بندی *
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    form.category === cat.value
                      ? "bg-violet text-white"
                      : "bg-bg text-muted hover:text-ink"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* نویسنده */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                نویسنده
              </label>
              <Input
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                نقش نویسنده
              </label>
              <Input
                value={form.authorRole}
                onChange={(e) => updateField("authorRole", e.target.value)}
              />
            </div>
          </div>

          {/* زمان مطالعه + تصویر */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                زمان مطالعه (دقیقه)
              </label>
              <Input
                type="number"
                value={form.readTime}
                onChange={(e) => updateField("readTime", e.target.value)}
                min={1}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                تصویر (مسیر)
              </label>
              <Input
                value={form.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="/blog/my-image.jpg"
                dir="ltr"
              />
            </div>
          </div>

          {/* تگ‌ها */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              تگ‌ها (با کاما جدا کنید)
            </label>
            <Input
              value={form.tags}
              onChange={(e) => updateField("tags", e.target.value)}
              placeholder="مصاحبه, کاریابی, مهارت"
            />
          </div>

          {/* گزینه‌ها */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-4 w-4 rounded border-line"
              />
              پست ویژه
            </label>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => updateField("published", e.target.checked)}
                className="h-4 w-4 rounded border-line"
              />
              منتشر شود
            </label>
          </div>

          {/* خطا */}
          {error && (
            <div className="rounded-lg bg-cherry/10 p-3 text-sm text-cherry">
              {error}
            </div>
          )}

          {/* دکمه‌ها */}
          <div className="flex gap-3 border-t border-line pt-5">
            <Button type="submit" loading={loading} className="flex-1">
              <Save className="ml-2 h-4 w-4" />
              {isEdit ? "ذخیره تغییرات" : "ساخت پست"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blog")}
            >
              <X className="ml-2 h-4 w-4" />
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}