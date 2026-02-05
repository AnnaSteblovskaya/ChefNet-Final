#!/bin/bash

sed -i "s/faq1Answer: 'ChefNet, restoran ve özel şeflerin keşfedilmesi, rezervasyon, ödeme ve etkileşimini birleştiren global bir FoodTech platformudur.\\\\n\\\\nYemek sektörünün parçalı ekosisteminin sorununu çözerek tek, entegre ve sorunsuz bir standart oluşturur.'/faq1Answer: 'ChefNet, restoranlar ve özel şefler ile keşfetme, rezervasyon, ödeme ve etkileşimi birleştiren küresel bir FoodTech platformudur.\\nGıda hizmetleri ekosisteminin parçalanmış yapısını, tek ve kesintisiz bir standart oluşturarak çözüme kavuşturur.'/" src/locales/translations.ts

echo "Updated Turkish faq1"
