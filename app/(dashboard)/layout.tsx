"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Modal from "@/components/dashboard/common/Modal";
import { Provider } from "@/components/dashboard/common/Provider";
import NextAuthProvider from "@/components/webapp/NextAUthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Modal />
        <Sidebar>
          <div className="bg-[#f5f5f5] h-screen overflow-y-scroll">
            <Provider>
              <NextAuthProvider>{children}</NextAuthProvider>
            </Provider>
          </div>
        </Sidebar>
      </body>
    </html>
  );
}
