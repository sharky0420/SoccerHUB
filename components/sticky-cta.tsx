"use client";

import { useState } from "react";
import { ChevronDownIcon, FilterIcon, SparkleIcon } from "@/components/icons";

export function StickyCta() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isOpen ? (
    <div className="w-full max-w-[260px] rounded-3xl border border-[color:var(--surface-glass-border)]/65 bg-[var(--gradient-sticky-cta)] p-4 text-[color:var(--text-primary)] shadow-[0_32px_120px_-60px_rgba(12,74,48,0.45)] backdrop-blur-xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-tertiary)]">
            <SparkleIcon className="h-3.5 w-3.5" />
            Quick Actions
          </p>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]/85 break-words hyphens-auto">
            Wähle einen Einstieg: direkt zu den Hallen oder eine persönliche Demo sichern.
          </p>
          <div className="mt-3 grid gap-2">
            <a
              href="#hallen"
              className="theme-transition inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--accent-primary)]/50 bg-[color:var(--accent-primary)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)] hover:bg-[color:var(--accent-primary)]/22"
            >
              Jetzt Hallen ansehen
            </a>
            <a
              href="mailto:team@sportshub.app"
              className="theme-transition inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card)]/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/35 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
            >
              Demo anfragen
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="theme-transition inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-secondary)] shadow-[0_22px_72px_-50px_rgba(12,48,32,0.55)] backdrop-blur hover:border-[color:var(--accent-primary)]/40 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
      >
        <FilterIcon className="h-4 w-4" />
        Quick Menu
        <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
