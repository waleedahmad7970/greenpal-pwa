import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-[1000] bg-surface border-b border-rule pt-safe">
      <div className="flex items-center justify-between h-[72px] px-5">
        <Link href="/" aria-label="Greenpal home" className="active:scale-95 transition-transform">
          <Image src="/brand/wordmark.svg" alt="Greenpal" width={180} height={39} priority className="h-8 w-auto" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
