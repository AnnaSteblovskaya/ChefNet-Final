const fs = require('fs');

console.log('\n🔧 Начинаю исправление...\n');

try {
  // Read entire file
  const content = fs.readFileSync('./src/locales/translations.ts', 'utf-8');
  
  // Count before
  const before = (content.match(/İşlem Ücretleri:/g) || []).length;
  console.log(`До: найдено "İşlem Ücretleri:" ${before} раз`);
  
  // Apply fix
  const fixed = content
    .replace(
      "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\nİşlem Ücretleri:",
      "faq2Answer: 'Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\\n\\n• İşlem Ücretleri:"
    )
    .replace(
      "payı.\\n\\nAbonelikler (B2B SaaS):",
      "payı.\\n\\n• Abonelikler (B2B SaaS):"
    )
    .replace(
      "ücretler.\\n\\nFintech (Ödemeler):",
      "ücretler.\\n\\n• Fintech (Ödemeler):"
    )
    .replace(
      "ücretleri.\\n\\nReklam:",
      "ücretleri.\\n\\n• Reklam:"
    );
  
  // Count after
  const after = (fixed.match(/• İşlem Ücretleri:/g) || []).length;
  
  if (content === fixed) {
    console.log('\n⚠️  Замена не произошла. Возможно уже исправлено?\n');
  } else {
    fs.writeFileSync('./src/locales/translations.ts', fixed, 'utf-8');
    console.log(`После: найдено "• İşlem Ücretleri:" ${after} раз`);
    console.log('\n✅ ГОТОВО! Файл исправлен!\n');
    console.log('Буллеты (•) добавлены перед:');
    console.log('  • İşlem Ücretleri');
    console.log('  • Abonelikler (B2B SaaS)');
    console.log('  • Fintech (Ödemeler)');
    console.log('  • Reklam\n');
  }
} catch (e) {
  console.error('\n❌ Ошибка:', e.message, '\n');
  process.exit(1);
}
