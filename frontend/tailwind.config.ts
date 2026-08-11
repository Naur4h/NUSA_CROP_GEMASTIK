import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#3E4A2D", light: "#4E5C38", dark: "#2E3821" },
        moss: "#6E7F4E",
        cream: { DEFAULT: "#F7F3E3", light: "#FBF9F0" },
        sand: "#F1EAC0",
        clay: "#E08A6B",
        alert: "#B5342A",
       rank1: "#3E7A32",
        rank2: "#6B9B3F",
        rank3: "#C9A227",
        rank4: "#D97B29",
        rank5: "#B5342A",
        // Warna baru versi mobile-first
        header: "#57663A",
        footer: "#DBD698",
        loadingCard: "#738942",
        kondisiCard: "#738942",
        ringkasanCard: "#A3C06B",
      },
     fontFamily: {
  display: ["var(--font-lexend)", "sans-serif"],
  body: ["var(--font-lexend)", "sans-serif"],
  lexend: ["var(--font-lexend)", "sans-serif"],
},
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem" },
    },
  },
  plugins: [],
};
export default config;