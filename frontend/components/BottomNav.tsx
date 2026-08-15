"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, ScrollText, Search } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const isAnalisisActive = pathname.startsWith("/analisis");
  const isRiwayatActive = pathname.startsWith("/riwayat");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex w-full max-w-[420px] bg-sand">
      <Link
        href="/#cara-pakai"
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-gray-500 transition-transform active:scale-90 active:text-[#0A3323]"
      >
        <CircleHelp className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Cara Pakai</span>
      </Link>

      <Link
        href="/riwayat"
        className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-transform active:scale-90 ${
          isRiwayatActive ? "text-[#0A3323]" : "text-gray-500"
        }`}
      >
        <ScrollText className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Riwayat</span>
      </Link>

      <Link
        href="/analisis"
        className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-transform active:scale-90 ${
          isAnalisisActive ? "text-[#0A3323]" : "text-gray-500"
        }`}
      >
        <Search className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Analisis</span>
      </Link>
    </nav>
  );
}