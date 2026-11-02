import SplashContent from "./SplashContent";

// Rendered in the server HTML so it covers the screen from the first paint on every
// full load/reload, then fades itself out with pure CSS (no JS needed).
export default function Splash() {
  return (
    <div className="splash-screen splash-initial" aria-hidden>
      <SplashContent />
    </div>
  );
}
