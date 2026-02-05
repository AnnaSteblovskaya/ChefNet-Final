# КРИТИЧЕСКОЕ ОБНОВЛЕНИЕ: footerMainTitle и footerTagline для всех языков

## 🔴 Проблема
В файле `/src/locales/translations.ts` необходимо добавить новое поле `footerMainTitle` для большого заголовка над футером и обновить `footerTagline` (только подзаголовок под логотипом).

## ✅ Тип уже обновлен (строка 235-236):
```typescript
// Footer
footerMainTitle: string;  // ← добавлено
footerTagline: string;
```

## 📝 НЕОБХОДИМО ОБНОВИТЬ ВРУЧНУЮ:

### 1. АНГЛИЙСКАЯ ВЕРСИЯ (EN) - строки 553-554

**❌ БЫЛО:**
```typescript
    footerTagline: "Your guide",
    footerContacts: "Contacts",
```

**✅ ДОЛЖНО БЫТЬ:**
```typescript
    footerMainTitle: "The future of restaurants starts here.\\nJoin",
    footerTagline: "Your guide to the world of restaurant innovation",
    footerContacts: "Contacts",
```

---

### 2. РУССКАЯ ВЕРСИЯ (RU) - строки 880-882

**❌ БЫЛО:**
```typescript
    footerTagline:
      "Будущее ресторанов начинается здесь.\\\\nПрисоединяйся к ChefNet\\\\nВаш проводник в мир ресторанных инноваций",
    footerContacts: "Контакты",
```

**✅ ДОЛЖНО БЫТЬ:**
```typescript
    footerMainTitle:
      "Будущее ресторанов начинается здесь.\\\\nПрисоединяйся к",
    footerTagline: "Ваш проводник в мир ресторанных инноваций",
    footerContacts: "Контакты",
```

---

### 3. НЕМЕЦКАЯ ВЕРСИЯ (DE) - строки ~1217-1219

**❌ БЫЛО:**
```typescript
    footerTagline:
      "Будущее ресторанов начинается здесь.\\\\nПрисоединяйся к ChefNet\\\\nВаш проводник в мир ресторанных инноваций",
    footerContacts: "Контакты",
```

**✅ ДОЛЖНО БЫТЬ:**
```typescript
    footerMainTitle:
      "Die Zukunft der Restaurants beginnt hier.\\\\nBegleite",
    footerTagline: "Dein Wegweiser in die Welt der Restaurant-Innovationen",
    footerContacts: "Kontakte",
```

---

### 4. ИСПАНСКАЯ ВЕРСИЯ (ES) - строки ~1556-1558

**❌ БЫЛО:**
```typescript
    footerTagline: "Your guide",
    footerContacts: "Contacts",
```

**✅ ДОЛЖНО БЫТЬ:**
```typescript
    footerMainTitle: "El futuro de los restaurantes comienza aquí.\\\\nÚnete a",
    footerTagline: "Tu guía al mundo de la innovación restaurantera",
    footerContacts: "Contactos",
```

---

### 5. ТУРЕЦКАЯ ВЕРСИЯ (TR) - строки ~1892-1894

**❌ БЫЛО:**
```typescript
    footerTagline: "Your guide",
    footerContacts: "Contacts",
```

**✅ ДОЛЖНО БЫТЬ:**
```typescript
    footerMainTitle: "Restoranların geleceği burada başlıyor.\\\\nKatıl",
    footerTagline: "Restoran inovasyonları dünyasına rehberiniz",
    footerContacts: "İletişim",
```

---

## 📋 ИНСТРУКЦИЯ ПО ПРИМЕНЕНИЮ:

1. Откройте `/src/locales/translations.ts`
2. Найдите каждую секцию языка (en, ru, de, es, tr)
3. Найдите строку с `footerTagline`
4. Добавьте ПЕРЕД ней строку `footerMainTitle` с соответствующим значением
5. Обновите `footerTagline` на короткий подзаголовок
6. Сохраните файл

## ⚠️ ВАЖНО:
- В русской и немецкой версиях используются двойные обратные слэши `\\\\n` для переноса строки
- В английской, испанской и турецкой используются одинарные `\\n`
- Слово "ChefNet" будет выделено оранжевым цветом в компоненте Footer.tsx автоматически

## 🎯 РЕЗУЛЬТАТ:
После обновления футер будет отображать:
- **Большой заголовок вверху**: "Будущее ресторанов начинается здесь. / Присоединяйся к **ChefNet**." (где ChefNet оранжевый)
- **Подзаголовок под логотипом**: "Ваш проводник в мир ресторанных инноваций"
