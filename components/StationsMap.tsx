"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { stations } from "@/data/locations";

export default function StationsMap({ selected }: { selected?: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false });
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html: `<div style="width:22px;height:22px;border-radius:50%;background:#02d683;border:3px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.5)"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -11],
    });

    markers.current = stations.map((s) => {
      const dir = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
      return L.marker([s.lat, s.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>${s.name}</strong><br>${s.address}<br><a href="${dir}" target="_blank" rel="noopener noreferrer">Get directions</a>`,
        );
    });

    map.fitBounds(stations.map((s) => [s.lat, s.lng] as [number, number]), { padding: [30, 30] });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (selected == null || !mapRef.current) return;
    const s = stations[selected];
    mapRef.current.flyTo([s.lat, s.lng], 15, { duration: 0.8 });
    markers.current[selected]?.openPopup();
  }, [selected]);

  return <div ref={ref} className="h-full w-full" />;
}
