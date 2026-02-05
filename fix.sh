#!/bin/bash

# This script fixes the corrupted translations.ts file
# by removing the duplicate broken 'es' section (lines 1101-1171)

echo "Fixing translations.ts..."

# Use sed to delete lines 1101-1171
sed -i '1101,1171d' src/locales/translations.ts

echo "✅ Done! The corrupted section has been removed."
echo "The file should now compile without errors."
