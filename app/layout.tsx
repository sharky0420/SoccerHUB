import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Sportshub | Fußball, Padel & Boutique-Fitness",
    template: "%s | Sportshub",
  },
  description:
    "Sportshub ist dein kuratiertes Digital-Clubhaus für Premium-Fußballhallen, Padel-Courts und Boutique-Fitnessstudios in Rhein-Neckar. Vergleiche Preise, Ausstattung und freie Slots und buche direkt beim Betreiber.",
  keywords: [
    "Sportshub",
    "Fußballhalle",
    "Padel",
    "Fitnessstudio",
    "Indoor Sport",
    "Buchung",
  ],
  metadataBase: new URL("https://sportshub.app"),
  openGraph: {
    title: "Sportshub",
    description:
      "Sportshub bündelt Fußballhallen, Padel-Courts und Boutique-Fitnessstudios – Preise, Ausstattung & Kontakt auf einen Blick.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de" className={clsx(inter.variable)}>
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main className="relative pb-24 pt-24 sm:pb-28">{children}</main>
          <footer
            id="kontakt"
            className="relative mt-24 border-t border-[color:var(--border-subtle)] bg-[color:var(--background-elevated)]/80 py-12 backdrop-blur"
          >
            <div className="container-narrow grid gap-6 text-sm text-[color:var(--text-secondary)] sm:grid-cols-[minmax(0,1fr),auto] sm:items-center">
              <div className="space-y-2">
                <p className="text-base font-semibold text-[color:var(--text-primary)]">Bleib mit Sportshub verbunden</p>
                <p>
                  &copy; {new Date().getFullYear()} Sportshub. Crafted für ambitionierte Teams und Betreiber:innen von Henrik und Sharky.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a className="chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]" href="mailto:team@sportshub.app">
                  team@sportshub.app
                </a>
                <a className="chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]" href="https://www.linkedin.com">
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
