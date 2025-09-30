# SoccerHUB UI Style Guide

Die folgenden Richtlinien dokumentieren das visuelle Redesign der Venue-Übersicht. Sie dienen als Referenz für Produkt-, Design- und Engineering-Teams.

## Farbwelt

| Rolle | Light Mode | Dark Mode | Beschreibung |
| --- | --- | --- | --- |
| Primärer Hintergrund | `#F2F7F3` | `#050B09` | Großflächige Hintergründe, Screen-Fill, Map-Canvas |
| Elevierter Hintergrund | `rgba(255,255,255,0.92)` | `rgba(10,20,18,0.88)` | Karten, Panels, Sticky Filter |
| Akzent Grün | `#009F54` | `#32FF88` | Primäre Call-to-Action, Badges, Live-Indikatoren |
| Akzent Hellgrün | `#47F38B` | `#8AFFC4` | Hover-Zustände, Gradients, Status „Auf Anfrage“ |
| Text Primär | `#03160B` | `#ECFFF1` | Headlines, Fließtext |
| Text Sekundär | `#2C4D39` | `#8AD1A5` | Meta-Informationen, Legenden |
| Border Subtle | `rgba(0,107,53,0.28)` | `rgba(50,255,136,0.36)` | Glaspanel-Ränder, Karten-Trennlinien |

> Tipp: Für Highlights kombinieren wir weiche Glas-Layer mit subtilen Schatten (`0 32px 140px -80px rgba(6,36,22,0.8)`).

## Typografie

- **Primärfont:** [Inter](https://rsms.me/inter/) (variable, `--font-inter`)
- **Größen-Hierarchie:**
  - Hero H1: 56/64 px (`text-5xl`, tight leading)
  - Sekundäre Headline: 28/34 px (`text-3xl`)
  - Karten-Titel: 26/32 px (`text-[1.65rem]`)
  - Body-Text: 16/24 px (`text-sm` – `text-base`)
  - Meta/Label: 11/14 px (`uppercase`, Tracking 0.2–0.32em)
- **Mix aus Groß-/Kapitälchen** sorgt für sportlichen Charakter. Labels immer in Versalien mit erweitertem Tracking setzen.

## Iconografie

Die Icon-Bibliothek lebt im Projekt unter `components/icons.tsx` und stellt schlanke, abgerundete Outline-Symbole bereit.

- **Standort & Orientierung:** `MapPinIcon`, `TargetIcon`
- **Preis & Buchung:** `EuroIcon`, `BadgeCheckIcon`
- **Amenities:** Dedizierte Icons für Duschen, Umkleiden, Parking, WLAN, Café/Gastro, Shop, Kartenzahlung, Barrierefreiheit, Klimaanlage, Gym, Pool, Sauna, LED-Flutlicht, Kurse, Leih-Equipment u. a.
- **Statusfarben:**
  - „Live frei“ → grüner Badge (`accent-primary`)
  - „Auf Anfrage“ → hellgrün/sekundär (`accent-secondary`)
  - „Verfügbarkeit prüfen“ → neutrale Linienfarbe (`border-subtle`)

## Komponenten-Prinzipien

### Filter Sidebar
- Gruppierung nach **Standort**, **Sportarten**, **Preis/Öffnungszeiten**, **Ausstattung**.
- Chips & Toggles nutzen `uppercase` Labels, Icons als primäre Erkennungsanker.
- Geo-CTA „Near Me“ löst Geolocation aus und nutzt `TargetIcon`.

### Venue Card
- Hero-Bild mit verifiziertem Badge, Location-Bubble und weichem Gradient.
- Headline + Preisbadge oben, darunter Opening-Summary (`ClockIcon`) & Availability-Badge.
- Zwei Info-Kacheln: „Preis & Buchung“ + „Live Status“.
- Amenity-Gitter zeigt bis zu 6 Features inkl. Icon.
- Buttons: „Details ansehen“ (outline), „Jetzt buchen“ (Gradient CTA).

### Map View
- Glas-Panel mit Grid-Overlay und Pins je Stadt; Pins zeigen Venue-Count + Ø Preis.
- Desktop: fix rechts angeordnet, Mobile: Toggle „Map“ innerhalb der Ergebnis-Card.

## Responsives Verhalten

- **Desktop ≥ 1280px:** Dreispaltiges Layout (Filter – Liste – Karte).
- **Tablet 768–1279px:** Filter links, Kartenliste rechts, Map über Toggle sichtbar.
- **Mobile ≤ 767px:** Filter als Sticky-Panel, Top-Bar mit Switch „Liste/Map“, Karten in 1-Spalten-Layout mit großzügigen Abständen.

## Anwendungsbeispiele

- `components/filter-panel.tsx`: Beispiel für Icon-Toggles, Near-Me Badge, Preisrange.
- `components/filterable-venue-list.tsx`: Desktop/ Mobile-Switching + Sortierung.
- `components/venue-card.tsx`: Modernisierte Card inkl. Availability, Amenities, CTA.
- `components/venue-map.tsx`: Map Integration mit Pins, Legende und Click-to-Filter.

Diese Style-Guidelines bilden die Basis für kommende Erweiterungen (z. B. Padel-spezifische Layouts, Betreiber-Dashboards). Ergänzungen bitte als Erweiterung dieses Dokuments pflegen.
