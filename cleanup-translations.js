const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');

// Читаем файл
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

// Находим проблемную секцию
let startDelete = -1;
let endDelete = -1;

for (let i = 0; i < lines.length; i++) {
  // Ищем первую поврежденную секцию es (строка ~1101)
  if (i > 1095 && i < 1105 && lines[i].trim().startsWith('es: {')) {
    startDelete = i;
    console.log('Found broken es section at line:', i + 1);
  }
  
  // Ищем конец этой секции (строка ~1170 перед правильной es)
  if (startDelete !== -1 && i > startDelete && i < 1180 && lines[i].trim() === '},') {
    // Проверяем что следующая непустая строка это es: {
    let nextNonEmpty = i + 1;
    while (nextNonEmpty < lines.length && lines[nextNonEmpty].trim() === '') {
      nextNonEmpty++;
    }
    if (lines[nextNonEmpty] && lines[nextNonEmpty].trim().startsWith('es: {')) {
      endDelete = i;
      console.log('Found end of broken section at line:', i + 1);
      break;
    }
  }
}

if (startDelete !== -1 && endDelete !== -1) {
  console.log(`Deleting lines ${startDelete + 1} to ${endDelete + 1}`);
  
  // Удаляем поврежденные строки
  const cleanedLines = [
    ...lines.slice(0, startDelete),
    ...lines.slice(endDelete + 1)
  ];
  
  // Записываем обратно
  fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
  console.log('✅ File cleaned successfully!');
  console.log('New total lines:', cleanedLines.length);
} else {
  console.log('❌ Could not find broken section boundaries');
  console.log('startDelete:', startDelete, 'endDelete:', endDelete);
}
