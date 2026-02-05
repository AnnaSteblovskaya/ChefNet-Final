#!/usr/bin/env node
/**
 * ИНСТРУКЦИЯ ПО ЗАПУСКУ:
 * 
 * Откройте терминал в корневой папке проекта и введите:
 * 
 * node RUN-THIS.js
 * 
 * Или если не работает, попробуйте:
 * 
 * node /RUN-THIS.js
 * 
 * Скрипт автоматически найдёт и исправит турецкую версию FAQ2
 */

const fs = require('fs');
const path = require('path');

// Путь к файлу
const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');

console.log('\n🔧 ЗАПУСК ИСПРАВЛЕНИЯ...\n');
console.log(`📁 Файл: ${filePath}\n`);

try {
  // Читаем файл
  let content = fs.readFileSync(filePath, 'utf8');
  console.log(`✓ Файл прочитан успешно (${content.length} символов)\n`);
  
  // Исходный текст (БЕЗ буллетов)
  const oldText = `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\nAbonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\nFintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\nReklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.',`;
  
  // Новый текст (С буллетами •)
  const newText = `faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\\n\\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\\n\\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\\n\\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.',`;
  
  // Проверяем наличие старого текста
  if (content.includes(oldText)) {
    console.log('✓ Исходный текст найден!\n');
    
    // Заменяем
    content = content.replace(oldText, newText);
    
    // Записываем обратно
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('✅ УСПЕШНО! Файл обновлён!\n');
    console.log('Добавлены буллеты (•) перед каждым пунктом в турецкой версии FAQ2:\n');
    console.log('  • İşlem Ücretleri: ...');
    console.log('  • Abonelikler (B2B SaaS): ...');
    console.log('  • Fintech (Ödemeler): ...');
    console.log('  • Reklam: ...\n');
    console.log('Теперь форматирование турецкой версии соответствует русской, английской и немецкой!\n');
    
  } else {
    console.log('❌ ВНИМАНИЕ: Исходный текст не найден в файле.');
    console.log('Возможно, изменения уже были применены ранее.\n');
    
    // Проверяем, есть ли уже буллеты
    if (content.includes('• İşlem Ücretleri:')) {
      console.log('✓ Буллеты уже присутствуют в файле. Изменения не требуются.\n');
    } else {
      console.log('⚠️  Требуется ручная проверка файла.\n');
    }
  }
  
} catch (error) {
  console.error('❌ ОШИБКА:', error.message, '\n');
  process.exit(1);
}
