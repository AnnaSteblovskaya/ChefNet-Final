const fs = require('fs');

const filePath = './src/locales/translations.ts';
const content = fs.readFileSync(filePath, 'utf8');

const updated = content.replace(
  /faq1Answer: 'ChefNet, restoran ve özel şeflerin keşfedilmesi, rezervasyon, ödeme ve etkileşimini birleştiren global bir FoodTech platformudur\.\\n\\nYemek sektörünün parçalı ekosisteminin sorununu çözerek tek, entegre ve sorunsuz bir standart oluşturur\.',/,
  `faq1Answer: 'ChefNet, restoranlar ve özel şefler ile keşfetme, rezervasyon, ödeme ve etkileşimi birleştiren küresel bir FoodTech platformudur.\\nGıda hizmetleri ekosisteminin parçalanmış yapısını, tek ve kesintisiz bir standart oluşturarak çözüme kavuşturur.',`
);

fs.writeFileSync(filePath, updated, 'utf8');
console.log('Turkish faq1 updated successfully!');
