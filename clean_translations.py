#!/usr/bin/env python3
"""
Script to clean the translations.ts file by removing duplicate content
between lines 930 and 1173.
"""

def clean_translations():
    with open('/src/locales/translations.ts', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Keep lines 0-929 (up to and including line 929, which is the closing brace for 'de')
    # Skip lines 930-1173 (the duplicate/corrupted content including French closing brace)
    # Keep lines 1174 onwards (the correct 'es' section)
    
    cleaned_lines = lines[:929] + lines[1173:]
    
    with open('/src/locales/translations.ts', 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)
    
    print(f"Successfully cleaned translations.ts")
    print(f"Removed lines 930-1173 ({1173-929} lines)")
    print(f"Original file had {len(lines)} lines")
    print(f"Cleaned file has {len(cleaned_lines)} lines")

if __name__ == '__main__':
    clean_translations()
