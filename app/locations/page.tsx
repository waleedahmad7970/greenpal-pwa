import type { Metadata } from "next";
import LocationsView from "@/components/LocationsView";

export const metadata: Metadata = {
  title: "Map",
  description: "Find a Greenpal power bank station near you.",
};

export default function LocationsPage() {
  return <LocationsView />;
}
