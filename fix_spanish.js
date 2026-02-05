const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'locales', 'translations.ts');

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Old text
const old = 'ChefNet es una plataforma global de FoodTech que unifica descubrimiento, reservas, pagos y engagement de restaurantes y chefs privados.';

// New text  
const newText = 'ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados.';

// Replace
if (content.includes(old)) {
    content = content.replace(old, newText);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Fixed Spanish FAQ1!');
} else {
    console.log('✗ Old text not found!');
    process.exit(1);
}
