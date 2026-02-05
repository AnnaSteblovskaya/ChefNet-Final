#!/usr/bin/env python3
import sys

# Read the file
with open('/src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Old text
old = 'ChefNet es una plataforma global de FoodTech que unifica descubrimiento, reservas, pagos y engagement de restaurantes y chefs privados.'

# New text
new = 'ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados.'

# Replace
if old in content:
    content = content.replace(old, new)
    with open('/src/locales/translations.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✓ Fixed Spanish FAQ1!")
else:
    print("✗ Old text not found!")
    sys.exit(1)
