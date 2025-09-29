"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-8">
      <div
        className={clsx(
          "glass-panel theme-transition flex w-full max-w-6xl items-center justify-between rounded-[1.75rem] border border-[color:var(--border-subtle)]/80 px-5 py-3 text-sm sm:px-8 sm:py-4",
          {
            "shadow-[0_35px_90px_-50px_rgba(0,0,0,0.55)] backdrop-blur-xl": isScrolled,
            "shadow-none": !isScrolled,
          },
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-[color:var(--text-primary)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/15 text-[color:var(--accent-primary)]">
              ⚽
            </span>
            Turftime Venues
          </Link>
        </div>
        <nav className="hidden items-center gap-6 font-medium text-[color:var(--text-secondary)] lg:flex">
          <Link href="/#hallen" className="theme-transition hover:text-[color:var(--text-primary)]">
            Hallen
          </Link>
          <Link href="/#sofunktionierts" className="theme-transition hover:text-[color:var(--text-primary)]">
            So funktioniert&apos;s
          </Link>
          <Link href="/#kontakt" className="theme-transition hover:text-[color:var(--text-primary)]">
            Kontakt
          </Link>
          <a
            href="mailto:info@turftime.app"
            className="theme-transition inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)] px-5 py-2 text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
          >
            Demo anfragen
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-transition relative flex h-11 w-20 items-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--background-elevated)]/80 px-2"
            aria-label="Darstellung umschalten"
          >
            <span
              className={clsx(
                "theme-transition absolute inset-y-1 left-1 w-1/2 rounded-full bg-[color:var(--accent-primary)] shadow-glow",
                {
                  "translate-x-[calc(100%-0.5rem)]": theme === "light",
                  "translate-x-0": theme === "dark",
                },
              )}
              style={{ transformOrigin: "center" }}
            />
            <span className="z-10 flex-1 text-center text-xs font-semibold text-[color:var(--text-secondary)]">Dark</span>
            <span className="z-10 flex-1 text-center text-xs font-semibold text-[color:var(--text-secondary)]">Light</span>
          </button>
          <button
            type="button"
            className="lg:hidden theme-transition inline-flex items-center rounded-full border border-[color:var(--border-subtle)] px-4 py-2 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            onClick={() => setIsMobileNavOpen((previous) => !previous)}
            aria-controls="main-nav"
            aria-expanded={isMobileNavOpen}
          >
            Menü
          </button>
        </div>
      </div>
      <nav
        id="main-nav"
        className={clsx(
          "glass-panel theme-transition absolute top-full mt-3 w-full max-w-xs rounded-2xl border border-[color:var(--border-subtle)] px-5 py-4 text-sm text-[color:var(--text-secondary)] shadow-glass lg:hidden",
          {
            hidden: !isMobileNavOpen,
          },
        )}
      >
        <ul className="space-y-3">
          <li>
            <Link
              href="/#hallen"
              onClick={() => setIsMobileNavOpen(false)}
              className="block theme-transition hover:text-[color:var(--text-primary)]"
            >
              Hallen
            </Link>
          </li>
          <li>
            <Link
              href="/#sofunktionierts"
              onClick={() => setIsMobileNavOpen(false)}
              className="block theme-transition hover:text-[color:var(--text-primary)]"
            >
              So funktioniert&apos;s
            </Link>
          </li>
          <li>
            <Link
              href="/#kontakt"
              onClick={() => setIsMobileNavOpen(false)}
              className="block theme-transition hover:text-[color:var(--text-primary)]"
            >
              Kontakt
            </Link>
          </li>
          <li>
            <a
              href="mailto:info@turftime.app"
              onClick={() => setIsMobileNavOpen(false)}
              className="theme-transition inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-4 py-2 font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
            >
              Demo anfragen
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
