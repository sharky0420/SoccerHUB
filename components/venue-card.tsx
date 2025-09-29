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
    <article className="glass-panel theme-transition group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--border-subtle)]/80 shadow-glass transition hover:-translate-y-2 hover:shadow-[0_55px_160px_-70px_rgba(0,0,0,0.5)]">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/60 bg-black/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent-primary)]" aria-hidden />
          {venue.city}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 text-[color:var(--text-primary)]">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{venue.name}</h3>
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
        <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-secondary)]">
          {venue.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/60 px-4 py-3 text-sm font-medium text-[color:var(--text-secondary)]">
          <span>ab</span>
          <span className="text-2xl font-semibold text-[color:var(--accent-primary)]">{venue.pricePerHour.toFixed(0)} €</span>
          <span>/ Std.</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/venues/${venue.id}`}
            className="theme-transition flex-1 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-4 py-2 text-center text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/50"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition flex-1 rounded-full bg-[color:var(--accent-primary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
