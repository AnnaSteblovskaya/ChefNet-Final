const fs = require('fs');

const filePath = './src/locales/translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the four backslashes with two backslashes in Spanish FAQ1Answer
content = content.replace(
  /("ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados\.)(\\\\\\\\n\\\\\\\\n)(Aborda la fragmentación del ecosistema de servicios de alimentación mediante el establecimiento de un único estándar integrado y sin fricciones\.",)/,
  '$1\\n\\n$3'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed Spanish FAQ1 newlines: \\\\\\\\n\\\\\\\\n → \\n\\n');
