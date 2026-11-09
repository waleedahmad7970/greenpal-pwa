"use client";

import { useState } from "react";
import { faqs } from "@/data/locations";
import { tap } from "@/lib/haptics";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li
            key={f.q}
            className={`deco-card !rounded-3xl transition-colors duration-300 ${
              isOpen ? "!border-signal" : ""
            }`}
          >
            <button
              onClick={() => {
                tap();
                setOpen(isOpen ? null : i);
              }}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-3 p-4 text-left active:scale-[0.99] transition-transform"
            >
              <span
                className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center font-display text-sm font-bold transition-colors ${
                  isOpen ? "bg-signal text-ink" : "bg-signal/15 accent"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display font-semibold leading-snug">{f.q}</span>
              <span
                className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-signal border-signal text-ink" : "border-rule text-muted"
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-[3.75rem] text-sm text-muted">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
