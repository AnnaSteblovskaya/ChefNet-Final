#!/usr/bin/env python3
import re

file_path = './src/locales/translations.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace \\\\n\\\\n with \\n\\n in Spanish FAQ1Answer
pattern = r'("ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados\.)\\\\\\\\n\\\\\\\\n(Aborda la fragmentación del ecosistema de servicios de alimentación mediante el establecimiento de un único estándar integrado y sin fricciones\.",)'
replacement = r'\1\\n\\n\2'

content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Fixed Spanish FAQ1 newlines: \\\\\\\\n\\\\\\\\n → \\n\\n')
