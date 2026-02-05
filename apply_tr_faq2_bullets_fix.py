#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для добавления буллетов (•) в турецкую версию FAQ2
Добавляет маркеры списка, как в русской версии
"""

import sys

def main():
    try:
        # Read the file
        with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Define old text (without bullets)
        old_text = "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'"
        
        # Define new text (with bullets •)
        new_text = "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'"
        
        # Check if old text exists
        if old_text in content:
            # Replace
            content = content.replace(old_text, new_text)
            
            # Write back
            with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
                f.write(content)
            
            print("✅ Успешно! Буллеты (•) добавлены во 2-й вопрос турецкой версии FAQ!")
            print("   Теперь дизайн соответствует русской версии.")
            return 0
        else:
            print("ℹ️  Текст не найден. Возможно, файл уже обновлен или изменен.")
            return 1
            
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
