#!/usr/bin/env python3

# Read the translations file
with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace double newlines with single newlines in BackDesc fields
content = content.replace('\\n\\n•', '\\n•')

# Write back
with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Replaced all double newlines with single newlines in BackDesc fields.")
