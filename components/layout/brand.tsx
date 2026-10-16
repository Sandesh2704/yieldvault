import Image from "next/image";
import Link from "next/link";



export function Brand() {
  return (
    <Link
      href="/"
      aria-label="YieldVault home"
      className="flex items-center gap-3"
    >
      <Image
        src="/logo/logo.webp"
        alt="YieldVault"
        width={160}
        height={80}
        priority
        className="h-[80px] w-[160px] object-contain"
      />
    </Link>
  )
}
