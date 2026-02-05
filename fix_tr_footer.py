#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

# Read the file
with open('/src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the Turkish section (tr:) start index
tr_match = re.search(r'\n  tr: \{', content)
if not tr_match:
    print("❌ Turkish section not found!")
    exit(1)

tr_start = tr_match.end()

# Find the end of Turkish section (closing brace for tr)
# We need to find the matching closing brace
tr_section_end = content.find('\n  },\n', tr_start)
if tr_section_end == -1:
    print("❌ Turkish section end not found!")
    exit(1)

# Extract only the Turkish section
tr_section = content[tr_start:tr_section_end]

# Perform replacements ONLY within Turkish section
replacements = [
    (r'footerTagline: "Your guide"', 'footerTagline: "Restoran yeniliklerinin dünyasında rehberiniz"'),
    (r'footerContacts: "Contacts"', 'footerContacts: "İletişim"'),
    (r'footerNewsletter: "Newsletter"', 'footerNewsletter: "Haberler"'),
    (r'footerNewsletterDesc: "Stay updated"', 'footerNewsletterDesc: "En son haberler ve fırsatlardan haberdar olmak için takipte kalın."'),
    (r'footerNewsletterButton: "Subscribe"', 'footerNewsletterButton: "Abone Ol"'),
    (r'footerPrivacyPolicy: "Privacy"', 'footerPrivacyPolicy: "Gizlilik Politikası"'),
    (r'footerCopyright: "© 2026 ChefNet LLC"', 'footerCopyright: "© 2026 ChefNet LLC. Tüm hakları saklıdır."'),
]

modified = False
for pattern, replacement in replacements:
    if re.search(pattern, tr_section):
        tr_section = re.sub(pattern, replacement, tr_section)
        modified = True
        print(f'✓ Replaced: {pattern[:30]}...')

if modified:
    # Reconstruct the file with the modified Turkish section
    new_content = content[:tr_start] + tr_section + content[tr_section_end:]
    
    # Write back
    with open('/src/locales/translations.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print('\n✅ Turkish footer translations updated successfully!')
else:
    print('⚠️  No changes were made. Fields might already be correct.')
