"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { stations } from "@/data/locations";
import { NavIcon } from "./Icons";

const StationsMap = dynamic(() => import("./StationsMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface-dim" />,
});

export default function LocationsView() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="h-[44vh] min-h-[260px] border-b border-rule">
        <StationsMap selected={selected} />
      </div>

      <div className="px-5 pt-5 ">
        <p className="text-sm text-muted">
          {stations.length} stations across Alberta. Tap one to see it on the map.
        </p>
        <ul className="mt-4 space-y-3">
          {stations.map((s, i) => (
            <li key={`${s.name}-${s.city}`}>
              <div
                className={`rounded-2xl border bg-card p-4 transition-all active:scale-[0.98] ${
                  selected === i ? "border-signal" : "border-rule"
                }`}
              >
                <button
                  onClick={() => {
                    setSelected(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-semibold">{s.name}</h3>
                      <p className="text-sm text-muted mt-0.5">{s.address}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-medium rounded-full bg-signal/15 accent px-2.5 py-1">
                      {s.model}
                    </span>
                  </div>
                </button>
                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium accent"
                  >
                    <NavIcon /> Directions
                  </a>
                  <Link
                    href={`/locations/${i}`}
                    className="rounded-full bg-signal text-ink text-sm font-bold px-4 py-2 active:scale-95 transition-transform"
                  >
                    View slots →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
