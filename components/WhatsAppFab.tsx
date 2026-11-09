import { contact } from "@/data/locations";
import { WhatsAppIcon } from "./Icons";

// Floating chat button, kept inside the phone-width column and above the bottom bar.
export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-[calc(7.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[900] pointer-events-none px-4 flex justify-end">
      <div className="relative flex items-center gap-2 pointer-events-auto">
        <span className="wa-tip rounded-2xl rounded-br-sm bg-white text-ink text-xs font-bold px-3 py-2 shadow-lg opacity-0">
          Chat with us 👋
        </span>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative block active:scale-90 transition-transform"
        >
          <span className="ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden />
          <span className="wa-wobble relative flex w-14 h-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.55)]">
            <WhatsAppIcon className="w-7 h-7" />
          </span>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[rgb(var(--bg))]" aria-hidden />
        </a>
      </div>
    </div>
  );
}
