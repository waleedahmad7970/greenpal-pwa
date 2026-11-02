export type Station = {
  name: string;
  city: string;
  address: string;
  model: string;
  lat: number;
  lng: number;
};

export const stations: Station[] = [
  { name: "Pawn Shop Live", city: "Edmonton", address: "6240 99 St NW, Edmonton, AB T6E 6C7", model: "Pulse 12", lat: 53.49866, lng: -113.48727 },
  { name: "Evolution Wonderlounge", city: "Edmonton", address: "11508 Jasper Ave NW, Edmonton, AB T5K 0M8", model: "Pulse", lat: 53.54125, lng: -113.51975 },
  { name: "B Street Bar", city: "Edmonton", address: "11818 111 Ave NW, Edmonton, AB T5G 0E5", model: "Pulse 8", lat: 53.5594, lng: -113.52554 },
  { name: "VRtual Arena", city: "Edmonton", address: "11715 170 St NW, Edmonton, AB T5V 1H3", model: "Pulse 12", lat: 53.56849, lng: -113.61409 },
  { name: "Chop Shop Physiques", city: "Sherwood Park", address: "Unit 540, 800 Broadmoor Blvd, Sherwood Park, AB T8H 4Y6", model: "Pulse 8", lat: 53.53844, lng: -113.32262 },
  { name: "Chop Shop Physiques", city: "Spruce Grove", address: "#315, 280 Pioneer Rd, Spruce Grove, AB T7X 0A7", model: "Pulse 8", lat: 53.55529, lng: -113.85977 },
  { name: "Chop Shop Physiques", city: "Stony Plain", address: "#117, 4401 48 St, Stony Plain, AB T7Z 1N3", model: "Pulse 8", lat: 53.53483, lng: -114.00095 },
  { name: "Chop Shop Physiques", city: "Fort Saskatchewan", address: "#601, 10471 99 Ave, Fort Saskatchewan, AB T8L 0V6", model: "Pulse 8", lat: 53.71183, lng: -113.20495 },
  { name: "Cure MD", city: "St. Albert", address: "Unit 680, 1115 St. Albert Trail, St. Albert, AB T8N 7X6", model: "Pulse 8", lat: 53.67362, lng: -113.63752 },
  { name: "ExcelHealth", city: "Calgary", address: "100 - 3916 Macleod Trail SE, Calgary, AB T2G 2C5", model: "Pulse", lat: 51.018671, lng: -114.062055 },
];

/** Number of power bank slots per station model. */
export const slotCount = (model: string) => (model.includes("12") ? 12 : 8);

export const steps = [
  { title: "Scan", description: "Scan the QR code on any Greenpal Pulse station.", image: "/steps/scan.jpeg" },
  { title: "Rent", description: "Pick up a portable power bank. Pay by the hour.", image: "/steps/rent.jpeg" },
  { title: "Charge", description: "Charge your phone anywhere. Keep moving.", image: "/steps/charge.jpeg" },
  { title: "Return", description: "Drop it at any Greenpal station when you're done.", image: "/steps/return.jpeg" },
];

export const faqs = [
  { q: "What does it cost?", a: "Pay by the hour. You only pay for the time you rent a portable power bank." },
  { q: "What station sizes are there?", a: "Four: the Pulse 8 and Pulse 12 countertop stations, and the Pulse 24 and Pulse 48 floor totems." },
  { q: "How do venues earn?", a: "Venues share revenue on every rental, plus their own branding and promos on the station screen." },
  { q: "Can the screen show our brand?", a: "Yes. Every station screen carries the venue's own branding and promos alongside the Greenpal rental experience." },
];

export const contact = {
  phone: "+1 (780) 777-0519",
  phoneHref: "tel:+17807770519",
  email: "info@thegreenpal.ca",
  whatsapp: "https://wa.me/17807770519?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20a%20Greenpal%20station.",
  hours: "Mon–Fri, 9:00 AM – 6:00 PM MT (Edmonton)",
};
