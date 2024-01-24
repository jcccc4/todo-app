import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/ui/sessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import ListHeader from "@/components/ui/listHeader";
import Providers from "@/components/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "For the people",
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
