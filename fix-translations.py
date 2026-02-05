#!/usr/bin/env python3
# Script to remove corrupted duplicate es section from translations.ts

with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines before: {len(lines)}")

# Remove lines 1100-1171 (0-indexed: 1099-1170)
# These lines contain the corrupted duplicate es section
new_lines = lines[:1099] + lines[1171:]

print(f"Total lines after: {len(new_lines)}")
print(f"Removed {len(lines) - len(new_lines)} lines")

with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ File fixed successfully!")
