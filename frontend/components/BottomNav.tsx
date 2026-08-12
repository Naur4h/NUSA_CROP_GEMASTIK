"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, ScrollText, Search } from "lucide-react";

type BottomNavProps = {
  onRiwayatClick: () => void;
};

export default function BottomNav({ onRiwayatClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex w-full max-w-[420px] bg-sand">
      <Link
        href="/#cara-pakai"
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[#0A3323]"
      >
        <CircleHelp className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Cara Pakai</span>
      </Link>

      <button
        onClick={onRiwayatClick}
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[#0A3323]"
      >
        <ScrollText className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Riwayat</span>
      </button>

      <Link
        href="/analisis"
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[#0A3323]"
      >
        <Search className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Analisis</span>
      </Link>
    </nav>
  );
}