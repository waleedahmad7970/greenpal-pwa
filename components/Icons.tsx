type P = { className?: string };
const base = { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const HomeIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
);
export const PinIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const MailIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const PhoneIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
);
export const SunIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" /></svg>
);
export const MoonIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>
);
export const ChevronIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="m6 9 6 6 6-6" /></svg>
);
export const WhatsAppIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm4.52 11.89c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
);
export const NavIcon = ({ className = "w-4 h-4" }: P) => (
  <svg className={className} {...base}><path d="m3 11 18-8-8 18-2-8z" /></svg>
);
export const MenuIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const SettingsIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
);
export const MachineIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>
);
export const SearchIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const BoltIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
);
export const ClockIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const RepeatIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="M17 2l4 4-4 4" /><path d="M3 11V9a3 3 0 0 1 3-3h15" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a3 3 0 0 1-3 3H3" /></svg>
);
export const CardIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19M6 15h4" /></svg>
);
export const ArrowIcon = ({ className = "w-4 h-4" }: P) => (
  <svg className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ScanIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" /><path d="M8 12h8" /></svg>
);
export const BatteryIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}><rect x="3" y="7" width="16" height="10" rx="2.5" /><path d="M21 11v2M11 9.5l-2 2.5h4l-2 2.5" /></svg>
);
