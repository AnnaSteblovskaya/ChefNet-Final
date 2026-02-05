const fs = require('fs');

// Read the file
let content = fs.readFileSync('/src/locales/translations.ts', 'utf8');

// Split into lines for manipulation
const lines = content.split('\n');

// Find the Turkish section starting line
let trStartLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'tr: {') {
    trStartLine = i;
    break;
  }
}

if (trStartLine === -1) {
  console.error('❌ Turkish section not found!');
  process.exit(1);
}

// Now find and replace the footer fields in the Turkish section only
// We need to find them after the tr: { line and before the closing bracket
let modified = false;
for (let i = trStartLine; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Stop if we hit the closing bracket of tr section
  if (line === '},') {
    // Check if next significant line starts a new language section
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    if (j < lines.length && lines[j].trim() === '};') {
      // This is the end of tr section
      break;
    }
  }
  
  // Replace footer fields
  if (lines[i].includes('footerTagline: "Your guide"')) {
    lines[i] = lines[i].replace('"Your guide"', '"Restoran yeniliklerinin dünyasında rehberiniz"');
    modified = true;
    console.log('✓ Fixed footerTagline');
  }
  else if (lines[i].includes('footerContacts: "Contacts"')) {
    lines[i] = lines[i].replace('"Contacts"', '"İletişim"');
    modified = true;
    console.log('✓ Fixed footerContacts');
  }
  else if (lines[i].includes('footerNewsletter: "Newsletter"')) {
    lines[i] = lines[i].replace('"Newsletter"', '"Haberler"');
    modified = true;
    console.log('✓ Fixed footerNewsletter');
  }
  else if (lines[i].includes('footerNewsletterDesc: "Stay updated"')) {
    lines[i] = lines[i].replace('"Stay updated"', '"En son haberler ve fırsatlardan haberdar olmak için takipte kalın."');
    modified = true;
    console.log('✓ Fixed footerNewsletterDesc');
  }
  else if (lines[i].includes('footerNewsletterButton: "Subscribe"')) {
    lines[i] = lines[i].replace('"Subscribe"', '"Abone Ol"');
    modified = true;
    console.log('✓ Fixed footerNewsletterButton');
  }
  else if (lines[i].includes('footerPrivacyPolicy: "Privacy"')) {
    lines[i] = lines[i].replace('"Privacy"', '"Gizlilik Politikası"');
    modified = true;
    console.log('✓ Fixed footerPrivacyPolicy');
  }
  else if (lines[i].includes('footerCopyright: "© 2026 ChefNet LLC"') && !lines[i].includes('saklıdır')) {
    lines[i] = lines[i].replace('"© 2026 ChefNet LLC"', '"© 2026 ChefNet LLC. Tüm hakları saklıdır."');
    modified = true;
    console.log('✓ Fixed footerCopyright');
  }
}

if (modified) {
  // Write back
  fs.writeFileSync('/src/locales/translations.ts', lines.join('\n'), 'utf8');
  console.log('\n✅ Turkish footer translations updated successfully!');
} else {
  console.log('⚠️  No changes were made. Fields might already be correct.');
}
