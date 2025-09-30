# Sports Hub UI Style Guide

Die folgenden Richtlinien dokumentieren das visuelle Redesign der Venue-Übersicht. Sie dienen als Referenz für Produkt-, Design- und Engineering-Teams.

## Farbwelt

| Rolle | Token | Light Mode | Dark Mode | Beschreibung |
| --- | --- | --- | --- | --- |
| Primärer Hintergrund | `--background-primary` | `#F2F6F3` | `#050B09` | Großflächige Hintergründe, Screen-Fill, Map-Canvas |
| Elevierter Hintergrund | `--background-elevated` | `rgba(255,255,255,0.94)` | `rgba(10,20,18,0.88)` | Hero-Container, Sticky Filter |
| Glas-Karte | `--surface-card` | `rgba(255,255,255,0.97)` | `rgba(18,30,27,0.84)` | Karten, Panels, Popovers |
| Glas-Veil Overlay | `--surface-overlay` | `rgba(255,255,255,0.90)` | `rgba(10,24,19,0.86)` | Text-Hintergründe über Bild/Grasflächen |
| Primärer Akzent | `--accent-primary` | `#00864A` | `#2BE370` | Primäre Call-to-Action, Availability „Live frei“ |
| Akzent Fokus | `--accent-primary-strong` | `#006C38` | `#1BB95A` | Hover/Active States, Outline, Icon-Tint |
| Sekundärer Akzent | `--accent-secondary` | `#39D67D` | `#5CFF99` | Hover-Glows, Status „Auf Anfrage“ |
| Text Primär | `--text-primary` | `#04160E` | `#ECFFF1` | Headlines, Fließtext |
| Text Sekundär | `--text-secondary` | `#1F3A2A` | `#9FDCB7` | Meta-Informationen, Legenden |
| Text Tertiär | `--text-tertiary` | `#3F5D4B` | `#6FA887` | Dezentere Labels, Unterzeilen |
| Text Invers | `--text-inverse` | `#FFFFFF` | `#04150D` | Buttons, Badges auf dunklen Hintergründen |
| Glas-Rand | `--surface-glass-border` | `rgba(0,98,51,0.32)` | `rgba(50,255,136,0.36)` | Glaspanel-Ränder, Chips |
| Shadow Soft | `--shadow-soft` | `0 32px 100px -60px rgba(5,57,31,0.55)` | `0 40px 120px -70px rgba(50,255,136,0.32)` | Depth für Cards, Panels |
| Shadow Veil | `--shadow-veil` | `0 28px 90px -60px rgba(8,50,28,0.55)` | `0 30px 90px -60px rgba(18,80,46,0.48)` | Text-Veil-Hintergründe |

> Tipp: Kombiniere Glasflächen mit der neuen `.glass-veil` Utility, um Text vom grünen Pitch zu lösen und gleichzeitig die fließende Ästhetik zu behalten.

## Typografie

