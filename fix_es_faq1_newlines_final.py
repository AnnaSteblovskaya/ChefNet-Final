#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix Spanish FAQ1 newline escaping in translations.ts
Replace \\\\n\\\\n with \\n\\n in Spanish FAQ1Answer
"""

import re

file_path = 'src/locales/translations.ts'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to find the specific FAQ1Answer line in Spanish section
    # We need to replace \\\\n\\\\n with \\n\\n
    pattern = r'("ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados\.)\\\\\\\\n\\\\\\\\n(Aborda la fragmentación del ecosistema de servicios de alimentación mediante el establecimiento de un único estándar integrado y sin fricciones\.",)'
    
    replacement = r'\1\\n\\n\2'
    
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('✅ Fixed Spanish FAQ1 newlines: \\\\\\\\n\\\\\\\\n → \\n\\n')
        print('Changed 1 occurrence')
    else:
        print('⚠️  Pattern not found or already fixed')
        print('Searching for the string...')
        if 'ChefNet es una plataforma global de FoodTech que unifica el descubrimiento' in content:
            print('✓ Spanish FAQ1 text found in file')
            # Count occurrences of \\\\n\\\\ in the relevant section
            import_count = content.count('\\\\\\\\n\\\\\\\\n')
            print(f'Found {import_count} occurrences of \\\\\\\\n\\\\\\\\n in the file')
        else:
            print('✗ Spanish FAQ1 text NOT found in file')
            
except FileNotFoundError:
    print(f'❌ Error: File not found: {file_path}')
except Exception as e:
    print(f'❌ Error: {e}')
