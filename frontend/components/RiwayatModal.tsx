// "use client";

// import { useRouter } from "next/navigation";
// import { ChevronRight } from "lucide-react";

// type RiwayatItem = {
//   nama: string;
//   koordinat: string;
//   rekomendasiTeratas: string;
// };

// const dummyRiwayat: RiwayatItem[] = [
//   { nama: "Nama", koordinat: "-7.9125, 110.5875", rekomendasiTeratas: "Singkong (87%)" },
//   { nama: "Nama", koordinat: "-7.9125, 110.5875", rekomendasiTeratas: "Singkong (87%)" },
//   { nama: "Nama", koordinat: "-7.9125, 110.5875", rekomendasiTeratas: "Singkong (87%)" },
// ];

// export default function RiwayatModal({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const router = useRouter();

//   if (!open) return null;

//   const handleItemClick = () => {
//     onClose();
//     router.push("/analisis/hasil");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
//       <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
//         <div className="bg-[#8BAA5C] px-5 py-4">
//           <h2 className="font-display text-lg font-bold text-white">RIWAYAT</h2>
//         </div>
//         <div className="space-y-3 px-5 py-5">
//           {dummyRiwayat.map((item, i) => (
//             <button
//               key={i}
//               onClick={handleItemClick}
//               className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-sm"
//             >
//               <span className="flex w-10 shrink-0 items-center justify-center bg-[#90A955] font-display text-lg font-bold text-white">
//                 {i + 1}
//               </span>
//               <span className="flex flex-1 items-center gap-2 px-3 py-3">
//                 <span className="flex-1 text-left text-xs text-forest-dark">
//                   <span className="block font-semibold">{item.nama}</span>
//                   <span className="block text-forest-dark/60">• {item.koordinat}</span>
//                   <span className="block text-forest-dark/60">
//                     • Rekomendasi teratas: {item.rekomendasiTeratas}
//                   </span>
//                 </span>
//                 <ChevronRight className="h-4 w-4 shrink-0 text-forest-dark/40" />
//               </span>
//             </button>
//           ))}
//         </div>
//         <div className="px-5 pb-5">
//           <button
//             onClick={onClose}
//             className="w-full rounded-full bg-[#315840] py-2.5 text-sm font-semibold text-white"
//           >
//             TUTUP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAnonymousId } from "@/lib/anonymousId";
import { getRiwayatList, riwayatToRecommendResponse, RiwayatItem, STORAGE_KEY_RESULT } from "@/lib/api";

export default function RiwayatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [items, setItems] = useState<RiwayatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    getRiwayatList(getAnonymousId())
      .then(setItems)
      .catch(() => setError("Gagal memuat riwayat."))
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

const handleItemClick = (item: RiwayatItem) => {
  sessionStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(riwayatToRecommendResponse(item)));
  onClose();
  router.push(`/analisis/hasil?riwayat=${item.id}`);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-[#8BAA5C] px-5 py-4">
          <h2 className="font-display text-lg font-bold text-white">RIWAYAT</h2>
        </div>

        <div className="max-h-[60vh] space-y-3 overflow-y-auto px-5 py-5">
          {loading && <p className="text-center text-sm text-forest-dark/50">Memuat...</p>}
          {error && <p className="text-center text-sm text-alert">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="text-center text-sm text-forest-dark/50">Belum ada riwayat pencarian.</p>
          )}

          {items.map((item, i) => (
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
                  <span className="block font-semibold">
                    {item.lat.toFixed(4)}, {item.lon.toFixed(4)}
                  </span>
                  <span className="block text-forest-dark/60">
                    • {new Date(item.dibuat_pada).toLocaleDateString("id-ID")}
                  </span>
                  {item.rekomendasi[0] && (
                    <span className="block text-forest-dark/60">
                      • Rekomendasi teratas: {item.rekomendasi[0].nama_tanaman} (
                      {Math.round(item.rekomendasi[0].skor_kesesuaian * 100)}%)
                    </span>
                  )}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-forest-dark/40" />
              </span>
            </button>
          ))}
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-forest py-2.5 text-sm font-semibold text-white"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
}