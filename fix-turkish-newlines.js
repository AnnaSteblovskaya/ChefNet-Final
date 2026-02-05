const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the Turkish section's faq2Answer and replace quadruple backslashes with double
// This regex targets the specific pattern in the Turkish translation
const beforeLength = content.length;
content = content.replace(
  /(tr:\s*\{[\s\S]*?faq2Answer:\s*"[^"]*?)\\\\\\\\n\\\\\\\\n/g,
  '$1\\\\n\\\\n'
);

console.log('Characters changed:', beforeLength - content.length);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed Turkish newlines in translations.ts');
