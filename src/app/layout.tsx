import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/sessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import ListHeader from "@/components/listHeader";
import Providers from "@/lib/providers";
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
          <Providers>
            <ListHeader listName="Task List" />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
