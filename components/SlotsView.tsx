"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getSlots, type Slot } from "@/lib/slots";
import { tap } from "@/lib/haptics";
import { ArrowIcon, BoltIcon, ClockIcon, MachineIcon, NavIcon } from "./Icons";

type Station = { name: string; address: string; city: string; model: string; lat: number; lng: number };

function Battery({ level, charging = true, className = "" }: { level: number; charging?: boolean; className?: string }) {
  const h = 30 * (level / 100);
  return (
    <svg viewBox="0 0 24 40" className={className} aria-hidden>
      <rect x="8" y="1" width="8" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="4" width="18" height="34" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <rect x="5.5" y={35.5 - h} width="13" height={h} rx="2.5" fill="#02D683" />
      {charging && (
        <path className="charge-bolt" d="M13 14l-4.5 8h3.5l-1 7 5-9h-3.5z" fill="#04231A" />
      )}
    </svg>
  );
}

export default function SlotsView({ index, total, station }: { index: number; total: number; station: Station }) {
  const [refresh, setRefresh] = useState(0);
  const [spin, setSpin] = useState(0);
  const [selected, setSelected] = useState<Slot | null>(null);
  const slots = useMemo(() => getSlots(index, total, refresh), [index, total, refresh]);

  const inCount = slots.filter((s) => s.state === "in").length;
  const outCount = total - inCount;
  const pct = Math.round((inCount / total) * 100);
  const dir = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-b-[44px] bg-[#052a1c] text-white pt-safe rise">
        <div className="gp-motif absolute inset-0 opacity-[0.2]" aria-hidden />
        <span className="absolute -top-16 -right-20 w-72 h-72 rounded-full bg-signal" aria-hidden />
        <span className="ring-pulse absolute top-6 -right-6 w-56 h-56 rounded-full border-2 border-white/50" aria-hidden />
        <Image
          src={total === 12 ? "/brand/machine-12.png" : "/brand/machine-08.png"}
          alt=""
          width={190}
          height={300}
          priority
          unoptimized
          className="float absolute right-3 top-14 w-[38%] h-auto drop-shadow-[0_20px_16px_rgba(0,0,0,0.45)]"
        />

        <div className="relative px-5 pt-5 pb-16">
          <Link href="/machines" className="inline-flex items-center gap-2 rounded-full bg-ink/80 border border-white/20 pl-2 pr-4 py-1.5 text-sm font-semibold active:scale-95 transition-transform">
            <span className="w-7 h-7 rounded-full bg-signal text-ink flex items-center justify-center">
              <ArrowIcon className="w-4 h-4 rotate-180" />
            </span>
            Stations
          </Link>

          <div className="mt-6 max-w-[62%]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-signal">
                <i className="live-dot w-1.5 h-1.5 rounded-full bg-signal" /> Live
              </span>
              <span className="rounded-full border border-white/40 px-2.5 py-1 text-[11px] font-semibold">{station.model}</span>
            </div>
            <h1 className="font-display text-[2rem] leading-[1.02] font-bold tracking-tight mt-3">{station.name}</h1>
            <p className="text-xs text-white/75 mt-2">{station.address}</p>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-[4.5rem] leading-none font-bold text-signal">{inCount}</p>
            <p className="pb-2 text-sm text-white/80 leading-tight">
              of {total} power banks
              <br />
              ready to rent
            </p>
          </div>
          <div className="mt-3 h-2.5 rounded-full bg-white/15 overflow-hidden">
            <div className="h-full rounded-full bg-signal transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      <div className="px-5 -mt-8 relative z-10 space-y-6">
        {/* ---------- Stats ---------- */}
        <div className="grid grid-cols-3 gap-3 rise" style={{ animationDelay: "120ms" }}>
          {[
            { v: total, l: "Total slots", Icon: MachineIcon, c: "" },
            { v: inCount, l: "Available", Icon: BoltIcon, c: "accent" },
            { v: outCount, l: "Rented out", Icon: ClockIcon, c: "" },
          ].map(({ v, l, Icon, c }) => (
            <div key={l} className="deco-card !rounded-3xl p-3.5 text-center shadow-[0_14px_30px_rgba(4,35,26,0.15)]">
              <span className="mx-auto w-9 h-9 rounded-xl bg-signal/15 flex items-center justify-center">
                <Icon className="w-[18px] h-[18px] accent" />
              </span>
              <p className={`font-display text-2xl font-bold mt-2 leading-none ${c}`}>{v}</p>
              <p className="text-[11px] text-muted mt-1">{l}</p>
            </div>
          ))}
        </div>

        {/* ---------- Slots ---------- */}
        <section className="rise" style={{ animationDelay: "200ms" }}>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase accent">Live slots</p>
              <h2 className="font-display text-2xl font-bold">Pick a slot</h2>
            </div>
            <button
              onClick={() => {
                tap();
                setSelected(null);
                setSpin((n) => n + 1);
                setRefresh((r) => r + 1);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-rule bg-card px-3.5 py-2 text-sm font-semibold active:scale-95 transition-transform"
            >
              <span key={spin} className={spin ? "refresh-spin inline-block" : "inline-block"}>↻</span> Refresh
            </button>
          </div>

          <ul className="grid grid-cols-4 gap-2.5">
            {slots.map((s) => {
              const isIn = s.state === "in";
              const active = selected?.id === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      tap();
                      setSelected(s);
                    }}
                    aria-label={`Slot ${s.id}, ${isIn ? `power bank ${s.battery}% charged` : "rented out"}`}
                    className={`relative w-full aspect-[3/4] rounded-2xl border flex flex-col items-center justify-between py-2 active:scale-90 transition-all ${
                      isIn
                        ? "border-signal bg-gradient-to-b from-signal/30 to-signal/5 shadow-[0_8px_16px_rgba(2,214,131,0.2)]"
                        : "border-dashed border-rule bg-card text-muted"
                    } ${active ? "ring-2 ring-offset-2 ring-signal ring-offset-[rgb(var(--bg))]" : ""}`}
                  >
                    <span className={`text-[10px] font-bold rounded-full px-1.5 ${isIn ? "bg-ink text-signal" : "bg-surface-dim"}`}>{s.id}</span>
                    {isIn ? (
                      <Battery level={s.battery ?? 0} className="w-6 h-10 text-[rgb(var(--fg))]" />
                    ) : (
                      <ClockIcon className="w-7 h-7 opacity-50" />
                    )}
                    <span className="text-[11px] font-bold">{isIn ? `${s.battery}%` : `${s.minutesOut}m`}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-signal/40 border border-signal" /> Available</span>
              <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded border border-dashed border-rule" /> Rented out</span>
            </span>
            <span>Updated just now</span>
          </div>
        </section>

        {/* ---------- Selected slot ---------- */}
        {selected ? (
          <div className="deco-card !rounded-3xl p-5 !border-signal page-enter">
            <div className="flex items-center gap-4">
              <span className="w-16 h-20 rounded-2xl bg-ink text-white flex items-center justify-center shrink-0">
                {selected.state === "in" ? (
                  <Battery level={selected.battery ?? 0} className="w-8 h-14" />
                ) : (
                  <ClockIcon className="w-9 h-9 text-signal" />
                )}
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase accent">Slot {selected.id}</p>
                <h3 className="font-display text-xl font-bold leading-tight">
                  {selected.state === "in" ? `Ready · ${selected.battery}% charged` : "Currently rented"}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {selected.state === "in"
                    ? "Scan the QR code on the station screen to rent this power bank."
                    : `Rented about ${selected.minutesOut} min ago. It can be returned to any Greenpal station.`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-muted">Tap a slot to see its charge and status.</p>
        )}

        {/* ---------- Directions CTA ---------- */}
        <a
          href={dir}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden flex items-center justify-between gap-4 rounded-[28px] bg-ink text-white p-5 active:scale-[0.98] transition-transform"
        >
          <div className="gp-motif absolute inset-0 opacity-20" aria-hidden />
          <span className="relative leading-tight">
            <span className="block text-[11px] font-bold tracking-[0.16em] uppercase text-signal">Ready to charge?</span>
            <span className="block font-display text-lg font-bold mt-1">Get directions to this station</span>
            <span className="block text-xs text-white/70 mt-0.5">{station.city}</span>
          </span>
          <span className="sheen relative w-14 h-14 rounded-full bg-signal text-ink flex items-center justify-center shrink-0">
            <NavIcon className="w-6 h-6" />
          </span>
        </a>

        <p className="text-center text-[11px] text-muted pb-2">Demo data. Live slot status will connect once the station API is available.</p>
      </div>
    </>
  );
}
