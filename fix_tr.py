#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Read file
with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Original text WITHOUT bullets
old_text = "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'"

# New text WITH bullets (•)
new_text = "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'"

# Check and replace
if old_text in content:
    content = content.replace(old_text, new_text)
    
    # Write back
    with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Успешно! Буллеты (•) добавлены в турецкую версию FAQ2!")
    print("   Теперь формат соответствует русской версии.")
else:
    print("❌ Текст не найден. Возможно, файл уже обновлен или изменен.")
    print("\nПроверяю наличие строки...")
    if "İşlem Ücretleri:" in content:
        print("  ✓ Текст 'İşlem Ücretleri:' найден в файле")
    if "faq2Answer" in content:
        print("  ✓ Ключ 'faq2Answer' найден в файле")
