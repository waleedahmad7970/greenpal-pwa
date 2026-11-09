import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./Icons";
import Ring from "./Ring";

export type StationCardData = {
  i: number;
  name: string;
  city: string;
  model: string;
  total: number;
  available: number;
};

export default function StationCard({ m }: { m: StationCardData }) {
  return (
    <Link href={`/locations/${m.i}`} className="deco-card block p-5 active:scale-[0.97] transition-transform">
      <span className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-signal/15" aria-hidden />
      <Image
        src={m.total === 12 ? "/brand/machine-12.png" : "/brand/machine-08.png"}
        alt=""
        width={120}
        height={170}
        unoptimized
        className="absolute right-3 top-3 h-28 w-auto drop-shadow-[0_8px_8px_rgba(0,0,0,0.25)]"
      />
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[11px] font-bold accent">
          <i className="live-dot w-1.5 h-1.5 rounded-full bg-signal" /> Live
        </span>
        <span className="rounded-full border border-rule px-2.5 py-1 text-[11px] font-medium text-muted">{m.model}</span>
      </div>
      <h3 className="font-display text-lg font-bold mt-12 pr-4 leading-tight">{m.name}</h3>
      <p className="text-sm text-muted">{m.city}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ring value={m.available} total={m.total} size={44} />
          <span className="text-xs text-muted leading-tight">
            of {m.total} power
            <br />
            banks ready
          </span>
        </div>
        <span className="w-10 h-10 rounded-full bg-signal text-ink flex items-center justify-center">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
