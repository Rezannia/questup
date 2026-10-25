import { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import { Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "بلاگ کوئست‌آپ | مقالات کاریابی و مهارت",
  description: "مقالات کوتاه و کاربردی درباره کاریابی، مهارت‌های نسل Z، و مسیر شغلی.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-bg">
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-ink md:text-5xl">
              بلاگ کوئست‌آپ
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted md:text-base">
              مقالات کوتاه و کاربردی درباره کاریابی، مهارت، و مسیر شغلی.
              بدون کرینج، بدون کلیشه.
            </p>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-bg py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-6 text-xl font-bold text-ink md:text-2xl">
              🔥 ویژه
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {featured.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group overflow-hidden rounded-xl2 border border-line bg-paper transition-all hover:shadow-soft">
                    <div className="aspect-video bg-gradient-to-br from-violet/20 to-lilac/20" />
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className={`rounded-full bg-${post.categoryColor}/10 px-2.5 py-0.5 text-xs font-medium text-${post.categoryColor}`}>
                          {post.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Clock className="h-3 w-3" />
                          {post.readTime} دقیقه
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-ink group-hover:text-violet md:text-xl">
                        {post.title}
                      </h3>
                      <p className="mb-4 text-sm leading-7 text-muted">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <User className="h-3 w-3" />
                        {post.author} · {post.date}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bg pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-6 text-xl font-bold text-ink md:text-2xl">
            همه مقالات
          </h2>
          {rest.length === 0 ? (
            <div className="rounded-xl2 border border-line bg-paper p-12 text-center">
              <p className="text-sm text-muted">هنوز مقاله‌ای منتشر نشده.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group h-full overflow-hidden rounded-xl2 border border-line bg-paper transition-all hover:shadow-soft">
                    <div className="aspect-video bg-gradient-to-br from-violet/20 to-lilac/20" />
                    <div className="p-5">
                      <span className={`mb-2 inline-block rounded-full bg-${post.categoryColor}/10 px-2.5 py-0.5 text-xs font-medium text-${post.categoryColor}`}>
                        {post.categoryLabel}
                      </span>
                      <h3 className="mb-2 text-base font-bold text-ink group-hover:text-violet">
                        {post.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-xs leading-6 text-muted">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted">
                        <Clock className="h-3 w-3" />
                        {post.readTime} دقیقه
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}