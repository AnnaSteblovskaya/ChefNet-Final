#!/usr/bin/env python3
import re

filepath = 'src/locales/translations.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace old text with new text
old_text = r"faq1Answer: 'ChefNet, restoran ve özel şeflerin keşfedilmesi, rezervasyon, ödeme ve etkileşimini birleştiren global bir FoodTech platformudur.\\n\\nYemek sektörünün parçalı ekosisteminin sorununu çözerek tek, entegre ve sorunsuz bir standart oluşturur.',"

new_text = r"faq1Answer: 'ChefNet, restoranlar ve özel şefler ile keşfetme, rezervasyon, ödeme ve etkileşimi birleştiren küresel bir FoodTech platformudur.\nGıda hizmetleri ekosisteminin parçalanmış yapısını, tek ve kesintisiz bir standart oluşturarak çözüme kavuşturur.',"

# Perform replacement
content_new = content.replace(old_text, new_text)

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content_new)

print("Turkish faq1Answer updated successfully!")
