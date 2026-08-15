
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import StepProgress from "@/components/StepProgress";
import Modal from "@/components/Modal";

import { Check, Circle, Loader2 } from "lucide-react";
import { postAnalisisLahan, STORAGE_KEY_FORM, STORAGE_KEY_RESULT } from "@/lib/api";

const steps = ["Data satelit", "Data cuaca", "Data tanah", "Data elevasi"];

export default function LoadingPage() {
  const [showRiwayat, setShowRiwayat] = useState(false);
  const router = useRouter();
  const [doneCount, setDoneCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const raw = sessionStorage.getItem(STORAGE_KEY_FORM);
    if (!raw) {
      router.push("/analisis");
      return;
    }
    const payload = JSON.parse(raw);

    const tick = setInterval(() => {
      setDoneCount((c) => (c < steps.length - 1 ? c + 1 : c));
    }, 700);

    postAnalisisLahan(payload)
      .then((data) => {
        clearInterval(tick);
        setDoneCount(steps.length);
        sessionStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(data));
        setTimeout(() => router.push("/analisis/hasil"), 500);
      })
      .catch((err) => {
        console.error("Gagal fetch:", err);
        clearInterval(tick);
        setErrorMessage(err.message || "Terjadi kesalahan yang tidak diketahui.");
        setShowError(true);
      });

    return () => clearInterval(tick);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
   
    <StepProgress
  step={2}
  label="Langkah 2: Analisis Cerdas NUSA-CROP"
/>
      <section className="flex flex-1 items-center justify-center px-4 py-6">
<div className="-mt-6 w-full max-w-sm rounded-2xl bg-loadingCard p-8 text-center text-white">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <Loader2 className="h-7 w-7 animate-spin text-loadingCard" />
          </div>
          <h2 className="mb-5 font-display text-base font-bold">
            Menganalisis Lahan Anda...
          </h2>
          <ul className="mx-auto max-w-xs space-y-2.5 text-left">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                {i < doneCount ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Circle className="h-4 w-4 text-white/50" />
                )}
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

   

      <Modal
        open={showError}
        onClose={() => router.push("/analisis")}
        variant="error"
        title="Gagal Memuat Data Lahan"
        description={
          errorMessage ||
          "Koneksi ke server data satelit atau cuaca sedang terganggu. Silakan periksa koneksi internet Anda atau coba beberapa saat lagi."
        }
        onConfirm={() => window.location.reload()}
      />
    </div>
  );
}