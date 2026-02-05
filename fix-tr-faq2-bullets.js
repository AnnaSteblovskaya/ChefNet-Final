const fs = require('fs');

const filePath = './src/locales/translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the Turkish faq2Answer with bullet points
content = content.replace(
  /faq2Answer: 'Hibrit bir Pazar Yeri \+ SaaS \+ Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar/,
  `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar`
);

content = content.replace(
  /\\n\\nAbonelikler \(B2B SaaS\): Restaurantların/g,
  `\\n\\n• Abonelikler (B2B SaaS): Restaurantların`
);

content = content.replace(
  /\\n\\nFintech \(Ödemeler\): Uygulama içi/g,
  `\\n\\n• Fintech (Ödemeler): Uygulama içi`
);

content = content.replace(
  /\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların/g,
  `\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Turkish FAQ2 with bullet points!');
