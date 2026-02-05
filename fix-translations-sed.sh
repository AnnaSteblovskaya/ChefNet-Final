#!/bin/bash
# EMERGENCY FIX FOR TRANSLATIONS.TS
# This script removes corrupted lines 1101-1171 using sed

FILE="src/locales/translations.ts"
BACKUP="${FILE}.backup.$(date +%Y%m%d_%H%M%S)"

echo "🔧 Emergency Fix for translations.ts"
echo "====================================="
echo ""

# Check if file exists
if [ ! -f "$FILE" ]; then
    echo "❌ ERROR: File not found: $FILE"
    echo "   Please run this script from the project root directory"
    exit 1
fi

# Create timestamped backup
echo "💾 Creating backup: $BACKUP"
cp "$FILE" "$BACKUP"

# Count lines before
BEFORE=$(wc -l < "$FILE")
echo "📊 Lines before: $BEFORE"

# Remove lines 1101-1171 using sed
echo "🔧 Removing corrupted lines 1101-1171..."
sed -i.bak '1101,1171d' "$FILE"

# Count lines after
AFTER=$(wc -l < "$FILE")
REMOVED=$((BEFORE - AFTER))

echo "📊 Lines after: $AFTER"
echo "🗑️  Removed: $REMOVED lines"
echo ""

# Verify fix
ES_COUNT=$(grep -c "^  es: {$" "$FILE" 2>/dev/null || echo "0")

if [ "$ES_COUNT" = "1" ]; then
    echo "✅ SUCCESS! File fixed automatically."
    echo "📝 Backup saved as: $BACKUP"
    echo ""
    echo "🎉 Your application should now compile correctly!"
    echo ""
    echo "Verification:"
    grep -n "^  es: {$" "$FILE"
else
    echo "⚠️  WARNING: Expected 1 'es: {' section, found: $ES_COUNT"
    echo "   Please check the file manually."
    echo "   Backup available at: $BACKUP"
fi

echo ""
