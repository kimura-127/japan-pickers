import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "jp-gold": "#D4AF37",
        "jp-silver": "#C0C0C0",
        "jp-black": "#121212",
        "jp-dark": "#1A1A1A",
        "jp-light": "#F5F5F5",
      },
      fontFamily: {
        "playfair": ["Playfair Display", "serif"],
        "noto-serif-jp": ["Noto Serif JP", "serif"],
        "noto-sans-jp": ["Noto Sans JP", "sans-serif"],
      },
      boxShadow: {
        "gold-sm": "0 1px 2px 0 rgba(212, 175, 55, 0.05)",
        "gold": "0 1px 3px 0 rgba(212, 175, 55, 0.1), 0 1px 2px 0 rgba(212, 175, 55, 0.06)",
        "gold-md": "0 4px 6px -1px rgba(212, 175, 55, 0.1), 0 2px 4px -1px rgba(212, 175, 55, 0.06)",
        "gold-lg": "0 10px 15px -3px rgba(212, 175, 55, 0.1), 0 4px 6px -2px rgba(212, 175, 55, 0.05)",
        "gold-xl": "0 20px 25px -5px rgba(212, 175, 55, 0.1), 0 10px 10px -5px rgba(212, 175, 55, 0.04)",
        "gold-2xl": "0 25px 50px -12px rgba(212, 175, 55, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F5E1A4 50%, #D4AF37 100%)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
