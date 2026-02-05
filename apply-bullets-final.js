#!/usr/bin/env node
const fs = require('fs');

console.log('\n🔧 Применяю исправление...\n');

// Read file line by line
const filePath = './src/locales/translations.ts';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log(`Всего строк в файле: ${lines.length}`);
console.log(`\nСтрока 1549 (до):`);
console.log(lines[1548].substring(0, 150) + '...\n');

// Replace bullets in line 1549 (index 1548)
lines[1548] = lines[1548]
  .replace(/\\n\\nİşlem Ücretleri:/g, '\\n\\n• İşlem Ücretleri:')
  .replace(/\\n\\nAbonelikler \(B2B SaaS\):/g, '\\n\\n• Abonelikler (B2B SaaS):')
  .replace(/\\n\\nFintech \(Ödemeler\):/g, '\\n\\n• Fintech (Ödemeler):')
  .replace(/\\n\\nReklam:/g, '\\n\\n• Reklam:');

console.log(`Строка 1549 (после):`);
console.log(lines[1548].substring(0, 150) + '...\n');

// Write back
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

console.log('✅ ГОТОВО! Файл успешно обновлён!\n');
console.log('Буллеты (•) добавлены в турецкую версию FAQ2:\n');
console.log('  • İşlem Ücretleri');
console.log('  • Abonelikler (B2B SaaS)');
console.log('  • Fintech (Ödemeler)');
console.log('  • Reklam\n');
