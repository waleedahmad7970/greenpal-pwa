import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import { BoltIcon, MachineIcon, MailIcon, PinIcon, SearchIcon } from "@/components/Icons";
import { slotCount, stations, steps } from "@/data/locations";
import { getSlots } from "@/lib/slots";

const machines = stations.map((s, i) => {
  const total = slotCount(s.model);
  return { ...s, i, total, available: getSlots(i, total).filter((x) => x.state === "in").length };
});
const totalBanks = machines.reduce((n, m) => n + m.available, 0);
const cityCount = new Set(stations.map((s) => s.city)).size;
const venues = Array.from(new Set(stations.map((s) => s.name)));

const actions = [
  { href: "/locations", label: "Map", Icon: PinIcon },
  { href: "/machines", label: "Machines", Icon: MachineIcon },
  { href: "/contact", label: "Host", Icon: BoltIcon },
  { href: "/contact", label: "Support", Icon: MailIcon },
];

const features = [
  { emoji: "⏱", title: "Pay by the hour", text: "Only pay for the time you use." },
  { emoji: "🔁", title: "Return anywhere", text: "Drop it at any Greenpal machine." },
  { emoji: "💳", title: "Tap to pay", text: "Card, Apple Pay or Google Pay." },
  { emoji: "⚡", title: "90 sec rental", text: "From scan to charged, fast." },
];

const delay = (n: number) => ({ animationDelay: `${n * 80}ms` });

