#!/usr/bin/env bash
# ClawHunt brand repo sanity check — run before every commit.
set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

fail=0

check() {
  if [[ ! -e "$1" ]]; then
    echo "❌ MISSING: $1"
    fail=1
  else
    echo "✅ $1"
  fi
}

echo "== Required core files =="
check BRAND.md
check README.md
check tokens/tokens.json
check tokens/tokens.css
check tokens/tailwind.preset.js
check logo/logo_primary_dark.png
check logo/logo_primary_light.png
check logo/icon_app.png
check icons/icon_system_8.png
check mascot/mascot_clawbot.png
check guidelines/brand_guidelines.png
check emails/email_master.html
check emails/README.md
check templates/PROMPTS.md
check templates/style_prefix.txt

echo ""
echo "== Token hex sanity =="
for hex in "00D4FF" "7C3AED" "0D0D24" "0A1628"; do
  if grep -q "$hex" tokens/tokens.json && grep -q "$hex" tokens/tokens.css && grep -q "$hex" tokens/tailwind.preset.js; then
    echo "✅ #$hex present across tokens.json / tokens.css / tailwind.preset.js"
  else
    echo "❌ #$hex drifted between token files"
    fail=1
  fi
done

echo ""
if [[ $fail -eq 0 ]]; then
  echo "🦞 Brand repo clean. Safe to commit."
else
  echo "💥 Brand repo has issues. Fix before commit."
  exit 1
fi
