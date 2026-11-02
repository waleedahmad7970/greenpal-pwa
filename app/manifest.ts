import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Greenpal",
    short_name: "Greenpal",
    description: "Rent a portable power bank at any Greenpal station. Stay charged. Keep moving.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#04231A",
    theme_color: "#04231A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Find a station", url: "/locations" },
      { name: "Contact", url: "/contact" },
    ],
  };
}
