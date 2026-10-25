import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "مقاله یافت نشد" };
  return {
    title: `${post.title} | بلاگ کوئست‌آپ`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(post.category, post.slug);

  return (
    <div className="min-h-screen bg-bg">
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به بلاگ
        </Link>

        <span className={`mb-4 inline-block rounded-full bg-${post.categoryColor}/10 px-3 py-1 text-xs font-medium text-${post.categoryColor}`}>
          {post.categoryLabel}
        </span>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime} دقیقه
          </span>
        </div>

        <div className="mb-8 aspect-video overflow-hidden rounded-xl2 bg-gradient-to-br from-violet/20 to-lilac/20" />

        <div
          className="prose prose-lg max-w-none text-ink"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg px-3 py-1 text-xs text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-12 rounded-xl2 bg-gradient-to-l from-violet to-violet-soft p-6 text-center text-white">
          <p className="mb-2 text-sm font-medium">
            آماده‌ای مسیر شغلیت رو شروع کنی؟
          </p>
          <Link href="/register">
            <Button className="bg-white text-violet hover:bg-white/90">
              ثبت‌نام رایگان
            </Button>
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-6 text-xl font-bold text-ink">
              مقالات مرتبط
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`}>
                  <article className="group rounded-xl2 border border-line bg-bg p-4 transition-all hover:shadow-soft">
                    <h3 className="mb-2 text-sm font-bold text-ink group-hover:text-violet">
                      {r.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-6 text-muted">
                      {r.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}