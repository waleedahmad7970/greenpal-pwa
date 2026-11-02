"use client";

import { tap } from "@/lib/haptics";
import { useMemo, useState } from "react";
import { getSlots, type Slot } from "@/lib/slots";

export default function SlotsView({ index, total, model }: { index: number; total: number; model: string }) {
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState<Slot | null>(null);
  const slots = useMemo(() => getSlots(index, total, refresh), [index, total, refresh]);

  const inCount = slots.filter((s) => s.state === "in").length;
  const outCount = total - inCount;

  return (
    <>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <Stat label="Total slots" value={total} />
        <Stat label="In machine" value={inCount} accent />
        <Stat label="Rented out" value={outCount} />
      </div>

      <div className="mt-4 h-2.5 rounded-full bg-surface-dim overflow-hidden" aria-hidden>
        <div className="h-full bg-signal transition-all duration-500" style={{ width: `${(inCount / total) * 100}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted">
        {inCount} of {total} power banks available · Greenpal {model}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Slots</h2>
        <button
          onClick={() => {
            setSelected(null);
            setRefresh((r) => r + 1);
            tap();
          }}
          className="text-sm font-medium accent active:scale-95 transition-transform"
        >
          ↻ Refresh
        </button>
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-2.5">
        {slots.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => {
                setSelected(s);
                tap();
              }}
              aria-label={`Slot ${s.id}, ${s.state === "in" ? "power bank available" : "rented out"}`}
              className={`w-full aspect-square rounded-2xl border flex flex-col items-center justify-center text-xs active:scale-90 transition-transform ${
                s.state === "in" ? "border-signal bg-signal/15" : "border-rule bg-card text-muted border-dashed"
              } ${selected?.id === s.id ? "ring-2 ring-signal" : ""}`}
            >
              <span className="font-display font-bold text-base">{s.id}</span>
              <span className="text-[10px]">{s.state === "in" ? `${s.battery}%` : "Out"}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-signal/40 border border-signal" /> In machine</span>
        <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded border border-dashed border-rule" /> Rented out</span>
      </div>

      {selected && (
        <div className="mt-5 rounded-2xl border border-signal bg-card p-4 page-enter">
          <p className="font-display font-semibold">Slot {selected.id}</p>
          {selected.state === "in" ? (
            <p className="text-sm text-muted mt-1">
              Power bank is in the machine, {selected.battery}% charged. Scan the station QR code to rent it.
            </p>
          ) : (
            <p className="text-sm text-muted mt-1">
              Rented out about {selected.minutesOut} min ago. It can be returned to any Greenpal station.
            </p>
          )}
        </div>
      )}

      <p className="mt-6 text-[11px] text-muted">Demo data. Live slot status will connect once the station API is available.</p>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-rule bg-card py-3">
      <p className={`font-display text-2xl font-bold ${accent ? "accent" : ""}`}>{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
