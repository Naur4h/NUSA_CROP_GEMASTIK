
"use client";
import { getAnonymousId } from "@/lib/anonymousId";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import RiwayatModal from "@/components/RiwayatModal";
import { MapPin } from "lucide-react";
import { STORAGE_KEY_FORM } from "@/lib/api";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center rounded-xl bg-cream text-sm italic text-forest-dark/50">
      Memuat peta...
    </div>
  ),
});

export default function AnalisisPage() {
  const [showRiwayat, setShowRiwayat] = useState(false);
  const router = useRouter();
  const [showResetModal, setShowResetModal] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [luasLahan, setLuasLahan] = useState("");
  const [musimTanam, setMusimTanam] = useState("");
  const [formError, setFormError] = useState("");

  const handleMapSelect = (newLat: number, newLng: number) => {
    setLat(Number(newLat.toFixed(4)));
    setLng(Number(newLng.toFixed(4)));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      handleMapSelect(pos.coords.latitude, pos.coords.longitude);
    });
  };

  // const handleSubmit = () => {
  //   if (lat === null || lng === null) {
  //     setFormError("Isi koordinat dulu ya (klik peta atau isi manual).");
  //     return;
  //   }
  //   setFormError("");

  //   const payload = {
  //     lat,
  //     lon: lng,
  //     luas_lahan: luasLahan ? Number(luasLahan) : undefined,
  //     musim_target: musimTanam || undefined,
  //     anonymous_id: getAnonymousId(),
  //   };

  //   sessionStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(payload));
  //   router.push("/analisis/loading");
  // };

  // const handleSubmit = () => {
  // if (lat === null || lng === null) {
  //   setFormError("Isi koordinat dulu ya (klik peta atau isi manual).");
  //   return;
  // }
  // if (!luasLahan) {
  //   setFormError("Luas lahan wajib diisi.");
  //   return;
  // }
  // if (!musimTanam) {
  //   setFormError("Target musim tanam wajib dipilih.");
  //   return;
  // }
  // setFormError("");

  // const payload = {
  //   lat,
  //   lon: lng,
  //   luas_lahan: Number(luasLahan),
  //   musim_target: musimTanam as "hujan" | "kemarau",
  //   anonymous_id: getAnonymousId(),
  // };

  const handleSubmit = () => {
  if (lat === null || lng === null) {
    setFormError("Isi koordinat dulu ya (klik peta atau isi manual).");
    return;
  }
  setFormError("");

  const payload = {
    lat,
    lon: lng,
    luas_lahan: luasLahan ? Number(luasLahan) : undefined,
    musim_target: musimTanam ? (musimTanam as "hujan" | "kemarau") : undefined,
    anonymous_id: getAnonymousId(),
  };

  sessionStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(payload));
  router.push("/analisis/loading");
};
  const handleReset = () => setShowResetModal(true);

  const confirmReset = () => {
    setLat(null);
    setLng(null);
    setLuasLahan("");
    setMusimTanam("");
    setShowResetModal(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onRiwayatClick={() => setShowRiwayat(true)} />
      <section className="flex-1 px-4 py-4">
        <h2 className="mb-4 text-center font-display text-base font-bold text-forest-dark">
          Langkah 1: Masukkan Data
        </h2>
        <div className="mx-auto mb-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-forest-dark/20">
          <div className="h-full w-1/3 rounded-full bg-forest" />
        </div>

        <div className="rounded-3xl border-2 border-forest bg-white p-6">
          <h2 className="mb-1 text-center font-display text-sm font-bold uppercase text-forest-dark">
            Masukkan Koordinat Anda
          </h2>

          <MapPicker lat={lat} lng={lng} onSelect={handleMapSelect} />

          <div className="my-4 flex items-center gap-3 text-xs text-forest-dark/40">
            <div className="h-px flex-1 bg-forest-dark/20" />
            ATAU
            <div className="h-px flex-1 bg-forest-dark/20" />
          </div>

          <button
            onClick={handleUseCurrentLocation}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#567156] py-3 text-sm font-semibold text-white hover:bg-forest-dark"
          >
            <MapPin className="h-4 w-4" />
            Gunakan lokasimu sekarang
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-forest-dark/40">
            <div className="h-px flex-1 bg-forest-dark/20" />
            ATAU
            <div className="h-px flex-1 bg-forest-dark/20" />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-forest-dark">
                Lintang (Latitude)
              </label>
              <input
                type="number"
                placeholder="Contoh: -6.0288"
                value={lat ?? ""}
                onChange={(e) => setLat(e.target.value === "" ? null : Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-forest-dark outline-none focus:border-forest"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-forest-dark">
                Bujur (Longitude)
              </label>
              <input
                type="number"
                placeholder="Contoh: 106.4856"
                value={lng ?? ""}
                onChange={(e) => setLng(e.target.value === "" ? null : Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-forest-dark outline-none focus:border-forest"
              />
            </div>
          </div>

          {formError && (
            <p className="mb-4 text-sm font-semibold text-alert">{formError}</p>
          )}

          <div className="mb-4">
            <label className="mb-1 block text-xs font-bold uppercase text-forest-dark">
              Masukkan Luas Lahan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Masukkan luas lahan (hektar). Contoh: 67"
              value={luasLahan}
              onChange={(e) => setLuasLahan(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-forest-dark outline-none focus:border-forest"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-xs font-bold uppercase text-forest-dark">
              Masukkan Target Musim Tanam (Opsional)
            </label>
            <select
              value={musimTanam}
              onChange={(e) => setMusimTanam(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-forest-dark outline-none focus:border-forest"
            >
              <option value="">Pilih musim tanam</option>
              <option value="hujan">Musim Hujan</option>
              <option value="kemarau">Musim Kemarau</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-full bg-[#567156] py-3 text-sm font-semibold text-white hover:bg-forest-dark"
            >
              KIRIM
            </button>
            <button
              onClick={handleReset}
              className="flex-1 rounded-full border-2 border-forest py-3 text-sm font-semibold text-forest hover:bg-forest/5"
            >
              KOSONGKAN
            </button>
          </div>
        </div>
      </section>
      <Footer />

      <RiwayatModal open={showRiwayat} onClose={() => setShowRiwayat(false)} />

      <Modal
        open={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Kosongkan semua data yang diisi?"
        onConfirm={confirmReset}
      />
    </div>
  );
}
