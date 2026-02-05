const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/locales/translations.ts', 'utf8');

// Russian section updates
content = content.replace(
  `    seedBackDesc: 'Разработка MVP приложения\\nНабор пользователей\\nПереговоры с ресторанами\\nНабор менеджеров по странам\\nKPI: 10K пользователей',`,
  `    seedBackDesc: '• Набор пользователей\\n• Переговоры с ресторанами\\n• Набор менеджеров по странам\\n• KPI: 10K пользователей',`
);

content = content.replace(
  `    privateBackTitle: 'Private: $350,000',\n    privateBackDesc: 'Тестирование MVP в ключевых городах США и Европы\\nПартнерство с ресторанными ассоциациями и локальными сетями\\nУлучшение алгоритмов персонализации и AI рекомендаций\\nKPI: 100К пользователей, 500 ресторанов',`,
  `    privateBackTitle: 'Тестирование MVP',\n    privateBackDesc: '• Тестирование MVP в ключевых городах США и Европы\\n• Партнерство с ресторанными ассоциациями и локальными сетями\\n• Улучшение алгоритмов персонализации и AI рекомендаций\\n• KPI: 100K пользователей, 500 ресторанов',`
);

content = content.replace(
  `    marketingBackTitle: 'Marketing: $500,000',\n    marketingBackDesc: 'Интеграция с сервисами такси (Uber, Lyft, Bolt)\\nЗапуск полнофункционального мобильного ChefNet\\nРазвитие fintech модуля (оплата, чаевые, CashBack, ChefNet Token)\\nМасштабные коллаборации с создателями и медиа в США и ЕС\\nKPI: 1M пользователей, 5K ресторанов, $1M прибыли',`,
  `    marketingBackTitle: 'Интеграция с сервисами такси',\n    marketingBackDesc: '• Интеграция с сервисами такси (Uber, Lyft, Bolt)\\n• Запуск полнофункционального приложения ChefNet\\n• Развитие финтех-модуля (оплата, кэшбэк, ChefNet Token)\\n• Массовые коллаборации с блогерами и медиа в США и ЕС\\n• KPI: 1M пользователей, 5K ресторанов, $1M прибыли',`
);

content = content.replace(
  `    publicBackTitle: 'Public/IPO: > 1 m $',`,
  `    publicBackTitle: 'Выход на рынки Азии, Латинской Америки и Ближнего Востока',`
);

// Fix Russian publicBackDesc with damaged character
content = content.replace(
  /publicBackDesc: 'Выход на рынки Азии, Латинской Америки и на Ближний Восток\\nМасштабирование до статуса глоб.{0,3}льного SuperApp\\nЗапуск DAO-коммюнити и NFT программы для ресторанов\\nПодготовка к IPO с капитализацией \$3–5B[^']*',/,
  `publicBackDesc: '• Масштабирование до статуса глобального SuperApp\\n• Запуск DAO-комьюнити и NFT-программ для ресторанов\\n• Подготовка к IPO с капитализацией $3–5B\\n• KPI: 30M пользователей, 50K ресторанов, $100M+ прибыли',`
);

