import { prisma } from "@/lib/db";

export interface BlogPost {
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
  date: string;
  readTime: number;
  image: string | null;
  tags: string[];
  featured: boolean;
}

export const categories = [
  { value: "all", label: "همه", color: "violet" },
  { value: "career", label: "کاریابی", color: "violet" },
  { value: "skills", label: "مهارت", color: "amber" },
  { value: "path", label: "مسیر شغلی", color: "lime" },
  { value: "inspiration", label: "الهام‌بخش", color: "cherry" },
  { value: "genz", label: "نسل Z", color: "pink" },
];

// خواندن همه پست‌های منتشرشده
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return posts.map(formatPost);
}

// خواندن یک پست با slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.published) return null;
  return formatPost(post);
}

// خواندن پست‌های مرتبط
export async function getRelatedPosts(category: string, excludeSlug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      category,
      slug: { not: excludeSlug },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return posts.map(formatPost);
}

function formatPost(post: any): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    categoryLabel: post.categoryLabel,
    categoryColor: post.categoryColor,
    author: post.author,
    authorRole: post.authorRole,
    date: post.createdAt.toLocaleDateString("fa-IR"),
    readTime: post.readTime,
    image: post.image,
    tags: JSON.parse(post.tags),
    featured: post.featured,
  };
}