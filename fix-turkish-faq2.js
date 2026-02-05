const fs = require('fs');

const filePath = './src/locales/translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Simple replacement: add bullet points
content = content.replace(
  /faq2Answer: 'Hibrit bir Pazar Yeri \+ SaaS \+ Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri:/,
  `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri:`
);

content = content.replace(
  /\\n\\nAbonelikler \(B2B SaaS\):/g,
  `\\n\\n• Abonelikler (B2B SaaS):`
);

content = content.replace(
  /\\n\\nFintech \(Ödemeler\):/g,
  `\\n\\n• Fintech (Ödemeler):`
);

content = content.replace(
  /\\n\\nReklam: Uygulama içindeki keşfetme/,
  `\\n\\n• Reklam: Uygulama içindeki keşfetme`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Буллеты добавлены!');
