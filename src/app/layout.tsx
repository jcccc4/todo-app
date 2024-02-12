import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/app/sessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import Header from "@/components/semantics/Header";
import QueryProviders from "@/app/QueryProviders";
import { Suspense } from "react";
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
        <QueryProviders>
          <Suspense fallback={<div>Loading...</div>}>
            <SessionProvider session={session}>
              <Header listName="Task List" />
              {children}
            </SessionProvider>
          </Suspense>
        </QueryProviders>
      </body>
    </html>
  );
}
