
// "use client";

// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { ChevronRight, Leaf, Calendar, BarChart3 } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import CircularGauge from "@/components/CircularGauge";
// import RiwayatModal from "@/components/RiwayatModal";
// import { useCropDetail } from "@/lib/useCropDetail";
// import { ArrowUpRight } from "lucide-react";

// export default function DetailTanamanPage() {
//   const [showRiwayat, setShowRiwayat] = useState(false);
//   const router = useRouter();
//   const params = useParams<{ id: string }>();
//   const crop = useCropDetail(params.id);

//   if (crop === undefined) return null;
//   if (crop === null) {
//     return (
//       <div className="flex min-h-screen flex-col bg-white">
//         <Navbar onRiwayatClick={() => setShowRiwayat(true)} />

//         <section className="flex flex-1 items-center justify-center px-4 py-6">
//           Data tanaman tidak ditemukan. Coba analisis ulang.
//         </section>

//         <Footer />

//         <RiwayatModal
//           open={showRiwayat}
//           onClose={() => setShowRiwayat(false)}
//         />
//       </div>
//     );
//   }

//   const menuItems = [
//     { label: "Cara budidaya", href: `/analisis/detail/${crop.id}/budidaya` },
//     { label: "Syarat Tumbuh", href: `/analisis/detail/${crop.id}/syarat-tumbuh` },
//     { label: "Manfaat", href: `/analisis/detail/${crop.id}/manfaat` },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <Navbar onRiwayatClick={() => setShowRiwayat(true)} />

//       <section className="flex-1">
//         <button
//           onClick={() => router.push("/analisis/hasil")}
//           className="ml-4 mt-4 mb-4 text-sm text-forest-dark hover:underline"
//         >
//           ← Kembali ke hasil analisis
//         </button>

//         <div className="relative h-44 w-full bg-gray-100">
//           <Image
//             src={`/images/${crop.id}.png`}
//             alt={crop.nama}
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="px-4 py-5">
//           <h1 className="font-display text-lg font-bold text-forest-dark">
//             {crop.nama.toUpperCase()}
//           </h1>
//           <p className="mb-3 text-sm italic text-forest-dark/50">
//             ({crop.nama_latin})
//           </p>
//           <p className="text-sm leading-relaxed text-forest-dark/80">
//             Toleran terhadap {crop.kesuburan_ideal.toLowerCase()}, cocok ditanam pada pH tanah{" "}
//             {crop.ph_ideal} dan elevasi {crop.elevasi_ideal}.
//           </p>

//           <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-xs">
//             <div className="flex items-center gap-1.5">
//               <Leaf className="h-4 w-4 text-forest" />
//               <div>
//                 <p className="font-semibold text-forest-dark">Jenis Tanaman</p>
//                 <p className="text-forest-dark/60">Pangan</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Calendar className="h-4 w-4 text-forest" />
//               <div>
//                 <p className="font-semibold text-forest-dark">Umur Panen</p>
//                 <p className="text-forest-dark/60">8-12 bulan</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <BarChart3 className="h-4 w-4 text-forest" />
//               <div>
//                 <p className="font-semibold text-forest-dark">Potensi Hasil</p>
//                 <p className="text-forest-dark/60">20-30 ton/ha</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-100">
//           {menuItems.map((item) => (
//             <button
//               key={item.label}
//               onClick={() => router.push(item.href)}
//               className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3.5 text-left"
//             >
//               <div>
//                 <p className="text-sm font-semibold text-forest-dark">{item.label}</p>
//                 <p className="text-xs text-forest-dark/40">Klik untuk melihat</p>
//               </div>
//               <ChevronRight className="h-4 w-4 text-forest-dark/40" />
//             </button>
//           ))}
//         </div>

//         <div className="px-4 py-5">
//           <h3 className="mb-3 text-center font-display text-base font-bold text-forest-dark">
//             Ringkasan Rekomendasi
//           </h3>

//           <div className="mb-3 grid grid-cols-2 gap-3">
//             <div className="rounded-2xl bg-ringkasanCard p-3">
//               <CircularGauge
//                 size={64}
//                 value={Math.round(crop.skor_kesesuaian * 100)}
//                 label="Skor Kesesuaian"
//                 sublabel={crop.skor_kesesuaian > 0.7 ? "Sangat Sesuai" : "Cukup Sesuai"}
//               />
//             </div>
//             <div className="rounded-2xl bg-ringkasanCard p-3">
//               <CircularGauge
//                 size={64}
//                 value={82}
//                 label="Tingkat Keyakinan Model"
//                 sublabel="Tinggi"
//               />
//             </div>
//           </div>

