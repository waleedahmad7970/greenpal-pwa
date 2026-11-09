"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { slotCount, stations } from "@/data/locations";
import { getSlots } from "@/lib/slots";
import { tap } from "@/lib/haptics";
import { ArrowIcon, NavIcon, PinIcon } from "./Icons";
import Ring from "./Ring";
import type { MapCmd } from "./StationsMap";

const StationsMap = dynamic(() => import("./StationsMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface-dim" />,
});

const cities = ["All", ...Array.from(new Set(stations.map((s) => s.city)))];

const rows = stations.map((s, i) => {
  const total = slotCount(s.model);
  return { ...s, i, total, available: getSlots(i, total).filter((x) => x.state === "in").length };
});

const km = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const r = (d: number) => (d * Math.PI) / 180;
  const h =
    Math.sin(r(b.lat - a.lat) / 2) ** 2 +
    Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};
const fmtKm = (d: number) => (d < 10 ? d.toFixed(1) : Math.round(d).toString()) + " km";

const dirUrl = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export default function LocationsView() {
  const [selected, setSelected] = useState<number | null>(null);
  const [city, setCity] = useState("All");
  const [cmd, setCmd] = useState<MapCmd | null>(null);
  const [locateFailed, setLocateFailed] = useState(false);
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null);
  const n = useRef(0);

  const list = useMemo(() => {
    const withDist = rows.map((r) => ({ ...r, dist: me ? km(me, r) : null as number | null }));
    const f = withDist.filter((r) => city === "All" || r.city === city);
    return me ? f.sort((a, b) => (a.dist ?? 0) - (b.dist ?? 0)) : f;
  }, [city, me]);
  const visible = useMemo(() => list.map((r) => r.i), [list]);
  const sel = selected != null ? list.find((r) => r.i === selected) ?? rows[selected] : null;

  // /locations?s=3 opens with station 3 selected
  useEffect(() => {
    const q = Number(new URLSearchParams(window.location.search).get("s"));
    if (Number.isInteger(q) && q >= 0 && q < rows.length && new URLSearchParams(window.location.search).has("s")) setSelected(q);
  }, []);

  const send = (type: MapCmd["type"]) => {
    tap();
    setLocateFailed(false);
    setCmd({ type, n: ++n.current });
  };

  return (
    <>
      {/* ---------- Map ---------- */}
      <div className="relative isolate h-[64vh] min-h-[400px] overflow-hidden rounded-b-[36px]">
        <StationsMap
          visible={visible}
          selected={selected}
          onSelect={(i) => {
            tap();
            setSelected(i);
          }}
          cmd={cmd}
          onLocateError={() => setLocateFailed(true)}
          onLocated={setMe}
        />

        {/* Floating title */}
        <div className="absolute top-0 inset-x-0 z-[800] p-4 pt-[calc(1rem+env(safe-area-inset-top))] pointer-events-none">
          <div className="pointer-events-auto inline-flex items-center gap-3 rounded-2xl bg-card/95 border border-rule px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
            <span className="w-10 h-10 rounded-xl bg-signal text-ink flex items-center justify-center">
              <PinIcon className="w-5 h-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display font-bold text-lg">Find a station</span>
              <span className="block text-[11px] text-muted">{list.length} power bank stations</span>
            </span>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute right-4 top-[calc(1rem+env(safe-area-inset-top))] z-[800] flex flex-col gap-2">
          <button className="map-btn" aria-label="Zoom in" onClick={() => send("zoomIn")}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
          <button className="map-btn" aria-label="Zoom out" onClick={() => send("zoomOut")}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14" /></svg>
          </button>
          <button className="map-btn !bg-signal !text-ink !border-signal" aria-label="Show my location" onClick={() => send("locate")}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3.2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="7.5" /></svg>
          </button>
        </div>

        {locateFailed && (
          <p className="absolute left-4 bottom-4 z-[800] rounded-full bg-ink text-white text-xs px-3 py-2">Couldn&apos;t get your location</p>
        )}

        {/* Selected station card */}
        {sel && (
          <div className="!absolute inset-x-4 bottom-5 z-[800] deco-card !rounded-3xl p-4 shadow-[0_16px_34px_rgba(0,0,0,0.28)] page-enter">
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full border border-rule bg-card flex items-center justify-center text-muted z-10"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 pr-8">
              <Ring value={sel.available} total={sel.total} size={52} />
              <div className="min-w-0">
                <h3 className="font-display font-bold leading-tight truncate">{sel.name}</h3>
                <p className="text-xs text-muted truncate">{sel.address}</p>
                <p className="text-[11px] mt-0.5"><b className="accent">{sel.available}</b>/{sel.total} power banks ready · {sel.model}{me ? ` · ${fmtKm(km(me, sel))} away` : ""}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <a href={dirUrl(sel.lat, sel.lng)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-rule bg-card font-semibold text-sm py-2.5 active:scale-95 transition-transform">
                <NavIcon /> Directions
              </a>
              <Link href={`/locations/${sel.i}`} className="sheen flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-signal text-ink font-bold text-sm py-2.5 active:scale-95 transition-transform">
                View slots <ArrowIcon />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ---------- List ---------- */}
      <div className="px-5 pt-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => {
                tap();
                setSelected(null);
                setCity(c);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition-all active:scale-95 ${
                city === c ? "bg-signal text-ink border-signal shadow-[0_6px_14px_rgba(2,214,131,0.35)]" : "border-rule bg-card text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted">
          {me ? "Sorted by distance from your location. " : ""}Tap a pin or a card to see details on the map.
        </p>

        <ul className="mt-3 space-y-3.5">
          {list.map((r) => (
            <li key={r.i}>
              <div
                className={`deco-card p-4 transition-all ${selected === r.i ? "!border-signal shadow-[0_12px_28px_rgba(2,214,131,0.25)]" : ""}`}
              >
                <button
                  onClick={() => {
                    tap();
                    setSelected(r.i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full text-left active:scale-[0.99] transition-transform"
                >
                  <Image
                    src={r.total === 12 ? "/brand/machine-12.png" : "/brand/machine-08.png"}
                    alt=""
                    width={80}
                    height={110}
                    unoptimized
                    className="absolute right-3 top-3 h-20 w-auto drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)]"
                  />
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[11px] font-bold accent">
                      <i className="live-dot w-1.5 h-1.5 rounded-full bg-signal" /> Live
                    </span>
                    <span className="rounded-full border border-rule px-2.5 py-1 text-[11px] font-medium text-muted">{r.model}</span>
                    {r.dist != null && (
                      <span className="rounded-full bg-ink text-signal px-2.5 py-1 text-[11px] font-bold">
                        {list[0]?.i === r.i && city === "All" ? "Nearest · " : ""}{fmtKm(r.dist)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg mt-3 pr-20 leading-tight">{r.name}</h3>
                  <p className="text-xs text-muted mt-0.5 pr-20">{r.address}</p>
                </button>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Ring value={r.available} total={r.total} size={40} />
                    <span className="text-[11px] text-muted leading-tight">of {r.total} power<br />banks ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={dirUrl(r.lat, r.lng)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${r.name}`} className="w-10 h-10 rounded-full border border-rule bg-card flex items-center justify-center accent active:scale-90 transition-transform">
                      <NavIcon />
                    </a>
                    <Link href={`/locations/${r.i}`} className="rounded-full bg-signal text-ink text-sm font-bold px-4 h-10 inline-flex items-center gap-1.5 active:scale-95 transition-transform">
                      Slots <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
