"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchIcon } from "./Icons";

const phrases = ["Pawn Shop Live", "Edmonton stations", "Calgary", "Cure MD", "Chop Shop Physiques", "Pulse 12 stations"];

export default function RotatingSearch() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % phrases.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <Link
      href="/machines"
      className="group flex items-center gap-3 rounded-full border border-rule bg-card pl-5 pr-1.5 h-[60px] shadow-[0_8px_22px_rgba(4,35,26,0.08)] active:scale-[0.98] transition-transform"
    >
      <SearchIcon className="w-5 h-5 accent shrink-0" />
      <span className="flex-1 text-muted overflow-hidden whitespace-nowrap">
        Search <span key={i} className="txt-in inline-block text-[rgb(var(--fg))] font-medium">{phrases[i]}</span>
      </span>
      <span className="w-12 h-12 rounded-full bg-signal text-ink flex items-center justify-center">
        <SearchIcon className="w-5 h-5" />
      </span>
    </Link>
  );
}
