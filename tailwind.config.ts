import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        signal: "#02D683",
        "signal-dim": "#02A868",
        ink: "#04231A",
        "ink-soft": "#0B3A2A",
        sand: "#F6F3EC",
        graphite: "#171716",
      },
      fontFamily: {
        display: ["var(--font-rethink)", "sans-serif"],
        body: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
