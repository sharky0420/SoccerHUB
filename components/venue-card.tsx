import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/types/venue";

interface VenueCardProps {
  venue: Venue;
}

const sportLabels: Record<string, string> = {
  Soccer: "Soccer",
  Padel: "Padel",
  Futsal: "Futsal",
};

export function VenueCard({ venue }: VenueCardProps) {
  const heroImage = venue.images[0];

  return (
    <article className="glass-panel theme-transition group relative flex flex-col overflow-hidden rounded-[1.9rem] border border-[color:var(--border-subtle)]/80 shadow-[0_50px_140px_-80px_rgba(6,44,24,0.65)] transition hover:-translate-y-2 hover:shadow-[0_65px_200px_-80px_rgba(6,80,36,0.7)]">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" aria-hidden />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
          {venue.city}
        </div>
        <div className="absolute bottom-4 left-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
          Smart Booking
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 text-[color:var(--text-primary)]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">
            SoccerHUB Highlight
          </div>
          <h3 className="text-xl font-semibold leading-snug">{venue.name}</h3>
          <p className="line-clamp-3 text-sm text-[color:var(--text-secondary)]">{venue.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport) => (
            <span
              key={`${venue.id}-${sport}`}
              className="chip theme-transition px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              {sportLabels[sport] ?? sport}
            </span>
          ))}
        </div>
        <div className="grid gap-2 text-xs text-[color:var(--text-secondary)] sm:grid-cols-2">
          {venue.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/60 px-3 py-2 uppercase tracking-[0.24em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-auto grid gap-3">
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/75 px-4 py-3 text-sm font-medium text-[color:var(--text-secondary)] shadow-inner">
            <span className="uppercase tracking-[0.3em]">Preis</span>
            <div className="h-px w-full bg-[color:var(--border-subtle)]/40" aria-hidden />
            <div className="flex items-baseline gap-2 text-right">
              <span className="text-2xl font-semibold text-[color:var(--accent-primary)]">{venue.pricePerHour.toFixed(0)} €</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">pro Std.</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/75 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
            <span>Freie Slots</span>
            <span className="text-[color:var(--accent-primary)]">Live aktualisiert</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/venues/${venue.id}`}
            className="theme-transition flex-1 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/75 px-4 py-2 text-center text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition flex-1 rounded-full bg-[color:var(--accent-primary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
