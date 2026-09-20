#!/usr/bin/env bash
# Run this script from the ally-alarm-native/ directory.
# It copies and renames the hashed assets from the Vite project into
# the named assets that the React Native source code expects.

SRC="../code/public/assets"
DEST="./assets/images"

mkdir -p "$DEST"

cp "$SRC/eb543.png"  "$DEST/background-mountain.png"
cp "$SRC/d8f1b.png"  "$DEST/ally-alarm-logo.png"
cp "$SRC/85308.png"  "$DEST/google-icon.png"
cp "$SRC/8717d.png"  "$DEST/icloud-icon.png"
cp "$SRC/49a80.png"  "$DEST/yahoo-icon.png"
cp "$SRC/ae09e.png"  "$DEST/icon-sparkles.png"
cp "$SRC/65c9d.png"  "$DEST/icon-gym.png"
cp "$SRC/3709e.png"  "$DEST/icon-medicine.png"
cp "$SRC/05f2d.png"  "$DEST/icon-laptop.png"
cp "$SRC/f8999.png"  "$DEST/icon-calendar2.png"
cp "$SRC/79f84.png"  "$DEST/icon-travel.png"
cp "$SRC/d90f1.png"  "$DEST/device-phone.png"
cp "$SRC/46193.png"  "$DEST/device-watch.png"
cp "$SRC/5ddb5.png"  "$DEST/icon-check-green.png"
cp "$SRC/d0028.png"  "$DEST/profile.png"
cp "$SRC/8abaf.svg"  "$DEST/icon-settings.png"   # SVG — see note below
cp "$SRC/a3785.svg"  "$DEST/fab-add.png"           # SVG — see note below
cp "$SRC/d5565.svg"  "$DEST/icon-home.png"         # SVG — see note below
cp "$SRC/147ca.svg"  "$DEST/icon-create.png"       # SVG — see note below

echo "Assets copied."
echo ""
echo "NOTE: Four assets are SVG files copied with a .png extension."
echo "React Native can render SVGs with react-native-svg."
echo "Alternatively convert them to PNG (e.g. with Inkscape or svgexport):"
echo "  npx svgexport assets/images/icon-settings.png assets/images/icon-settings.png 24:24"
echo "  (repeat for icon-home, icon-create, fab-add)"
