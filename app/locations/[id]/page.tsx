import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SlotsView from "@/components/SlotsView";
import { slotCount, stations } from "@/data/locations";

export function generateStaticParams() {
  return stations.map((_, i) => ({ id: String(i) }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = stations[Number(params.id)];
  return { title: s ? s.name : "Station" };
}

export default function StationPage({ params }: { params: { id: string } }) {
  const index = Number(params.id);
  const station = stations[index];
  if (!station) notFound();

  return <SlotsView index={index} total={slotCount(station.model)} station={station} />;
}
