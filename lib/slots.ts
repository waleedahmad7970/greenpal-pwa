// Simulated slot inventory. The backend has no live per-slot data yet; replace
// `getSlots` with a fetch to a real endpoint when one exists.
export type Slot = {
  id: number;
  state: "in" | "out";
  battery?: number; // % when the bank is in the station
  minutesOut?: number; // minutes since rented when it is out
};

function rng(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSlots(stationIndex: number, total: number, refresh = 0): Slot[] {
  const r = rng(stationIndex * 1000 + refresh * 37 + 11);
  return Array.from({ length: total }, (_, i) => {
    if (r() < 0.35) return { id: i + 1, state: "out", minutesOut: Math.floor(r() * 180) + 3 };
    return { id: i + 1, state: "in", battery: Math.floor(r() * 41) + 60 };
  });
}
