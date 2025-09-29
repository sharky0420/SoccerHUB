import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0E7C7B",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F2C14E",
          foreground: "#1f2937",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -30px rgba(15, 23, 42, 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
