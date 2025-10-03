import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  ClockIcon,
  EuroIcon,
  MapPinIcon,
  ParkingIcon,
  ShowerIcon,
  SparkleIcon,
  TargetIcon,
  WifiIcon,
  CafeIcon,
  LockerIcon,
  GymIcon,
  PoolIcon,
  SaunaIcon,
  ShopIcon,
  CardIcon,
  AccessibilityIcon,
  ACIcon,
  LightIcon,
  CourseIcon,
  RacketIcon,
  ShoeIcon,
  BoardIcon,
  TribuneIcon,
} from "@/components/icons";
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

  const availability = getAvailabilityStatus(venue);
  const openingSummary = getOpeningHoursSummary(venue);
  const amenitiesWithIcons = venue.amenities.slice(0, 6).map((amenity) => ({
    label: amenity,
    icon: getAmenityIcon(amenity),
  }));

  return (
    <article className="theme-transition group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-[color:var(--surface-glass-border)]/80 bg-[color:var(--surface-card)]/85 shadow-[0_32px_140px_-80px_rgba(6,36,22,0.8)] backdrop-blur-xl transition hover:-translate-y-1.5 hover:border-[color:var(--accent-primary)]/60">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" aria-hidden />
        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--floating-badge-border)] bg-[color:var(--floating-badge-background)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--floating-badge-text)] shadow-[0_14px_45px_-30px_rgba(0,0,0,0.75)] backdrop-blur">
          <BadgeCheckIcon className="h-4 w-4" />
          Verifiziert
        </div>
        {venue.city ? (
          <div className="absolute left-6 bottom-6 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_-32px_rgba(0,0,0,0.8)]">
            <MapPinIcon className="h-3.5 w-3.5" />
            {venue.city}
          </div>
        ) : null}
      </div>
      <div className="glass-veil flex flex-1 flex-col rounded-[2.35rem]">
        <div className="flex flex-1 flex-col gap-8 p-8 text-[color:var(--text-primary)] sm:p-9">
          <header className="space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)]/16 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-primary-strong)] shadow-[0_6px_24px_-16px_rgba(0,108,56,0.6)]">
                <TargetIcon className="h-3.5 w-3.5 text-[color:var(--accent-primary-strong)]" />
                {venue.sports.map((sport) => sportLabels[sport] ?? sport).join(" · ")}
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)] shadow-[0_12px_30px_-18px_rgba(6,40,24,0.45)]">
                <EuroIcon className="h-3.5 w-3.5 text-[color:var(--accent-primary-strong)]" />
                {formattedPrice ? (
                  <span className="text-base font-semibold text-[color:var(--accent-primary-strong)]">
                    {formattedPrice}
                    <span className="ml-1 text-xs font-medium text-[color:var(--text-tertiary)]">/ Stunde</span>
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-[color:var(--accent-secondary-strong)]">Preis auf Anfrage</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-tight text-[color:var(--text-primary)] break-words hyphens-auto sm:text-[1.7rem]">
                {venue.name}
              </h3>
              <p className="text-base leading-relaxed text-[color:var(--text-secondary)]/90 break-words hyphens-auto">{venue.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-secondary)]">
              {openingSummary ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/50 bg-[color:var(--surface-card)]/90 px-3.5 py-1.5 text-[color:var(--text-secondary)]">
                  <ClockIcon className="h-4 w-4 text-[color:var(--accent-primary-strong)]" />
                  {openingSummary}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/50 bg-[color:var(--surface-card)]/90 px-3.5 py-1.5 text-[color:var(--text-tertiary)]">
                  <ClockIcon className="h-4 w-4 text-[color:var(--text-tertiary)]" />
                  Öffnungszeiten auf Anfrage
                </span>
              )}
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] ${availability.badgeClass}`}
              >
                {availability.icon}
                {availability.label}
              </span>
            </div>
          </header>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
            <div className="rounded-2xl border border-[color:var(--surface-glass-border)]/55 bg-[color:var(--surface-card)]/92 p-5 shadow-[0_18px_52px_-32px_rgba(4,36,20,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
                Preis &amp; Buchung
              </p>
              <div className="mt-3 space-y-2 text-sm text-[color:var(--text-secondary)]">
                <p>
                  {formattedPrice ? (
                    <span className="text-lg font-semibold text-[color:var(--accent-primary-strong)]">{formattedPrice}</span>
                  ) : (
                    <span className="text-base font-semibold text-[color:var(--accent-secondary-strong)]">Auf Anfrage per Kontakt</span>
                  )}
                </p>
                {venue.notes ? (
                  <p className="text-sm leading-relaxed text-[color:var(--text-tertiary)]/85 break-words hyphens-auto">{venue.notes}</p>
                ) : null}
              </div>
            </div>
            <div className="rounded-2xl border border-[color:var(--accent-primary)]/40 bg-gradient-to-br from-[color:var(--accent-primary)]/14 via-[color:var(--surface-card)]/85 to-[color:var(--surface-card-muted)]/80 p-5 shadow-[0_20px_60px_-38px_rgba(0,134,74,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
                Live Status
              </p>
              <div className="mt-3 space-y-3 text-sm text-[color:var(--text-secondary)]">
                <p className="flex items-center gap-2 text-[color:var(--text-secondary)]/95">
                  <BadgeCheckIcon className="h-4 w-4 text-[color:var(--accent-primary-strong)]" />
                  {availability.description}
                </p>
                <p className="flex items-center gap-2 text-[color:var(--text-secondary)]/95">
                  <TargetIcon className="h-4 w-4 text-[color:var(--accent-primary-strong)]" />
                  {venue.address ?? "Adresse nach Buchung"}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              Ausstattung
            </h4>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
              {amenitiesWithIcons.map((amenity) => (
                <li
                  key={`${venue.id}-${amenity.label}`}
                  className="theme-transition flex items-center gap-3 rounded-2xl border border-[color:var(--surface-glass-border)]/55 bg-[color:var(--surface-card)]/90 px-3.5 py-2.5 shadow-[0_16px_40px_-30px_rgba(4,32,20,0.45)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--surface-card-strong)]/92 text-[color:var(--accent-primary-strong)]">
                    {amenity.icon}
                  </span>
                  <span className="font-medium leading-tight text-[color:var(--text-secondary)]/95">{amenity.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/venues/${venue.id}`}
              className="theme-transition inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/65 bg-[color:var(--surface-card)]/92 px-5 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] shadow-[0_22px_64px_-38px_rgba(6,36,22,0.6)] hover:border-[color:var(--accent-primary)]/45 hover:bg-[color:var(--surface-card-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/80"
            >
              Details ansehen
            </Link>
            <a
              href={venue.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-transition inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,rgba(0,108,56,1),rgba(31,184,100,0.92))] px-5 py-2.5 text-sm font-semibold text-[color:var(--accent-primary-contrast)] shadow-[0_26px_70px_-32px_rgba(0,108,56,0.75)] hover:shadow-[0_28px_82px_-28px_rgba(0,108,56,0.75)] hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/70"
            >
              Jetzt buchen
            </a>
          </footer>
        </div>
      </div>
    </article>
  );
}

