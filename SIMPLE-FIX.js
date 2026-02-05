const fs = require('fs');

// Read file
const lines = fs.readFileSync('./src/locales/translations.ts', 'utf8').split('\n');

// Check line 1549 (index 1548)
console.log('Строка 1549 (до изменения):');
console.log(lines[1548].substring(0, 150) + '...\n');

// Replace the line
lines[1548] = lines[1548]
  .replace(/\\n\\nİşlem Ücretleri:/g, '\\n\\n• İşlem Ücretleri:')
  .replace(/\\n\\nAbonelikler \(B2B SaaS\):/g, '\\n\\n• Abonelikler (B2B SaaS):')
  .replace(/\\n\\nFintech \(Ödemeler\):/g, '\\n\\n• Fintech (Ödemeler):')
  .replace(/\\n\\nReklam:/g, '\\n\\n• Reklam:');

console.log('Строка 1549 (после изменения):');
console.log(lines[1548].substring(0, 150) + '...\n');

// Write back
fs.writeFileSync('./src/locales/translations.ts', lines.join('\n'), 'utf8');

console.log('✅ Файл успешно обновлён!\n');
console.log('Буллеты (•) добавлены перед:');
console.log('  • İşlem Ücretleri');
console.log('  • Abonelikler (B2B SaaS)');
console.log('  • Fintech (Ödemeler)');
console.log('  • Reklam\n');
