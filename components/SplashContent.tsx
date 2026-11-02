import Image from "next/image";

export default function SplashContent() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <span className="splash-ring absolute inset-0 rounded-full border-2 border-signal" aria-hidden />
        <Image
          src="/brand/gp-mark.png"
          alt="Greenpal"
          width={112}
          height={70}
          priority
          className="splash-mark w-24 h-auto"
        />
      </div>
      <Image
        src="/brand/wordmark.svg"
        alt=""
        width={150}
        height={32}
        priority
        className="splash-word mt-5 h-5 w-auto"
      />
      <div className="mt-6 h-1 w-28 rounded-full bg-signal/20 overflow-hidden" aria-hidden>
        <div className="splash-bar h-full w-1/3 rounded-full bg-signal" />
      </div>
    </div>
  );
}
