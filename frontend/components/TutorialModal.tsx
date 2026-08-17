"use client";

import { X } from "lucide-react";

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
          <div className="aspect-video overflow-hidden rounded-xl">
            <iframe
              src="https://www.youtube.com/embed/h4GJpX3fO70"
              title="Tutorial NUSA-CROP"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}