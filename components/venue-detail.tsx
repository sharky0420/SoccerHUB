import Image from "next/image";
import Link from "next/link";
import type { Venue, Weekday } from "@/types/venue";

const weekdayLabels: Record<Weekday, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

interface VenueDetailProps {
  venue: Venue;
}

export function VenueDetail({ venue }: VenueDetailProps) {
  return (
    <article className="container-narrow space-y-12 text-[color:var(--text-primary)]">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        <div className="relative h-[320px] overflow-hidden rounded-[2.5rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/50 shadow-glass">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
            className="h-full w-full object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />
          <div className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur" aria-hidden>
            Arena Highlight
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3 rounded-2xl bg-black/35 px-5 py-3 text-sm text-white backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
            <span className="font-semibold">{venue.city}</span>
            <span className="text-white/60" aria-hidden>
              •
            </span>
            <span className="text-white/80">{venue.address}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {venue.images.slice(1).map((image, index) => (
            <div
              key={image}
              className="relative h-32 overflow-hidden rounded-2xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card)]/60 shadow-inner"
            >
              <Image
                src={image}
                alt={`${venue.name} Impression ${index + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 240px"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <header className="glass-panel theme-transition flex flex-col gap-6 rounded-[2.75rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/90 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-primary)]">
            Venue Profil
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-[color:var(--text-primary)]">{venue.name}</h1>
          <p className="flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
            <span aria-hidden>📍</span>
            {venue.address}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 text-sm text-[color:var(--text-secondary)] sm:items-end">
          <div className="w-full rounded-2xl border border-[color:var(--border-subtle)]/70 bg-[color:var(--background-primary)]/80 px-5 py-3 text-right shadow-inner sm:w-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]/80">
              Preis pro Stunde
            </span>
            <p className="mt-2 text-3xl font-semibold text-[color:var(--accent-primary)]">
              {venue.pricePerHour.toFixed(0)} €
              <span className="ml-2 text-xs font-medium uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">
                pro Std.
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {venue.sports.map((sport) => (
              <span
                key={sport}
                className="chip theme-transition px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
              >
                {sport}
              </span>
            ))}
          </div>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)] px-6 py-2 text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Direkt beim Betreiber buchen
          </a>
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        <div className="space-y-8 rounded-[2.75rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/85 p-8 shadow-glass">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">Über die Halle</h2>
            <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">{venue.description}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]/80">Ausstattung</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {venue.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="flex items-center gap-3 rounded-2xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--background-primary)]/70 px-4 py-3 text-sm text-[color:var(--text-secondary)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-6 rounded-[2.75rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/85 p-8 shadow-glass">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Öffnungszeiten</h2>
            <dl className="space-y-2" aria-label="Öffnungszeiten nach Wochentagen">
              {(Object.keys(weekdayLabels) as Weekday[]).map((day) => {
                const hours = venue.openingHours[day];
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-2xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--background-primary)]/70 px-4 py-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
                      {weekdayLabels[day]}
                    </dt>
                    <dd className="text-sm font-medium text-[color:var(--text-primary)]">
                      {hours ? (
                        <span>{hours.open} – {hours.close}</span>
                      ) : (
                        <span className="text-[color:var(--text-secondary)]/70">geschlossen</span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
          <div className="space-y-3 rounded-2xl border border-dashed border-[color:var(--border-subtle)]/70 bg-[color:var(--background-primary)]/60 px-5 py-4 text-sm text-[color:var(--text-secondary)]">
            <p className="text-sm font-semibold text-[color:var(--text-primary)]">Nächste Schritte</p>
            <p>
              Für Live-Verfügbarkeiten oder Reservierungen wird die Halle direkt auf ihrer Website gepflegt. Eine API-Anbindung ist im nächsten Release-Plan vorgesehen.
            </p>
            <Link
              href="mailto:partners@soccerhub.app"
              className="theme-transition inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]/70"
            >
              Betreiber:in? SoccerHUB Partner werden
            </Link>
          </div>
        </aside>
      </section>
    </article>
  );
}
