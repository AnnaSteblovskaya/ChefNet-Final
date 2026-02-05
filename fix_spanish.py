#!/usr/bin/env python3
# Script to fix Spanish FAQ1

with open('/src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Spanish FAQ1 answer
old_text = 'ChefNet es una plataforma global de FoodTech que unifica descubrimiento, reservas, pagos y engagement de restaurantes y chefs privados.'
new_text = 'ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados.'

content = content.replace(old_text, new_text)

with open('/src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed Spanish FAQ1!")
