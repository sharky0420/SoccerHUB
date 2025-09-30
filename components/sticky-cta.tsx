"use client";

export function StickyCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="pointer-events-auto inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/95 px-4 py-3 text-[color:var(--text-primary)] shadow-[0_32px_120px_-60px_rgba(4,36,20,0.85)] backdrop-blur">
        <a
          href="#hallen"
          className="theme-transition inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,rgba(0,108,56,1),rgba(31,184,100,0.92))] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-primary-contrast)] shadow-[0_18px_48px_-28px_rgba(0,108,56,0.65)] hover:brightness-[1.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
        >
          Jetzt buchen
        </a>
        <a
          href="mailto:team@sportshub.app"
          className="theme-transition inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card-muted)]/85 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/35 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
        >
          Demo anfragen
        </a>
      </div>
    </div>
  );
}
