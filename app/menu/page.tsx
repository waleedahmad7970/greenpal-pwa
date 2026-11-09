import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  ClockIcon,
  MachineIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SettingsIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { contact, slotCount, stations } from "@/data/locations";
import { getSlots } from "@/lib/slots";

export const metadata: Metadata = { title: "Menu" };

const ready = stations.reduce(
  (n, s, i) => n + getSlots(i, slotCount(s.model)).filter((x) => x.state === "in").length,
  0,
);

const tiles = [
  { href: "/machines", title: "Stations", sub: "Live availability", Icon: MachineIcon, tone: "green" },
  { href: "/locations", title: "Station map", sub: "Find one nearby", Icon: PinIcon, tone: "dark" },
  { href: "/contact", title: "Contact us", sub: "Partner or ask", Icon: MailIcon, tone: "dark" },
  { href: "/settings", title: "Settings", sub: "Theme & app", Icon: SettingsIcon, tone: "green" },
];

const support = [
  { href: contact.phoneHref, title: "Call support", sub: contact.phone, Icon: PhoneIcon, color: "bg-signal text-ink" },
  { href: `mailto:${contact.email}`, title: "Email us", sub: contact.email, Icon: MailIcon, color: "bg-ink text-signal" },
  { href: contact.whatsapp, title: "Chat on WhatsApp", sub: "Replies within the day", Icon: WhatsAppIcon, color: "bg-[#25D366] text-white", external: true },
];

export default function MenuPage() {
  return (
    <div className="px-5 page-top space-y-6">
      <div className="rise">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase accent">Greenpal</p>
        <h1 className="font-display text-4xl font-bold tracking-tight mt-1">Menu</h1>
      </div>

      {/* Featured */}
      <Link
        href="/machines"
        className="rise relative block overflow-hidden rounded-[32px] bg-[#052a1c] text-white p-6 active:scale-[0.98] transition-transform"
        style={{ animationDelay: "80ms" }}
      >
        <div className="gp-motif absolute inset-0 opacity-[0.2]" aria-hidden />
        <span className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-signal" aria-hidden />
        <span className="ring-pulse absolute top-4 right-0 w-44 h-44 rounded-full border-2 border-white/50" aria-hidden />
        <Image
          src="/brand/machine-12.png"
          alt=""
          width={140}
          height={220}
          unoptimized
          className="float absolute right-3 top-3 h-36 w-auto drop-shadow-[0_14px_12px_rgba(0,0,0,0.4)]"
        />
        <div className="relative max-w-[52%]">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold text-signal">
            <i className="live-dot w-2 h-2 rounded-full bg-signal" /> {ready} ready now
          </span>
          <h2 className="font-display text-[1.7rem] leading-[1.05] font-bold mt-4">Find a station near you</h2>
          <p className="text-sm text-white/75 mt-2">
            {stations.length} stations in Alberta
          </p>
        </div>
        <span className="sheen relative mt-6 inline-flex items-center gap-2 rounded-full bg-signal text-ink font-bold pl-5 pr-1.5 py-1.5">
          Browse stations
          <span className="w-10 h-10 rounded-full bg-ink text-signal flex items-center justify-center">
            <ArrowIcon className="arrow-nudge" />
          </span>
        </span>
      </Link>

      {/* Tiles */}
      <div className="grid grid-cols-2 gap-3">
        {tiles.map(({ href, title, sub, Icon, tone }, k) => (
          <Link
            key={title}
            href={href}
            className="deco-card pop !rounded-[26px] p-4 active:scale-95 transition-transform"
            style={{ animationDelay: `${160 + k * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <span
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  tone === "green"
                    ? "bg-gradient-to-br from-signal to-signal-dim text-ink shadow-[0_8px_16px_rgba(2,214,131,0.4)]"
                    : "bg-ink text-signal shadow-[0_8px_16px_rgba(4,35,26,0.3)]"
                }`}
              >
                <Icon className="w-6 h-6" />
              </span>
              <span className="w-8 h-8 rounded-full border border-rule flex items-center justify-center text-muted">
                <ArrowIcon className="w-4 h-4 -rotate-45" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg mt-5 leading-tight">{title}</h3>
            <p className="text-xs text-muted mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Support */}
      <section className="rise" style={{ animationDelay: "480ms" }}>
        <h2 className="font-display text-xl font-bold mb-3">Need help?</h2>
        <ul className="deco-card divide-y divide-[rgb(var(--line))] !rounded-[28px]">
          {support.map(({ href, title, sub, Icon, color, external }) => (
            <li key={title}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 p-4 active:bg-signal/10 transition-colors"
              >
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-6 h-6" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-display font-semibold">{title}</span>
                  <span className="block text-xs text-muted truncate">{sub}</span>
                </span>
                <ArrowIcon className="w-5 h-5 text-muted" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Hours / tagline */}
      <div className="rise relative overflow-hidden rounded-[28px] bg-ink text-white p-5" style={{ animationDelay: "560ms" }}>
        <div className="gp-motif absolute inset-0 opacity-20" aria-hidden />
        <div className="relative flex items-start gap-4">
          <span className="w-12 h-12 rounded-2xl bg-signal/15 text-signal flex items-center justify-center shrink-0">
            <ClockIcon className="w-6 h-6" />
          </span>
          <div>
            <p className="font-display font-bold text-lg leading-tight">Stay charged. Keep moving.</p>
            <p className="text-sm text-white/70 mt-1">{contact.hours}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted pb-2">Greenpal · Shared power. Anytime. Anywhere.</p>
    </div>
  );
}
