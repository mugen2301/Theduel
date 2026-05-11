import type { Metadata } from "next";
import { TShirtCustomizer } from "@/components/customizer/tshirt-customizer";

export const metadata: Metadata = {
  title: "Design Your T-Shirt | The Duel",
  description:
    "Customize T-shirts and jerseys with product type, sleeves, cuffs, colors, logos, player names, numbers, size quantities, and live preview."
};

export default function CustomizerPage() {
  return <TShirtCustomizer />;
}
