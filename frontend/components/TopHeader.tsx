import Link from "next/link";
import Image from "next/image";

export default function TopHeader() {
  return (
    <header className="w-full bg-header px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/sappling.png" alt="Logo Nusa-Crop" width={28} height={28} />
        <span className="font-display text-sm font-bold tracking-wide text-cream-light">
          NUSA-CROP
        </span>
      </Link>
    </header>
  );
}