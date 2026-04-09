import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A6FD8",
          navy: "#0D1B35",
          paper: "#FAF8F3",
          cream: "#F0ECE3",
          ink: "#1C1C1E",
          muted: "#9A9A9A",
          weekend: "#E53935",
          holiday: "#F5A623",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        handwritten: ["var(--font-handwritten)", "cursive"],
      },
      boxShadow: {
        calendar: "0 24px 48px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.10)",
        "calendar-hover": "0 32px 64px rgba(0,0,0,0.22), 0 12px 24px rgba(0,0,0,0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
