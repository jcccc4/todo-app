import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <main>Welcome this is your Home page.</main>;
  }
}
