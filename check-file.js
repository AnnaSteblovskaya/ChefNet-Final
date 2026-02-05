const fs = require('fs');
const filePath = './src/locales/translations.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Check if the old text exists
const searchText = 'İşlem Ücretleri: Rezervasyonlar';
console.log('File contains target text:', content.includes(searchText));
console.log('File length:', content.length, 'characters');
console.log('Total lines:', content.split('\n').length);
