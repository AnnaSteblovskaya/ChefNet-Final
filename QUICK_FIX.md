# ⚡ БЫСТРОЕ ИСПРАВЛЕНИЕ TRANSLATIONS.TS

## Проблема
Файл `/src/locales/translations.ts` поврежден дублированной секцией на строках 1101-1171.

## ✅ РЕШЕНИЯ (выберите любой):

### 🚀 Способ 1: Node.js (САМЫЙ ПРОСТОЙ)
```bash
node fix-translations.js
```

### 🐍 Способ 2: Python  
```bash
python3 fix_translations.py
```

### 🔧 Способ 3: Bash с sed
```bash
bash fix-translations-sed.sh
```

### ⚡ Способ 4: Прямая команда (одна строка)
```bash
# Linux/Mac
head -n 1100 src/locales/translations.ts > temp.ts && tail -n +1172 src/locales/translations.ts >> temp.ts && mv temp.ts src/locales/translations.ts

# или с бэкапом
cp src/locales/translations.ts src/locales/translations.ts.backup && head -n 1100 src/locales/translations.ts > temp.ts && tail -n +1172 src/locales/translations.ts >> temp.ts && mv temp.ts src/locales/translations.ts
```

### 📝 Способ 5: VS Code (ручной)
1. `Ctrl+G` → введите `1101` → Enter
2. Выделите строки 1101-1171
3. Delete
4. `Ctrl+S` для сохранения

---

## ✅ Проверка
```bash
grep -n "es: {" src/locales/translations.ts
```
Должна быть **ОДНА** строка: `1101:  es: {`

---

**Все скрипты создают автоматический бэкап перед изменениями!**