# SoccerHUB iOS Liquid Glass App Mockups

## Overview
- **Platform:** iOS 26 (conceptual future release) applying the Liquid Glass design language with frosted translucency, luminous gradients, and refractive highlights.
- **Goal:** Translate SoccerHUB web experience (home/listing, venue detail) into a native iPhone application optimized for modern devices (iPhone 15/16 Pro, min width 390pt) with dynamic, fluid interactions and energy-efficient blur usage.
- **Navigation Model:** Five-tab maximum bottom tab bar with dynamic resizing on scroll, gesture-driven navigation (swipe back, drag-up bottom sheets), and context-aware overlays.

## Information Architecture
1. **Discover** (default tab)
   - Hybrid map + list layout of venues, primary filters, quick access to saved filters.
   - Floating action: Filter bottom sheet.
2. **Matches**
   - Upcoming bookings, match invitations, team coordination.
3. **Favorites**
   - Saved venues, quick rebooking.
4. **Clubs**
   - Local clubs, leagues, training sessions.
5. **Profile**
   - Account, payments, preferences, help center.

Tabs reduce height from 84pt (resting) to 54pt (scrolled) while maintaining 44pt tap targets. Home indicator spacing 12pt.

## Visual Style Guide
### Color & Materials
| Token | Usage | Value |
| --- | --- | --- |
| `bg.glass.primary` | Base background | Ultra-thin material, blur radius 22, vibrancy overlay #0A192F @ 16% opacity |
| `bg.glass.surface` | Cards, panels | Thin material, blur radius 18, tint gradient top #162D52 @ 32% → bottom #0B1A2E @ 48% |
| `bg.glass.alt` | Secondary surfaces | Ultra-thin, blur 14, tint #041022 @ 28% |
| `accent.primary` | CTAs | Linear gradient #37D67A → #1CB5E0 with refraction highlight |
| `accent.secondary` | Secondary actions | #4D9FFF |
| `accent.destructive` | Negative actions | #FF6B6B |
| `text.primary` | High contrast | #F5FAFF |
| `text.secondary` | Secondary text | #C5D3E6 |
| `text.tertiary` | Metadata | #8AA2C0 |
| `text.onAccent` | CTA text | #041022 |
| `border.luminous` | 1pt border | rgba(255,255,255,0.28) inner glow |
| `shadow.glass` | Depth | 0 12 40 rgba(4,16,34,0.42) |

### Typography
| Role | Font | Size/Weight | Tracking |
| --- | --- | --- | --- |
| Large Title | SF Pro Display | 34pt Bold | -1% |
| Heading | SF Pro Display | 28pt Semibold | -1% |
| Section Title | SF Pro Display | 20pt Semibold | -1% |
| Body | SF Pro Text | 17pt Regular | 0 |
| Caption | SF Pro Text | 13pt Medium | 2% |
| Micro Label | SF Pro Text | 11pt Medium (uppercase) | 6% |
| Button CTA | SF Pro Display | 19pt Semibold | 0 |

Line heights follow Apple defaults (Large Title 41pt, Body 22pt). Dynamic Type scaling supported up to Accessibility XL; ensure minimum contrast ratio 4.5:1 using vibrancy overlays.

### Iconography & Touch Targets
- Primary icons follow SF Symbols weight "Medium" with rendering mode hierarchical for depth.
- Minimum hit area 48x48pt; icons within glass chips centered with 12pt internal padding.
- Tab bar icons 28pt with 6pt spacing from label (SF Pro Text 11pt Medium).

### Spacing & Layout
- **Safe Areas:** 20pt horizontal inset for primary content, 16pt for cards, maintain 12pt clearance from notch and sensors.
- **Grid:** 4pt base unit. Core spacings: 12pt between cards, 24pt section padding, 16pt vertical rhythm.
- **Map/List Split:** 40% map (top) and 60% list (bottom) at rest. Map collapses to 20% when scrolling list.
- **Card Radius:** 24pt top corners, 18pt bottom corners for glass panels; continuous curves on tab bar (36pt radius).
- **Elevation Tiers:**
  - Level 0 background glass (blur 22, opacity 0.32)
  - Level 1 cards/sheets (blur 18, opacity 0.46)
  - Level 2 floating actions (blur 12, opacity 0.62)

### Blur & Transparency Guidelines
- Maximum two stacked translucency layers to maintain performance.
- Use `UIBlurEffectStyle.systemUltraThinMaterialDark` for background, `systemThinMaterialDark` for cards.
- Apply vibrancy via `UIVibrancyEffect` for titles and CTA text.
- Increase saturation subtly (1.12) when content scrolls under glass nav to preserve contrast.

## Component Library
### 1. Navigation Bar (Discover)
- Height 108pt (expanded), 72pt (collapsed).
- Contains: Location selector pill (glass), search field (rounded 20pt), quick filter chips.
- Glass panel with top luminous highlight (inner shadow, 2pt).
- Scroll interaction: Search shrinks to 44pt height, filter chips fade to horizontal scroll.

### 2. Bottom Tab Bar
- Frosted glass capsule anchored to safe area.
- Icons 28pt with 44pt hit area. Active tab uses accent gradient with light refraction sparkle (animated).
- On scroll: tab bar height transitions from 84pt → 54pt, background opacity increases from 0.42 → 0.62 for readability.

### 3. Venue Card
- 320pt width (full bleed minus margins) x 180pt height.
- Foreground: Title (SF Pro Display 20pt), rating pill, price tag in accent secondary.
- Background: Edge-to-edge photo blurred with overlay gradient top-to-bottom for text legibility.
- Interaction: Tap expands to detail page with shared element transition (image morphs, card corners animate to 0pt).

