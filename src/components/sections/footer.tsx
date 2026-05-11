import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  "Sublimated jerseys",
  "Polo t-shirts",
  "Tracksuits",
  "Hoodies",
  "Corporate uniforms",
  "Dealer portal"
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-14">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="font-display text-2xl font-black uppercase tracking-[0.18em] text-bone">
              The Duel
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-steel">
              Premium custom sportswear manufacturing for teams, institutions, brands, dealers, and corporate buyers.
            </p>
            <div className="mt-7">
              <Button href="#bulk">Start a bulk order</Button>
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-black text-bone">Products</p>
            <div className="mt-5 grid gap-3 text-sm text-steel">
              {footerLinks.map((link) => (
                <Link key={link} href="/products" className="transition hover:text-bone">
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-black text-bone">Contact</p>
            <div className="mt-5 grid gap-4 text-sm text-steel">
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-ember" />
                hello@theduel.in
              </span>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-ember" />
                India
              </span>
              <div className="flex gap-3 pt-2">
                <Link href="#" aria-label="Instagram" className="rounded-full border border-white/10 p-3 text-bone hover:bg-white/10">
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link href="#" aria-label="LinkedIn" className="rounded-full border border-white/10 p-3 text-bone hover:bg-white/10">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 The Duel. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
