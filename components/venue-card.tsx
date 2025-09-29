import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/types/venue";

interface VenueCardProps {
  venue: Venue;
}

const sportColors: Record<string, string> = {
  Soccer: "bg-primary/30 text-white",
  Padel: "bg-secondary/40 text-slate-900",
  Futsal: "bg-indigo-400/30 text-indigo-50",
};

export function VenueCard({ venue }: VenueCardProps) {
  const heroImage = venue.images[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-[0_35px_80px_-45px_rgba(8,47,73,0.85)] backdrop-blur transition hover:-translate-y-2 hover:shadow-[0_45px_120px_-40px_rgba(8,47,73,0.95)]">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{venue.name}</h3>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
            {venue.city}
          </span>
        </div>
        <p className="line-clamp-3 text-sm text-slate-200">{venue.description}</p>
        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport) => (
            <span
              key={`${venue.id}-${sport}`}
              className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${sportColors[sport] ?? "bg-white/20 text-slate-200"}`}
            >
              {sport}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200">
          <span>ab</span>
          <span className="text-xl font-semibold text-secondary">{venue.pricePerHour.toFixed(0)} €</span>
          <span>/ Std.</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/venues/${venue.id}`}
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-primary/60 hover:bg-primary/80"
          >
            Details
          </Link>
          <a
            href={venue.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-gradient-to-r from-primary via-primary/80 to-secondary px-4 py-2 text-center text-sm font-semibold text-white shadow-[0_20px_45px_-30px_rgba(14,124,123,0.85)] transition hover:brightness-110"
          >
            Jetzt buchen
          </a>
        </div>
      </div>
    </article>
  );
}
