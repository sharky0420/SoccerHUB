import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent-primary)",
          soft: "var(--accent-secondary)",
        },
        surface: {
          DEFAULT: "var(--surface-card)",
          elevated: "var(--background-elevated)",
        },
        border: {
          subtle: "var(--border-subtle)",
        },
        text: {
          DEFAULT: "var(--text-primary)",
          muted: "var(--text-secondary)",
        },
      },
      boxShadow: {
        glow: "var(--glow-accent)",
        glass: "var(--shadow-soft)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
