const fs = require('fs');

// Read the file
const filePath = './src/locales/translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the text - добавляем буллеты
const oldText = `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\\\n\\\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\\\n\\\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\\\n\\\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\\\n\\\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'`;

const newText = `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\\\n\\\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\\\n\\\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\\\n\\\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\\\n\\\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.'`;

if (content.includes(oldText)) {
  content = content.replace(oldText, newText);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ SUCCESS! Буллеты добавлены в турецкую версию FAQ2!');
} else {
  console.log('❌ ERROR: Текст не найден');
  console.log('Возможно проблема с кодировкой или экранированием');
}
