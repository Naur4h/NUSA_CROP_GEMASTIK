// const API_BASE = process.env.NEXT_PUBLIC_URL;

// // Ganti ke true kalau backend lagi mati / mau develop tanpa nunggu API asli.
// // Ganti balik ke false kalau backend udah hidup lagi.
// const USE_MOCK = true;

// export type KondisiLahan = {
//   status: string;
//   curah_hujan: number;
//   suhu: number;
//   et0: number;
//   elevasi: number;
//   ph_tanah: number;
//   nitrogen: number;
//   organic_carbon: number;
//   tekstur_tanah: { sand: number; silt: number; clay: number };
//   kesuburan_tanah: number;
// };

// export type RekomendasiItem = {
//   id: string;
//   nama: string;
//   nama_latin: string;
//   kesuburan_ideal: string;
//   ph_ideal: string;
//   elevasi_ideal: string;
//   skor_kesesuaian: number; // skala 0-1, dikali 100 pas ditampilkan
// };

// export type RecommendResponse = {
//   status: string;
//   recommendation: {
//     kondisi_lahan: KondisiLahan;
//     rekomendasi: RekomendasiItem[];
//   };
// };

// export type AnalisisPayload = {
//   lat: number;
//   lon: number;
//   luas_lahan?: number;
//   musim_target?: string;
//   anonymous_id: string;
// };

// // Data pura-pura, bentuknya PERSIS sama kayak response asli dari backend
// const MOCK_RESPONSE: RecommendResponse = {
//   status: "success",
//   recommendation: {
//     kondisi_lahan: {
//       status: "success",
//       curah_hujan: 2411.3,
//       suhu: 24.9,
//       et0: 1415.8,
//       elevasi: 205.0,
//       ph_tanah: 5.4,
//       nitrogen: 2.41,
//       organic_carbon: 59.3,
//       tekstur_tanah: { sand: 32.0, silt: 34.7, clay: 33.3 },
//       kesuburan_tanah: 0.9,
//     },
//     rekomendasi: [
//       {
//         id: "singkong",
//         nama: "Singkong",
//         nama_latin: "Manihot esculenta",
//         kesuburan_ideal: "Tanah kekeringan",
//         ph_ideal: "4.5 - 8.0",
//         elevasi_ideal: "10 - 870 mdpl",
//         skor_kesesuaian: 0.87,
//       },
//       {
//         id: "jagung",
//         nama: "Jagung",
//         nama_latin: "Zea mays",
//         kesuburan_ideal: "-",
//         ph_ideal: "4.5 - 8.5",
//         elevasi_ideal: "0 - 3000 mdpl",
//         skor_kesesuaian: 0.82,
//       },
//       {
//         id: "terong",
//         nama: "Terong",
//         nama_latin: "Solanum melongena L.",
//         kesuburan_ideal: "-",
//         ph_ideal: "5.5 - 7.5",
//         elevasi_ideal: "0 - 1200 mdpl",
//         skor_kesesuaian: 0.78,
//       },

