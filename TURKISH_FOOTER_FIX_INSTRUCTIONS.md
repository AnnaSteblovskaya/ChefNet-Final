# Manual fix instructions for Turkish footer translations

## Location
File: `/src/locales/translations.ts`
Lines: approximately 1897-1908 (in the `tr:` section)

## Changes needed
Replace the following English texts with Turkish translations in the Turkish (tr:) section ONLY:

### Current (incorrect):
```typescript
    footerTagline: "Your guide",
    footerContacts: "Contacts",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "Newsletter",
    footerNewsletterDesc: "Stay updated",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Subscribe",
    footerPrivacyPolicy: "Privacy",
    footerCopyright: "© 2026 ChefNet LLC",
```

### Should be (correct):
```typescript
    footerTagline: "Restoran yeniliklerinin dünyasında rehberiniz",
    footerContacts: "İletişim",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "Haberler",
    footerNewsletterDesc: "En son haberler ve fırsatlardan haberdar olmak için takipte kalın.",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Abone Ol",
    footerPrivacyPolicy: "Gizlilik Politikası",
    footerCopyright: "© 2026 ChefNet LLC. Tüm hakları saklıdır.",
```

## Important
- DO NOT change the Spanish (es:) section footer - it should remain with English placeholder texts
- ONLY modify the Turkish (tr:) section starting around line 1647
- Email, phone, and address should remain unchanged
