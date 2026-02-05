#!/usr/bin/env python3
import re

# Read the file
with open('/src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find FAQ10 for German and replace
# Replace only in the German section FAQ10
pattern = r"(faq10Answer: 'ChefNet vereint das gesamte Gästerlebnis.*?)(\\n)(1\. KI-Concierge statt Filter-Suche.*?)(\\n)(Konkurrenz:.*?)(\\n\\n)(2\. Nahtloses Fintech.*?)(\\n)(Konkurrenz:.*?)(\\n\\n)(3\. Sozialer Dining-Ansatz.*?)(\\n)(Konkurrenz:.*?)(\\n\\n)(4\. Faires Monetarisierungsmodell)(\\n)(Konkurrenz:.*?)(\\n\\n)(5\. Lebendige Bewertungskultur.*?)(\\n)(Konkurrenz:.*?)(\\nWir: Echtheit durch Video.*?Entertainment\.',)"

# Simpler approach: just replace all instances of \nKonkurrenz: with \n\nKonkurrenz: in the faq10Answer German section
# First, find the German de section start and end
de_start = content.find("  de: {")
de_end = content.find("  es: {")

if de_start != -1 and de_end != -1:
    de_section = content[de_start:de_end]
    
    # Find faq10Answer in German section
    faq10_start = de_section.find("faq10Answer:")
    if faq10_start != -1:
        # Find the end of faq10Answer (next line starting with faq or contact)
        faq10_end = de_section.find("\n    contact", faq10_start)
        if faq10_end != -1:
            faq10_text = de_section[faq10_start:faq10_end]
            
            # Replace \nKonkurrenz: with \n\nKonkurrenz:
            faq10_text_fixed = faq10_text.replace("\\nKonkurrenz:", "\\n\\nKonkurrenz:")
            
            # Replace in the de_section
            de_section_fixed = de_section[:faq10_start] + faq10_text_fixed + de_section[faq10_end:]
            
            # Replace in content
            content = content[:de_start] + de_section_fixed + content[de_end:]

# Write back
with open('/src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed faq10Answer German version - added newline before Konkurrenz:")