- **Primärfont:** [Inter](https://rsms.me/inter/) (variable, `--font-inter`)
- **Größen-Hierarchie (Desktop/Mobile):**
  - Hero H1: 56/64 px (`text-5xl` ≥1024px, `text-4xl` mobile) – immer `font-bold`.
  - Sekundäre Headline: 32/40 px (`text-[2rem]`), `font-semibold`.
  - Karten-Titel: 27/34 px (`text-[1.7rem]`), `font-bold`.
  - Body-Text: 18/28 px (`text-base` – `text-lg`), `font-normal`.
  - Meta/Label: 12/16 px (`text-xs`) in Versalien mit Tracking 0.22–0.3em – Mindestgröße 12px auch mobil.
- **Kontrast:** Primärtexte erreichen ≥ 8:1 auf `--surface-card`, sekundäre Texte ≥ 4.5:1. Auf Glasflächen zusätzlich `.glass-veil` oder `bg-black/60` einsetzen.
- **Label-Stil:** All-Caps mit sportlicher Tracking-Weite bleiben, jedoch nur auf saturierten Hintergründen mit ausreichend Padding (≥ 12px vertikal) einsetzen.

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
- Content-Bereich nutzt `.glass-veil` für kontrastreiche Glas-Layer mit weichem Schatten.
- Headline (bold) + Preisbadge mit dunklerem Grünton (`--accent-primary-strong`) für 7:1 Kontrast.
- Öffnungszeiten-Chip erhält soliden weißen/neutralen Untergrund; Availability-Badge färbt sich vollflächig (weiß auf Grün bzw. Dunkelgrün auf Hellgrün).
- Zwei Info-Kacheln bleiben, jedoch mit höheren Lesbarkeitswerten (Body `text-sm` ≥ 16px) und deutlicher Trennung der Texte (`text-tertiary`).
- Amenity-Gitter verwendet monochrome Icons auf neutralem Pill, Schatten separiert vom Hintergrund.
- Buttons: Outline-Variante mit farbigem Hover, CTA mit kontrastreichem Verlauf + größerem Shadow (`hover:brightness-[1.03]`).

### Map View
- Glas-Panel mit Grid-Overlay und Pins je Stadt; Pins zeigen Venue-Count + Ø Preis.
- Desktop: fix rechts angeordnet, Mobile: Toggle „Map“ innerhalb der Ergebnis-Card.

## Kontrast- & Lesbarkeitsrichtlinien

- **Text auf Glasflächen:** immer `.glass-veil` oder `bg-black/60` verwenden, um den Mindestkontrast einzuhalten. Zusätzlich leichte Textschatten (`text-shadow: 0 1px 6px rgba(2,21,12,0.35)`) für heroische Headlines.
- **Buttons:** Primäre CTAs erhalten `--accent-primary-strong` mit Weiß (`--text-inverse`). Hover verdunkelt Startfarbe um 10 %, Fokus-Ring mit `--accent-secondary-strong` (`outline-offset: 2`).
- **Badges:** Vollflächig gefüllt. „Live frei“ → dunkles Grün + weiße Schrift; „Auf Anfrage“ → helles Grün + `--pitch-dark` Text; „Verfügbarkeit prüfen“ → neutrales Glas + `text-secondary`.
- **Meta-Text:** Mindestens 12px (`text-xs`) – keine 11px Labels mehr. Auf dunklen Flächen `text-white`/70 nur mit solider Unterlage.

## Button & CTA Guidelines

- **Primary („Jetzt buchen“ / „Hallen entdecken“)**
  - Verlauf `linear-gradient(120deg, rgba(0,108,56,1), rgba(31,184,100,0.92))`.
  - Textfarbe `--accent-primary-contrast`, Padding 14×28, Radius 9999px.
  - Hover: leichte Helligkeitserhöhung (`brightness 1.03`) + verstärkter Shadow (`0 28px 82px -28px rgba(0,108,56,0.75)`).
  - Fokus: Outline `2px` in `--accent-secondary-strong`, Offset 2px.
- **Secondary („Details ansehen“ / „Demo anfragen“)**
  - Glas-Hintergrund mit Border `--surface-glass-border` und Text `--text-primary`.
  - Hover: Border färbt sich `--accent-primary`, Hintergrund wird opaker.
  - Disabled: Border `color-mix(..., 18%)`, Text `text-tertiary`.
- **Chip/Button Hybrid:** Für Filter-Chips und Availability-Badges gilt 44px Min-Höhe und klare Füllfarbe.

## Farb-Token-Empfehlungen

| Anwendungsfall | Token-Kombi | Hinweise |
| --- | --- | --- |
| Live-Verfügbarkeit | `--accent-primary-strong` + `--text-inverse` | Mindestens 14px Text, Schatten zur Abhebung nutzen. |
| Auf Anfrage | `--accent-secondary-strong` + `--pitch-dark` | Kontrast ≥ 7:1, nicht auf transparente Hintergründe legen. |
| Preise | `--accent-primary-strong` Text auf `--surface-card` | Preisgröße `text-lg`, `/ Stunde` in `text-tertiary`. |
| Karten-Body | `.glass-veil` + `text-secondary` | Sorgt für Blur, Border & Shadow ohne harte Flächen. |
| Icons | Monochrom (`currentColor`) | Farbe ableiten aus `--accent-primary-strong` oder `--text-secondary`. |

## Responsives Verhalten

- **Desktop ≥ 1280px:** Dreispaltiges Layout (Filter – Liste – Karte).
- **Tablet 768–1279px:** Filter links, Kartenliste rechts, Map über Toggle sichtbar.
- **Mobile ≤ 767px:** Filter als Sticky-Panel, Top-Bar mit Switch „Liste/Map“, Karten in 1-Spalten-Layout mit großzügigen Abständen.

### Responsive Mockups (Kontrast-Update)

**Desktop**
- Hero: 2-spaltiges Layout, linke Spalte mit `.glass-veil`, Buttons prominent nebeneinander. Rechts Dashboard-Mock mit dunklem Overlay für 8:1 Textkontrast.
- Venue Cards: Drei Spalten, jede Card mit sichtbarer Glas-Veil, Preisbadge oben rechts, CTA-Bar sticky am Card-Footer.
- Filter Panel: Glas-Panel mit klaren Sektionen; aktive Chips vollständig gefüllt.

**Mobile**
- Hero-Stack: Buttons untereinander (Primary oben), Meta-Chips im horizontalen Scroll mit soliden Hintergründen.
- Venue Card: Bild oben, darunter Glas-Veil Content mit großzügigem Padding (24px). Labels `text-xs`, Body `text-base`.
- CTA-Footer: Primary Button full-width, Secondary als Ghost darunter; beide mit klaren Fokus-Ringen.
- Filter/Map Toggle: Große 48px Buttons, Text weiß auf `--accent-primary-strong`.

## Anwendungsbeispiele

- `components/filter-panel.tsx`: Beispiel für Icon-Toggles, Near-Me Badge, Preisrange.
- `components/filterable-venue-list.tsx`: Desktop/ Mobile-Switching + Sortierung.
- `components/venue-card.tsx`: Modernisierte Card inkl. Availability, Amenities, CTA.
- `components/venue-map.tsx`: Map Integration mit Pins, Legende und Click-to-Filter.

Diese Style-Guidelines bilden die Basis für kommende Erweiterungen (z. B. Padel-spezifische Layouts, Betreiber-Dashboards). Ergänzungen bitte als Erweiterung dieses Dokuments pflegen.
