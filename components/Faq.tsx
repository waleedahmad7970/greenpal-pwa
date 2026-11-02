"use client";

import { useState } from "react";
import { faqs } from "@/data/locations";
import { ChevronIcon } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-[rgb(var(--line))] border-y border-rule">
      {faqs.map((f, i) => (
        <li key={f.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 py-4 text-left font-display font-medium"
          >
            {f.q}
            <ChevronIcon className={`w-5 h-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="pb-4 text-sm text-muted">{f.a}</p>}
        </li>
      ))}
    </ul>
  );
}
