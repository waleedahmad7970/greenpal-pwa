"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { stations } from "@/data/locations";

export type MapCmd = { type: "locate" | "zoomIn" | "zoomOut"; n: number };

type Props = {
  visible: number[];
  selected: number | null;
  onSelect: (i: number) => void;
  cmd: MapCmd | null;
  onLocateError?: () => void;
  onLocated?: (p: { lat: number; lng: number }) => void;
};

const pinIcon = (selected: boolean) =>
  L.divIcon({
    className: "",
    html: `<div class="gp-pin ${selected ? "sel" : ""}"><i></i></div>`,
    iconSize: selected ? [44, 44] : [34, 34],
    iconAnchor: selected ? [22, 53] : [17, 41],
  });

export default function StationsMap({ visible, selected, onSelect, cmd, onLocateError, onLocated }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const group = useRef<L.LayerGroup | null>(null);
  const markers = useRef<Map<number, L.Marker>>(new Map());
  const you = useRef<L.Marker | null>(null);
  const selectedRef = useRef<number | null>(selected);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onLocatedRef = useRef(onLocated);
  onLocatedRef.current = onLocated;
  selectedRef.current = selected;

  const placeYou = (lat: number, lng: number, fly: boolean) => {
    const m = map.current;
    if (!m) return;
    you.current?.remove();
    you.current = L.marker([lat, lng], {
      icon: L.divIcon({ className: "", html: '<div class="you-dot"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }),
      interactive: false,
      keyboard: false,
    }).addTo(m);
    onLocatedRef.current?.({ lat, lng });
    if (fly) m.flyTo([lat, lng], 13, { duration: 0.9 });
  };

  // create the map once
  useEffect(() => {
    if (!el.current) return;
    const m = L.map(el.current, { zoomControl: false, scrollWheelZoom: false });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(m);
    group.current = L.layerGroup().addTo(m);
    map.current = m;
    m.setView([53.55, -113.5], 8);
    // show the user's position as a blue dot (without moving the view)
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => placeYou(coords.latitude, coords.longitude, false),
      () => {},
      { timeout: 8000, maximumAge: 60000 },
    );
    return () => {
      m.remove();
      map.current = null;
      markers.current.clear();
    };
  }, []);

  // (re)build markers when the filtered list changes
  useEffect(() => {
    const m = map.current;
    const g = group.current;
    if (!m || !g) return;
    g.clearLayers();
    markers.current.clear();
    visible.forEach((i) => {
      const s = stations[i];
      const mk = L.marker([s.lat, s.lng], { icon: pinIcon(selectedRef.current === i), riseOnHover: true }).addTo(g);
      mk.on("click", () => onSelectRef.current(i));
      markers.current.set(i, mk);
    });
    if (visible.length === 1) {
      const s = stations[visible[0]];
      m.flyTo([s.lat, s.lng], 13, { duration: 0.8 });
    } else if (visible.length > 1) {
      m.flyToBounds(
        visible.map((i) => [stations[i].lat, stations[i].lng] as [number, number]),
        { paddingTopLeft: [30, 120], paddingBottomRight: [30, 50], duration: 0.8, maxZoom: 12 },
      );
    }
  }, [visible]);

  // highlight + focus the selected station
  useEffect(() => {
    markers.current.forEach((mk, i) => {
      mk.setIcon(pinIcon(i === selected));
      mk.setZIndexOffset(i === selected ? 1000 : 0);
    });
    if (selected != null && map.current) {
      const s = stations[selected];
      map.current.flyTo([s.lat, s.lng], Math.max(map.current.getZoom(), 14), { duration: 0.8 });
    }
  }, [selected]);

  // map buttons
  useEffect(() => {
    const m = map.current;
    if (!m || !cmd) return;
    if (cmd.type === "zoomIn") m.zoomIn();
    else if (cmd.type === "zoomOut") m.zoomOut();
    else if (cmd.type === "locate") {
      if (!navigator.geolocation) return onLocateError?.();
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => placeYou(coords.latitude, coords.longitude, true),
        () => onLocateError?.(),
        { enableHighAccuracy: true, timeout: 8000 },
      );
    }
  }, [cmd, onLocateError]);

  return <div ref={el} className="h-full w-full" />;
}
