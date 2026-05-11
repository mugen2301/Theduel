import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07090d",
        coal: "#10141b",
        graphite: "#171d26",
        bone: "#f5f1e8",
        ember: "#ff4f1f",
        volt: "#c8ff45",
        steel: "#8f9aaa"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-space)", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 70px rgba(255, 79, 31, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