// German section updates
const germanUpdates = [
  {
    old: `    seedBackTitle: 'Seed: $150,000',\n    seedBackDesc: 'Entwicklung der App MVP\\nWerben von Nutzern\\nVerhandlungen mit Restaurants\\nEinstellung von Ländermanagern\\nKPI: 10K Nutzer',`,
    new: `    seedBackTitle: 'Entwicklung der App MVP',\n    seedBackDesc: '• Werben von Nutzern\\n• Verhandlungen mit Restaurants\\n• Einstellung von Ländermanagern\\n• KPI: 10K Nutzer',`
  },
  {
    old: `    privateBackTitle: 'Private: $350,000',\n    privateBackDesc: 'Test des MVP in Schlüsselstädten in den USA und Europa\\nPartnerschaften mit Gastronomieveränden und lokalen Restaurantketten\\nVerbesserung der Personalisierungsalgorithmen und KI-basierten Empfehlungen\\nKPI: 100.000 Nutzer, 500 Restaurants',`,
    new: `    privateBackTitle: 'Test des MVP',\n    privateBackDesc: '• Test des MVP in Schlüsselstädten in den USA und Europa\\n• Partnerschaften mit Gastronomieveränden und lokalen Restaurantketten\\n• Verbesserung der Personalisierungsalgorithmen und KI-basierten Empfehlungen\\n• KPI: 100.000 Nutzer, 500 Restaurants',`
  },
  {
    old: `    marketingBackTitle: 'Marketing: $500,000',\n    marketingBackDesc: 'Integration mit Ride-Sharing-Diensten (Uber, Lyft, Bolt)\\nLaunch der voll ausgestatteten ChefNet-App\\nAusbau des Fintech-Moduls (Zahlungen, Cashback, ChefNet Token)\\nUmfangreiche Kooperationen mit Kreatoren und Medienpartnern in den USA und der EU\\nKPI: 1 Mio. Nutzer, 5.000 Restaurants, 1 Mio. USD Gewinn',`,
    new: `    marketingBackTitle: 'Integration mit Ride-Sharing-Diensten',\n    marketingBackDesc: '• Integration mit Ride-Sharing-Diensten (Uber, Lyft, Bolt)\\n• Launch der voll ausgestatteten ChefNet-App\\n• Ausbau des Fintech-Moduls (Zahlungen, Cashback, ChefNet Token)\\n• Umfangreiche Kooperationen mit Kreatoren und Medienpartnern in den USA und der EU\\n• KPI: 1 Mio. Nutzer, 5.000 Restaurants, 1 Mio. USD Gewinn',`
  },
  {
    old: `    publicBackTitle: 'Public/IPO: > 1 m $',\n    publicBackDesc: 'Expansion nach Asien, Lateinamerika und in den Nahen Osten\\nSkalierung zu einer globalen SuperApp\\nGründung einer DAO-Community und Einführung von NFT-Programmen für Restaurants\\nVorbereitung auf einen Börsengang mit einer Bewertung von 3–5 Mrd. USD\\nKPI: 30 Mio. Nutzer, 50.000 Restaurants, über 100 Mio. USD Gewinn',`,
    new: `    publicBackTitle: 'Expansion nach Asien, Lateinamerika und in den Nahen Osten',\n    publicBackDesc: '• Skalierung zu einer globalen SuperApp\\n• Gründung einer DAO-Community und Einführung von NFT-Programmen für Restaurants\\n• Vorbereitung auf einen Börsengang mit einer Bewertung von 3–5 Mrd. USD\\n• KPI: 30 Mio. Nutzer, 50.000 Restaurants, über 100 Mio. USD Gewinn',`
  }
];

germanUpdates.forEach(update => {
  content = content.replace(update.old, update.new);
});

