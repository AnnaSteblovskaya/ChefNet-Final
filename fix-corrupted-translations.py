#!/usr/bin/env python3
"""
Auto-fix script for corrupted translations.ts file
Removes corrupted lines 1101-1171
"""

import os

print("🔧 ChefNet Translations Auto-Fix Script")
print("=" * 50)

file_path = "src/locales/translations.ts"

if not os.path.exists(file_path):
    print(f"❌ ERROR: File not found: {file_path}")
    exit(1)

print(f"📖 Reading file: {file_path}")

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"📊 Total lines BEFORE: {len(lines)}")

# Remove lines 1101-1171 (indices 1100-1170 in 0-based array)
fixed_lines = lines[:1100] + lines[1171:]

print(f"📊 Total lines AFTER: {len(fixed_lines)}")
print(f"🗑️  Removed: {len(lines) - len(fixed_lines)} corrupted lines")

# Create backup
backup_path = file_path + ".backup"
print(f"\n💾 Creating backup: {backup_path}")
with open(backup_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

# Write fixed file
print(f"✏️  Writing fixed file: {file_path}")
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("\n✅ SUCCESS! File fixed automatically.")
print(f"📝 Backup saved as: {backup_path}")
print("\n🎉 Your application should now compile correctly!")
