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
  const heroImage = venue.images[0] ?? "/placeholder.svg";
  const formattedPrice =
    typeof venue.pricePerHour === "number"
      ? new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(venue.pricePerHour)
      : null;

  return (
    <article className="theme-transition group relative flex flex-col overflow-hidden rounded-[2.2rem] border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/70 shadow-[0_45px_120px_-60px_rgba(4,32,18,0.55)] backdrop-blur-xl transition hover:-translate-y-2 hover:border-[color:var(--accent-primary)]/40 hover:shadow-[0_60px_180px_-70px_rgba(6,80,36,0.65)]">
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
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/20 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur">
          <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
          {venue.city}
        </div>
        <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-[color:var(--accent-primary)]/90 to-[color:var(--accent-secondary)]/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-white shadow-lg">
          Smart Booking
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-7 text-[color:var(--text-primary)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/50 bg-[color:var(--surface-elevated)]/30 px-3 py-1 text-xs font-medium text-[color:var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
            SoccerHUB Highlight
          </div>
          <h3 className="text-2xl font-semibold leading-snug">{venue.name}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--text-secondary)]/95">{venue.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport) => (
            <span
              key={`${venue.id}-${sport}`}
              className="theme-transition rounded-full border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/90"
            >
              {sportLabels[sport] ?? sport}
            </span>
          ))}
        </div>

        <dl className="mt-2 grid gap-4 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)]/50 bg-gradient-to-br from-[color:var(--surface-card)]/92 via-[color:var(--surface-elevated)]/85 to-[color:var(--surface-card)]/78 p-5">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--accent-primary)]/70 via-transparent to-[color:var(--accent-secondary)]/70" aria-hidden />
            <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--text-secondary)]/75">
              Preis pro Stunde
            </dt>
            <dd className="mt-2 flex items-baseline gap-2 text-[color:var(--text-primary)]">
              {formattedPrice ? (
                <>
                  <span className="text-3xl font-semibold text-[color:var(--accent-primary)]">
                    {formattedPrice}
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-secondary)]/80">inkl. MwSt.</span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-[color:var(--text-secondary)]/65">
                  Preis auf Anfrage
                </span>
              )}
            </dd>
          </div>

          <div className="rounded-2xl border border-[color:var(--border-subtle)]/45 bg-[color:var(--surface-card)]/75 p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--text-secondary)]/75">Verfügbarkeit</dt>
            <dd className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-[color:var(--text-primary)]/85">Freie Slots</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-primary)]">
                Live aktualisiert
              </span>
            </dd>
          </div>
        </dl>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]/75">Ausstattung</h4>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
            {venue.amenities.slice(0, 4).map((amenity) => (
              <li
                key={amenity}
                className="theme-transition inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/65 px-3 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
                <span className="leading-tight">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            href={`/venues/${venue.id}`}
            className="theme-transition flex-1 rounded-full border border-[color:var(--border-subtle)]/50 bg-[color:var(--surface-card)]/80 px-4 py-2 text-center text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/60 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition flex-1 rounded-full bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-secondary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--background-primary)] shadow-[0_18px_35px_-18px_rgba(6,80,36,0.7)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
