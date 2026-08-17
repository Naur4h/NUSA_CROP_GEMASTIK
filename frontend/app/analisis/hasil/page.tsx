"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StepProgress from "@/components/StepProgress";
import Modal from "@/components/Modal";

import NdviScale from "@/components/NdviScale";
import RecommendationCard from "@/components/RecommendationCard";
import FilterTanaman, { Kategori } from "@/components/FilterTanaman";
import { RecommendResponse, STORAGE_KEY_RESULT } from "@/lib/api";

function HasilContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showRiwayat, setShowRiwayat] = useState(false);
  const [data, setData] = useState<RecommendResponse | null>(null);
  const [kategori, setKategori] = useState<Kategori>("Semua kategori");

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY_RESULT);
    if (!raw) { router.push("/analisis"); return; }
    setData(JSON.parse(raw));
  }, [router, searchParams]);

  if (!data) return null;
  const { kondisi_lahan, rekomendasi } = data.recommendation;

  const filteredRekomendasi =
    kategori === "Semua kategori"
      ? rekomendasi
      : rekomendasi.filter((r) => r.jenis_tanaman === kategori);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <StepProgress step={3} label="Langkah 3: Terima Rekomendasi" />

      <section className="flex-1 px-4 py-4">
        <button onClick={() => setShowResetModal(true)} className="mb-3 text-sm text-forest-dark hover:underline">
          ← Isi ulang data
        </button>

        <div className="relative">
          <div className="rounded-t-2xl bg-kondisiCard px-4 py-3 text-center">
            <h3 className="font-display text-sm font-bold uppercase text-white">
              Kondisi Lingkungan Terdeteksi
            </h3>
          </div>
          <div className="rounded-b-2xl bg-white p-4 shadow-lg">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-kondisiCard p-3 text-white">
                <p className="text-[10px] font-semibold uppercase opacity-80">Curah Hujan</p>
                <p className="font-display text-lg font-bold">{kondisi_lahan.curah_hujan} <span className="text-xs font-normal">mm/tahun</span></p>
                <span className="mt-1 inline-block rounded-full bg-sand px-2 py-0.5 text-[10px] font-semibold text-forest-dark">
                  {kondisi_lahan.curah_hujan < 1000 ? "Kering" : "Cukup"}
                </span>
              </div>
              <div className="rounded-xl bg-kondisiCard p-3 text-white">
                <p className="text-[10px] font-semibold uppercase opacity-80">pH Tanah</p>
                <p className="font-display text-lg font-bold">{kondisi_lahan.ph_tanah}</p>
                <span className="mt-1 inline-block rounded-full bg-sand px-2 py-0.5 text-[10px] font-semibold text-forest-dark">
                  {kondisi_lahan.ph_tanah < 6 ? "Masam" : "Netral"}
                </span>
              </div>
              <div className="rounded-xl bg-kondisiCard p-3 text-white">
                <p className="text-[10px] font-semibold uppercase opacity-80">Elevasi</p>
                <p className="font-display text-lg font-bold">{kondisi_lahan.elevasi} <span className="text-xs font-normal">mdpl</span></p>
              </div>
              <div className="rounded-xl bg-kondisiCard p-3 text-white">
                <p className="text-[10px] font-semibold uppercase opacity-80">Skor Kondisi Vegetasi (NDVI)</p>
                <p className="font-display text-lg font-bold">
                  {kondisi_lahan.ndvi !== undefined ? kondisi_lahan.ndvi.toFixed(2) : "-"}
                </p>
                <span className="mt-1 inline-block rounded-full bg-sand px-2 py-0.5 text-[10px] font-semibold text-forest-dark">
                  {kondisi_lahan.ndvi === undefined
                    ? "Tidak tersedia"
                    : kondisi_lahan.ndvi > 0.6
                    ? "Subur"
                    : kondisi_lahan.ndvi > 0.2
                    ? "Sedang"
                    : "Marginal"}
                </span>
              </div>
            </div>
            <NdviScale />
          </div>
        </div>

        <div className="relative mt-8">
          <div className="rounded-t-2xl bg-kondisiCard px-4 py-3 text-center">
            <h3 className="font-display text-sm font-bold uppercase text-white">
              Hasil Rekomendasi Tanaman
            </h3>
          </div>
          <div className="rounded-b-2xl bg-white p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs text-forest-dark/70">
                Menampilkan <span className="font-bold text-forest-dark">{filteredRekomendasi.length}</span> dari{" "}
                <span className="font-bold text-forest-dark">{rekomendasi.length}</span> tanaman
              </p>
              <FilterTanaman value={kategori} onChange={setKategori} />
            </div>

            <div className="space-y-3">
              {filteredRekomendasi.map((r, i) => (
                <RecommendationCard
                  key={r.id}
                  rank={i + 1}
                  name={r.nama}
                  latin={r.nama_latin}
                 note={`${r.jenis_tanaman} | ${r.kesuburan_ideal} | pH ${r.ph_ideal}`}
                  score={Math.round(r.skor_kesesuaian * 100)}
                  onClick={() => router.push(`/analisis/detail/${r.rekomendasi_id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal open={showResetModal} onClose={() => setShowResetModal(false)} title="Apakah anda yakin untuk isi ulang data?" onConfirm={() => router.push("/analisis")} />
  
    </div>
  );
}
export default function HasilPage() {
  return (
    <Suspense fallback={null}>
      <HasilContent />
    </Suspense>
  );
}