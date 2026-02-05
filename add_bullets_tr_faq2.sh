#!/bin/bash
cd "$(dirname "$0")"

# Create temp file with modified content
python3 << 'PYTHON_EOF'
with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Turkish FAQ2 answer - add bullet points
old_text = "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'"

new_text = "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'"

if old_text in content:
    content = content.replace(old_text, new_text)
    with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Başarıyla değiştirildi! Türkçe FAQ 2'ye maddeler eklendi.")
else:
    print("❌ Metin bulunamadı. Dosya zaten güncellenmiş olabilir.")
PYTHON_EOF

echo "Script completed!"
