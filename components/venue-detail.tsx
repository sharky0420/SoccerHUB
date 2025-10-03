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
  const heroImage = venue.images[0] ?? "/placeholder.svg";
  const formattedPrice =
    typeof venue.pricePerHour === "number"
      ? new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(venue.pricePerHour)
      : null;
  const hasOpeningHours = Boolean(
    venue.openingHours &&
      Object.values(venue.openingHours).some((value) => Boolean(value)),
  );

  return (
    <article className="container-narrow relative overflow-hidden rounded-[3rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] px-4 py-10 text-[color:var(--text-primary)] shadow-[0_45px_140px_-80px_rgba(4,24,14,0.85)] backdrop-blur-[24px] sm:px-8">
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] border border-[color:var(--surface-glass-border)]/70" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.25),transparent_70%)] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(18,88,52,0.45),transparent_70%)] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[65%] -translate-x-1/2 rounded-b-[3rem] bg-[color:var(--surface-card-muted)]/80 blur-3xl" aria-hidden />
      <div className="relative space-y-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        <div className="relative h-[320px] overflow-hidden rounded-[2.8rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] shadow-[0_40px_120px_-90px_rgba(0,0,0,0.9)] backdrop-blur">
          <Image
            src={heroImage}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
            className="h-full w-full object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--floating-badge-border)] bg-[color:var(--floating-badge-background)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--floating-badge-text)] shadow-[0_18px_42px_-24px_rgba(0,0,0,0.8)] backdrop-blur" aria-hidden>
            Arena Highlight
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3 rounded-2xl bg-black/30 px-5 py-3 text-sm text-white backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
            <span className="font-semibold">{venue.city ?? "Standort wird ergänzt"}</span>
            <span className="text-white/60" aria-hidden>
              •
            </span>
            <span className="text-white/80">{venue.address ?? "Adresse folgt"}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {venue.images.slice(1).map((image, index) => (
            <div
              key={image}
              className="relative h-32 overflow-hidden rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur"
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

      <header className="theme-transition relative flex flex-col gap-6 rounded-[2.75rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-8 shadow-[0_25px_80px_-60px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-l-[2.75rem] bg-[linear-gradient(120deg,rgba(92,255,157,0.18),transparent)]" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-r-[2.75rem] bg-[color:var(--surface-card-muted)]/60" aria-hidden />
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-primary-strong)]/40 bg-[color:var(--surface-card)]/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-primary-strong)] shadow-[0_14px_36px_-22px_rgba(0,108,56,0.5)]">
            Venue Profil
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-[color:var(--text-primary)]">{venue.name}</h1>
          <p className="flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
            <span aria-hidden>📍</span>
            {venue.address ?? "Adresse wird ergänzt"}
          </p>
        </div>
        <div className="relative flex flex-col items-start gap-4 text-sm text-[color:var(--text-secondary)] sm:items-end">
          <div className="absolute -top-10 right-0 hidden h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.25),transparent_70%)] blur-xl sm:block" aria-hidden />
          <div className="w-full rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] px-5 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur sm:w-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]/80">
              Preis pro Stunde
            </span>
            {formattedPrice ? (
              <p className="mt-2 text-3xl font-semibold text-[color:var(--accent-primary-strong)]">
                {formattedPrice}
                <span className="ml-2 text-xs font-medium uppercase tracking-[0.28em] text-[color:var(--text-tertiary)]">
                  pro Std.
                </span>
              </p>
            ) : (
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-semibold text-[color:var(--text-secondary)]/70">
                  Preis auf Anfrage
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-[color:var(--text-tertiary)]">
                  Direkt beim Betreiber anfragen
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {venue.sports.map((sport) => (
              <span
                key={sport}
                className="chip theme-transition px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]"
              >
                {sport}
              </span>
            ))}
          </div>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,rgba(0,108,56,1),rgba(31,184,100,0.92))] px-6 py-2.5 text-sm font-semibold text-[color:var(--accent-primary-contrast)] shadow-[0_28px_72px_-28px_rgba(0,108,56,0.75)] hover:translate-y-[-1px] hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/80"
          >
            Direkt beim Betreiber buchen
          </a>
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        <div className="space-y-8 rounded-[2.75rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-8 shadow-[0_35px_120px_-80px_rgba(0,0,0,0.85)] backdrop-blur">
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
                  className="flex items-center gap-3 rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] px-4 py-3 text-sm text-[color:var(--text-secondary)] backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent-secondary)]" aria-hidden />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-6 rounded-[2.75rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-8 shadow-[0_35px_120px_-80px_rgba(0,0,0,0.85)] backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Öffnungszeiten</h2>
            {hasOpeningHours ? (
              <dl className="space-y-2" aria-label="Öffnungszeiten nach Wochentagen">
                {(Object.keys(weekdayLabels) as Weekday[]).map((day) => {
                  const hours = venue.openingHours?.[day];
                  return (
                    <div
                      key={day}
                      className="flex items-center justify-between rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] px-4 py-3 backdrop-blur"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
                        {weekdayLabels[day]}
                      </dt>
                      <dd className="text-sm font-medium text-[color:var(--text-primary)]">
                        {hours ? (
                          <span>
                            {hours.open} – {hours.close}
                          </span>
                        ) : (
                          <span className="text-[color:var(--text-secondary)]/70">geschlossen</span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <p className="text-sm text-[color:var(--text-secondary)]/80">
                Öffnungszeiten werden derzeit direkt vom Betreiber kommuniziert.
              </p>
            )}
          </div>
          <div className="space-y-3 rounded-2xl border border-dashed border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] px-5 py-4 text-sm text-[color:var(--text-secondary)] backdrop-blur">
            <p className="text-sm font-semibold text-[color:var(--text-primary)]">Nächste Schritte</p>
            <p>
              Für Live-Verfügbarkeiten oder Reservierungen wird die Halle direkt auf ihrer Website gepflegt. Eine API-Anbindung ist im nächsten Release-Plan vorgesehen.
            </p>
            <Link
              href="mailto:partners@sportshub.app"
              className="theme-transition inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]/70"
            >
              Betreiber:in? Sports Hub Partner werden
            </Link>
          </div>
        </aside>
      </section>
      </div>
    </article>
  );
}
