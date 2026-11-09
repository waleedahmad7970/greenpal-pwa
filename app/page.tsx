import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Faq from "@/components/Faq";
import {
  ArrowIcon,
  BoltIcon,
  CardIcon,
  ClockIcon,
  MachineIcon,
  MailIcon,
  PinIcon,
  RepeatIcon,
  SearchIcon,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import RotatingSearch from "@/components/RotatingSearch";
import StepsSlider from "@/components/StepsSlider";
import Ring from "@/components/Ring";
import StationCard from "@/components/StationCard";
import { contact, slotCount, stations, steps } from "@/data/locations";
import { getSlots } from "@/lib/slots";

const machines = stations.map((s, i) => {
  const total = slotCount(s.model);
  return { ...s, i, total, available: getSlots(i, total).filter((x) => x.state === "in").length };
});
const totalBanks = machines.reduce((n, m) => n + m.available, 0);
const cityCount = new Set(stations.map((s) => s.city)).size;
const venues = Array.from(new Set(stations.map((s) => s.name)));
const hero = machines[0];

const actions = [
  { href: "/locations", label: "Map", Icon: PinIcon, dark: false, badge: "" },
  { href: "/machines", label: "Stations", Icon: MachineIcon, dark: true, badge: String(machines.length) },
  { href: "/contact", label: "Host", Icon: BoltIcon, dark: false, badge: "" },
  { href: "/contact", label: "Support", Icon: MailIcon, dark: true, badge: "" },
];

function Head({ eyebrow, title, href, link }: { eyebrow: string; title: string; href?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between px-5 mb-4">
      <div>
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase accent">{eyebrow}</p>
        <h2 className="font-display text-[1.7rem] leading-tight font-bold tracking-tight mt-1">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold accent active:opacity-60 pb-1">
          {link} <ArrowIcon />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-12">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-b-[48px] bg-[#041f15] text-white pt-safe">
        <div className="aurora absolute inset-0" aria-hidden />
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="gp-motif absolute inset-0 opacity-[0.16]" aria-hidden />
        <span className="absolute -top-20 -right-24 w-[22rem] h-[22rem] rounded-full bg-signal" aria-hidden />
        <span className="ring-pulse absolute top-8 -right-10 w-64 h-64 rounded-full border-2 border-white/50" aria-hidden />
        <span className="ring-pulse absolute top-8 -right-10 w-64 h-64 rounded-full border-2 border-white/50" style={{ animationDelay: "1.2s" }} aria-hidden />
        <span className="spin-slow absolute top-[88px] right-[18px] w-[17rem] h-[17rem] rounded-full border border-dashed border-ink/30" aria-hidden />

        <div className="relative px-5 pt-6 pb-24">
          <div className="flex items-center justify-between rise">
            <Image src="/brand/wordmark.svg" alt="Greenpal" width={150} height={32} priority className="h-7 w-auto brightness-0 invert" />
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/85 border border-signal/30 px-3 py-1.5 text-[11px] font-bold">
              <i className="live-dot w-2 h-2 rounded-full bg-signal" /> {totalBanks} ready now
            </span>
          </div>

          <div className="relative mt-8 min-h-[350px]">
            <div className="relative z-10 max-w-[58%]">
              <p className="rise text-[11px] font-bold tracking-[0.14em] uppercase text-signal whitespace-nowrap" style={{ animationDelay: "80ms" }}>
                Shared power
              </p>
              <h1 className="rise font-display text-[2.75rem] leading-[0.96] font-bold tracking-tight mt-2" style={{ animationDelay: "160ms" }}>
                Stay
                <br />
                charged.
                <br />
                <span className="text-signal">Keep moving.</span>
              </h1>
              <p className="rise mt-4 text-sm text-white/80 max-w-[16rem]" style={{ animationDelay: "260ms" }}>
                Rent a power bank here. Return it at any Greenpal station.
              </p>
            </div>

            <Image
              src="/brand/machine-12.png"
              alt="Greenpal Pulse charging station"
              width={509}
              height={900}
              priority
              unoptimized
              className="float absolute -right-2 -top-4 w-[50%] h-auto z-0 drop-shadow-[0_26px_20px_rgba(0,0,0,0.5)]"
            />

            <span className="chip absolute right-1 top-[236px] rounded-full bg-white text-ink text-xs font-bold px-3 py-1.5 shadow-lg">⚡ 90 sec rental</span>
            <span className="chip absolute right-6 top-[288px] rounded-full bg-signal text-ink text-xs font-bold px-3 py-1.5 shadow-lg" style={{ animationDelay: "-2s" }}>
              💳 Tap to pay
            </span>

          </div>

          <div className="relative mt-3 flex gap-3 rise" style={{ animationDelay: "460ms" }}>
            <Link
              href="/machines"
              className="sheen group flex-[1.1] flex items-center justify-between rounded-full bg-signal text-ink font-bold text-[17px] pl-6 pr-1.5 py-1.5 shadow-[0_12px_28px_rgba(2,214,131,0.5)] active:scale-95 transition-transform"
            >
              Rent now
              <span className="w-12 h-12 rounded-full bg-ink text-signal flex items-center justify-center">
                <ArrowIcon className="arrow-nudge w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/locations"
              className="glass flex-1 flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold py-3.5 px-2 active:scale-95 transition-transform"
            >
              <span className="relative flex w-5 h-5 items-center justify-center">
                <i className="ping absolute w-3 h-3 rounded-full bg-signal" />
                <PinIcon className="relative w-5 h-5 text-signal" />
              </span>
              Find a station
            </Link>
          </div>
        </div>
      </section>

      {/* ================= LIVE NETWORK ================= */}
      <section className="px-5 -mt-[6.5rem] relative z-10 rise" style={{ animationDelay: "540ms" }}>
        <div className="gborder relative overflow-hidden rounded-[30px] p-5 shadow-[0_20px_44px_rgba(4,35,26,0.2)]">
          {/* Photo that fades in from the right */}
          <div
            className="absolute top-0 right-0 bottom-[5.6rem] w-[66%]"
            style={{ maskImage: "linear-gradient(to left, #000 30%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, #000 30%, transparent 100%)" }}
            aria-hidden
          >
            <Image src="/steps/charge.jpeg" alt="" fill sizes="320px" className="object-cover object-right" />
            <span className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--card))] via-transparent to-transparent" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold text-signal">
              <i className="live-dot w-2 h-2 rounded-full bg-signal" /> Live network
            </span>
            <p className="font-display text-[4.25rem] leading-none font-bold accent mt-4">
              <CountUp value={totalBanks} />
            </p>
            <p className="text-sm text-muted mt-1 max-w-[9rem] leading-snug">power banks ready to rent</p>
            <span className="chip absolute right-0 top-0 rounded-full bg-signal text-ink text-xs font-bold px-3 py-1.5 shadow-lg">
              ⚡ Fast charge
            </span>
          </div>
          <div className="relative mt-6 grid grid-cols-3 gap-2 border-t border-rule pt-4">
            {[
              { v: machines.length, l: "Stations", Icon: MachineIcon },
              { v: cityCount, l: "Cities", Icon: PinIcon },
              { v: "24/7", l: "Open", Icon: ClockIcon },
            ].map(({ v, l, Icon }) => (
              <div key={l} className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-signal/15 flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] accent" />
                </span>
                <span className="leading-tight">
                  <span className="block font-display font-bold">{typeof v === "number" ? <CountUp value={v} /> : v}</span>
                  <span className="block text-[11px] text-muted">{l}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEARCH + ACTIONS ================= */}
      <Reveal className="px-5 space-y-7">
        <RotatingSearch />
        <div className="grid grid-cols-4 gap-3">
          {actions.map(({ href, label, Icon, dark, badge }, k) => (
            <Link key={label} href={href} className="pop flex flex-col items-center gap-2 active:scale-90 transition-transform" style={{ animationDelay: `${k * 90}ms` }}>
              <span
                className={`tile-bob relative w-[70px] h-[70px] rounded-[26px] flex items-center justify-center ${
                  dark
                    ? "bg-ink text-signal shadow-[0_12px_22px_rgba(4,35,26,0.35)]"
                    : "bg-gradient-to-br from-signal to-signal-dim text-ink shadow-[0_12px_22px_rgba(2,214,131,0.4)]"
                }`}
                style={{ animationDelay: `${k * 0.4}s` }}
              >
                <Icon className="w-7 h-7" />
                {badge && (
                  <b className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-white text-ink text-[11px] flex items-center justify-center shadow border border-rule">
                    {badge}
                  </b>
                )}
              </span>
              <span className="text-xs font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* ================= MACHINES ================= */}
      <Reveal>
        <Head eyebrow="Live stock" title="Stations near you" href="/machines" link="All" />
        <ul className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 scroll-px-5 pb-3">
          {machines.slice(0, 6).map((m) => (
            <li key={m.i} className="snap-start shrink-0 w-[78%]">
              <StationCard m={m} />
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ================= BENTO ================= */}
      <section className="px-5">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase accent">Why Greenpal</p>
          <h2 className="font-display text-[1.7rem] leading-tight font-bold tracking-tight mt-1 mb-4">Power, made effortless</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3">
          <Reveal className="col-span-2">
            <div className="relative overflow-hidden rounded-[28px] bg-ink text-white p-5 h-full">
              <div className="gp-motif absolute inset-0 opacity-20" aria-hidden />
              <ClockIcon className="relative w-8 h-8 text-signal" />
              <h3 className="relative font-display text-xl font-bold mt-3">Pay by the hour</h3>
              <p className="relative text-sm text-white/70 mt-1">Only pay for the time you actually use.</p>
              <div className="relative mt-5">
                <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
                  <div className="bar-fill h-full w-3/5 rounded-full bg-signal" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-white/60">
                  <span>Rent</span>
                  <span>Return anytime</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="deco-card p-5 h-full">
              <span className="w-11 h-11 rounded-2xl bg-signal/15 flex items-center justify-center">
                <RepeatIcon className="w-6 h-6 accent" />
              </span>
              <h3 className="font-display font-bold mt-3 leading-tight">Return anywhere</h3>
              <p className="text-xs text-muted mt-1">Drop it at any Greenpal station.</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="deco-card p-5 h-full">
              <span className="w-11 h-11 rounded-2xl bg-signal/15 flex items-center justify-center">
                <CardIcon className="w-6 h-6 accent" />
              </span>
              <h3 className="font-display font-bold mt-3 leading-tight">Tap to pay</h3>
              <p className="text-xs text-muted mt-1">Card, Apple Pay or Google Pay.</p>
            </div>
          </Reveal>
          <Reveal className="col-span-2" delay={80}>
            <div className="gborder rounded-[28px] p-5 flex items-center gap-4">
              <p className="font-display text-6xl font-bold leading-none accent">
                90
              </p>
              <div>
                <p className="font-display font-bold leading-tight">seconds, scan to charged</p>
                <p className="text-xs text-muted mt-1">Average time from tap to your power bank releasing.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= HOW IT WORKS (slider) ================= */}
      <Reveal>
        <Head eyebrow="Swipe through" title="How it works" />
        <StepsSlider steps={steps} />
      </Reveal>

      {/* ================= VENUES ================= */}
      <Reveal>
        <section aria-label="Our venues" className="overflow-hidden space-y-3">
          <p className="px-5 text-[11px] font-bold tracking-[0.18em] uppercase text-muted">Trusted by venues</p>
          <div className="marquee-track flex gap-3">
            {[...venues, ...venues].map((v, i) => (
              <span key={i} className="shrink-0 rounded-full border border-rule bg-card px-5 py-2.5 text-sm font-semibold">
                {v}
              </span>
            ))}
          </div>
          <div className="marquee-rev flex gap-3">
            {[...venues].reverse().concat([...venues].reverse()).map((v, i) => (
              <span key={i} className="shrink-0 rounded-full bg-signal/15 accent px-5 py-2.5 text-sm font-semibold">
                {v}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ================= FAQ ================= */}
      <Reveal className="px-5">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase accent">FAQ</p>
        <h2 className="font-display text-[1.7rem] leading-tight font-bold tracking-tight mt-1 mb-4">Good to know</h2>
        <Faq />
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-between gap-3 rounded-3xl bg-[#25D366]/12 border border-[#25D366]/40 p-4 active:scale-[0.98] transition-transform"
        >
          <span className="leading-tight">
            <span className="block font-display font-bold">Still have a question?</span>
            <span className="block text-xs text-muted mt-0.5">Chat with us on WhatsApp</span>
          </span>
          <span className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <ArrowIcon className="w-5 h-5" />
          </span>
        </a>
      </Reveal>

      {/* ================= CTA ================= */}
      <Reveal className="px-5">
        <div className="relative overflow-hidden rounded-[32px] bg-signal text-ink p-6">
          <div className="gp-motif absolute inset-0 opacity-20" aria-hidden />
          <Image src="/brand/machine-08.png" alt="" width={140} height={196} unoptimized className="float absolute -right-1 -bottom-3 h-44 w-auto drop-shadow-[0_14px_12px_rgba(0,0,0,0.3)]" />
          <p className="relative text-[11px] font-bold tracking-[0.18em] uppercase text-ink/70">For venues</p>
          <h2 className="relative font-display text-[1.65rem] font-bold leading-[1.05] mt-2 max-w-[66%]">Put a Greenpal station in your venue</h2>
          <p className="relative mt-2 text-sm text-ink/80 max-w-[62%]">Earn on every rental and show your own branding.</p>
          <Link href="/contact" className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-ink text-white font-bold py-3.5 px-6 active:scale-95 transition-transform">
            Talk to us <ArrowIcon />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
