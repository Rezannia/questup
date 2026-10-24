import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ChallengesClient from "./ChallengesClient";

export default async function ChallengesPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <ChallengesClient />;
}