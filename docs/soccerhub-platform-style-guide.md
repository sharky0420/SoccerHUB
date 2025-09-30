# SoccerHUB Plattform – Layout & Style Guide

## Kontrast & Typografie
- Headlines: `--text-primary` (#F4FFF7) auf dunklem Glas-Hintergrund (`--surface-card`), Mindest-Kontrastverhältnis 4.8:1.
- Fließtext: `--text-secondary` (#B9CEC2) mit 85 % Deckkraft. Für Hinweise und Inline-Labels `--text-tertiary` (#7E9A8F) einsetzen.
- Buttons:
  - Primäre Aktionen (Live-Slots): Verlauf `linear-gradient(120deg,#006C38,#1FB864)` mit Schriftfarbe `--accent-primary-contrast` (#FFFFFF).
  - Sekundäre Aktionen (Anfrage): Hintergrund `--surface-card-muted` mit Text `--text-primary`.
- Eyebrow-Labels immer in Uppercase, Tracking `0.24em`, Farbe `--accent-primary-strong` (#3DFF94).

## Karten & Card-Spacings
- Filter-, Listen- und Kartenmodule nutzen ein einheitliches Polster: 32 px (desktop), 24 px (mobile) im Glas-Panel.
- Card-Radien: `rounded-3xl` (28 px) für Panels, `rounded-2xl` (20 px) für Unterkarten.
- Schatten: `shadow-[0_28px_96px_-70px_rgba(6,28,18,0.7)]` für Sekundärkarten, `shadow-[0_45px_160px_-100px_rgba(6,26,18,0.85)]` für Hauptpaneele.
- Spaltenabstände in Kartenrastern: 24 px mobile, 32 px ab `md`, 40 px in Split-Layout.

## Responsive Layout
- **Mobile ≤ 767 px**
  - Filterpanel als aufklappbares Modul mit `FilterIcon`, Standardzustand geschlossen.
  - Ergebnisliste in einer Spalte, Map-Toggle über „Liste/Map“-Button.
  - Google-Map unterhalb der Liste, wenn Map-View aktiv ist; CTA-Bar fix am unteren Bildschirmrand.
- **Tablet 768–1279 px**
  - Standardlayout gestapelt: Filter oben, danach Ergebnisliste, anschließend Map.
  - Layout-Toggle (`Gestapelt` / `Split Screen`) bleibt sichtbar, wechselt ab `lg` das Verhalten.
- **Desktop ≥ 1280 px**
  - Nutzer:innen können zwischen gestapelter Ansicht (Liste → Map) und Split-Screen (Liste + Map nebeneinander) wechseln.
  - Map-Panel erhält Sticky-Verhalten (`top: 9rem`) im Split-Modus.

## Google-Map Integration
- Skript-Loader erwartet `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. Ohne Key wird ein interaktiver Glas-Platzhalter mit denselben Pins gerendert.
- Pins verwenden Farbcode: Grün (`#1FB864`) für Live-Slots, Grau (`#7C8A82`) für Anfrage.
- Info-Windows zeigen Name, Stadt, Status, Preisindikator und CTAs („Jetzt buchen“ / „Anfrage senden“).

## Sticky CTA-Leiste
- Position: `fixed` am unteren Rand (`bottom: 1.5rem`), `pointer-events` deaktiviert, Buttons aktiv (`pointer-events-auto`).
- Enthält zwei Aktionen: „Jetzt buchen“ (primär) und „Demo anfragen“ (sekundär).
- Auf Desktop wie Mobile sichtbar, Überlappung mit Page-Content durch großzügige Bottom-Padding im Hauptlayout vermeiden.
