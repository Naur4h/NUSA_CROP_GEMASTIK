"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type Kategori = "Semua kategori" | "Pangan" | "Perkebunan" | "Hortikultura";

const OPTIONS: Kategori[] = ["Semua kategori", "Pangan", "Perkebunan", "Hortikultura"];

export default function FilterTanaman({
  value,
  onChange,
}: {
  value: Kategori;
  onChange: (val: Kategori) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-xs font-bold ${
          value !== "Semua kategori"
            ? "border-forest bg-forest text-white"
            : "border-forest-dark bg-white text-forest-dark"
        }`}
      >
        {value !== "Semua kategori" && <Check className="h-3.5 w-3.5" />}
        {value === "Semua kategori" ? "FILTER KATEGORI" : value.toUpperCase()}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-forest-dark hover:bg-forest/5"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}