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

   > **Tip:** if you previously installed packages before this update, clear caches first with `rm -rf node_modules package-lock.json` and run `npm install` again.

3. **Start the development server**

   ```bash
   npm run start
   ```

   The bundler should report `Tunnel ready`/`Metro waiting on exp://...` within a few seconds. Wait for that log before attempting to open the simulator so the deep link does not time out.

4. **Open the app**
   - Press `i` in the Expo CLI terminal to launch the iOS simulator, or
   - Use the Expo Go app on a physical device (both the phone and your computer must be on the same network).

   If `simctl openurl` times out, ensure the Metro bundler is still running and reachable (no firewall/VPN blocking `exp://` URLs) and re-run the `i` shortcut once Metro is ready.

5. **(Optional) Run a full native build**

   ```bash
   npm run ios
   ```

   This will create a local development build using Xcode and open it in the simulator.

6. **(Optional) Static quality checks**

   ```bash
   npm run lint
   npx tsc --noEmit
   ```

   Run these before launching if you want to ensure the TypeScript and linting steps pass locally.

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
