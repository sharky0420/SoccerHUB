import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/types/venue";

interface VenueCardProps {
  venue: Venue;
}

const sportLabels: Record<string, string> = {
  "Fußball Indoor": "Fußball Indoor",
  Padel: "Padel",
  "Functional Fitness": "Functional Fitness",
  Fitnessstudio: "Fitnessstudio",
  Recovery: "Recovery",
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
    <article className="theme-transition group relative flex flex-col overflow-hidden rounded-3xl border border-[color:var(--surface-glass-border)]/70 bg-gradient-to-br from-[color:var(--background-elevated)]/98 via-[color:var(--surface-card)] to-[color:var(--surface-card-muted)] shadow-[var(--shadow-soft)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[color:var(--accent-primary)]/60 hover:shadow-[0_32px_120px_-48px_rgba(22,82,52,0.55)]">
      <div className="relative h-52 w-full overflow-hidden sm:h-56">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-overlay)] px-3 py-1 text-xs font-semibold text-[color:var(--text-primary)] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
          Smart Booking
        </div>
        <div className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-contrast)]/50 bg-[color:var(--pitch-dark)]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--background-primary)] shadow-[0_12px_32px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          {venue.city}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-7 p-8 text-[color:var(--text-primary)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-primary)]/35 bg-[color:var(--accent-primary)]/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-primary)]" aria-hidden />
            Highlight
          </div>
          <h3 className="text-xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-2xl">
            {venue.name}
          </h3>
          <p className="line-clamp-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
            {venue.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport) => (
            <span
              key={`${venue.id}-${sport}`}
              className="theme-transition rounded-full border border-[color:var(--border-subtle)]/40 bg-[color:var(--surface-card)]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-secondary)]"
            >
              {sportLabels[sport] ?? sport}
            </span>
          ))}
        </div>

        <dl className="mt-2 grid gap-4 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--surface-glass-border)]/80 bg-[color:var(--surface-card-strong)]/98 p-5 shadow-[0_16px_45px_-36px_rgba(18,62,40,0.5)] backdrop-blur">
            <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-[color:var(--accent-primary)]/35 to-transparent" aria-hidden />
            <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]/85">
              Preis pro Stunde
            </dt>
            <dd className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[color:var(--text-primary)]">
              {formattedPrice ? (
                <>
                  <span className="text-2xl font-semibold text-[color:var(--accent-primary)] sm:text-3xl">
                    {formattedPrice}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-secondary)]/80">
                    inkl. MwSt.
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-[color:var(--text-secondary)]/80">
                  Preis auf Anfrage
                </span>
              )}
            </dd>
          </div>

          <div className="rounded-2xl border border-[color:var(--accent-primary)]/25 bg-gradient-to-br from-[color:var(--accent-primary)]/12 via-[color:var(--surface-card-muted)]/96 to-[color:var(--surface-card-strong)]/98 p-5 shadow-[0_16px_45px_-36px_rgba(18,62,40,0.45)] backdrop-blur">
            <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]/85">
              Verfügbarkeit
            </dt>
            <dd className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-[color:var(--text-primary)]/85">Freie Slots</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-primary)]/45 bg-gradient-to-r from-[color:var(--accent-primary)]/20 via-[color:var(--accent-primary)]/12 to-[color:var(--accent-secondary)]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-primary)]">
                Live
              </span>
            </dd>
          </div>
        </dl>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/85">Ausstattung</h4>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
            {venue.amenities.slice(0, 4).map((amenity) => (
              <li
                key={amenity}
                className="theme-transition inline-flex items-center gap-2 rounded-xl border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card-muted)]/95 px-3 py-2 shadow-[0_10px_30px_-28px_rgba(18,62,40,0.45)]"
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
            className="theme-transition flex-1 rounded-full border border-[color:var(--surface-glass-border)]/80 bg-[color:var(--surface-card)]/95 px-4 py-2 text-center text-sm font-semibold text-[color:var(--text-primary)] shadow-[0_14px_32px_-26px_rgba(18,62,40,0.45)] hover:border-[color:var(--accent-primary)]/45 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition flex-1 rounded-full bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-secondary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--background-primary)] shadow-[0_18px_45px_-22px_rgba(15,84,52,0.7)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
