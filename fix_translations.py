#!/usr/bin/env python3

import re

# Read the file
with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

print(f'File size: {len(content)} chars')

# Count occurrences before
before_count = len(re.findall(r'\\\\\\\\n\\\\\\\\n', content))
print(f'Found {before_count} occurrences of \\\\\\\\n\\\\\\\\n')

# Replace \\\\n\\\\n with \\n\\n
# In the file these appear as 4 backslashes followed by n, so we replace with 2
content = content.replace('\\\\\\\\n\\\\\\\\n', '\\\\n\\\\n')

# Count occurrences after
after_count = len(re.findall(r'\\\\\\\\n\\\\\\\\n', content))
print(f'Remaining occurrences: {after_count}')

# Write the file back
with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ File fixed successfully!')
print(f'Replaced {before_count - after_count} occurrences')
