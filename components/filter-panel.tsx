"use client";

import { type ReactNode, useId, useMemo, useState } from "react";
import clsx from "clsx";
import {
  AccessibilityIcon,
  ACIcon,
  CafeIcon,
  CardIcon,
  ClockIcon,
  CourseIcon,
  EuroIcon,
  FoodIcon,
  GymIcon,
  LightIcon,
  LockerIcon,
  MapPinIcon,
  ParkingIcon,
  PoolIcon,
  RacketIcon,
  ChevronDownIcon,
  SaunaIcon,
  SearchIcon,
  ShowerIcon,
  ShoeIcon,
  SparkleIcon,
  TargetIcon,
  TribuneIcon,
  WifiIcon,
  BoardIcon,
  ShopIcon,
} from "@/components/icons";
import { CITY_COORDINATES, getNearestCity } from "@/lib/city-coordinates";
import type { Weekday } from "@/types/venue";

export interface FilterState {
  sports: string[];
  city: string;
  nearby?: boolean;
  priceMin?: number;
  priceMax?: number;
  day?: Weekday | "";
  amenities: string[];
}

interface FilterPanelProps {
  sportsOptions: string[];
  amenityOptions: string[];
  state: FilterState;
  onChange: (state: FilterState) => void;
  onReset: () => void;
  className?: string;
  density?: "default" | "compact";
}

const weekdayLabels: Record<Weekday, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

interface SectionHeaderProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
  density: "default" | "compact";
}

