# Turftime Football Platform Design System

## Brand Essence
- **Core idea:** Connecting players to the perfect soccer hall with speed and clarity.
- **Visual tone:** Energetic yet composed, blending the precision of elite football with Apple-inspired refinement.
- **Aesthetic pillars:**
  1. **Pitch Immersion:** Grass-green accents, subtle turf textures, circular motifs evoking footballs.
  2. **Liquid Glass:** Frosted translucency, floating layers, and gentle depth.
  3. **Motion Clarity:** Smooth, purposeful transitions that reinforce a sense of play.

---

## Color System

### Light Mode
| Role | Color | Notes |
| --- | --- | --- |
| Background Primary | `#f8f9fb` | Soft ivory white with slight cool tint. |
| Background Elevated | `rgba(255, 255, 255, 0.75)` | Glass panels with 16px blur backdrop. |
| Surface Card | `rgba(255, 255, 255, 0.85)` | Apply 12px blur and soft shadow `0 18px 40px -24px rgba(0, 45, 15, 0.35)`. |
| Primary Accent | `#007f3a` | Deep turf green used for CTAs, highlights. |
| Secondary Accent | `#00c76f` | Bright highlight for hover glows, active chips. |
| Text Primary | `#09140f` | Rich charcoal for maximum contrast. |
| Text Secondary | `#3d5148` | Muted green-grey for body copy. |
| Border/Subtle Divider | `rgba(0, 127, 58, 0.18)` | 1px strokes on cards, chips. |
| Status Success | `#24c07a` | Booking confirmations. |
| Status Warning | `#f7b500` | Limited availability alerts. |
| Status Error | `#ff4d4f` | Booking issues or errors. |

### Dark Mode
| Role | Color | Notes |
| --- | --- | --- |
| Background Primary | `#0b0c0f` | Deep charcoal. |
| Background Elevated | `rgba(12, 18, 20, 0.72)` | 20px blur for glass navigation. |
| Surface Card | `rgba(18, 25, 28, 0.68)` | 18px blur, inner border `1px rgba(77, 255, 136, 0.2)`. |
| Primary Accent | `#4dff88` | Neon pitch-light green for key actions. |
| Secondary Accent | `#2aff6a` | Lighter accent for focus rings and active states. |
| Text Primary | `#f6fff6` | Near-white for high legibility. |
| Text Secondary | `#a6d6b3` | Muted mint for supporting text. |
| Border/Subtle Divider | `rgba(77, 255, 136, 0.25)` | Use on card outlines, separators. |
| Status Success | `#4dff88` | Reinforces accent for success. |
| Status Warning | `#ffd666` | Warm contrast on dark backgrounds. |
| Status Error | `#ff7875` | Clear error messaging. |

### Gradients & Texture
- **Pitch Gradient:** `linear-gradient(135deg, rgba(0,127,58,0.85), rgba(0,199,111,0.65))` for hero backgrounds.
- **Turf Texture Overlay:** Subtle noise texture (1-2% opacity) applied to hero sections for a grass feel.
- **Glow Accent:** Outer glow `0 0 24px rgba(77, 255, 136, 0.45)` on hover/focus of primary buttons in dark mode; `rgba(0, 127, 58, 0.35)` in light mode.

---

## Typography
- **Primary Typeface:** Inter (fallbacks: `"SF Pro Text", "SF Pro Display", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`).
- **Heading Style:**
  - Display (Hero): 64/72, weight 700, letter-spacing -1.5px, gradient text (accent-to-neutral) for hero overlays.
  - H1: 48/56, weight 700, letter-spacing -0.5px.
  - H2: 36/44, weight 600, letter-spacing -0.25px.
  - H3: 28/36, weight 600.
- **Body Copy:**
  - Body Large: 18/28, weight 400, comfortable reading.
  - Body Default: 16/26, weight 400.
  - Caption: 14/20, weight 500 for chip labels and metadata.
- **Label/Overline:** 12/16 uppercase with tracking 0.12em for section tags (e.g., “Top Venues”).

### Typographic Treatments
- Utilize generous letter-spacing in all-caps labels to mirror jersey typography.
- Use motion transitions (150ms ease) for text color changes between light/dark mode.

---

## Core Components

### Venue Cards
- **Shape:** 20px rounded corners, 1px semi-transparent border (mode-dependent), frosted glass backdrop blur (12-18px).
- **Content Layout:**
  - Top: 16:9 venue photo with curved top corners.
  - Middle: Venue name (H3) with accent underline animation on hover.
  - Meta row: Icons for surface type, capacity, location using thin outline symbols.
  - Footer: Pricing, availability status chip, primary CTA button (“View Slots”).
