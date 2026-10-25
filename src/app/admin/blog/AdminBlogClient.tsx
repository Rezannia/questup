"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  readTime: number;
}

export function AdminBlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string, title: string) {
    if (!confirm(`آیا از حذف «${title}» مطمئنید؟`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublished(id: string, current: boolean) {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !current }),
      });
      if (res.ok) {
        setPosts(
          posts.map((p) => (p.id === id ? { ...p, published: !current } : p))
        );
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink md:text-3xl">
              مدیریت بلاگ
            </h1>
            <p className="mt-1 text-sm text-muted">
              {posts.length} پست · {posts.filter((p) => p.published).length} منتشرشده
            </p>
          </div>
          <Link href="/admin/blog/new">
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              پست جدید
            </Button>
          </Link>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-xl2 border border-line bg-paper p-12 text-center">
            <div className="mb-4 text-6xl">📝</div>
            <h3 className="mb-2 text-lg font-bold text-ink">هنوز پستی نداری</h3>
            <p className="mb-4 text-sm text-muted">اولین پستت رو بساز.</p>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                ساخت اولین پست
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 rounded-xl2 border border-line bg-paper p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full bg-${post.categoryColor}/10 px-2 py-0.5 text-[10px] font-medium text-${post.categoryColor}`}>
                      {post.categoryLabel}
                    </span>
                    {post.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-amber/10 px-2 py-0.5 text-[10px] font-medium text-amber-deep">
                        <Star className="h-3 w-3" />
                        ویژه
                      </span>
                    )}
                    {!post.published && (
                      <span className="rounded-full bg-cherry/10 px-2 py-0.5 text-[10px] font-medium text-cherry">
                        پیش‌نویس
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-ink">{post.title}</h3>
                  <p className="text-xs text-muted">/{post.slug}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => togglePublished(post.id, post.published)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg text-muted hover:text-ink"
                  >
                    {post.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg text-muted hover:text-ink">
                      <Edit className="h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg text-cherry hover:bg-cherry/10 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}