#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Turkish FAQ2 - find and replace with bullets
old_pattern = r"(faq2Answer: 'Hibrit bir Pazar Yeri \+ SaaS \+ Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:)\\n\\n(İşlem Ücretleri:)"

new_text = r"\1\\n\\n• \2"

# Replace first occurrence
content = re.sub(old_pattern, new_text, content, count=1)

# Replace remaining items
content = content.replace(
    '\\n\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\nReklam: Uygulama içindeki',
    '\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki'
)

# Write the file back
with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Успешно добавлены буллеты в турецкую версию FAQ2!')
