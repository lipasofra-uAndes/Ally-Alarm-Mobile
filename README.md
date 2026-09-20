# Ally Alarm — React Native (Expo)

Complete React Native / Expo port of the Ally Alarm mobile application.
All 16 screens from the Figma designs are implemented.

## Prerequisites

- Node.js 20+
- pnpm, npm, or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode + Simulator **or** Expo Go app on a physical device
- Android: Android Studio + emulator **or** Expo Go app on a physical device

## Setup

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Copy and rename assets

Run the helper script from this directory:

```bash
bash copy-assets.sh
```

This copies images from the sibling `code/public/assets/` directory into
`assets/images/` with human-readable names.

> **SVG icons**: four icons (settings, home, create, FAB) are SVGs in the
> source project. The script copies them as-is. Either:
> - Install `react-native-svg` and convert the `<Image>` usages to `<SvgUri>`, or
> - Convert them to PNG with Inkscape / `svgexport` at 48×48px.

### 3. Add fonts

Download the font files and place them in `assets/fonts/`:

| File | Source |
|---|---|
| `Comfortaa-Light.ttf` | Google Fonts — Comfortaa |
| `Comfortaa-Regular.ttf` | Google Fonts — Comfortaa |
| `Comfortaa-Medium.ttf` | Google Fonts — Comfortaa |
| `Comfortaa-SemiBold.ttf` | Google Fonts — Comfortaa |
| `Comfortaa-Bold.ttf` | Google Fonts — Comfortaa |

Download link: https://fonts.google.com

### 4. Run

```bash
# Start Expo dev server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android emulator
npm run android
```

## Navigation flow

```
Inicio (login)
  └─ Home (tap any login provider)
       ├─ Suggestion banner → SugerenciaConfirm (modal) → Home
       └─ Settings icon → Configuracion
       └─ FAB → CrearCategoria
            ├─ Entrenamiento → ModalPlantilla (modal) → CrearForm → Home
            └─ Other category → CrearForm → Home
```

## Screens

| Screen | File |
|---|---|
| Login / Splash | `src/screens/InicioScreen.tsx` |
| Home — alarm list | `src/screens/HomeAlarmas.tsx` |
| Create alarm — category | `src/screens/CrearAlarmaCategoria.tsx` |
| Template modal | `src/screens/ModalPlantilla.tsx` |
| Create alarm — form | `src/screens/CrearAlarmaForm.tsx` |
| Settings | `src/screens/Configuracion.tsx` |
| Smart suggestion confirm (modal) | `src/screens/SugerenciaConfirm.tsx` |
