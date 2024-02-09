import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/app/_providers/sessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import Header from "@/components/semantics/Header";
import QueryProviders from "@/app/_providers/QueryProviders";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProviders>
            <Header listName="Task List" />
            {children}
          </QueryProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