//       {
//   id: "kemiri",
//   nama: "Kemiri",
//   nama_latin: "Aleurites moluccanus",
//   kesuburan_ideal: "-",
//   ph_ideal: "5.5 - 7.0",
//   elevasi_ideal: "0 - 1000 mdpl",
//   skor_kesesuaian: 0.65,
// },
// {
//   id: "kacangpanjang",
//   nama: "Kacang Panjang",
//   nama_latin: "Vigna unguiculata",
//   kesuburan_ideal: "-",
//   ph_ideal: "5.5 - 6.5",
//   elevasi_ideal: "0 - 800 mdpl",
//   skor_kesesuaian: 0.58,
// },
//     ],
//   },
// };

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export async function postAnalisisLahan(
//   payload: AnalisisPayload
// ): Promise<RecommendResponse> {
//   if (USE_MOCK) {
//     console.log("Pakai MOCK data (backend asli tidak dipanggil). Payload:", payload);
//     await delay(1500);
//     return MOCK_RESPONSE;
//   }

//   const res = await fetch(`${API_BASE}/api/recommend/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "ngrok-skip-browser-warning": "true",
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (!res.ok || data.status === "error") {
//     const pesan = data.message || `Gagal memuat data lahan (status ${res.status})`;
//     throw new Error(pesan);
//   }

//   return data;
// }

// export const STORAGE_KEY_FORM = "nusa-crop-form-payload";
// export const STORAGE_KEY_RESULT = "nusa-crop-result";
const API_BASE = process.env.NEXT_PUBLIC_URL;
const USE_MOCK = false; // backend sudah live & ke-test, matikan mock

export type KondisiLahan = {
  status?: string;
  curah_hujan: number;
  curah_hujan_bulanan?: number[];
  suhu: number;
  et0?: number;
  elevasi: number;
  ph_tanah: number;
  nitrogen?: number;
  organic_carbon?: number;
  tekstur_kelas?: string;
  tekstur_tanah?: { sand: number; silt: number; clay: number };
  kesuburan_tanah: number;
};

export type RekomendasiItem = {
  id: string; // slug, contoh: "kemiri" — dipakai untuk cari gambar
  nama: string;
  nama_latin: string;
  kesuburan_ideal: string;
  ph_ideal: string;
  elevasi_ideal: string;
  skor_kesesuaian: number;
  tingkat_kepercayaan?: string;
  alasan_rekomendasi?: string[];
  rekomendasi_id: number; // dipakai untuk fetch detail tanaman
};

export type RecommendResponse = {
  status: string;
  recommendation: {
    kondisi_lahan: KondisiLahan;
    rekomendasi: RekomendasiItem[];
  };
};

// export type AnalisisPayload = {
//   lat: number;
//   lon: number;
//   luas_lahan: number;
//   musim_target: "hujan" | "kemarau";
//   anonymous_id: string;
// };

export type AnalisisPayload = {
  lat: number;
  lon: number;
  luas_lahan?: number;
  musim_target?: "hujan" | "kemarau";
  anonymous_id: string;
};

export type CropDetail = {
  nama: string;
  nama_latin: string;
  deskripsi: string;
  jenis_tanaman: string;
  umur_panen: string;
  potensi_hasil: string;
  cara_budidaya: string;
  syarat_tumbuh: {
    ph: { min: number; max: number };
    elevasi: { min: number; max: number };
    curah_hujan: { min: number; max: number };
    kesuburan: string;
  };
  manfaat: string;
  ringkasan_rekomendasi: {
    skor_kesesuaian: number;
    tingkat_kepercayaan: string;
    alasan_rekomendasi: string[];
  };
};

export type RiwayatItem = {
  id: number;
  anonymous_id: string;
  lat: number;
  lon: number;
  luas_lahan: number;
  musim_target: string;
  curah_hujan: number;
  ph_tanah: number;
  elevasi: number;
  suhu: number;
  kesuburan_tanah: number;
  dibuat_pada: string;
  rekomendasi: {
    id: number;
    nama_tanaman: string;
    nama_latin: string;
    kesuburan_ideal: string;
    ph_ideal: string;
    elevasi_ideal: string;
    skor_kesesuaian: number;
    ranking: number;
  }[];
};

// Ubah nama tanaman jadi slug buat nyari file gambar, contoh: "Kacang Panjang" -> "kacangpanjang"
export function slugify(nama: string): string {
  return nama.toLowerCase().replace(/\s+/g, "");
}

export function getCropImage(nama: string): string {
  return `/images/${slugify(nama)}.png`;
}

// Samain bentuk data dari /recommend/ ATAU dari nested rekomendasi di /riwayat/
// (field namanya beda dikit: nama vs nama_tanaman, rekomendasi_id vs id)
export function normalizeRekomendasi(raw: any): RekomendasiItem {
  const nama = raw.nama ?? raw.nama_tanaman;
  return {
    id: slugify(nama),
    nama,
    nama_latin: raw.nama_latin,
    kesuburan_ideal: raw.kesuburan_ideal,
    ph_ideal: raw.ph_ideal,
    elevasi_ideal: raw.elevasi_ideal,
    skor_kesesuaian: raw.skor_kesesuaian,
    tingkat_kepercayaan: raw.tingkat_kepercayaan,
    alasan_rekomendasi: raw.alasan_rekomendasi,
    rekomendasi_id: raw.rekomendasi_id ?? raw.id,
  };
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  return res;
}

export async function postAnalisisLahan(
  payload: AnalisisPayload
): Promise<RecommendResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1500));
    return MOCK_RESPONSE;
  }

  const res = await apiFetch("/api/recommend/", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || data.status === "error") {
    throw new Error(data.message || `Gagal memuat data lahan (status ${res.status})`);
  }

  return data;
}

