import type { Metadata } from "next";
import SettingsView from "@/components/SettingsView";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="px-5 page-top">
      <h1 className="font-display text-3xl font-bold">Settings</h1>
      <SettingsView />
    </div>
  );
}
