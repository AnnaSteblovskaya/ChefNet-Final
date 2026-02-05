const fs = require('fs');

const content = fs.readFileSync('/src/locales/translations.ts', 'utf8');

// Replace single \n after Russian FAQ6 headings with double \n\n
let fixed = content;
fixed = fixed.replace('1. Юридическая защита (US Law)\\nКомпания', '1. Юридическая защита (US Law)\\n\\nКомпания');
fixed = fixed.replace('2. Интеллектуальная собственность (IP Ownership)\\nВсе', '2. Интеллектуальная собственность (IP Ownership)\\n\\nВсе');
fixed = fixed.replace('3. Прозрачность и отчетность (Reporting)\\nИнвесторы', '3. Прозрачность и отчетность (Reporting)\\n\\nИнвесторы');
fixed = fixed.replace('4. Мотивация основателей (Vesting)\\nАкции', '4. Мотивация основателей (Vesting)\\n\\nАкции');

fs.writeFileSync('/src/locales/translations.ts', fixed, 'utf8');
console.log('Fixed Russian FAQ6 formatting!');