function getAvailabilityStatus(venue: Venue) {
  const hasPrice = typeof venue.pricePerHour === "number";
  const notes = venue.notes?.toLowerCase() ?? "";

  if (hasPrice && !notes.includes("vereinbarung")) {
    return {
      label: "Live frei",
      description: "Slots können sofort im Buchungsportal reserviert werden.",
      badgeClass:
        "border border-transparent bg-[color:var(--accent-primary-strong)] text-[color:var(--accent-primary-contrast)] shadow-[0_14px_36px_-18px_rgba(0,108,56,0.6)]",
      icon: <BadgeCheckIcon className="h-3.5 w-3.5" />,
    } as const;
  }

  if (notes.includes("vereinbarung") || notes.includes("kontakt")) {
    return {
      label: "Auf Anfrage",
      description: "Team kontaktiert dich nach Termin- bzw. Preis-Anfrage.",
      badgeClass:
        "border border-transparent bg-[color:var(--accent-secondary-strong)]/95 text-[color:var(--pitch-dark)] shadow-[0_14px_32px_-18px_rgba(31,184,100,0.55)]",
      icon: <SparkleIcon className="h-3.5 w-3.5" />,
    } as const;
  }

  return {
    label: "Verfügbarkeit prüfen",
    description: "Verfügbarkeit wird individuell bestätigt – Anfrage senden.",
    badgeClass:
      "border border-[color:var(--surface-glass-border)]/55 bg-[color:var(--surface-card)]/90 text-[color:var(--text-secondary)] shadow-[0_10px_26px_-18px_rgba(6,32,20,0.4)]",
    icon: <SparkleIcon className="h-3.5 w-3.5" />,
  } as const;
}

const weekdayOrder: Array<keyof NonNullable<Venue["openingHours"]>> = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const weekdayShort: Record<string, string> = {
  monday: "Mo",
  tuesday: "Di",
  wednesday: "Mi",
  thursday: "Do",
  friday: "Fr",
  saturday: "Sa",
  sunday: "So",
};

function getOpeningHoursSummary(venue: Venue) {
  if (!venue.openingHours) return null;

  const entries = weekdayOrder
    .map((day) => ({ day, hours: venue.openingHours?.[day] ?? null }))
    .filter((entry) => entry.hours && entry.hours.open && entry.hours.close);

  if (entries.length === 0) return null;

  const firstDay = entries[0]!;
  const lastDay = entries[entries.length - 1]!;
  const dayLabel = entries.length === 7 ? "Täglich" : `${weekdayShort[firstDay.day]}–${weekdayShort[lastDay.day]}`;
  const hoursLabel = `${firstDay.hours!.open} – ${firstDay.hours!.close}`;

  return `${dayLabel}, ${hoursLabel}`;
}

function getAmenityIcon(amenity: string) {
  const iconClass = "h-4 w-4";
  switch (amenity) {
    case "Duschen":
      return <ShowerIcon className={iconClass} />;
    case "Umkleiden":
      return <LockerIcon className={iconClass} />;
    case "Parkplätze":
      return <ParkingIcon className={iconClass} />;
    case "WLAN":
      return <WifiIcon className={iconClass} />;
    case "Café":
    case "Gastronomie":
    case "Verpflegung":
      return <CafeIcon className={iconClass} />;
    case "Shop":
      return <ShopIcon className={iconClass} />;
    case "Kartenzahlung":
      return <CardIcon className={iconClass} />;
    case "Barrierefrei":
      return <AccessibilityIcon className={iconClass} />;
    case "Klimaanlage":
      return <ACIcon className={iconClass} />;
    case "Kraftraum":
      return <GymIcon className={iconClass} />;
    case "Pool":
      return <PoolIcon className={iconClass} />;
    case "Sauna":
      return <SaunaIcon className={iconClass} />;
    case "LED-Flutlicht":
      return <LightIcon className={iconClass} />;
    case "Kurse":
      return <CourseIcon className={iconClass} />;
    case "Leihschläger":
      return <RacketIcon className={iconClass} />;
    case "Leihschuhe":
      return <ShoeIcon className={iconClass} />;
    case "Campusboard":
      return <BoardIcon className={iconClass} />;
    case "Tribüne":
      return <TribuneIcon className={iconClass} />;
    default:
      return <SparkleIcon className={iconClass} />;
  }
}
