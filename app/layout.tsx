import type { Metadata, Viewport } from "next";
import { Rethink_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import Splash from "@/components/Splash";
import RouteSplash from "@/components/RouteSplash";

const rethink = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-rethink",
  display: "swap",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: { default: "Greenpal | Portable Power Bank Rental", template: "%s | Greenpal" },
  description: "Rent a portable power bank at any Greenpal station. Stay charged. Keep moving.",
  applicationName: "Greenpal",
  appleWebApp: { capable: true, title: "Greenpal", statusBarStyle: "black-translucent" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#04231A",
};

// Same theme bootstrap as the website: dark by default, persisted choice.
const themeInit = `(function(){try{var t=localStorage.getItem('greenpal-theme')||'dark';document.documentElement.setAttribute('data-theme',t);if(t==='light'){var m=document.querySelector('meta[name="theme-color"]');m&&m.setAttribute('content','#F6F3EC')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${rethink.variable} ${geistSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="font-body">
        <Splash />
        <RouteSplash />
        {/* Phone-width column: fills the screen on mobile, centred "device" on desktop */}
        <div className="relative mx-auto min-h-screen w-full max-w-[480px] bg-surface md:border-x border-rule">
          <TopBar />
          <main className="pb-32 pt-1">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