function SectionHeader({ icon, eyebrow, title, description, density }: SectionHeaderProps) {
  const isCompact = density === "compact";

  return (
    <div className="flex items-start gap-3">
      <span
        className={clsx(
          "inline-flex flex-shrink-0 items-center justify-center rounded-2xl bg-[color:var(--accent-primary-strong)]/15 text-[color:var(--accent-primary-strong)] shadow-[0_14px_30px_-20px_rgba(0,108,56,0.45)]",
          isCompact ? "h-8 w-8" : "mt-0.5 h-9 w-9"
        )}
      >
        {icon}
      </span>
      <div className={clsx("space-y-1", isCompact && "space-y-0.5")}>
        <p
          className={clsx(
            "font-semibold uppercase tracking-[0.32em] text-[color:var(--text-tertiary)]",
            isCompact ? "text-[10px]" : "text-[11px]"
          )}
        >
          {eyebrow}
        </p>
        <h3
          className={clsx(
            "font-semibold leading-tight text-[color:var(--text-primary)] break-words hyphens-auto",
            isCompact ? "text-sm" : "text-base"
          )}
        >
          {title}
        </h3>
        {description ? (
          <p
            className={clsx(
              "text-[color:var(--text-secondary)]/80 break-words hyphens-auto",
              isCompact ? "text-xs leading-relaxed" : "text-sm leading-relaxed"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

interface CollapsibleSectionProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
  density: "default" | "compact";
  summary?: string;
  actions?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

function CollapsibleSection({
  icon,
  eyebrow,
  title,
  description,
  density,
  summary,
  actions,
  defaultOpen = false,
  children,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isCompact = density === "compact";
  const contentId = useId();

  return (
    <section
      className={clsx(
        "theme-transition rounded-2xl border border-[color:var(--surface-glass-border)]/65 bg-[var(--gradient-filter-card)] p-5 shadow-[0_32px_120px_-80px_rgba(12,72,48,0.45)] backdrop-blur-xl",
        className
      )}
    >
      <div
        className={clsx(
          "flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
          isCompact && "gap-2"
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={clsx(
            "group flex flex-1 items-center justify-between gap-3 text-left",
            isCompact ? "flex-col sm:flex-row sm:items-center" : "flex-wrap"
          )}
        >
          <div className={clsx("flex-1 space-y-2", isCompact && "w-full")}>
            <SectionHeader
              icon={icon}
              eyebrow={eyebrow}
              title={title}
              description={description}
              density={density}
            />
            {summary ? (
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--text-secondary)]/75 break-words hyphens-auto">
                {summary}
              </p>
            ) : null}
          </div>
          <ChevronDownIcon
            className={clsx(
              "h-4 w-4 flex-shrink-0 text-[color:var(--text-secondary)] transition-transform duration-300",
              isOpen ? "rotate-180 text-[color:var(--accent-primary-strong)]" : ""
            )}
            aria-hidden
          />
        </button>
        {actions ? (
          <div className="flex flex-shrink-0 items-center gap-2 sm:pt-1">{actions}</div>
        ) : null}
      </div>
      {isOpen ? (
        <div
          id={contentId}
          className={clsx(
            "mt-4 space-y-4 border-t border-[color:var(--surface-glass-border)]/45 pt-4",
            isCompact && "mt-3 pt-3"
          )}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function FilterPanel({
  sportsOptions,
  amenityOptions,
  state,
  onChange,
  onReset,
  className,
  density = "default",
}: FilterPanelProps) {
  const isCompact = density === "compact";
  const sportOptions = useMemo(() => sportsOptions, [sportsOptions]);
  const [geoState, setGeoState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  const amenityGroups = useMemo(() => {
    const categoryOrder = ["Core", "Komfort", "Service", "Training"];

    const categoryMap: Record<string, string> = {
      Duschen: "Core",
      Umkleiden: "Core",
      Parkplätze: "Core",
      Gastronomie: "Service",
      Café: "Service",
      Shop: "Service",
      Verpflegung: "Service",
      Kartenzahlung: "Service",
      WLAN: "Service",
      Barrierefrei: "Komfort",
      Klimaanlage: "Komfort",
      Sauna: "Komfort",
      Pool: "Komfort",
      "LED-Flutlicht": "Training",
      Kraftraum: "Training",
      Kurse: "Training",
      Campusboard: "Training",
      Leihschläger: "Training",
      Leihschuhe: "Training",
      Tribüne: "Komfort",
    };

    const grouped = amenityOptions.reduce<Record<string, string[]>>((groups, item) => {
      const category = categoryMap[item] ?? "Weitere";
      if (!groups[category]) groups[category] = [];
      groups[category]!.push(item);
      return groups;
    }, {});

    const orderedCategories = categoryOrder
      .filter((category) => grouped[category])
      .concat(Object.keys(grouped).filter((category) => !categoryOrder.includes(category)));

    return orderedCategories.map((category) => ({
      label: category === "Core" ? "Basics" : category,
      items: grouped[category] ?? [],
    }));
  }, [amenityOptions]);

  const toggleSport = (sport: string) => {
    const exists = state.sports.includes(sport);
    const sports = exists
      ? state.sports.filter((item) => item !== sport)
      : [...state.sports, sport];
    onChange({ ...state, sports });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = state.amenities.includes(amenity);
    const amenities = exists
      ? state.amenities.filter((item) => item !== amenity)
      : [...state.amenities, amenity];
    onChange({ ...state, amenities });
  };

  const handleLocateMe = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoState("error");
      setGeoMessage("Standortbestimmung wird auf diesem Gerät nicht unterstützt.");
      return;
    }

    setGeoState("loading");
    setGeoMessage("Ermittle Standorte in deiner Nähe...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearestCity = getNearestCity(position.coords.latitude, position.coords.longitude);
        if (nearestCity) {
          setGeoState("success");
          const label = CITY_COORDINATES[nearestCity]?.label ?? nearestCity;
          setGeoMessage(`In deiner Nähe: ${label}`);
          onChange({ ...state, city: label, nearby: true });
        } else {
          setGeoState("error");
          setGeoMessage("Keine Hallen in deiner direkten Umgebung gefunden.");
        }
      },
      () => {
        setGeoState("error");
        setGeoMessage("Standortzugriff wurde abgelehnt.");
      }
    );
  };

  const geoMessageColor =
    geoState === "success"
      ? "text-[color:var(--accent-primary)]"
      : geoState === "error"
        ? "text-[color:var(--text-secondary)]"
        : "text-[color:var(--text-secondary)]/90";

  const getAmenityIcon = (amenity: string) => {
    const iconClass = "h-4 w-4 text-[color:var(--accent-primary)]";
    switch (amenity) {
      case "Duschen":
        return <ShowerIcon className={iconClass} />;
      case "Umkleiden":
        return <LockerIcon className={iconClass} />;
      case "Parkplätze":
        return <ParkingIcon className={iconClass} />;
      case "Gastronomie":
      case "Café":
      case "Verpflegung":
        return <CafeIcon className={iconClass} />;
      case "Shop":
        return <ShopIcon className={iconClass} />;
      case "Kartenzahlung":
        return <CardIcon className={iconClass} />;
      case "WLAN":
        return <WifiIcon className={iconClass} />;
      case "Barrierefrei":
        return <AccessibilityIcon className={iconClass} />;
      case "Klimaanlage":
        return <ACIcon className={iconClass} />;
      case "Sauna":
        return <SaunaIcon className={iconClass} />;
      case "Pool":
        return <PoolIcon className={iconClass} />;
      case "LED-Flutlicht":
        return <LightIcon className={iconClass} />;
      case "Kraftraum":
        return <GymIcon className={iconClass} />;
      case "Kurse":
        return <CourseIcon className={iconClass} />;
      case "Campusboard":
        return <BoardIcon className={iconClass} />;
      case "Leihschläger":
        return <RacketIcon className={iconClass} />;
      case "Leihschuhe":
        return <ShoeIcon className={iconClass} />;
      case "Tribüne":
        return <TribuneIcon className={iconClass} />;
      default:
        return <SparkleIcon className={iconClass} />;
    }
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const locationSummary = state.nearby
    ? "Near Me aktiv"
    : state.city
      ? state.city
      : "Alle Standorte";

  const sportSummary = state.sports.length
    ? `${state.sports.slice(0, 2).join(" · ")}${state.sports.length > 2 ? ` +${state.sports.length - 2}` : ""}`
    : "Alle Sportarten";

  const priceSummaryParts: string[] = [];
  if (typeof state.priceMin === "number" && typeof state.priceMax === "number") {
    priceSummaryParts.push(`${formatPrice(state.priceMin)} – ${formatPrice(state.priceMax)}`);
  } else if (typeof state.priceMin === "number") {
    priceSummaryParts.push(`ab ${formatPrice(state.priceMin)}`);
  } else if (typeof state.priceMax === "number") {
    priceSummaryParts.push(`bis ${formatPrice(state.priceMax)}`);
  }
  if (state.day) {
    priceSummaryParts.push(weekdayLabels[state.day]);
  }
  const priceSummary = priceSummaryParts.length > 0 ? priceSummaryParts.join(" · ") : "Standardfilter aktiv";

  const amenitiesSummary = state.amenities.length
    ? `${state.amenities.length} Auswahl${state.amenities.length > 1 ? "en" : ""}`
    : "Keine Auswahl aktiv";

  return (
    <aside
      className={clsx(
        "glass-panel theme-transition rounded-3xl border border-[color:var(--border-subtle)]/75 bg-[var(--gradient-filter-shell)] text-[color:var(--text-primary)] shadow-[0_60px_190px_-110px_rgba(12,72,48,0.55)] backdrop-blur-2xl",
        isCompact ? "space-y-5 p-5 lg:p-6" : "space-y-7 p-8",
        className
      )}
    >
      <header
        className={clsx(
          "flex items-start justify-between gap-4",
          isCompact && "flex-col sm:flex-row sm:items-start sm:gap-6"
        )}
      >
        <div className={clsx("space-y-2", isCompact && "space-y-1")}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--accent-primary-strong)]/90">
            Filterübersicht
          </p>
          <h2
            className={clsx(
              "font-semibold leading-tight text-[color:var(--text-primary)] break-words hyphens-auto",
              isCompact ? "text-xl" : "mt-2 text-2xl"
            )}
          >
            Dein Sports-Hub Filter
          </h2>
          <p
            className={clsx(
              "text-[color:var(--text-secondary)] break-words hyphens-auto",
              isCompact ? "text-xs leading-relaxed" : "mt-2 text-sm leading-relaxed"
            )}
          >
            Stelle Sportarten, Standort und Ausstattung zusammen. Sports Hub zeigt dir live verfügbare Slots, Preise und Extras.
          </p>
        </div>
        <button
          type="button"
          className={clsx(
            "theme-transition rounded-full border border-transparent font-semibold text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]/70",
            isCompact ? "px-4 py-1.5 text-xs" : "px-4 py-2 text-sm hover:border-[color:var(--accent-primary)]/40 hover:bg-[color:var(--accent-primary)]/10"
          )}
          onClick={onReset}
        >
          Zurücksetzen
        </button>
      </header>

      <div className="space-y-5">
        <CollapsibleSection
          icon={<MapPinIcon className="h-4 w-4" />}
          eyebrow="Standort"
          title="Wo willst du spielen?"
          description="Suche nach Städten oder nutze Near Me für Vorschläge basierend auf deinem Standort."
          density={density}
          summary={locationSummary}
          actions={
            <button
              type="button"
              onClick={handleLocateMe}
              className={clsx(
                "theme-transition inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-primary-strong)]/40 px-3 font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/70",
                isCompact ? "bg-[color:var(--accent-primary-strong)]/12 py-1 text-[10px]" : "bg-[color:var(--accent-primary-strong)]/14 py-1.5 text-xs hover:bg-[color:var(--accent-primary-strong)]/20"
              )}
            >
              <TargetIcon className="h-3.5 w-3.5" />
              Near Me
            </button>
          }
          defaultOpen
        >
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)]/70">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              id="city-filter"
              type="text"
              placeholder="Stadt oder Stadtteil suchen"
              value={state.city}
              onChange={(event) => onChange({ ...state, city: event.target.value, nearby: false })}
              className={clsx(
                "theme-transition w-full rounded-full border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/80 pl-11 pr-4 text-sm font-medium text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40",
                isCompact ? "py-2.5" : "py-3"
              )}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--accent-primary-strong)]/85">
              <MapPinIcon className="h-4 w-4" />
            </span>
          </label>
          {geoMessage ? (
            <p className={`text-xs font-medium ${geoMessageColor}`}>{geoMessage}</p>
          ) : (
            <p className="text-xs text-[color:var(--text-secondary)]/75">
              Direkt nach Städten suchen oder mit „Near Me“ starten.
            </p>
          )}
        </CollapsibleSection>

        <CollapsibleSection
          icon={<RacketIcon className="h-4 w-4" />}
          eyebrow="Sportarten"
          title="Disziplin wählen"
          description="Kombiniere mehrere Sportarten für multifunktionale Anlagen."
          density={density}
          summary={sportSummary}
          actions={
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-secondary)]/75">
              Mehrfachauswahl
            </span>
          }
        >
          <div className={clsx("flex flex-wrap gap-2", isCompact && "gap-1.5")}>
            {sportOptions.map((sport) => {
              const selected = state.sports.includes(sport);
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  aria-pressed={selected}
                  className={clsx(
                    "theme-transition inline-flex items-center gap-2 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]",
                    isCompact ? "py-1.5" : "py-2",
                    selected
                      ? "border-transparent bg-[color:var(--accent-primary-strong)] text-[color:var(--accent-primary-contrast)] shadow-[0_16px_36px_-22px_rgba(0,108,56,0.55)]"
                      : "border-[color:var(--surface-glass-border)]/55 bg-[color:var(--surface-card)]/70 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary-strong)]/45 hover:text-[color:var(--accent-primary-strong)]"
                  )}
                >
                  <span
                    className={clsx(
                      "h-1.5 w-1.5 rounded-full",
                      selected
                        ? "bg-[color:var(--accent-primary-contrast)]"
                        : "bg-[color:var(--accent-primary-strong)]/40"
                    )}
                    aria-hidden
                  />
                  {sport}
                </button>
              );
            })}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          icon={<EuroIcon className="h-4 w-4" />}
          eyebrow="Zeit & Budget"
          title="Budget & Slots feinjustieren"
          description="Setze Rahmen für Preise und verfügbare Tage."
          density={density}
          summary={priceSummary}
        >
          <div className={clsx("grid gap-4", isCompact ? "sm:grid-cols-1" : "sm:grid-cols-2")}> 
            <div className="rounded-2xl border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/80 p-4 shadow-[0_20px_70px_-60px_rgba(12,72,48,0.45)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-tertiary)]">
                Preisrange
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)]/70">
                    <EuroIcon className="h-4 w-4" />
                  </span>
                  <input
                    id="price-min"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="Min"
                    value={state.priceMin ?? ""}
                    onChange={(event) =>
                      onChange({
                        ...state,
                        priceMin: event.target.value ? Number(event.target.value) : undefined,
                      })
                    }
                    className="theme-transition w-full rounded-2xl border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/80 pl-10 pr-3 text-sm font-medium text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40 py-2"
                  />
                </div>
                <div className="text-xs text-[color:var(--text-secondary)]/70">bis</div>
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)]/70">
                    <EuroIcon className="h-4 w-4" />
                  </span>
                  <input
                    id="price-max"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="Max"
                    value={state.priceMax ?? ""}
                    onChange={(event) =>
                      onChange({
                        ...state,
                        priceMax: event.target.value ? Number(event.target.value) : undefined,
                      })
                    }
                    className="theme-transition w-full rounded-2xl border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/80 pl-10 pr-3 text-sm font-medium text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40 py-2"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-[color:var(--text-secondary)]/75">
                Typische Buchungsfenster liegen zwischen 45&nbsp;€ und 70&nbsp;€ pro Stunde.
              </p>
            </div>
            <div className="rounded-2xl border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/80 p-4 shadow-[0_20px_70px_-60px_rgba(12,72,48,0.45)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-tertiary)]">
                Öffnungszeiten
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...state, day: "" })}
                  className={clsx(
                    "theme-transition rounded-full px-4 text-xs font-semibold uppercase tracking-[0.18em]",
                    isCompact ? "py-1.5" : "py-2",
                    !state.day
                      ? "bg-[color:var(--accent-primary)] text-[color:var(--background-primary)]"
                      : "border border-[color:var(--border-subtle)]/70 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/40 hover:text-[color:var(--accent-primary)]"
                  )}
                >
                  Alle Tage
                </button>
                {(Object.keys(weekdayLabels) as Weekday[]).map((day) => {
                  const selected = state.day === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => onChange({ ...state, day })}
                      className={clsx(
                        "theme-transition rounded-full px-4 text-xs font-semibold uppercase tracking-[0.18em]",
                        isCompact ? "py-1.5" : "py-2",
                        selected
                          ? "bg-[color:var(--accent-secondary)] text-[color:var(--background-primary)]"
                          : "border border-[color:var(--border-subtle)]/70 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/40 hover:text-[color:var(--accent-primary)]"
                      )}
                    >
                      {weekdayLabels[day].slice(0, 2)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-[color:var(--text-secondary)]/75">
                <ClockIcon className="h-4 w-4" />
                Zeigt nur Hallen an, die am gewählten Tag Slots anbieten.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          icon={<SparkleIcon className="h-4 w-4" />}
          eyebrow="Ausstattung"
          title="Features mit Icon-Guide"
          description="Hebe Essentials wie Duschen oder Premium-Ausstattung wie Videoanalyse hervor."
          density={density}
          summary={amenitiesSummary}
          actions={
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-secondary)]/70">
              Tippe zum Aktivieren
            </span>
          }
        >
          <div className="space-y-4">
            {amenityGroups.map((group) => (
              <div key={group.label} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-secondary)]/70">
                  {group.label}
                </p>
                <div className={clsx("grid gap-2", isCompact ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}> 
                  {group.items.map((amenity) => {
                    const selected = state.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        aria-pressed={selected}
                        className={clsx(
                          "theme-transition flex items-center justify-between gap-3 rounded-2xl border px-3.5 text-left text-sm",
                          isCompact ? "py-2" : "py-2.5",
                          selected
                            ? "border-[color:var(--accent-primary)]/55 bg-[color:var(--accent-primary)]/14 text-[color:var(--accent-primary)] shadow-[0_14px_32px_-28px_rgba(10,90,60,0.6)]"
                            : "border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card)]/75 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/35 hover:text-[color:var(--accent-primary)]"
                        )}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--surface-card-muted)]/80 text-[color:var(--accent-primary)]">
                            {getAmenityIcon(amenity)}
                          </span>
                          <span className="font-medium break-words hyphens-auto">{amenity}</span>
                        </span>
                        <span
                          className={clsx(
                            "text-xs font-semibold uppercase tracking-[0.18em]",
                            selected ? "text-[color:var(--accent-primary)]" : "text-[color:var(--text-secondary)]/60"
                          )}
                        >
                          {selected ? "Aktiv" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>
      <div
        className={clsx(
          "rounded-2xl border border-dashed border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card)]/80 text-[color:var(--text-secondary)] backdrop-blur",
          isCompact ? "px-4 py-2 text-[11px]" : "px-4 py-3 text-xs"
        )}
      >
        <span className="font-semibold text-[color:var(--accent-primary)]">Tipp:</span> Speichere deine Lieblingsfilter als Shortcut in deinem Profil.
      </div>
    </aside>
  );
}
