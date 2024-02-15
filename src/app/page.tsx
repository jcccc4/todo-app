"use client";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();
  const session = await getServerSession(authOptions);
  if (session) {
    router.push("/dashboard");
  }
  console.log(session);
  return <main>Welcome this is your Home page.</main>;
}