// Spanish section updates  
const spanishUpdates = [
  {
    old: `    seedBackTitle: 'Seed: $150,000',\n    seedBackDesc: 'Desarrollo del MVP de la aplicación\\nAdquisición de usuarios\\nNegociaciones con restaurantes\\nContratación de gerentes por país\\nKPI: 10.000 usuarios',`,
    new: `    seedBackTitle: 'Desarrollo del MVP de la aplicación',\n    seedBackDesc: '• Adquisición de usuarios\\n• Negociaciones con restaurantes\\n• Contratación de gerentes por país\\n• KPI: 10.000 usuarios',`
  },
  {
    old: `    privateBackTitle: 'Private: $350,000',\n    privateBackDesc: 'Pruebas del MVP en ciudades clave de EE. UU. y Europa\\nAlianzas con asociaciones de restaurantes y cadenas locales\\nMejora de los algoritmos de personalización y recomendaciones basadas en IA\\nKPI: 100.000 usuarios, 500 restaurantes',`,
    new: `    privateBackTitle: 'Pruebas del MVP',\n    privateBackDesc: '• Pruebas del MVP en ciudades clave de EE. UU. y Europa\\n• Alianzas con asociaciones de restaurantes y cadenas locales\\n• Mejora de los algoritmos de personalización y recomendaciones basadas en IA\\n• KPI: 100.000 usuarios, 500 restaurantes',`
  },
  {
    old: `    marketingBackTitle: 'Marketing: $500,000',\n    marketingBackDesc: 'Integración con servicios de movilidad compartida (Uber, Lyft, Bolt)\\nLanzamiento de la aplicación ChefNet con todas sus funcionalidades\\nAmpliación del módulo fintech (pagos, cashback, Token ChefNet)\\nColaboraciones a gran escala con creadores y medios en EE. UU. y la UE\\nKPI: 1 millón de usuarios, 5.000 restaurantes, 1 millón de dólares de beneficio',`,
    new: `    marketingBackTitle: 'Integración con servicios de movilidad compartida',\n    marketingBackDesc: '• Integración con servicios de movilidad compartida (Uber, Lyft, Bolt)\\n• Lanzamiento de la aplicación ChefNet con todas sus funcionalidades\\n• Ampliación del módulo fintech (pagos, cashback, Token ChefNet)\\n• Colaboraciones a gran escala con creadores y medios en EE. UU. y la UE\\n• KPI: 1 millón de usuarios, 5.000 restaurantes, 1 millón de dólares de beneficio',`
  }
];

spanishUpdates.forEach(update => {
  content = content.replace(update.old, update.new);
});

