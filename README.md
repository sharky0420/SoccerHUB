# SoccerHUB – Live-Plattform für Indoor-Sporthallen

Dieses Projekt ist ein Next.js-14-Aufbau für SoccerHUB – eine deutschlandweite Übersicht über Fußballhallen, Padel-Center und funktionelle Trainingsflächen. Teams vergleichen Flächen, filtern nach Ausstattung und buchen über verifizierte Betreiber:innen.

## Quickstart

```bash
npm install
npm run dev
```

> Hinweis: In der bereitgestellten Umgebung können Registry-Policies die Installation von Paketen verhindern. In diesem Fall bitte lokal mit eigener npm-Konfiguration installieren.

## Features

- 📍 Listenansicht mit Filtern für Sportart (Fußball, Padel, Fitness), Ort, Preis, Öffnungszeiten und Ausstattung
- 🗂️ Sortierung nach Preis oder Name inkl. lazy geladenem „Mehr anzeigen“-Button
- 🖼️ Detailseite mit Galerie, Öffnungszeiten-Tabelle und CTA zur externen Buchung
- ⚡ App Router, Server Components und Client-Filter (Next.js 14 + TypeScript)
- 🎨 Tailwind CSS mit mobile-first Layout und modernen Karten
- 📁 Mock-Daten aus `data/venues.json` (kuratiertes Multi-Sport-Line-up)

## Struktur

```
app/
  layout.tsx         – Basislayout, SEO-Metadaten
  page.tsx           – Landingpage mit Filter-Liste
  venues/[id]/       – Detailseite + not-found
components/          – UI-Bausteine (FilterPanel, VenueCard, VenueDetail …)
data/venues.json     – Mock-Datenquelle
lib/venues.ts        – Hilfsfunktionen & spätere API-Hooks
```

## Weiterentwicklung

- Die Filter-Logik läuft aktuell clientseitig. Für Echtzeit-Verfügbarkeiten ist eine Backend-API vorgesehen.
- Bilder werden remote von Unsplash geladen. Eigene CDN-Domains lassen sich via `next.config.js` ergänzen.
- Für SEO können weitere Structured-Data-Snippets ergänzt werden.

Viel Erfolg beim Ausbau zum nächsten Release!
