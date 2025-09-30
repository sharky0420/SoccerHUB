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
        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_14px_45px_-30px_rgba(0,0,0,0.75)] backdrop-blur">
          <BadgeCheckIcon className="h-4 w-4" />
          Verifiziert
        </div>
        {venue.city ? (
          <div className="absolute left-6 bottom-6 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_-32px_rgba(0,0,0,0.8)]">
            <MapPinIcon className="h-3.5 w-3.5" />
            {venue.city}
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-8 p-8 text-[color:var(--text-primary)] sm:p-9">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-primary)]">
              <TargetIcon className="h-3.5 w-3.5" /> {venue.sports.map((sport) => sportLabels[sport] ?? sport).join(" · ")}
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <EuroIcon className="h-3.5 w-3.5 text-[color:var(--accent-primary)]" />
              {formattedPrice ? (
                <span className="text-base font-semibold text-[color:var(--accent-primary)]">
                  {formattedPrice}
                  <span className="ml-1 text-[11px] font-medium text-[color:var(--text-secondary)]/80">/ Stunde</span>
                </span>
              ) : (
                <span className="text-sm font-semibold text-[color:var(--accent-secondary)]">Preis auf Anfrage</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold leading-tight sm:text-[1.65rem]">{venue.name}</h3>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{venue.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-secondary)]">
            {openingSummary ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card-muted)]/70 px-3 py-1.5">
                <ClockIcon className="h-4 w-4 text-[color:var(--accent-primary)]" />
                {openingSummary}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card-muted)]/70 px-3 py-1.5 text-[color:var(--text-secondary)]">
                <ClockIcon className="h-4 w-4 text-[color:var(--text-secondary)]/70" />
                Öffnungszeiten auf Anfrage
              </span>
            )}
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${availability.badgeClass}`}
            >
              {availability.icon}
              {availability.label}
            </span>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
          <div className="rounded-2xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card-muted)]/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/80">
              Preis &amp; Buchung
            </p>
            <div className="mt-3 space-y-2 text-sm text-[color:var(--text-secondary)]">
              <p>
                {formattedPrice ? (
                  <span className="text-lg font-semibold text-[color:var(--accent-primary)]">{formattedPrice}</span>
                ) : (
                  <span className="text-base font-semibold text-[color:var(--accent-secondary)]">Auf Anfrage per Kontakt</span>
                )}
              </p>
              {venue.notes ? <p className="text-xs leading-relaxed opacity-80">{venue.notes}</p> : null}
            </div>
          </div>
          <div className="rounded-2xl border border-[color:var(--accent-primary)]/30 bg-gradient-to-br from-[color:var(--accent-primary)]/12 via-[color:var(--surface-card)]/70 to-[color:var(--surface-card-muted)]/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/80">
              Live Status
            </p>
            <div className="mt-3 space-y-3 text-sm text-[color:var(--text-secondary)]">
              <p className="flex items-center gap-2">
                <BadgeCheckIcon className="h-4 w-4 text-[color:var(--accent-primary)]" />
                {availability.description}
              </p>
              <p className="flex items-center gap-2">
                <TargetIcon className="h-4 w-4 text-[color:var(--accent-primary)]" />
                {venue.address ?? "Adresse nach Buchung"}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/85">Ausstattung</h4>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
            {amenitiesWithIcons.map((amenity) => (
              <li
                key={`${venue.id}-${amenity.label}`}
                className="theme-transition flex items-center gap-3 rounded-2xl border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card-muted)]/70 px-3.5 py-2.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--surface-card)]/90 text-[color:var(--accent-primary)]">
                  {amenity.icon}
                </span>
                <span className="font-medium leading-tight">{amenity.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={`/venues/${venue.id}`}
            className="theme-transition inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/85 px-5 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] shadow-[0_20px_60px_-40px_rgba(6,36,22,0.6)] hover:border-[color:var(--accent-primary)]/40 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Details ansehen
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-transition inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-secondary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--background-primary)] shadow-[0_24px_65px_-30px_rgba(12,70,45,0.85)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Jetzt buchen
          </a>
        </footer>
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
        "border border-[color:var(--accent-primary)]/60 bg-[color:var(--accent-primary)]/12 text-[color:var(--accent-primary)]",
      icon: <BadgeCheckIcon className="h-3.5 w-3.5" />,
    } as const;
  }

  if (notes.includes("vereinbarung") || notes.includes("kontakt")) {
    return {
      label: "Auf Anfrage",
      description: "Team kontaktiert dich nach Termin- bzw. Preis-Anfrage.",
      badgeClass:
        "border border-[color:var(--accent-secondary)]/60 bg-[color:var(--accent-secondary)]/15 text-[color:var(--accent-secondary)]",
      icon: <SparkleIcon className="h-3.5 w-3.5" />,
    } as const;
  }

  return {
    label: "Verfügbarkeit prüfen",
    description: "Verfügbarkeit wird individuell bestätigt – Anfrage senden.",
    badgeClass:
      "border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 text-[color:var(--text-secondary)]",
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
