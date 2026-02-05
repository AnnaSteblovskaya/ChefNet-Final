#!/bin/bash
# Auto-fix script for corrupted translations.ts
# Removes lines 1101-1171

echo "🔧 ChefNet Translations Auto-Fix Script"
echo "=========================================="

FILE="src/locales/translations.ts"

if [ ! -f "$FILE" ]; then
  echo "❌ ERROR: File not found: $FILE"
  exit 1
fi

echo "📖 Processing file: $FILE"

# Create backup
cp "$FILE" "$FILE.backup"
echo "💾 Backup created: $FILE.backup"

# Extract lines 1-1100 and lines 1172+ and combine them
{
  head -n 1100 "$FILE"
  tail -n +1172 "$FILE"
} > "$FILE.tmp"

# Replace original file with fixed version
mv "$FILE.tmp" "$FILE"

echo "✅ SUCCESS! File fixed automatically."
echo "📊 Removed corrupted lines 1101-1171"
echo "🎉 Your application should now compile correctly!"
