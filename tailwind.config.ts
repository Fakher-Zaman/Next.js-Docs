import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // A very light gray-blue for a soft background
            foreground: "#1A1F36", // A dark blue-gray for contrast and readability
            primary: {
              foreground: "#0052CC", // A strong blue for text on buttons, links
              DEFAULT: "#0052CC", // Consistent primary color
            },
            secondary: {
              foreground: "#FF5630", // A vibrant orange for secondary elements
              DEFAULT: "#FF5630",
            },
            accent: {
              foreground: "#36B37E", // Green for accents
              DEFAULT: "#36B37E",
            },
            muted: "#6B778C", // Muted text or subtle backgrounds
            border: "#E3E7EB", // Soft border color
            cardBackground: "#FFFFFF", // White for cards or panels
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#141926", // A deep navy background for elegance
            foreground: "#ECEDEE", // A light gray for readability on dark
            primary: {
              foreground: "#4C9AFF", // Lighter blue for readability in dark mode
              DEFAULT: "#4C9AFF", // Consistent primary color
            },
            secondary: {
              foreground: "#FFAB00", // Bright yellow-orange for secondary elements
              DEFAULT: "#FFAB00",
            },
            accent: {
              foreground: "#00C853", // Bright green for accents
              DEFAULT: "#00C853",
            },
            muted: "#8993A4", // Muted text or subtle backgrounds
            border: "#31364A", // Border color with contrast against background
            customCard: "#1A2138", // A soft navy-blue card background
            // ... rest of the colors
          },
        },
      },
    }),
  ],
};

export default config;
