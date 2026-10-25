import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  const initialData = {
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
    readTime: post.readTime,
    image: post.image,
    tags: JSON.parse(post.tags),
    featured: post.featured,
    published: post.published,
  };

  return <BlogPostForm initialData={initialData} />;
}