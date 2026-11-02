"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tap } from "@/lib/haptics";
import {
  HomeIcon,
  MachineIcon,
  MenuIcon,
  PinIcon,
  SettingsIcon,
} from "./Icons";

const tabs = [
  { href: "/menu", label: "Menu", Icon: MenuIcon },
  // { href: "/machines", label: "Stations", Icon: MachineIcon },
  { href: "/", label: "Home", Icon: HomeIcon },
  // { href: "/locations", label: "Map", Icon: PinIcon },
  { href: "/settings", label: "Settings", Icon: SettingsIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[1000] px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pointer-events-none"
    >
      <ul className="relative grid grid-cols-5 items-center px-1 h-[68px] rounded-[28px] bg-card border border-rule shadow-[0_10px_30px_rgba(0,0,0,0.28)] pointer-events-auto">
        {tabs.map(({ href, label, Icon }) => {
          const active = isActive(href);
          const center = href === "/";

          if (center) {
            return (
              <li key={href} className="flex justify-center">
                <Link
                  href={href}
                  aria-label="Home"
                  aria-current={active ? "page" : undefined}
                  onClick={() => tap()}
                  className={`-translate-y-6 flex items-center justify-center w-[68px] h-[68px] rounded-full bg-signal text-ink border-[5px] border-[rgb(var(--bg))] shadow-[0_6px_16px_rgba(2,214,131,0.45)] active:scale-90 transition-transform duration-200 ${
                    active ? "scale-110" : ""
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </Link>
              </li>
            );
          }

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => tap()}
                className={`flex flex-col items-center justify-center gap-1 h-full text-[10px] font-semibold leading-none transition-colors duration-200 active:scale-90 ${
                  active ? "text-[rgb(var(--fg))]" : "text-muted"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-11 h-7 rounded-full transition-colors duration-200 ${
                    active ? "bg-signal/25" : ""
                  }`}
                >
                  <Icon className="w-[22px] h-[22px]" />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
