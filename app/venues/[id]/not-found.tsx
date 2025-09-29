import Link from "next/link";

export default function VenueNotFound() {
  return (
    <div className="container-narrow flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Diese Halle konnten wir nicht finden.</h1>
      <p className="text-slate-500">Vielleicht wurde sie umbenannt oder steht gerade nicht zur Verfügung.</p>
      <Link
        href="/"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
      >
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
