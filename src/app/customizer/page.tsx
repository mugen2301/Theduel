import type { Metadata } from "next";
import { CustomizerShell } from "@/components/customizer/customizer-shell";

export const metadata: Metadata = {
  title: "Jersey Customizer | The Duel",
  description:
    "Customize jerseys with colors, collars, logos, names, numbers, sleeves, roster sizes, quantity matrix, and ERP-ready export data."
};

export default function CustomizerPage() {
  return <CustomizerShell />;
}