export async function getCropDetail(rekomendasiId: number): Promise<CropDetail> {
  const res = await apiFetch(`/api/rekomendasi/${rekomendasiId}/detail/`);
  if (!res.ok) {
    throw new Error("Rekomendasi tidak ditemukan");
  }
  return res.json();
}

export async function getRiwayatList(anonymousId: string): Promise<RiwayatItem[]> {
  const res = await apiFetch(`/api/riwayat/?anonymous_id=${anonymousId}`);
  if (!res.ok) throw new Error("Gagal memuat riwayat");
  return res.json();
}

export async function getRiwayatDetail(
  riwayatId: number,
  anonymousId: string
): Promise<RiwayatItem> {
  const res = await apiFetch(
    `/api/riwayat/${riwayatId}/detail/?anonymous_id=${anonymousId}`
  );
  if (!res.ok) throw new Error("Riwayat tidak ditemukan");
  return res.json();
}

export async function deleteRiwayat(riwayatId: number, anonymousId: string) {
  const res = await apiFetch(
    `/api/riwayat/${riwayatId}/?anonymous_id=${anonymousId}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Gagal menghapus riwayat");
}

// Ubah 1 item RiwayatItem jadi bentuk RecommendResponse, biar bisa dipakai ulang
// oleh halaman hasil yang sama (dibuka dari Riwayat, bukan dari submit form baru)
export function riwayatToRecommendResponse(item: RiwayatItem): RecommendResponse {
  return {
    status: "success",
    recommendation: {
      kondisi_lahan: {
        curah_hujan: item.curah_hujan,
        suhu: item.suhu,
        elevasi: item.elevasi,
        ph_tanah: item.ph_tanah,
        kesuburan_tanah: item.kesuburan_tanah,
      },
      rekomendasi: item.rekomendasi
        .sort((a, b) => a.ranking - b.ranking)
        .map(normalizeRekomendasi),
    },
  };
}

export const STORAGE_KEY_FORM = "nusa-crop-form-payload";
export const STORAGE_KEY_RESULT = "nusa-crop-result";

const MOCK_RESPONSE: RecommendResponse = {
  status: "success",
  recommendation: {
    kondisi_lahan: {
      curah_hujan: 2411.3,
      suhu: 24.9,
      elevasi: 205.0,
      ph_tanah: 5.4,
      kesuburan_tanah: 0.9,
    },
    rekomendasi: [
      { id: "singkong", nama: "Singkong", nama_latin: "Manihot esculenta", kesuburan_ideal: "Tanah kekeringan", ph_ideal: "4.5 - 8.0", elevasi_ideal: "10 - 870 mdpl", skor_kesesuaian: 0.87, rekomendasi_id: 1 },
      { id: "jagung", nama: "Jagung", nama_latin: "Zea mays", kesuburan_ideal: "-", ph_ideal: "4.5 - 8.5", elevasi_ideal: "0 - 3000 mdpl", skor_kesesuaian: 0.82, rekomendasi_id: 2 },
      { id: "terong", nama: "Terong", nama_latin: "Solanum melongena L.", kesuburan_ideal: "-", ph_ideal: "5.5 - 7.5", elevasi_ideal: "0 - 1200 mdpl", skor_kesesuaian: 0.78, rekomendasi_id: 3 },
    ],
  },
};