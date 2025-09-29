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
    <article className="container-narrow space-y-10">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="relative h-80 overflow-hidden rounded-3xl bg-slate-200 shadow-soft">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {venue.images.slice(1).map((image, index) => (
            <div key={image} className="relative h-36 overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src={image}
                alt={`${venue.name} impression ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{venue.name}</h1>
          <p className="text-slate-500">{venue.address}</p>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm text-slate-600 md:items-end">
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-400">Preis pro Stunde</p>
            <p className="text-2xl font-semibold text-primary">{venue.pricePerHour.toFixed(0)} €</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {venue.sports.map((sport) => (
              <span key={sport} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {sport}
              </span>
            ))}
          </div>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Jetzt auf externer Seite buchen
          </a>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Über die Halle</h2>
          <p className="text-base leading-relaxed text-slate-600">{venue.description}</p>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Ausstattung</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {venue.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Öffnungszeiten</h2>
            <table className="mt-4 w-full border-separate border-spacing-y-2 text-sm text-slate-600">
              <tbody>
                {(Object.keys(weekdayLabels) as Weekday[]).map((day) => {
                  const hours = venue.openingHours[day];
                  return (
                    <tr key={day}>
                      <td className="font-medium text-slate-700">{weekdayLabels[day]}</td>
                      <td className="text-right">
                        {hours ? `${hours.open} - ${hours.close}` : "geschlossen"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Nächste Schritte</p>
            <p>
              Für Live-Verfügbarkeiten oder Reservierungen wird die Halle direkt auf ihrer Website gepflegt. Eine API-Anbindung ist im nächsten Release-Plan vorgesehen.
            </p>
            <Link href="mailto:partner@turftime.app" className="font-medium text-primary">
              Betreiber:in? Jetzt Kontakt aufnehmen
            </Link>
          </div>
        </aside>
      </section>
    </article>
  );
}
