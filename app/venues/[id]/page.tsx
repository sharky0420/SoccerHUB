import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VenueDetail } from "@/components/venue-detail";
import { allVenues, getVenueById } from "@/lib/venues";

interface VenuePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return allVenues.map((venue) => ({ id: venue.id }));
}

export function generateMetadata({ params }: VenuePageProps): Metadata {
  const venue = getVenueById(params.id);
  if (!venue) {
    return {
      title: "Halle nicht gefunden",
    };
  }

  return {
    title: `${venue.name} in ${venue.city}`,
    description: venue.description,
    openGraph: {
      title: venue.name,
      description: venue.description,
      type: "article",
    },
  };
}

export default function VenuePage({ params }: VenuePageProps) {
  const venue = getVenueById(params.id);

  if (!venue) {
    notFound();
  }

  // TODO: Sobald eine Backend-API verfügbar ist, hier die Venue-Daten per fetch() laden.
  return <VenueDetail venue={venue} />;
}
