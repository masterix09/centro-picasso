"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Modal from "@/components/dashboard/common/Modal";
import { Provider } from "@/components/dashboard/common/Provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal />
        <Sidebar>
          <div className="bg-[#f5f5f5] h-full lg:h-screen overflow-y-scroll">
            <Provider>{children}</Provider>
          </div>
        </Sidebar>
      </body>
    </html>
  );
}
