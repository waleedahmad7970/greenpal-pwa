import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/data/locations";
import { BoltIcon, HomeIcon, MachineIcon, MailIcon, PhoneIcon, PinIcon, SettingsIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Menu" };

const tile = "flex flex-col gap-3 rounded-2xl border border-rule bg-card p-4 font-display font-semibold active:scale-95 transition-transform";

export default function MenuPage() {
  const items = [
    { href: "/", label: "Home", Icon: HomeIcon },
    { href: "/machines", label: "Installed machines", Icon: MachineIcon },
    { href: "/locations", label: "Station map", Icon: PinIcon },
    { href: "/contact", label: "Contact us", Icon: MailIcon },
    { href: "/settings", label: "Settings", Icon: SettingsIcon },
  ];

  return (
    <div className="px-5 pt-6">
      <h1 className="font-display text-3xl font-bold">Menu</h1>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {items.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className={tile}>
            <Icon className="w-6 h-6 accent" /> {label}
          </Link>
        ))}
        <a href={contact.phoneHref} className={tile}><PhoneIcon className="w-6 h-6 accent" /> Call support</a>
      </div>

      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-3 rounded-2xl bg-[#25D366] text-white font-bold p-4 active:scale-[0.98] transition-transform"
      >
        <WhatsAppIcon className="w-6 h-6" /> Chat on WhatsApp
      </a>

      <div className="mt-6 rounded-2xl bg-ink text-white p-5 flex items-start gap-3">
        <BoltIcon className="w-6 h-6 text-signal shrink-0" />
        <div>
          <p className="font-display font-semibold">Stay charged. Keep moving.</p>
          <p className="text-sm text-[#a8b8b0] mt-1">{contact.hours}</p>
        </div>
      </div>
    </div>
  );
}
