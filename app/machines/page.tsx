import type { Metadata } from "next";
import MachinesView from "@/components/MachinesView";

export const metadata: Metadata = { title: "Stations", description: "Greenpal power bank stations and live availability." };

export default function MachinesPage() {
  return (
    <div className="px-5 page-top">
      <h1 className="font-display text-3xl font-bold">Power bank stations</h1>
      <MachinesView />
    </div>
  );
}
