#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('/src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace single \n after Russian FAQ6 headings with double \n\n
replacements = [
    ('1. Юридическая защита (US Law)\\nКомпания', '1. Юридическая защита (US Law)\\n\\nКомпания'),
    ('2. Интеллектуальная собственность (IP Ownership)\\nВсе', '2. Интеллектуальная собственность (IP Ownership)\\n\\nВсе'),
    ('3. Прозрачность и отчетность (Reporting)\\nИнвесторы', '3. Прозрачность и отчетность (Reporting)\\n\\nИнвесторы'),
    ('4. Мотивация основателей (Vesting)\\nАкции', '4. Мотивация основателей (Vesting)\\n\\nАкции'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('/src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed Russian FAQ6 formatting!")
