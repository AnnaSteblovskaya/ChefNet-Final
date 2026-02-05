const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Split by lines to work with line numbers
const lines = content.split('\n');

// Find the first incorrect Turkish section (starts around line 1161)
// and the correct Turkish section (starts around line 1613)
let firstTrIndex = -1;
let secondTrIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'tr: {') {
    if (firstTrIndex === -1) {
      firstTrIndex = i;
    } else if (secondTrIndex === -1) {
      secondTrIndex = i;
      break;
    }
  }
}

console.log('First Turkish section at line:', firstTrIndex + 1);
console.log('Second Turkish section at line:', secondTrIndex + 1);

if (firstTrIndex !== -1 && secondTrIndex !== -1) {
  // Find the closing brace of the first Turkish section
  // It should be right before the second Turkish section
  let closingBraceIndex = secondTrIndex - 1;
  while (closingBraceIndex > firstTrIndex && lines[closingBraceIndex].trim() !== '},') {
    closingBraceIndex--;
  }
  
  console.log('Closing brace of first Turkish section at line:', closingBraceIndex + 1);
  
  // Remove lines from firstTrIndex to closingBraceIndex (inclusive)
  const newLines = [
    ...lines.slice(0, firstTrIndex),
    ...lines.slice(closingBraceIndex + 1)
  ];
  
  // Join back and write
  const newContent = newLines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  console.log('Successfully removed incorrect Turkish section!');
  console.log('Removed lines:', firstTrIndex + 1, 'to', closingBraceIndex + 1);
  console.log('Total lines removed:', closingBraceIndex - firstTrIndex + 1);
} else {
  console.log('Could not find both Turkish sections');
}