//           <div className="rounded-2xl bg-ringkasanCard p-4 text-sm">
//             <p className="mb-2 font-semibold text-forest-dark">Alasan Rekomendasi</p>
//             <ul className="list-disc space-y-1.5 pl-4 text-forest-dark/80">
//               <li>Tahan kondisi kering — curah hujan lahan Anda sesuai toleransi tanaman ini</li>
//               <li>pH tanah masih dalam batas yang bisa ditoleransi</li>
//               <li>Cocok untuk lahan dengan tingkat kesuburan rendah</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <Footer />

//       <RiwayatModal
//         open={showRiwayat}
//         onClose={() => setShowRiwayat(false)}
//       />
//     </div>
//   );
// }

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Leaf, Calendar, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircularGauge from "@/components/CircularGauge";
import { useCropDetail } from "@/lib/useCropDetail";
import { getCropImage } from "@/lib/api";

export default function DetailTanamanPage() {
  const router = useRouter();
  const params = useParams<{ rekomendasiId: string }>();
  const detail = useCropDetail(params.rekomendasiId);

  if (detail === undefined) return null;
  if (detail === null) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <section className="flex flex-1 items-center justify-center px-5 text-center text-forest-dark">
          <p>Data tanaman tidak ditemukan. Coba analisis ulang.</p>
        </section>
        <Footer />
      </div>
    );
  }

  const menuItems = [
    { label: "Cara budidaya", href: `/analisis/detail/${params.rekomendasiId}/budidaya` },
    { label: "Syarat Tumbuh", href: `/analisis/detail/${params.rekomendasiId}/syarat-tumbuh` },
    { label: "Manfaat", href: `/analisis/detail/${params.rekomendasiId}/manfaat` },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <section className="flex-1">
        <div className="px-4 py-3">
          <button onClick={() => router.push("/analisis/hasil")} className="text-sm text-forest-dark hover:underline">
            ← Kembali ke hasil analisis
          </button>
        </div>

        <div className="relative h-44 w-full bg-gray-100">
          <Image src={getCropImage(detail.nama)} alt={detail.nama} fill className="object-cover" />
        </div>

        <div className="px-4 py-5">
          <h1 className="font-display text-lg font-bold text-forest-dark">{detail.nama.toUpperCase()}</h1>
          <p className="mb-3 text-sm italic text-forest-dark/50">({detail.nama_latin})</p>
          <p className="text-sm leading-relaxed text-forest-dark/80">{detail.deskripsi}</p>

          <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-forest" />
              <div><p className="font-semibold text-forest-dark">Jenis Tanaman</p><p className="text-forest-dark/60">{detail.jenis_tanaman}</p></div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-forest" />
              <div><p className="font-semibold text-forest-dark">Umur Panen</p><p className="text-forest-dark/60">{detail.umur_panen}</p></div>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-forest" />
              <div><p className="font-semibold text-forest-dark">Potensi Hasil</p><p className="text-forest-dark/60">{detail.potensi_hasil}</p></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3.5 text-left"
            >
              <div>
                <p className="text-sm font-semibold text-forest-dark">{item.label}</p>
                <p className="text-xs text-forest-dark/40">Klik untuk melihat</p>
              </div>
              <ChevronRight className="h-4 w-4 text-forest-dark/40" />
            </button>
          ))}
        </div>

        <div className="px-4 py-5">
          <h3 className="mb-3 text-center font-display text-base font-bold text-forest-dark">
            Ringkasan Rekomendasi
          </h3>

          <div className="mb-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ringkasanCard p-3">
              <CircularGauge
                size={64}
                value={Math.round(detail.ringkasan_rekomendasi.skor_kesesuaian * 100)}
                label="Skor Kesesuaian"
                sublabel={detail.ringkasan_rekomendasi.skor_kesesuaian > 0.7 ? "Sangat Sesuai" : "Cukup Sesuai"}
              />
            </div>
            <div className="rounded-2xl bg-ringkasanCard p-3">
              <CircularGauge size={64} value={80} label="Tingkat Kepercayaan" sublabel={detail.ringkasan_rekomendasi.tingkat_kepercayaan} />
            </div>
          </div>

          <div className="rounded-2xl bg-ringkasanCard p-4 text-sm">
            <p className="mb-2 font-semibold text-forest-dark">Alasan Rekomendasi</p>
            <ul className="list-disc space-y-1.5 pl-4 text-forest-dark/80">
              {detail.ringkasan_rekomendasi.alasan_rekomendasi.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}