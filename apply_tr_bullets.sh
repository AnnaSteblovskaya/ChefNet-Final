#!/bin/bash

# Backup
cp src/locales/translations.ts src/locales/translations.ts.backup

# Apply the fix using perl for in-place editing
perl -i -pe 's/İşlem Ücretleri:/• İşlem Ücretleri:/g; 
             s/Abonelikler \(B2B SaaS\):/• Abonelikler (B2B SaaS):/g if /faq2Answer/;
             s/Fintech \(Ödemeler\):/• Fintech (Ödemeler):/g if /faq2Answer/;
             s/Reklam: Uygulama/• Reklam: Uygulama/g if /faq2Answer/' src/locales/translations.ts

echo "✅ Буллеты добавлены в турецкую версию FAQ2!"
