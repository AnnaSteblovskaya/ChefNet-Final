const fs = require('fs');

const filePath = './src/locales/translations.ts';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Line 1549 (index 1548)
const oldLine = lines[1548];
console.log('Старая строка 1549:');
console.log(oldLine);
console.log('');

// Replace İşlem Ücretleri: with • İşlem Ücretleri:
// Replace Abonelikler with • Abonelikler
// Replace Fintech with • Fintech  
// Replace Reklam: with • Reklam:

const newLine = oldLine
  .replace('\\n\\nİşlem Ücretleri:', '\\n\\n• İşlem Ücretleri:')
  .replace('\\n\\nAbonelikler (B2B SaaS):', '\\n\\n• Abonelikler (B2B SaaS):')
  .replace('\\n\\nFintech (Ödemeler):', '\\n\\n• Fintech (Ödemeler):')
  .replace('\\n\\nReklam:', '\\n\\n• Reklam:');

lines[1548] = newLine;

console.log('Новая строка 1549:');
console.log(newLine);
console.log('');

// Write back
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('✅ Файл успешно обновлён!');