- **Interactions:**
  - Hover: Elevation increase (translateY(-6px)), soft shadow, accent glow on CTA.
  - Focus: Outline `2px` accent color + glow.

### Filter Chips
- **Form:** Pill shape (height 36px desktop / 32px mobile). Padding 16px horizontal, 12px vertical.
- **States:**
  - Default: Glass background (`rgba(255,255,255,0.45)` light, `rgba(18,25,28,0.55)` dark) with subtle border.
  - Hover: Slight scale 1.03, accent-colored text.
  - Active: Filled with primary accent, text white/dark charcoal depending on mode, add subtle inner glow.
- **Icons:** Optional leading outline icon (16px) aligned with label.

### Buttons
- **Primary CTA:**
  - Shape: 16px radius, padding 14x24.
  - Fill: Primary accent; text white (light mode) or charcoal (dark mode depending on contrast).
  - Hover: Glow ring (see Glow Accent) + translateY(-2px).
  - Active/Pressed: Darken accent by 10%, remove glow.
- **Secondary:** Glass background with accent border; on hover, accent fills from center via radial wipe.
- **Icon Buttons:** Circular (44px) with center icon, used for map toggle and booking actions.

### Navigation Bar
- **Structure:** Floating glass bar anchored top center with max-width 1180px, 24px padding, 24px radius.
- **Contents:** Logo (circular badge), nav links with generous spacing (24px), primary button (“Find Venues”), theme toggle.
- **Effects:**
  - Backdrop blur (20px), translucent background (mode dependent), delicate bottom border.
  - Scroll behavior: Shrinks height from 80px to 64px with smooth transition and subtle drop shadow appearing.

### Additional Elements
- **Cards / Panels:** Use layered glass panels with 8px separation, incorporate curved corner notch inspired by penalty area arcs.
- **Tag Pills:** For features like “Indoor”, “5-a-side” using accent outlines.
- **Map Modal:** Fullscreen overlay with frosted background, cards docked on right side.

---

## Responsive Layout Grid
- **Desktop (≥1280px):** 12-column grid, 80px margins, 24px gutters. Venue cards span 4 columns.
- **Tablet (768–1279px):** 8-column grid, 40px margins, 20px gutters. Venue cards span 4 columns (two per row).
- **Mobile (≤767px):** 4-column grid, 20px margins, 16px gutters. Venue cards span all 4 columns; filter chips become horizontally scrollable.
- **Spacing Scale:** 4px base unit, recommended increments: 4, 8, 12, 16, 24, 32, 48, 64.

---

## Motion & Interaction
- **Duration:** 150–250ms ease in-out for most transitions; 400ms for hero/section transitions.
- **Easing:** `cubic-bezier(0.33, 1, 0.68, 1)` to emulate kinetic football motion.
- **Micro-interactions:**
  - Filter chips animate background fill using scale/opacity.
  - Venue cards animate icons with subtle slide-in on hover.
  - Navigation bar theme toggle uses rotating ball icon.

---

## Theme Switching
- Automatic detection via `prefers-color-scheme`, with manual toggle overriding preference.
- Colors and shadows adjust per theme; ensure glass backgrounds update blur and border treatments.
- Maintain consistent luminance levels for accessibility (contrast ratio ≥ 4.5 for body text).

---

## Illustration Style (Optional)
- **Style:** Flat minimal illustrations with dynamic swooshes and circular gradients.
- **Elements:** Players mid-kick, goalposts, and abstract pitch diagrams.
- **Palette:** Use accent greens with muted neutrals (`#d8e4dc`, `#2f3633`) and occasional orange pop (`#ffb347`).
- **Usage:** Hero sections, onboarding slides, empty states. Integrate semi-transparent overlays to maintain liquid-glass cohesion.

---

## Iconography
- Base on thin outline style akin to SF Symbols.
- Key icons: location pin, calendar, surface type, clock, team size, amenities.
- Stroke weight 1.5px; maintain consistent corner radii and use accent colors sparingly.

---

## Accessibility & Best Practices
- Minimum touch targets: 48px.
- Provide text alternatives for all icon-only controls.
- Ensure glassmorphism never compromises contrast; add solid backing for text when necessary.
- Support keyboard navigation with clear focus rings (`2px` accent glow) and skip links.

