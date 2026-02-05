#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('./src/locales/translations.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 1549 is index 1548
old_line = lines[1548]
print(f"Исходная строка 1549:\n{old_line[:100]}...\n")

# Replace without bullets to with bullets
new_line = old_line.replace(
    '\\n\\nİşlem Ücretleri:',
    '\\n\\n• İşlem Ücretleri:'
).replace(
    '\\n\\nAbonelikler (B2B SaaS):',
    '\\n\\n• Abonelikler (B2B SaaS):'
).replace(
    '\\n\\nFintech (Ödemeler):',
    '\\n\\n• Fintech (Ödemeler):'
).replace(
    '\\n\\nReklam:',
    '\\n\\n• Reklam:'
)

lines[1548] = new_line
print(f"Новая строка 1549:\n{new_line[:100]}...\n")

with open('./src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✅ Готово! Буллеты добавлены в турецкую версию FAQ2!")
