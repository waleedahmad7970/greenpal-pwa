"use client";

import { useEffect, useState } from "react";
import { HAPTICS_KEY, tap } from "@/lib/haptics";

type InstallEvent = Event & { prompt: () => Promise<void> };

function Row({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div>
        <p className="font-medium">{title}</p>
        {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${on ? "bg-signal" : "bg-surface-dim border border-rule"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function SettingsView() {
  const [dark, setDark] = useState(false);
  const [haptics, setHaptics] = useState(true);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    try {
      setHaptics(localStorage.getItem(HAPTICS_KEY) !== "off");
    } catch {}
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const setTheme = (isDark: boolean) => {
    const t = isDark ? "dark" : "light";
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", t);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#04231A" : "#F6F3EC");
    try {
      localStorage.setItem("greenpal-theme", t);
    } catch {}
  };

  const setHap = (on: boolean) => {
    setHaptics(on);
    try {
      localStorage.setItem(HAPTICS_KEY, on ? "on" : "off");
    } catch {}
    if (on) navigator.vibrate?.(15);
  };

  const clearCache = async () => {
    tap();
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      const regs = await navigator.serviceWorker?.getRegistrations();
      await Promise.all((regs ?? []).map((r) => r.unregister()));
    } catch {}
    setCleared(true);
  };

  return (
    <>
      <div className="mt-5 deco-card divide-y divide-[rgb(var(--line))]">
        <Row title="Dark theme" hint="Matches the Greenpal website">
          <Switch on={dark} onChange={setTheme} label="Dark theme" />
        </Row>
        <Row title="Haptic feedback" hint="Short vibration when you tap (Android)">
          <Switch on={haptics} onChange={setHap} label="Haptic feedback" />
        </Row>
      </div>

      <div className="mt-4 deco-card divide-y divide-[rgb(var(--line))]">
        <Row title="Install app" hint={installEvent ? "Add Greenpal to your home screen" : "Use your browser menu → Add to Home screen"}>
          <button
            disabled={!installEvent}
            onClick={async () => {
              tap();
              await installEvent?.prompt();
              setInstallEvent(null);
            }}
            className="rounded-full bg-signal text-ink text-sm font-bold px-4 py-2 disabled:opacity-40 active:scale-95 transition-transform"
          >
            Install
          </button>
        </Row>
        <Row title="Clear offline cache" hint={cleared ? "Cleared. Reload the page." : "Fixes an outdated version showing"}>
          <button onClick={clearCache} className="rounded-full border border-rule text-sm font-medium px-4 py-2 active:scale-95 transition-transform">
            Clear
          </button>
        </Row>
      </div>

      <p className="mt-6 text-center text-xs text-muted">Greenpal PWA · v0.1.0</p>
    </>
  );
}
