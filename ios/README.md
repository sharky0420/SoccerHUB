# SoccerHUB Liquid Glass iOS App

This directory contains a fully wired Expo React Native application that implements the SoccerHUB "Liquid Glass" experience for iPhone.

## Features

- **Native navigation** with bottom glass tab bar, custom icons, and stack transitions for venue details.
- **Liquid glass visuals** using blurred panels, gradients, and frosted overlays optimised for performance.
- **Home screen** with map preview, quick filters, and interactive venue cards.
- **Detail screen** showcasing rich venue information, amenities, and booking CTA.
- **Supporting tabs** for favorites, filters, and profile placeholders ready for future expansion.

## Getting started

1. **Install prerequisites**
   - Node.js 18 or newer (use `nvm install 18 && nvm use 18` if required).
   - Xcode with the iOS Simulator component.
   - Expo CLI (no global install required, we will use `npx`).

2. **Install dependencies**

   ```bash
   cd ios
   npm install
   ```

   If you previously installed packages before this update, clear caches first:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run start
   ```

4. **Open the app**
   - Press `i` in the Expo CLI terminal to launch the iOS simulator, or
   - Scan the QR code with the Expo Go app on a physical iPhone (both devices must be on the same network).

5. **(Optional) Run a full native build**

   ```bash
   npm run ios
   ```

   This will create a local development build using Xcode and open it in the simulator.

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
