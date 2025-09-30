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
    <article className="theme-transition group relative flex flex-col overflow-hidden rounded-[2.4rem] border border-[color:var(--border-subtle)]/35 bg-[color:var(--surface-card)]/80 shadow-[0_40px_140px_-60px_rgba(10,38,22,0.55)] transition hover:-translate-y-2 hover:border-[color:var(--accent-primary)]/50 hover:shadow-[0_60px_200px_-70px_rgba(14,96,54,0.6)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(16,81,49,0.18),transparent_55%),radial-gradient(circle_at_90%_120%,rgba(8,96,52,0.24),transparent_55%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" aria-hidden />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white shadow backdrop-blur">
          <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
          Smart Booking
        </div>
        <div className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white shadow">
          {venue.city}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-7 p-8 text-[color:var(--text-primary)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/50 bg-[color:var(--surface-elevated)]/35 px-3 py-1 text-xs font-medium text-[color:var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
            SoccerHUB Highlight
          </div>
          <h3 className="text-2xl font-semibold leading-snug text-[color:var(--text-primary)]">
            {venue.name}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
            {venue.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport) => (
            <span
              key={`${venue.id}-${sport}`}
              className="theme-transition rounded-full border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]"
            >
              {sportLabels[sport] ?? sport}
            </span>
          ))}
        </div>

        <dl className="mt-2 grid gap-4 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)]/45 bg-gradient-to-br from-[color:var(--surface-elevated)]/90 via-[color:var(--surface-card)]/85 to-[color:var(--surface-elevated)]/80 p-5 shadow-[0_20px_45px_-30px_rgba(10,64,36,0.5)]">
            <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-[color:var(--accent-primary)]/40 to-transparent" aria-hidden />
            <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]/80">
              Preis pro Stunde
            </dt>
            <dd className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[color:var(--text-primary)]">
              {formattedPrice ? (
                <>
                  <span className="text-3xl font-semibold text-[color:var(--accent-primary)]">
                    {formattedPrice}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/80">
                    inkl. MwSt.
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-[color:var(--text-secondary)]/70">
                  Preis auf Anfrage
                </span>
              )}
            </dd>
          </div>

          <div className="rounded-2xl border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/75 p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]/80">
              Verfügbarkeit
            </dt>
            <dd className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-[color:var(--text-primary)]/85">Freie Slots</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-primary)]/30 bg-[color:var(--accent-primary)]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-primary)]">
                Live
              </span>
            </dd>
          </div>
        </dl>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]/80">Ausstattung</h4>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
            {venue.amenities.slice(0, 4).map((amenity) => (
              <li
                key={amenity}
                className="theme-transition inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/70 px-3 py-2"
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
            className="theme-transition flex-1 rounded-full border border-[color:var(--border-subtle)]/45 bg-[color:var(--surface-card)]/85 px-4 py-2 text-center text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/60 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition flex-1 rounded-full bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-secondary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--background-primary)] shadow-[0_18px_40px_-20px_rgba(10,84,48,0.75)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
