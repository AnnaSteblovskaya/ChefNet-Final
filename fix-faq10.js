const fs = require('fs');

// Read the file
let content = fs.readFileSync('/tmp/sandbox/src/locales/translations.ts', 'utf8');

// Find the German section and replace \nKonkurrenz: with \n\nKonkurrenz:
// This only affects the faq10Answer in the German (de) section

const lines = content.split('\n');
let inFaq10 = false;
let isDe = false;

for (let i = 0; i < lines.length; i++) {
  // Check if we're in the de section
  if (lines[i].trim() === 'de: {') {
    isDe = true;
  }
  if (isDe && lines[i].trim().startsWith('es: {')) {
    isDe = false;
  }
  
  // If we're in the de section and found faq10Answer
  if (isDe && lines[i].includes("faq10Answer: 'ChefNet vereint")) {
    // Replace \nKonkurrenz: with \n\nKonkurrenz: in this line
    lines[i] = lines[i].replace(/\\nKonkurrenz:/g, '\\n\\nKonkurrenz:');
    break; // Only need to fix one occurrence
  }
}

content = lines.join('\n');

// Write back
fs.writeFileSync('/tmp/sandbox/src/locales/translations.ts', content, 'utf8');

console.log('Fixed: Added newline before Konkurrenz: in German FAQ10');
