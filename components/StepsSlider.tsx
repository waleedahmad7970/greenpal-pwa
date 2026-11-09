"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BatteryIcon, BoltIcon, RepeatIcon, ScanIcon } from "./Icons";

const stepIcons = [ScanIcon, BoltIcon, BatteryIcon, RepeatIcon];

type Step = { title: string; description: string; image: string };

export default function StepsSlider({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setActive(Math.min(steps.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 14))));
  };

  const go = (i: number) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 14), behavior: "smooth" });
  };

  return (
    <>
      <ul
        ref={ref}
        onScroll={onScroll}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 scroll-px-5 pb-4"
      >
        {steps.map((s, i) => {
          const Icon = stepIcons[i] ?? BoltIcon;
          return (
            <li
              key={s.title}
              className="snap-start shrink-0 w-[82%] overflow-hidden rounded-[28px] border border-rule bg-card shadow-[0_12px_30px_rgba(4,35,26,0.1)]"
            >
              <div className="relative">
                <Image src={s.image} alt={s.title} width={450} height={300} className="w-full h-44 object-cover" />
                <span className="absolute top-3 left-3 rounded-full bg-ink/85 text-signal text-[11px] font-bold tracking-widest px-3 py-1.5">
                  STEP 0{i + 1}
                </span>
              </div>
              <div className="relative p-5 pt-6">
                <span className="absolute -top-7 right-5 w-14 h-14 rounded-2xl bg-signal text-ink flex items-center justify-center shadow-[0_10px_20px_rgba(2,214,131,0.45)]">
                  <Icon className="w-7 h-7" />
                </span>
                <span className="absolute right-3 bottom-[-1.2rem] font-display text-[7rem] leading-none font-bold text-signal/10" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="relative font-display text-[1.75rem] leading-none font-bold">{s.title}</h3>
                <p className="relative text-sm text-muted mt-2 max-w-[85%]">{s.description}</p>
                <div className="relative mt-5 flex gap-1.5" aria-hidden>
                  {steps.map((_, k) => (
                    <i key={k} className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-signal" : "bg-[rgb(var(--line))]"}`} />
                  ))}
                </div>
              </div>
            </li>
          );
        })}
        <li className="shrink-0 w-2" aria-hidden />
      </ul>

      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Steps">
        {steps.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={active === i}
            aria-label={`Go to step ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-7 bg-signal" : "w-2 bg-[rgb(var(--line))]"}`}
          />
        ))}
      </div>
    </>
  );
}
