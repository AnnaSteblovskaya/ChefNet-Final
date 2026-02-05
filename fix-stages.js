const fs = require('fs');

// Read the file
const content = fs.readFileSync('src/locales/translations.ts', 'utf8');

// Define replacements
let newContent = content;

// Replace seedBackDesc
newContent = newContent.replace(
  /seedBackDesc: 'Разработка MVP приложения\\nНабор пользователей\\nПереговоры с ресторанами\\nНабор менеджеров по странам\\nKPI: 10K пользователей',/,
  "seedBackDesc: '• Набор пользователей\\n• Переговоры с ресторанами\\n• Набор менеджеров по странам\\n• KPI: 10K пользователей',"
);

// Replace privateBackTitle (only first occurrence after seedBack - Russian section)
const ruSectionStart = newContent.indexOf("ru: {");
const deSectionStart = newContent.indexOf("de: {");
const ruSection = newContent.substring(ruSectionStart, deSectionStart);
const beforeRu = newContent.substring(0, ruSectionStart);
const afterRu = newContent.substring(deSectionStart);

let fixedRuSection = ruSection;

fixedRuSection = fixedRuSection.replace(
  /privateBackTitle: 'Private: \$350,000',/,
  "privateBackTitle: 'Тестирование MVP',"
);

fixedRuSection = fixedRuSection.replace(
  /privateBackDesc: 'Тестирование MVP в ключевых городах США и Европы\\nПартнерство с ресторанными ассоциациями и локальными сетями\\nУлучшение алгоритмов персонализации и AI рекомендаций\\nKPI: 100К пользователей, 500 ресторанов',/,
  "privateBackDesc: '• Тестирование MVP в ключевых городах США и Европы\\n• Партнерство с ресторанными ассоциациями и локальными сетями\\n• Улучшение алгоритмов персонализации и AI рекомендаций\\n• KPI: 100K пользователей, 500 ресторанов',"
);

fixedRuSection = fixedRuSection.replace(
  /marketingBackTitle: 'Marketing: \$500,000',/,
  "marketingBackTitle: 'Интеграция с сервисами такси',"
);

fixedRuSection = fixedRuSection.replace(
  /marketingBackDesc: 'Интеграция с сервисами такси \(Uber, Lyft, Bolt\)\\nЗапуск полнофункционального мобильного ChefNet\\nРазвитие fintech модуля \(оплата, чаевые, CashBack, ChefNet Token\)\\nМасштабные коллаборации с создателями и медиа в США и ЕС\\nKPI: 1M пользователей, 5K ресторанов, \$1M прибыли',/,
  "marketingBackDesc: '• Интеграция с сервисами такси (Uber, Lyft, Bolt)\\n• Запуск полнофункционального приложения ChefNet\\n• Развитие финтех-модуля (оплата, кэшбэк, ChefNet Token)\\n• Массовые коллаборации с блогерами и медиа в США и ЕС\\n• KPI: 1M пользователей, 5K ресторанов, $1M прибыли',"
);

fixedRuSection = fixedRuSection.replace(
  /publicBackTitle: 'Public\/IPO: > 1 m \$',/,
  "publicBackTitle: 'Выход на рынки Азии, Латинской Америки и Ближнего Востока',"
);

fixedRuSection = fixedRuSection.replace(
  /publicBackDesc: 'Выход на рынки Азии, Латинской Америки и на Ближний Восток\\nМасштабирование до статуса глоб.{1,3}льного SuperApp\\nЗапуск DAO-коммюнити и NFT программы для ресторанов\\nПодготовка к IPO с капитализацией \$3–5B.*?прибыли',/,
  "publicBackDesc: '• Масштабирование до статуса глобального SuperApp\\n• Запуск DAO-комьюнити и NFT-программ для ресторанов\\n• Подготовка к IPO с капитализацией $3–5B\\n• KPI: 30M пользователей, 50K ресторанов, $100M+ прибыли',"
);

newContent = beforeRu + fixedRuSection + afterRu;

// Write back
fs.writeFileSync('src/locales/translations.ts', newContent, 'utf8');

console.log("Fixed Russian 'Этапы развития' section!");
