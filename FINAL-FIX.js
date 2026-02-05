#!/usr/bin/env node
const fs = require('fs');

console.log('🔧 Начинаем исправление файла translations.ts...\n');

const filePath = './src/locales/translations.ts';

// Read file
const content = fs.readFileSync(filePath, 'utf8');
console.log(`📁 Файл прочитан: ${content.length} символов\n`);

// Count occurrences before
const beforeCount = (content.match(/İşlem Ücretleri:/g) || []).length;
console.log(`📊 До: найдено "İşlem Ücretleri:" - ${beforeCount} раз\n`);

// Apply fixes - replace in Turkish FAQ section only
const fixed = content.replace(
  /faq2Answer: 'Hibrit bir Pazar Yeri \+ SaaS \+ Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı\.\\n\\nAbonelikler \(B2B SaaS\): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler\.\\n\\nFintech \(Ödemeler\): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri\.\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı\.',/,
  `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.',`
);

if (fixed === content) {
  console.log('❌ ОШИБКА: Замена не произошла!');
  console.log('Проверьте формат текста или escape-последовательности\n');
  process.exit(1);
} else {
  // Write back
  fs.writeFileSync(filePath, fixed, 'utf8');
  
  const afterCount = (fixed.match(/• İşlem Ücretleri:/g) || []).length;
  console.log(`✅ УСПЕХ! Файл обновлен!`);
  console.log(`📊 После: найдено "• İşlem Ücretleri:" - ${afterCount} раз\n`);
  console.log(`💾 Изменения сохранены в ${filePath}\n`);
}
