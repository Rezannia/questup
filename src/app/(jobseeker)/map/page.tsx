import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import MapClient from "./MapClient";

export default async function MapPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <MapClient />;
}