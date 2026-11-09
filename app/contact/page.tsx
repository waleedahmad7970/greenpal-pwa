import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/data/locations";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Partner with Greenpal or ask us anything.",
};

const btn = "deco-card flex items-center gap-3 p-4 font-medium active:scale-[0.99] transition-transform";

export default function ContactPage() {
  return (
    <div className="px-5 page-top ">
      <h1 className="font-display text-3xl font-bold">Get in touch</h1>
      <p className="mt-2 text-muted">Partner with us on a station, or just ask a question.</p>

      <div className="mt-6 grid gap-3">
        <a href={contact.phoneHref} className={btn}><PhoneIcon className="w-5 h-5 accent" /> {contact.phone}</a>
        <a href={`mailto:${contact.email}`} className={btn}><MailIcon className="w-5 h-5 accent" /> {contact.email}</a>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={btn}>
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" /> Chat on WhatsApp
        </a>
      </div>
      <p className="mt-3 text-xs text-muted">{contact.hours}</p>

      <h2 className="font-display text-xl font-semibold mt-8 mb-4">Send a message</h2>
      <ContactForm />
    </div>
  );
}
