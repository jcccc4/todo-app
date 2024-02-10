"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const { data: session } = useSession();
  


  console.log(session);
  return <main>Welcome this is your Home page.</main>;
}
