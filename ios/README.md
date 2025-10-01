# SoccerHUB Liquid Glass iOS App

This directory contains a fully wired Expo React Native application that implements the SoccerHUB "Liquid Glass" experience for iPhone.

## Features

- **Native navigation** with bottom glass tab bar, custom icons, and stack transitions for venue details.
- **Liquid glass visuals** using blurred panels, gradients, and frosted overlays optimised for performance.
- **Home screen** with map preview, quick filters, and interactive venue cards.
- **Detail screen** showcasing rich venue information, amenities, and booking CTA.
- **Supporting tabs** for favorites, filters, and profile placeholders ready for future expansion.

## Getting started

1. Install dependencies (requires Node.js 18+):

   ```bash
   cd ios
   npm install
   ```

2. Launch the Expo development server:

   ```bash
   npm run start
   ```

3. Press `i` to open the iOS simulator or scan the QR code with the Expo Go app on an iPhone.

## Project structure

```
ios/
├── App.tsx
├── app.json
├── assets/
├── src/
│   ├── components/
│   ├── data/
│   ├── navigation/
│   ├── screens/
│   ├── theme/
│   └── types/
└── package.json
```

## Next steps

- Connect the data layer to live APIs and enable authentication.
- Replace the static map tile with Mapbox or Apple MapKit for realtime interactivity.
- Implement the animated shrinking tab bar when scrolling, using `react-native-reanimated` shared values.
- Extend filter and favorites tabs with full feature sets and integrate Apple Pay booking flows.
