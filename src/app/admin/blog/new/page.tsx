import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default async function NewBlogPostPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return <BlogPostForm />;
}