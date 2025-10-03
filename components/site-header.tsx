"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [isMounted, setIsMounted] = useState(false);

  const toggleLabel = useMemo(
    () => (isDarkTheme ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"),
    [isDarkTheme],
  );

  const toggleText = useMemo(() => (isDarkTheme ? "Dunkel" : "Hell"), [isDarkTheme]);
  const displayedToggleText = isMounted ? toggleText : "Modus";
  const displayedIcon = isMounted ? (isDarkTheme ? "🌙" : "🌞") : "🌗";

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            "shadow-[0_35px_90px_-50px_rgba(6,50,24,0.65)] backdrop-blur-xl": isScrolled,
            "shadow-none": !isScrolled,
          },
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-3 text-base font-semibold tracking-tight text-[color:var(--text-primary)]"
          >
            <span className="theme-transition relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/80 text-lg text-[color:var(--accent-primary)] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.45)] group-hover:border-[color:var(--accent-secondary)]/60">
              <span className="absolute inset-[3px] rounded-[1.3rem] bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.12),_transparent_65%)]" aria-hidden />
              <span className="relative font-black">SH</span>
            </span>
            <span className="flex flex-col leading-tight">
              <span>Sports Hub</span>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
                Indoor Sports · Padel · Fitness
              </span>
            </span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 font-medium text-[color:var(--text-secondary)] lg:flex">
          <Link href="/#hallen" className="theme-transition hover:text-[color:var(--text-primary)]">
            Hallen
          </Link>
          <Link href="/#matchcenter" className="theme-transition hover:text-[color:var(--text-primary)]">
            Match Center
          </Link>
          <Link href="/#kontakt" className="theme-transition hover:text-[color:var(--text-primary)]">
            Kontakt
          </Link>
          <a
            href="mailto:team@sportshub.app"
            className="theme-transition inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)] px-5 py-2 text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
          >
            Demo anfragen
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDarkTheme}
            aria-label={toggleLabel}
            className="theme-transition inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background-primary)]"
          >
            <span aria-hidden className="text-base leading-none">
              {displayedIcon}
            </span>
            <span>{displayedToggleText}</span>
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/70 px-4 py-2 text-[color:var(--text-secondary)] sm:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.28em]">Live</span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--accent-primary)]">
              🏟️ 120 Hallen gelistet
            </span>
          </div>
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
              href="/#matchcenter"
              onClick={() => setIsMobileNavOpen(false)}
              className="block theme-transition hover:text-[color:var(--text-primary)]"
            >
              Match Center
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
              href="mailto:team@sportshub.app"
              onClick={() => setIsMobileNavOpen(false)}
              className="theme-transition inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-4 py-2 font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
            >
              Demo anfragen
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                toggleTheme();
              }}
              aria-pressed={isDarkTheme}
              aria-label={toggleLabel}
              className="theme-transition inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--border-subtle)] px-4 py-2 font-semibold text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background-primary)]"
            >
              <span aria-hidden className="text-base leading-none">
                {displayedIcon}
              </span>
              <span>{isMounted ? `${toggleText}-Modus` : "Modus"}</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
