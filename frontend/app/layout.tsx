import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "NUSA-CROP | Kenali Tanahmu, Tanam Lebih Beragam",
  description:
    "Analisis lahanmu dan temukan rekomendasi tanaman pangan lokal terbaik dengan NUSA-CROP.",
      icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
     <body className={`${lexend.variable} font-lexend`}>
        {/* Background di luar container - abu-abu, cuma kelihatan di layar lebar */}
        <div className="min-h-screen bg-gray-300">
          {/* Container utama - lebar tetap ala mobile, di tengah layar */}
          <div className="mx-auto min-h-screen w-full max-w-[420px] bg-white shadow-2xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}