"use client";

import { useState } from "react";
import { Lexend } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import BottomNav from "@/components/BottomNav";
import RiwayatModal from "@/components/RiwayatModal";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showRiwayat, setShowRiwayat] = useState(false);

  return (
    <html lang="id">
      <body className={`${lexend.variable} font-lexend`}>
        <div className="min-h-screen bg-gray-300">
          <div className="mx-auto min-h-screen w-full max-w-[420px] bg-white shadow-2xl">
            <div className="flex min-h-screen flex-col">
              <TopHeader />
              <main className="flex-1 pb-20">{children}</main>
              <BottomNav onRiwayatClick={() => setShowRiwayat(true)} />
            </div>
          </div>
        </div>

        <RiwayatModal open={showRiwayat} onClose={() => setShowRiwayat(false)} />
      </body>
    </html>
  );
}