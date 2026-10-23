#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SRC_FILE="byd-3d-card.js"
DIST_MAIN="dist/byd-3d-card.js"
DIST_HACS="dist/byd-3d-card-hacs.js"

cp "$SRC_FILE" "$DIST_MAIN"
cp "$SRC_FILE" "$DIST_HACS"

# Sync translation files to dist
cp i18n/*.json dist/

# Sync image files to dist (avoiding space-named duplicates)
for img in pic/*.png; do
  [ "$img" = "pic/Dolphin surf.png" ] && continue
  cp "$img" dist/
done

node --check "$SRC_FILE"
node --check "$DIST_MAIN"
node --check "$DIST_HACS"

# Validate all JSON files in dist
node -e '
const fs = require("fs");
for (const f of fs.readdirSync("./dist").filter(x => x.endsWith(".json"))) {
  JSON.parse(fs.readFileSync("./dist/" + f, "utf8"));
}
'

cmp -s "$SRC_FILE" "$DIST_MAIN"
cmp -s "$SRC_FILE" "$DIST_HACS"

echo "Sync complete: source, dist JS, translations, and images are synchronized and validated."

