#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the translations file
const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');

console.log('Reading file:', filePath);

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('File size:', content.length, 'chars');

// Count occurrences before
const beforeCount = (content.match(/\\\\\\\\n\\\\\\\\n/g) || []).length;
console.log('Found', beforeCount, 'occurrences of \\\\\\\\n\\\\\\\\n');

// Replace \\\\n\\\\n with \\n\\n (4 backslashes to 2 backslashes)
// In the file, \\\\n\\\\n appears as literal text, so we need to replace it
content = content.replace(/\\\\\\\\n\\\\\\\\n/g, '\\\\n\\\\n');

// Count occurrences after  
const afterCount = (content.match(/\\\\\\\\n\\\\\\\\n/g) || []).length;
console.log('Remaining occurrences:', afterCount);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ File fixed successfully!');
console.log('Replaced', (beforeCount - afterCount), 'occurrences');
