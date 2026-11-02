import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="px-5 pt-5">
      <Link href="/locations" className="text-sm accent font-medium">← All stations</Link>
      <h1 className="font-display text-3xl font-bold mt-2">{station.name}</h1>
      <p className="text-muted text-sm mt-1">{station.address}</p>
      <SlotsView index={index} total={slotCount(station.model)} model={station.model} />
    </div>
  );
}