function SectionHead({ title, href, link }: { title: string; href?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between px-5 mb-3">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-semibold accent active:opacity-60">
          {link} →
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="px-5 rise" style={delay(0)}>
        <div className="relative overflow-hidden rounded-[32px] bg-[#06301f] border border-signal/40 text-white p-6 pb-7">
          <div className="gp-motif absolute inset-0 opacity-[0.22]" aria-hidden />
          <span className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-signal" aria-hidden />
          <span className="absolute top-6 right-6 w-44 h-44 rounded-full border-2 border-ink/25" aria-hidden />

          <div className="relative flex items-start justify-between gap-2">
            <div className="max-w-[62%]">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold border border-signal/40">
                <i className="live-dot w-2 h-2 rounded-full bg-signal" /> {totalBanks} available now
              </span>
              <h1 className="font-display text-[2.1rem] leading-[1.02] font-bold tracking-tight mt-4">
                Stay charged.
                <br />
                <span className="text-signal">Keep moving.</span>
              </h1>
              <p className="mt-3 text-sm text-white/85">Rent a power bank here, return it at any machine.</p>
            </div>
            <Image
              src="/brand/machine-12.png"
              alt="Greenpal Pulse charging machine"
              width={227}
              height={350}
              priority
              unoptimized
              className="float absolute right-1 top-2 w-[42%] h-auto drop-shadow-[0_16px_14px_rgba(0,0,0,0.45)]"
            />
          </div>

          <div className="relative mt-10 flex gap-3">
            <Link href="/machines" className="flex-1 text-center rounded-full bg-signal text-ink font-bold py-3.5 active:scale-95 transition-transform">
              Rent now
            </Link>
            <Link href="/locations" className="flex-1 text-center rounded-full border border-white/30 font-semibold py-3.5 active:scale-95 transition-transform">
              Find machine
            </Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-5 rise" style={delay(1)}>
        <Link
          href="/machines"
          className="flex items-center gap-3 rounded-full border border-rule bg-card px-5 h-14 text-muted active:scale-[0.98] transition-transform"
        >
          <SearchIcon className="w-5 h-5" /> Search machines, cities, venues
        </Link>
      </section>

      {/* Quick actions */}
      <section className="px-5 grid grid-cols-4 gap-3 rise" style={delay(2)}>
        {actions.map(({ href, label, Icon }) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
            <span className="w-16 h-16 rounded-[22px] bg-card border border-rule flex items-center justify-center">
              <Icon className="w-7 h-7 accent" />
            </span>
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        ))}
      </section>

      {/* Stats */}
      <section className="px-5 grid grid-cols-3 gap-3 rise" style={delay(3)}>
        {[
          { v: machines.length, l: "Machines" },
          { v: cityCount, l: "Cities" },
          { v: "24/7", l: "Open" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-rule bg-card py-4 text-center">
            <p className="font-display text-2xl font-bold accent">{s.v}</p>
            <p className="text-[11px] text-muted">{s.l}</p>
          </div>
        ))}
      </section>

      {/* Machines carousel */}
      <section className="rise" style={delay(4)}>
        <SectionHead title="Machines" href="/machines" link="See all" />
        <ul className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 scroll-px-5 pb-1">
          {machines.slice(0, 6).map((m) => (
            <li key={m.i} className="snap-start shrink-0 w-[74%]">
              <Link
                href={`/locations/${m.i}`}
                className="relative block overflow-hidden rounded-3xl border border-rule bg-card p-4 active:scale-[0.97] transition-transform"
              >
                <Image
                  src={m.total === 12 ? "/brand/machine-12.png" : "/brand/machine-08.png"}
                  alt=""
                  width={120}
                  height={160}
                  unoptimized
                  className="absolute right-2 top-2 h-24 w-auto opacity-95"
                />
                <span className="text-[11px] font-semibold rounded-full bg-signal/15 accent px-2.5 py-1">{m.model}</span>
                <h3 className="font-display font-semibold mt-9 pr-16 truncate">{m.name}</h3>
                <p className="text-sm text-muted">{m.city}</p>
                <div className="mt-3 h-2 rounded-full bg-surface-dim overflow-hidden">
                  <div className="h-full bg-signal" style={{ width: `${(m.available / m.total) * 100}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-muted">
                  <b className="accent">{m.available}</b>/{m.total} in machine
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Why Greenpal */}
      <section className="px-5">
        <h2 className="font-display text-xl font-bold mb-3">Why Greenpal</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-3xl border border-rule bg-card p-4">
              <span className="w-11 h-11 rounded-2xl bg-signal/15 flex items-center justify-center text-xl">{f.emoji}</span>
              <h3 className="font-display font-semibold mt-3 leading-tight">{f.title}</h3>
              <p className="text-xs text-muted mt-1">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <SectionHead title="How it works" />
        <ol className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 scroll-px-5 pb-1">
          {steps.map((s, i) => (
            <li key={s.title} className="snap-start shrink-0 w-[68%] rounded-3xl border border-rule bg-card overflow-hidden">
              <div className="relative">
                <Image src={s.image} alt={s.title} width={450} height={300} className="w-full h-36 object-cover" />
                <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-signal text-ink font-display font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold">{s.title}</h3>
                <p className="text-sm text-muted mt-1">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Venue ticker */}
      <section aria-label="Our venues" className="overflow-hidden">
        <p className="px-5 text-xs font-semibold tracking-widest uppercase text-muted mb-3">Trusted by venues</p>
        <div className="marquee-track flex gap-3">
          {[...venues, ...venues].map((v, i) => (
            <span key={i} className="shrink-0 rounded-full border border-rule bg-card px-4 py-2 text-sm font-medium">
              {v}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5">
        <h2 className="font-display text-xl font-bold mb-3">Good to know</h2>
        <Faq />
      </section>

      {/* Host CTA */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-signal text-ink p-6">
          <Image src="/brand/machine-08.png" alt="" width={110} height={154} unoptimized className="absolute -right-2 -bottom-2 h-36 w-auto opacity-90" />
          <h2 className="relative font-display text-2xl font-bold leading-tight max-w-[70%]">Want a Greenpal machine at your venue?</h2>
          <p className="relative mt-2 text-sm text-ink/80 max-w-[65%]">Earn on every rental and show your own branding.</p>
          <Link href="/contact" className="relative mt-5 inline-flex rounded-full bg-ink text-white font-bold py-3 px-6 active:scale-95 transition-transform">
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
