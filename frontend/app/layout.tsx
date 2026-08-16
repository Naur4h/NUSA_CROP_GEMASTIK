"use client";

import { useState } from "react";
import { Lexend } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import BottomNav from "@/components/BottomNav";
import TutorialModal from "@/components/TutorialModal";

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
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <html lang="id">
      <body className={`${lexend.variable} font-lexend`}>
        <div className="h-dvh bg-gray-300">
          <div className="mx-auto h-dvh w-full max-w-[420px] bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              <TopHeader />
              <main className="flex-1 overflow-y-auto pb-20">{children}</main>
              <BottomNav onTutorialClick={() => setShowTutorial(true)} />
            </div>
          </div>
        </div>

        <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
      </body>
    </html>
  );
}