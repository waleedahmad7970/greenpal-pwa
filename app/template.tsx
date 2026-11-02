// Re-mounts on every navigation, so each page slides/fades in like a native screen.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
