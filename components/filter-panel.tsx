"use client";

import { type ReactNode, useMemo, useState } from "react";
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
}

function SectionHeader({ icon, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-[color:var(--accent-primary-strong)]/15 text-[color:var(--accent-primary-strong)] shadow-[0_14px_30px_-20px_rgba(0,108,56,0.45)]">
        {icon}
      </span>
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--text-tertiary)]">{eyebrow}</p>
        <h3 className="text-base font-semibold leading-tight text-[color:var(--text-primary)]">{title}</h3>
        {description ? (
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]/80">{description}</p>
        ) : null}
      </div>
    </div>
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

  return (
    <aside
      className={clsx(
        "glass-panel theme-transition space-y-7 rounded-3xl border border-[color:var(--border-subtle)]/80 text-[color:var(--text-primary)] backdrop-blur",
        density === "compact" ? "p-6" : "p-8",
        className
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--accent-primary-strong)]/90">
            Filterübersicht
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">
            Finde deinen Spot
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">
            Kuratiere Sportarten, Standort und Ausstattung. SoccerHUB zeigt dir live verfügbare Slots, Preise und Add-ons mit
            einem Blick.
          </p>
        </div>
        <button
          type="button"
          className="theme-transition rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[color:var(--accent-primary)] hover:border-[color:var(--accent-primary)]/40 hover:bg-[color:var(--accent-primary)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]/70"
          onClick={onReset}
        >
          Zurücksetzen
        </button>
      </header>

      <div className="space-y-6">
        <section className="space-y-5 rounded-2xl border border-[color:var(--surface-glass-border)]/85 bg-[color:var(--surface-card-muted)]/70 p-5 shadow-[0_24px_90px_-60px_rgba(8,36,24,0.65)]">
          <div className="flex items-center justify-between gap-4">
            <SectionHeader
              icon={<MapPinIcon className="h-4 w-4" />}
              eyebrow="Standort"
              title="Wo willst du spielen?"
              description="Suche nach Städten oder nutze Near Me für Vorschläge basierend auf deinem Standort."
            />
            <button
              type="button"
              onClick={handleLocateMe}
              className="theme-transition inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-primary-strong)]/40 bg-[color:var(--accent-primary-strong)]/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-primary-strong)] hover:bg-[color:var(--accent-primary-strong)]/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/70"
            >
              <TargetIcon className="h-3.5 w-3.5" />
              Near Me
            </button>
          </div>
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
              className="theme-transition w-full rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/80 py-3 pl-11 pr-4 text-sm font-medium text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--accent-primary-strong)]/85">
              <MapPinIcon className="h-4 w-4" />
            </span>
          </label>
          {geoMessage ? (
            <p className={`text-xs font-medium ${geoMessageColor}`}>{geoMessage}</p>
          ) : (
            <p className="text-xs text-[color:var(--text-secondary)]/75">Direkt nach Städten suchen oder mit „Near Me“ starten.</p>
          )}
        </section>

        <section className="space-y-4 rounded-2xl border border-[color:var(--surface-glass-border)]/80 bg-[color:var(--surface-card)]/78 p-5">
          <div className="flex items-start justify-between gap-4">
            <SectionHeader
              icon={<RacketIcon className="h-4 w-4" />}
              eyebrow="Sportarten"
              title="Disziplin wählen"
              description="Kombiniere mehrere Sportarten für multifunktionale Anlagen."
            />
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-secondary)]/75">
              Mehrfachauswahl
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sportOptions.map((sport) => {
              const selected = state.sports.includes(sport);
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  aria-pressed={selected}
                  className={`theme-transition inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)] ${
                    selected
                      ? "border-transparent bg-[color:var(--accent-primary-strong)] text-[color:var(--accent-primary-contrast)] shadow-[0_16px_36px_-22px_rgba(0,108,56,0.55)]"
                      : "border-[color:var(--surface-glass-border)]/60 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary-strong)]/45 hover:text-[color:var(--accent-primary-strong)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      selected
                        ? "bg-[color:var(--accent-primary-contrast)]"
                        : "bg-[color:var(--accent-primary-strong)]/40"
                    }`}
                    aria-hidden
                  />
                  {sport}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5 rounded-2xl border border-[color:var(--surface-glass-border)]/85 bg-[color:var(--surface-card-muted)]/70 p-5 sm:grid-cols-2">
          <div className="space-y-3">
            <SectionHeader
              icon={<EuroIcon className="h-4 w-4" />}
              eyebrow="Preisrange"
              title="Budget festlegen"
            />
            <div className="flex items-center gap-3">
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
                  className="theme-transition w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/85 py-2 pl-10 pr-3 text-sm font-medium text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
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
                  className="theme-transition w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/85 py-2 pl-10 pr-3 text-sm font-medium text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
                />
              </div>
            </div>
            <p className="text-xs text-[color:var(--text-secondary)]/75">
              Typische Buchungsfenster liegen zwischen 45&nbsp;€ und 70&nbsp;€ pro Stunde.
            </p>
          </div>
          <div className="space-y-3">
            <SectionHeader
              icon={<ClockIcon className="h-4 w-4" />}
              eyebrow="Öffnungszeiten"
              title="Verfügbare Slots"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onChange({ ...state, day: "" })}
                className={`theme-transition rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                  !state.day
                    ? "bg-[color:var(--accent-primary)] text-[color:var(--background-primary)]"
                    : "border border-[color:var(--border-subtle)]/70 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/40 hover:text-[color:var(--accent-primary)]"
                }`}
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
                    className={`theme-transition rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                      selected
                        ? "bg-[color:var(--accent-secondary)] text-[color:var(--background-primary)]"
                        : "border border-[color:var(--border-subtle)]/70 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/40 hover:text-[color:var(--accent-primary)]"
                    }`}
                  >
                    {weekdayLabels[day].slice(0, 2)}
                  </button>
                );
              })}
            </div>
            <p className="flex items-center gap-2 text-xs text-[color:var(--text-secondary)]/75">
              <ClockIcon className="h-4 w-4" />
              Zeigt nur Hallen an, die am gewählten Tag Slots anbieten.
            </p>
          </div>
        </section>

        <section className="space-y-5 rounded-2xl border border-[color:var(--surface-glass-border)]/82 bg-[color:var(--surface-card)]/68 p-5">
          <div className="flex items-center justify-between gap-4">
            <SectionHeader
              icon={<SparkleIcon className="h-4 w-4" />}
              eyebrow="Ausstattung"
              title="Features mit Icon-Guide"
              description="Hebe Essentials wie Duschen oder Premium-Ausstattung wie Videoanalyse hervor."
            />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-secondary)]/70">
              Tippe zum Aktivieren
            </span>
          </div>

          <div className="space-y-4">
            {amenityGroups.map((group) => (
              <div key={group.label} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-secondary)]/70">
                  {group.label}
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {group.items.map((amenity) => {
                    const selected = state.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        aria-pressed={selected}
                        className={`theme-transition flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-left text-sm ${
                          selected
                            ? "border-[color:var(--accent-primary)]/50 bg-[color:var(--accent-primary)]/12 text-[color:var(--accent-primary)] shadow-[0_14px_32px_-28px_rgba(10,90,60,0.6)]"
                            : "border-[color:var(--border-subtle)]/60 text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/35 hover:text-[color:var(--accent-primary)]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--surface-card-muted)]/80">
                            {getAmenityIcon(amenity)}
                          </span>
                          <span className="font-medium">{amenity}</span>
                        </span>
                          <span
                            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                              selected ? "text-[color:var(--accent-primary)]" : "text-[color:var(--text-secondary)]/60"
                            }`}
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
        </section>
      </div>

      <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 px-4 py-3 text-xs text-[color:var(--text-secondary)]">
        <span className="font-semibold text-[color:var(--accent-primary)]">Tipp:</span> Speichere deine Lieblingsfilter als Shortcut in deinem Profil.
      </div>
    </aside>
  );
}
