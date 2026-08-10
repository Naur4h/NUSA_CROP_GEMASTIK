// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { RecommendResponse, RekomendasiItem, STORAGE_KEY_RESULT } from "@/lib/api";

// // undefined = masih loading, null = data tidak ditemukan, object = data crop
// export function useCropDetail(id: string) {
//   const router = useRouter();
//   const [crop, setCrop] = useState<RekomendasiItem | null | undefined>(undefined);

//   useEffect(() => {
//     const raw = sessionStorage.getItem(STORAGE_KEY_RESULT);
//     if (!raw) {
//       router.push("/analisis");
//       return;
//     }
//     const data: RecommendResponse = JSON.parse(raw);
//     const found = data.recommendation.rekomendasi.find((r) => r.id === id) || null;
//     setCrop(found);
//   }, [id, router]);

//   return crop;
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CropDetail, getCropDetail, RecommendResponse, STORAGE_KEY_RESULT } from "@/lib/api";

export function useCropDetail(rekomendasiId: string) {
  const router = useRouter();
  const [detail, setDetail] = useState<CropDetail | null | undefined>(undefined);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY_RESULT);
    if (!raw) {
      router.push("/analisis");
      return;
    }

    getCropDetail(Number(rekomendasiId))
      .then((data) => setDetail(data))
      .catch(() => setDetail(null));
  }, [rekomendasiId, router]);

  return detail;
}