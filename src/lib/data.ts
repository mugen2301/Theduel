import {
  BadgeCheck,
  Box,
  Factory,
  Layers3,
  Palette,
  Scissors,
  ShieldCheck,
  Shirt,
  Sparkles,
  Truck,
  Users,
  Zap
} from "lucide-react";

export const navItems = [
  { label: "Products", href: "#products" },
  { label: "Customize", href: "#customize" },
  { label: "Factory", href: "#factory" },
  { label: "Dealers", href: "#dealers" }
];

export const productCategories = [
  {
    name: "Sublimated Jerseys",
    line: "Match-ready kits with names, numbers, logos, and sponsor panels.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Polo T-Shirts",
    line: "Clean corporate, academy, and travel polos with premium finishing.",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Tracksuits",
    line: "Coordinated warm-up sets for teams, clubs, and institutions.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Hoodies",
    line: "Heavyweight branded drops for teams, events, and communities.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Corporate Uniforms",
    line: "Consistent, scalable apparel programs with repeat-order control.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85"
  }
];

export const customizationSteps = [
  {
    icon: Shirt,
    title: "Pick the base",
    text: "Choose your sport, fit, fabric, collar, and production template."
  },
  {
    icon: Palette,
    title: "Design the kit",
    text: "Add colors, logos, sponsors, player names, numbers, and roster sizes."
  },
  {
    icon: BadgeCheck,
    title: "Approve artwork",
    text: "Our artwork team checks print scale, colors, placements, and files."
  },
  {
    icon: Truck,
    title: "Track delivery",
    text: "Follow order, production, quality check, packing, and dispatch status."
  }
];

export const workflow = [
  { icon: Sparkles, title: "Artwork Review", detail: "File cleanup, logo checks, color matching" },
  { icon: Layers3, title: "Pattern Setup", detail: "Panel mapping, size grading, print nesting" },
  { icon: Zap, title: "Sublimation", detail: "High-color transfer on performance fabrics" },
  { icon: Scissors, title: "Cut & Stitch", detail: "Panel cutting, sewing, trims, finishing" },
  { icon: ShieldCheck, title: "Quality Check", detail: "Size, shade, stitch, print and pack audit" },
  { icon: Box, title: "Dispatch", detail: "Team-wise packing and courier handoff" }
];

export const metrics = [
  { value: "25k+", label: "garments capacity per month" },
  { value: "7-21", label: "day production windows by order type" },
  { value: "500+", label: "teams, academies and companies served" },
  { value: "100%", label: "artwork approval before production" }
];

export const testimonials = [
  {
    quote:
      "The Duel gave our academy a full kit system that looked premium and arrived sorted by squad. Reordering is now painless.",
    author: "Rohit Malhotra",
    role: "Academy Director"
  },
  {
    quote:
      "Their artwork checks saved us from print mistakes. The factory updates made a bulk order feel surprisingly controlled.",
    author: "Priya Nair",
    role: "Corporate Admin Lead"
  },
  {
    quote:
      "As a dealer, I need speed, margin visibility, and dependable quality. This is the model the market has been waiting for.",
    author: "Aman Gill",
    role: "Sportswear Dealer"
  }
];

export const dealerBenefits = [
  { icon: Users, title: "Dealer dashboard", text: "Manage customers, quotes, orders, and commissions from one place." },
  { icon: Factory, title: "Factory-backed supply", text: "Scale teamwear demand without carrying production complexity." },
  { icon: ShieldCheck, title: "Protected margins", text: "Structured pricing, repeat-order records, and clear dealer workflows." }
];
