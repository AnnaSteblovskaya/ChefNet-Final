#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('src/locales/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Russian section fixes
replacements = [
    # seedBackDesc
    (
        "seedBackDesc: 'Разработка MVP приложения\\nНабор пользователей\\nПереговоры с ресторанами\\nНабор менеджеров по странам\\nKPI: 10K пользователей',",
        "seedBackDesc: '• Набор пользователей\\n• Переговоры с ресторанами\\n• Набор менеджеров по странам\\n• KPI: 10K пользователей',"
    ),
    # privateBackTitle and privateBackDesc
    (
        "privateBackTitle: 'Private: $350,000',",
        "privateBackTitle: 'Тестирование MVP',"
    ),
    (
        "privateBackDesc: 'Тестирование MVP в ключевых городах США и Европы\\nПартнерство с ресторанными ассоциациями и локальными сетями\\nУлучшение алгоритмов персонализации и AI рекомендаций\\nKPI: 100К пользователей, 500 ресторанов',",
        "privateBackDesc: '• Тестирование MVP в ключевых городах США и Европы\\n• Партнерство с ресторанными ассоциациями и локальными сетями\\n• Улучшение алгоритмов персонализации и AI рекомендаций\\n• KPI: 100K пользователей, 500 ресторанов',"
    ),
    # marketingBackTitle and marketingBackDesc
    (
        "marketingBackTitle: 'Marketing: $500,000',",
        "marketingBackTitle: 'Интеграция с сервисами такси',"
    ),
    (
        "marketingBackDesc: 'Интеграция с сервисами такси (Uber, Lyft, Bolt)\\nЗапуск полнофункционального мобильного ChefNet\\nРазвитие fintech модуля (оплата, чаевые, CashBack, ChefNet Token)\\nМасштабные коллаборации с создателями и медиа в США и ЕС\\nKPI: 1M пользователей, 5K ресторанов, $1M прибыли',",
        "marketingBackDesc: '• Интеграция с сервисами такси (Uber, Lyft, Bolt)\\n• Запуск полнофункционального приложения ChefNet\\n• Развитие финтех-модуля (оплата, кэшбэк, ChefNet Token)\\n• Массовые коллаборации с блогерами и медиа в США и ЕС\\n• KPI: 1M пользователей, 5K ресторанов, $1M прибыли',"
    ),
    # publicBackTitle
    (
        "publicBackTitle: 'Public/IPO: > 1 m $',",
        "publicBackTitle: 'Выход на рынки Азии, Латинской Америки и Ближнего Востока',"
    ),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"✓ Replaced: {old[:50]}...")
    else:
        print(f"✗ Not found: {old[:50]}...")

# Fix publicBackDesc with potential encoding issues
import re
pattern = r"publicBackDesc: 'Выход на рынки Азии, Латинской Америки и на Ближний Восток\\nМасштабирование до статуса глоб.{0,5}льного SuperApp\\nЗапуск DAO-коммюнити и NFT программы для ресторанов\\nПодготовка к IPO с капитализацией \$3–5B[^']*',"
replacement = "publicBackDesc: '• Масштабирование до статуса глобального SuperApp\\n• Запуск DAO-комьюнити и NFT-программ для ресторанов\\n• Подготовка к IPO с капитализацией $3–5B\\n• KPI: 30M пользователей, 50K ресторанов, $100M+ прибыли',"

content = re.sub(pattern, replacement, content)
print("✓ Fixed publicBackDesc with regex")

with open('src/locales/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Russian section updated successfully!")