### 4. Filter Bottom Sheet
- Presented via `UISheetPresentationController` with detents: 140pt (peek), 340pt (half), 620pt (full).
- Glass surface with segmented control for "Indoor/Outdoor", slider chips (price, distance), toggle rows (amenities).
- Close handle: luminous capsule 60x6pt.

### 5. Map Pins & Overlays
- Pin: Glass teardrop with accent glow, 44pt height. Selected state expands to 120pt info bubble (glass) with quick actions (Call, Book, Details).
- Map overlays use Material dark blur with 18pt radius and border luminance.

### 6. Detail Header
- Full-width hero image with parallax, layered glass overlay containing venue name, rating, price per hour, and Book button.
- Book button: 56pt height, gradient accent, soft specular highlight, 12pt inner padding, haptic feedback on tap.

### 7. Amenity Chips
- Glass capsules 32pt height, icon left 20pt, text 15pt medium. Selected state intensifies tint and adds luminous border.

### 8. Gallery Carousel
- Horizontal paging (snap). Each image 280x180pt with glass metadata overlay (photo credit, angle).

### 9. Info Rows & Pills
- List rows 64pt height with icon (20pt), title, secondary text, trailing value.
- Pills 36pt height for filters; active state increases opacity + luminous border.

## Screen Mockups
### Layout Blueprint — Discover (Home / Listing)
| Region | Frame (pt) | Content |
| --- | --- | --- |
| Status & Nav | 0–132 | Status bar 0–59, navigation bar 60–132 (expanded) with large title and search |
| Map Layer | 132–360 | Map view 3D, floating filter button anchored bottom-right |
| Quick Filters | 360–420 | Horizontal chips (scrollable) |
| Venue List | 420–812 | Vertical scroll cards (3 visible, continue below) |
| Tab Bar | 812–896 | Glass tab bar resting height 84pt |

Visual treatments:
- Background gradient (#020817 → #091B33) with subtle particle shimmer.
- Map integrates depth using specular overlays and parallax relative to device tilt (Core Motion).
- Venue cards animate in with 40ms stagger on first load.

### Layout Blueprint — Venue Detail
| Region | Frame (pt) | Content |
| --- | --- | --- |
| Hero | 0–320 | Full-bleed image with status/nav overlays |
| Key Info Panel | 280–420 | Overlapping glass card with name, rating, price, Book Now CTA |
| Segmented Control | 420–468 | Sticky glass segmented control |
| Content Sections | 468–780 | Hours, amenities grid, packages accordion, gallery carousel |
| Map & Directions | 780–900 | Embedded mini-map with glass overlay and CTA |
| Reviews | 900–1200 | Review cards, filter chips |
| Persistent CTA | Anchored bottom | Glass bar with price summary + Reserve button |

State variations:
- When scrolled past hero midpoint, nav bar transitions to 64pt height with solid glass and displays venue name + share/save buttons inline.
- If venue closed, price CTA dims to 80% opacity and copy changes to "Join Waitlist" with accent secondary.

## Interaction Flows
1. **Discover → Filter:** Tap floating filter button → bottom sheet lifts to half detent, background dims. User adjusts sliders (distance 0–25 miles) and toggles amenities. Apply button pulsates once when filter applied, sheet dismisses to peek state.
2. **Map Pin Selection:** Tap pin → info bubble expands, list auto-scrolls to corresponding card with highlight pulse (accent secondary outline 2pt).
3. **Card to Detail:** Shared element transition. Scroll position remembered; swiping back collapses hero image and returns to list at previous offset.
4. **Booking:** Reserve button opens bottom sheet summary with time slot picker, payment methods, confirm CTA. Sheet uses same glass styling with elevated blur 20.

## Animation & Transition Concepts
- **Tab Bar Shrink:** Animate height reduction over 220ms cubic-bezier(0.25, 0.1, 0.25, 1). Icons slide slightly upward (4pt) and labels fade to 80% opacity.
- **Card → Detail Transition:** Shared element: hero image scales, glass card morphs into detail header. Background blur increases from 18 → 24 radius, text crossfades.
- **Filter Sheet:** Presented with spring (mass 1.0, stiffness 280, damping 30). Background map dims via vibrancy overlay 12% opacity. Sheet rubber-bands at detent boundaries.
- **Map to List Focus:** When user drags list up, map compresses with parallax and subtle blur; when list released, map re-expands with ease-out (0.3s).
- **Pull-to-Refresh:** Liquid ripple effect: glass layer ripples downward with specular highlight.
- **Booking CTA Appear:** On entering detail page, CTA slides up from bottom with opacity fade and blur reduction (sigma 30 → 12).
- **Reduced Motion:** Prefer crossfades and direct position transitions when `reduceMotion` enabled; disable ripple effects.

## Accessibility Considerations
- Support VoiceOver with descriptive labels for map pins, filter controls, booking button.
- Maintain minimum 44x44pt tap targets, even when tab bar shrinks.
- Provide haptic feedback for key actions: filter applied, booking success.
- Offer "Reduce Transparency" fallback: switch to solid dark surfaces while maintaining contrast.
- Ensure text over glass surfaces uses vibrancy or fallback to solid backgrounds when contrast < 4.5.

## Implementation Notes
- Use `UIVisualEffectView` with `UICornerMask` for custom glass shapes.
- Prefer `CABasicAnimation` with additive blur transitions for performance.
- Leverage `UICollectionViewCompositionalLayout` for list sections with nested groups to respect safe areas.
- Cache blurred backgrounds for hero images to reduce GPU load.
- Apply real-time lighting highlights using `CALayer` gradient overlays rather than expensive particle systems.

