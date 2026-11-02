"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SplashContent from "./SplashContent";

// Shows the logo briefly whenever the user moves to another page.
export default function RouteSplash() {
  const pathname = usePathname();
  const first = useRef(true);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLeaving(false);
    setVisible(true);
    const fade = setTimeout(() => setLeaving(true), 500);
    const hide = setTimeout(() => setVisible(false), 800);
    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="splash-screen transition-opacity duration-300 pointer-events-none"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      <SplashContent />
    </div>
  );
}
