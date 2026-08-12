"use client";

import { useState } from "react";
import RiwayatModal from "@/components/RiwayatModal";
import Image from "next/image";

import { ArrowUpRight } from "lucide-react";
export default function HomePage() {
  const [showRiwayat, setShowRiwayat] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
     

      {/* HERO */}
      <section className="px-4 pt-4">
        <div className="relative min-h-[220px] overflow-hidden rounded-3xl bg-gradient-to-br from-cream via-sand to-moss/60 p-6">
          <h1 className="max-w-[60%] font-display text-2xl font-extrabold leading-tight text-forest-dark">
            Kenali Tanahmu, Tanam Lebih{" "}
            <span className="bg-forest px-1.5 text-cream-light">Beragam</span>
          </h1>
            {/* <a
              href="/analisis"
              className="relative z-10 mt-4 inline-block rounded-full bg-cream-light px-5 py-2.5 text-sm font-semibold text-forest-dark"
            >
              Coba Sekarang ↗
              
            </a> */}

            <a
              href="/analisis"
              className="relative z-10 mt-4 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-cream-light px-5 py-2.5 text-sm font-semibold text-forest-dark"
            >
              Coba Sekarang
              <ArrowUpRight className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            </a>

            <div className="pointer-events-none absolute -bottom-4 -right-4 h-80 w-80">
              <Image
                src="/images/hand.png"
                alt="Tangan menabur tanah"
                fill
                className="object-contain"
              />
            </div>
        </div>
      </section>

      {/* CEK REKOMENDASI 3 LANGKAH */}
      <section id="cara-pakai" className="flex-1 px-4 py-6">
        <h2 className="mb-6 text-center font-display text-lg font-extrabold text-forest-dark">
          Cek Rekomendasi Lahanmu dalam 3 Langkah
        </h2>

        <div className="space-y-0">
          {[
            {
              number: "01",
              title: "Langkah 1: Lengkapi informasi lahan",
              desc: "Lengkapi informasi koordinat dan luas lahan serta target musim tanam.",
            },
            {
              number: "02",
              title: "Langkah 2: Analisis cerdas Nusa-Crop",
              desc: "Tunggu algoritma kami memproses data satelit dan lingkungan.",
            },
            {
              number: "03",
              title: "Langkah 3: Terima rekomendasi",
              desc: "Lihat hasil analisis kondisi lahan Anda dan tanaman yang direkomendasikan.",
            },
          ].map((step, i, arr) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-forest bg-moss">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
                    <span className="font-display text-xs font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="my-1 w-1 flex-1 rounded-full bg-forest" style={{ minHeight: "48px" }} />
                )}
              </div>

              <div className="flex-1 rounded-2xl bg-[#FAF9F6] p-4 shadow-lg mb-5">
                <h4 className="mb-1 font-display text-sm font-bold text-[#0A3323]">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-forest-dark/70">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

   
      <RiwayatModal open={showRiwayat} onClose={() => setShowRiwayat(false)} />
    </div>
  );
}