import type { Metadata } from "next";
import LocationsView from "@/components/LocationsView";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find a Greenpal charging station near you.",
};

export default function LocationsPage() {
  return (
    <>
      <div className="px-5 pt-6 pb-4 ">
        <h1 className="font-display text-3xl font-bold">Find a station</h1>
      </div>
      <LocationsView />
    </>
  );
}
