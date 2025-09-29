import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/types/venue";

interface VenueCardProps {
  venue: Venue;
}

const sportColors: Record<string, string> = {
  Soccer: "bg-primary/10 text-primary",
  Padel: "bg-secondary/20 text-primary",
  Futsal: "bg-indigo-100 text-indigo-600",
};

export function VenueCard({ venue }: VenueCardProps) {
  const heroImage = venue.images[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{venue.name}</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {venue.city}
          </span>
        </div>
        <p className="line-clamp-3 text-sm text-slate-600">{venue.description}</p>
        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport) => (
            <span
              key={`${venue.id}-${sport}`}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${sportColors[sport] ?? "bg-slate-100 text-slate-600"}`}
            >
              {sport}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between text-sm font-medium">
          <span className="text-slate-500">ab</span>
          <span className="text-lg text-primary">{venue.pricePerHour.toFixed(0)} €</span>
          <span className="text-slate-500">/ Std.</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/venues/${venue.id}`}
            className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
