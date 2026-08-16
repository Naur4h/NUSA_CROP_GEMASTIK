"use client";

import { X, Play } from "lucide-react";

export default function TutorialModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between bg-[#8BAA5C] px-5 py-4">
          <h2 className="font-display text-lg font-bold text-white">TUTORIAL</h2>
          <button onClick={onClose} aria-label="Tutup">
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-5">
          {/* Placeholder video — ganti jadi <video> atau iframe YouTube kalau video-nya udah siap */}
          <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-200">
            <button
              className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-dark"
              aria-label="Putar video"
            >
              <Play className="h-6 w-6 fill-white text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}