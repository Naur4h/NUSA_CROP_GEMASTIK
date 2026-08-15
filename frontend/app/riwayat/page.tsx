"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";
import { getAnonymousId } from "@/lib/anonymousId";
import { getRiwayatPage, riwayatToRecommendResponse, RiwayatItem, STORAGE_KEY_RESULT } from "@/lib/api";

export default function RiwayatPage() {
  const router = useRouter();
  const [items, setItems] = useState<RiwayatItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const observerRef = useRef<HTMLDivElement>(null);

  const loadPage = useCallback((pageNum: number) => {
    setLoading(true);
    getRiwayatPage(getAnonymousId(), pageNum)
      .then((data) => {
        setItems((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
        setHasNext(data.next !== null);
      })
      .catch(() => setError("Gagal memuat riwayat."))
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  useEffect(() => {
    if (!observerRef.current || !hasNext || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadPage(nextPage);
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNext, loading, page, loadPage]);

  const filtered = items.filter((item) =>
    item.nama_tampilan.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (item: RiwayatItem) => {
    sessionStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(riwayatToRecommendResponse(item)));
    router.push(`/analisis/hasil?riwayat=${item.id}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 py-4">
      <h1 className="mb-4 text-center font-display text-lg font-bold text-forest-dark">
        RIWAYAT
      </h1>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari Nama Riwayat...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-forest-dark outline-none focus:border-forest"
        />
      </div>

      {initialLoading && <p className="text-center text-sm text-forest-dark/50">Memuat...</p>}
      {error && <p className="text-center text-sm text-alert">{error}</p>}
      {!initialLoading && !error && filtered.length === 0 && (
        <p className="text-center text-sm text-forest-dark/50">
          {search ? "Tidak ada riwayat yang cocok." : "Belum ada riwayat pencarian."}
        </p>
      )}

      <div className="space-y-3 pb-4">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <span className="flex w-10 shrink-0 items-center justify-center bg-moss font-display text-lg font-bold text-white">
              {i + 1}
            </span>
            <span className="flex flex-1 items-center gap-2 px-3 py-3">
              <span className="flex-1 text-left text-xs text-forest-dark">
                <span className="block font-semibold">{item.nama_tampilan}</span>
                {item.rekomendasi[0] && (
                  <span className="block text-forest-dark/60">
                    • Rekomendasi teratas: {item.rekomendasi[0].nama_tanaman} (
                    {Math.round(item.rekomendasi[0].skor_kesesuaian * 100)}%)
                  </span>
                )}
                <span className="block text-forest-dark/60">
                  • {new Date(item.dibuat_pada).toLocaleDateString("id-ID")}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-forest-dark/40" />
            </span>
          </button>
        ))}
      </div>

      {hasNext && !search && (
        <div ref={observerRef} className="py-4 text-center text-xs text-forest-dark/40">
          {loading ? "Memuat lebih banyak..." : ""}
        </div>
      )}
    </div>
  );
}