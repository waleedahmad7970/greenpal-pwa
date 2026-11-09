"use client";

import { useMemo, useState } from "react";
import { slotCount, stations } from "@/data/locations";
import { getSlots } from "@/lib/slots";
import { SearchIcon } from "./Icons";
import StationCard from "./StationCard";

const cities = ["All", ...Array.from(new Set(stations.map((s) => s.city)))];

export default function MachinesView() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");

  const rows = useMemo(
    () =>
      stations.map((s, i) => {
        const total = slotCount(s.model);
        const available = getSlots(i, total).filter((x) => x.state === "in").length;
        return { ...s, i, total, available };
      }),
    [],
  );

  const q = query.trim().toLowerCase();
  const filtered = rows.filter(
    (r) =>
      (city === "All" || r.city === city) &&
      (!q || [r.name, r.city, r.address, r.model].some((f) => f.toLowerCase().includes(q))),
  );

  return (
    <>
      <div className="sticky top-0 z-10 bg-surface pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 px-5 -mx-5 border-b border-rule">
        <label className="flex items-center gap-2 rounded-full border border-rule bg-card px-4 focus-within:border-signal transition-colors">
          <SearchIcon className="w-5 h-5 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search station, city or address"
            aria-label="Search machines"
            className="w-full bg-transparent py-3 text-base outline-none placeholder:text-muted/60"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium border transition-colors active:scale-95 ${
                city === c ? "bg-signal text-ink border-signal" : "border-rule text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        {filtered.length} station{filtered.length === 1 ? "" : "s"}
      </p>

      <ul className="mt-3 space-y-4">
        {filtered.map((r) => (
          <li key={r.i}>
            <StationCard m={r} />
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted">No stations match &ldquo;{query}&rdquo;.</p>
      )}
      <p className="mt-6 text-[11px] text-muted">Demo stock data.</p>
    </>
  );
}
