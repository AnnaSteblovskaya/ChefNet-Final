const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'locales', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the Turkish section (tr:) and specifically update footer fields
const replacements = [
  { from: /footerTagline: "Your guide",\n    footerContacts: "Contacts",/g, to: 'footerTagline: "Restoran yeniliklerinin dünyasında rehberiniz",\n    footerContacts: "İletişim",' },
  { from: /footerNewsletter: "Newsletter",\n    footerNewsletterDesc: "Stay updated",/g, to: 'footerNewsletter: "Haberler",\n    footerNewsletterDesc: "En son haberler ve fırsatlardan haberdar olmak için takipte kalın.",' },
  { from: /footerNewsletterButton: "Subscribe",\n    footerPrivacyPolicy: "Privacy",\n    footerCopyright: "© 2026 ChefNet LLC",/g, to: 'footerNewsletterButton: "Abone Ol",\n    footerPrivacyPolicy: "Gizlilik Politikası",\n    footerCopyright: "© 2026 ChefNet LLC. Tüm hakları saklıdır.",' }
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Turkish footer translations updated successfully!');
