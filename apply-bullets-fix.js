const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Original faq2Answer text (without bullets)
const oldText = `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.',`;

// New faq2Answer text (with bullets •)
const newText = `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.',`;

// Check if old text exists in the file
if (content.includes(oldText)) {
  // Replace old text with new text
  content = content.replace(oldText, newText);
  
  // Write the modified content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log('✅ Успешно! Буллеты (•) добавлены в турецкую версию FAQ2!');
  console.log('   Теперь формат соответствует русской версии.');
  console.log('   Файл: ' + filePath);
} else {
  console.log('❌ Исходный текст не найден в файле.');
  console.log('   Возможно, файл уже обновлен или текст изменен.');
  
  // Debugging info
  if (content.includes('İşlem Ücretleri')) {
    console.log('   ✓ "İşlem Ücretleri" найден в файле');
  } else {
    console.log('   ✗ "İşlem Ücretleri" НЕ найден в файле');
  }
  
  if (content.includes('faq2Answer')) {
    console.log('   ✓ "faq2Answer" найден в файле');
  } else {
    console.log('   ✗ "faq2Answer" НЕ найден в файле');
  }
}
