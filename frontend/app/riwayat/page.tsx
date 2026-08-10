import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin } from "lucide-react";

const history = [
  { place: "NAMA TEMPAT", coords: "-7.9125, 110.5875", date: "2/07/2026", result: "Singkong (87%)" },
  { place: "NAMA TEMPAT", coords: "-7.9125, 110.5875", date: "2/07/2026", result: "Singkong (87%)" },
  { place: "NAMA TEMPAT", coords: "-7.9125, 110.5875", date: "2/07/2026", result: "Singkong (87%)" },
];

export default function RiwayatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="flex flex-1 items-center justify-center px-5 py-10 md:px-8">
        <div className="w-full max-w-2xl rounded-3xl border-2 border-forest-dark bg-forest p-6 text-cream-light">
          <h2 className="mb-5 font-display text-2xl font-bold">Riwayat</h2>
          <div className="space-y-4">
            {history.map((h, i) => (
              <div key={i} className="rounded-xl bg-forest-light/60 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="h-4 w-4" /> {h.place}
                  </span>
                  <span className="text-xs opacity-70">{h.date}</span>
                </div>
                <p className="text-xs opacity-80">{h.coords}</p>
                <p className="text-xs opacity-80">Rekomendasi teratas: {h.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}