import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('./src/locales/translations.ts', 'utf-8');
const lines = content.split('\n');

console.log(`Total lines before: ${lines.length}`);

// Remove lines 1101-1171 (indices 1100-1170)
const fixedLines = [
  ...lines.slice(0, 1100),
  ...lines.slice(1171)
];

console.log(`Total lines after: ${fixedLines.length}`);

writeFileSync('./src/locales/translations.ts', fixedLines.join('\n'), 'utf-8');

console.log('✅ File fixed!');