// Spanish publicBackTitle and publicBackDesc
content = content.replace(
  /es: \{[\s\S]*?publicBackTitle: 'Public\/IPO: > 1 m \$',\n    publicBackDesc: 'Expansión a Asia, América Latina y Oriente Medio\\nEscalado a una SuperApp global\\nLanzamiento de una comunidad DAO y programas NFT para restaurantes\\nPreparación para una OPV con una valoración de 3–5 mil millones de dólares\\nKPI: 30 millones de usuarios, 50.000 restaurantes, más de 100 millones de dólares de beneficio',/,
  function(match) {
    return match.replace(
      `publicBackTitle: 'Public/IPO: > 1 m $',\n    publicBackDesc: 'Expansión a Asia, América Latina y Oriente Medio\\nEscalado a una SuperApp global\\nLanzamiento de una comunidad DAO y programas NFT para restaurantes\\nPreparación para una OPV con una valoración de 3–5 mil millones de dólares\\nKPI: 30 millones de usuarios, 50.000 restaurantes, más de 100 millones de dólares de beneficio',`,
      `publicBackTitle: 'Expansión a Asia, América Latina y Oriente Medio',\n    publicBackDesc: '• Escalado a una SuperApp global\\n• Lanzamiento de una comunidad DAO y programas NFT para restaurantes\\n• Preparación para una OPV con una valoración de 3–5 mil millones de dólares\\n• KPI: 30 millones de usuarios, 50.000 restaurantes, más de 100 millones de dólares de beneficio',`
    );
  }
);

// Turkish section updates
const turkishUpdates = [
  {
    old: `    seedBackTitle: 'Seed: $150,000',\n    seedBackDesc: 'Uygulama MVP\\'sinin geliştirilmesi\\nKullanıcı edinimi\\nRestoranlarla görüşmeler\\nÜlke müdürlerinin işe alınması\\nKPI: 10.000 kullanıcı',`,
    new: `    seedBackTitle: 'Uygulama MVP\\'sinin geliştirilmesi',\n    seedBackDesc: '• Kullanıcı edinimi\\n• Restoranlarla görüşmeler\\n• Ülke müdürlerinin işe alınması\\n• KPI: 10.000 kullanıcı',`
  },
  {
    old: `    privateBackTitle: 'Private: $350,000',\n    privateBackDesc: 'ABD ve Avrupa\\'daki kilit şehirlerde MVP testleri\\nRestoran dernekleri ve yerel zincirlerle ortaklıklar\\nKişiselleştirme algoritmalarını ve yapay zekâ önerilerinin iyileştirilmesi\\nKPI: 100.000 kullanıcı, 500 restoran',`,
    new: `    privateBackTitle: 'MVP testleri',\n    privateBackDesc: '• ABD ve Avrupa\\'daki kilit şehirlerde MVP testleri\\n• Restoran dernekleri ve yerel zincirlerle ortaklıklar\\n• Kişiselleştirme algoritmalarını ve yapay zekâ önerilerinin iyileştirilmesi\\n• KPI: 100.000 kullanıcı, 500 restoran',`
  },
  {
    old: `    marketingBackTitle: 'Marketing: $500,000',\n    marketingBackDesc: 'Sürüş paylaşımı hizmetleriyle entegrasyon (Uber, Lyft, Bolt)\\nTüm özellikleriye ChefNet uygulamasının piyasaya sürülmesi\\nFintech modülünün genişletilmesi (ödemeler, nakit iade, ChefNet Token)\\nABD ve AB\\'de içerik üreticileri ve medya ile büyük çaplı iş birlikleri\\nKPI: 1 milyon kullanıcı, 5.000 restoran, 1 milyon dolar kâr',`,
    new: `    marketingBackTitle: 'Sürüş paylaşımı hizmetleriyle entegrasyon',\n    marketingBackDesc: '• Sürüş paylaşımı hizmetleriyle entegrasyon (Uber, Lyft, Bolt)\\n• Tüm özellikleriye ChefNet uygulamasının piyasaya sürülmesi\\n• Fintech modülünün genişletilmesi (ödemeler, nakit iade, ChefNet Token)\\n• ABD ve AB\\'de içerik üreticileri ve medya ile büyük çaplı iş birlikleri\\n• KPI: 1 milyon kullanıcı, 5.000 restoran, 1 milyon dolar kâr',`
  }
];

turkishUpdates.forEach(update => {
  content = content.replace(update.old, update.new);
});

// Turkish publicBackTitle and publicBackDesc
content = content.replace(
  /tr: \{[\s\S]*?publicBackTitle: 'Public\/IPO: > 1 m \$',\n    publicBackDesc: 'Asya, Latin Amerika ve Orta Doğu\\'ya açılma\\nKüresel bir SuperApp\\'a dönüşme\\nRestoran için DAO topluluğu ve NFT programlarının başlatılması\\n3–5 milyar dolar değerleme ile halka arza hazırlık\\nKPI: 30 milyon kullanıcı, 50.000 restoran, 100 milyon dolardan fazla kâr',/,
  function(match) {
    return match.replace(
      `publicBackTitle: 'Public/IPO: > 1 m $',\n    publicBackDesc: 'Asya, Latin Amerika ve Orta Doğu\\'ya açılma\\nKüresel bir SuperApp\\'a dönüşme\\nRestoran için DAO topluluğu ve NFT programlarının başlatılması\\n3–5 milyar dolar değerleme ile halka arza hazırlık\\nKPI: 30 milyon kullanıcı, 50.000 restoran, 100 milyon dolardan fazla kâr',`,
      `publicBackTitle: 'Asya, Latin Amerika ve Orta Doğu\\'ya açılma',\n    publicBackDesc: '• Küresel bir SuperApp\\'a dönüşme\\n• Restoran için DAO topluluğu ve NFT programlarının başlatılması\\n• 3–5 milyar dolar değerleme ile halka arza hazırlık\\n• KPI: 30 milyon kullanıcı, 50.000 restoran, 100 milyon dolardan fazla kâr',`
    );
  }
);

// Write back
fs.writeFileSync('src/locales/translations.ts', content, 'utf8');

console.log('✅ Successfully updated all language sections (ru, de, es, tr) for "Stages" section!');
console.log('   - Added bullet points (•) before each description item');
console.log('   - Updated titles to match content instead of showing amounts');
console.log('   - Fixed Russian encoding issues');
