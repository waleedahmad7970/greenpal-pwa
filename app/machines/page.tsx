import type { Metadata } from "next";
import MachinesView from "@/components/MachinesView";

export const metadata: Metadata = { title: "Machines", description: "Installed Greenpal machines and live stock." };

export default function MachinesPage() {
  return (
    <div className="px-5 pt-6">
      <h1 className="font-display text-3xl font-bold">Installed machines</h1>
      <MachinesView />
    </div>
  );
}
