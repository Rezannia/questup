import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import MedalsClient from "./MedalsClient";

export default async function MedalsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <MedalsClient />;
}