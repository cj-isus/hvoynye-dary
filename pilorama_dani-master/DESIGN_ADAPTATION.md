# Адаптированная дизайн-система для сайта пиломатериалов
> На основе General Intelligence Company — Style Reference. Адаптация под нишу, бесплатные шрифты, добавлен тёплый акцент дерева.

---

## 1. Философия адаптации

**Оригинал:** Architectural Night Sky — холодная achromatic-система для IT/AI-продукта.
**Адаптация:** Сохраняем всю архитектуру, типографическую дисциплину и многослойные тени. Добавляем **один** тёплый акцент — древесный медовый — для создания связи с продуктом без нарушения минимализма.

**Принцип:** Холодный фон и типографика подчёркивают тёплую текстуру дерева в фотографиях. Дерево становится главным акцентом — цвета лишь рамка.

---

## 2. Типографика — замена шрифтов

### Оригинал → Замена

| Роль | Оригинал | Замена | Причина |
|------|----------|--------|---------|
| Заголовки, Hero | PPMondwest (платный) | **Playfair Display** (Google Fonts) | Тот же характер: высокий контраст, засечки, интеллектуальная элегантность |
| Тело, навигация, UI | af (платный) | **Inter** (Google Fonts) | Тот же функционализм: чистый гротеск, отличная читаемость на всех размерах |
| Альтернатива заголовкам | — | **Cormorant Garamond** | Если Playfair покажется слишком тяжёлым для деревенской тематики |

### Подключение (бесплатно, self-host не требуется)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Важно:** `display=swap` гарантирует, что текст отобразится сразу (возможен FOUC — мигание без засечек на 0.1-0.3 сек). Для критичных секций рекомендуется `font-display: optional` + предзагрузка.

### Обновлённая типографическая шкала

| Роль | Шрифт | Размер | Line Height | Letter Spacing | Weight | Применение на сайте пиломатериалов |
|------|-------|--------|-------------|----------------|--------|-----------------------------------|
| display | Playfair Display | clamp(40px, 5vw, 54px) | 1.1 | -0.02em | 400 | Hero: "Пиломатериалы от производителя" |
| heading-lg | Playfair Display | clamp(36px, 4vw, 48px) | 1.1 | -0.02em | 500 | Название секции "Продукция" |
| heading | Playfair Display | clamp(28px, 3vw, 40px) | 1.1 | -0.02em | 500 | Подзаголовки внутри секций |
| subheading | Inter | 18px | 1.2 | -0.01em | 500 | Адрес, подписи к карточкам |
| body | Inter | 16px | 1.5 | -0.01em | 400 | Основной текст описаний |
| body-sm | Inter | 15px | 1.4 | -0.01em | 400 | Второстепенный текст |
| button-label | Inter | 16px | 1 | -0.01em | 500 | Кнопки CTA |
| caption | Inter | 13px | 1.5 | -0.01em | 400 | Подписи, реквизиты, мелкий текст |
| price | Inter | 24px | 1 | -0.01em | 600 | Цена в карточке товара |

**Ключевое изменение — `clamp()` для заголовков:**
- `clamp(40px, 5vw, 54px)` = никогда меньше 40px, никогда больше 54px, между ними — 5% от ширины экрана
- Это обеспечивает **плавную адаптивность между всеми диагоналями** без резких breakpoint-скачков

---

## 3. Цветовая палитра — адаптированная

### Сохранённые цвета (без изменений)

| Токен | Значение | Роль на сайте пиломатериалов |
|-------|----------|------------------------------|
| `--color-night-sky` | `#1f1f29` | Фон Hero, футер, тёмные акцентные секции |
| `--color-cofounder-blue` | `#0081c0` | Цена, кнопка "Позвонить", маркер на карте, активные состояния |
| `--color-action-azure` | `#41a1cf` | Граница outlined-кнопок, hover-ссылки |
| `--color-canvas-white` | `#ffffff` | Основной фон страницы |
| `--color-off-white` | `#fefffc` | Фон карточек товаров, альтернативные секции |
| `--color-ash-gray` | `#f9faf7` | Фон input-полей, фон мобильного меню |
| `--color-cool-gray` | `#eef1ed` | Разделители, тонкие границы |
| `--color-steel-gray` | `#dee2de` | Тонкие линии, hairline-разделители |
| `--color-dark-charcoal` | `#171717` | Основной текст, заголовки |
| `--color-charcoal` | `#2c2c2c` | Вторичный текст, подзаголовки |
| `--color-rich-black` | `#282834` | Границы на тёмном фоне |
| `--color-slate-gray` | `#444141` | Placeholder-текст, иконки |
| `--color-medium-gray` | `#646464` | Вспомогательный текст, подписи |
| `--color-light-gray` | `#b4b8b4` | Очень мягкие разделители |

### Новый цвет — тёплый акцент дерева

| Токен | Значение | Роль | Применение |
|-------|----------|------|------------|
| `--color-wood-warm` | `#C4A882` | **Единственный тёплый акцент**. Древесный медовый. | Hover на карточках товаров, декоративная линия под заголовком, рамка фото в галерее |
| `--color-wood-deep` | `#8B5A2B` | Тёмная древесина — редкий акцент | Подчёркивание активного пункта меню, иконка "дерево" в логотипе |

**Правило использования:**
- `--color-wood-warm` только в hover/деkor. Никогда в качестве фона больших блоков.
- Максимум — 5% площади экрана. Он должен быть заметен, но не доминировать.
- Сочетание с `--color-cofounder-blue`: тёплый hover + холодный CTA = контраст притягивает взгляд.

---

## 4. Тени и элевация (без изменений)

Тени — ключевой элемент оригинального дизайна. Сохраняем полностью.

| Токен | Значение | Применение |
|-------|----------|------------|
| `--shadow-sm` | `rgba(0, 0, 0, 0.15) 0px 2px 6px 0px` | Навигация, мелкие элементы |
| `--shadow-subtle` | `rgb(222, 226, 222) 0px 0px 0px 1px` | Тонкие границы без "тяжести" |
| `--shadow-subtle-2` | `rgba(0, 0, 0, 0.08) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 4px 5px 0px` | **Карточки товаров** |
| `--shadow-subtle-3` | `rgba(0, 0, 0, 0.06) 0px 2px 2px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 5px` | Выделенные карточки, акцентные блоки |
| `--shadow-sm-2` | `rgba(0, 0, 0, 0.05) 0px 1px 8px 0px` | Input-поля, мягкие контейнеры |

---

## 5. Скругления (без изменений)

| Токен | Значение | Применение |
|-------|----------|------------|
| `--radius-buttons` | `4px` | Кнопки "Узнать цену", "Позвонить" |
| `--radius-navitemssmall` | `8px` | Пункты навигации |
| `--radius-cardssmall` | `12px` | Мелкие карточки (преимущество) |
| `--radius-cardsmedium` | `16px` | Карточки товаров |
| `--radius-cardslarge` | `24px` | Hero Overlay Card, крупные блоки |
| `--radius-nav` | `50.496px` | Плавающая навигация (pill-форма) |

---

## 6. Компоненты — адаптация под пиломатериалы

### 6.1. Hero Section (главный экран)

| Элемент | Спецификация |
|---------|--------------|
| Фон | Фото базы / пиломатериалов с градиентом `linear-gradient(to right, rgba(31,31,41,0.85), rgba(31,31,41,0.4))` |
| Заголовок | Playfair Display, display-size, `#ffffff` |
| Подзаголовок | Inter, subheading, `rgba(255,255,255,0.8)` |
| Hero Overlay Card | Фон `rgba(222,226,222,0.16)`, radius 24px, padding 24px, blur backdrop |
| Содержимое overlay | Телефон (кликабельный), адрес, режим работы — крупно, читаемо сразу |
| CTA | Solid Dark Button: фон `#1f1f29`, текст `#ffffff`, radius 8px |

### 6.2. Product Card (карточка товара)

| Элемент | Спецификация |
|---------|--------------|
| Фон | `#fefffc` (off-white) |
| Радиус | 16px (`--radius-cardsmedium`) |
| Тень | `--shadow-subtle-2` |
| Фото | Верхняя часть, object-fit: cover, aspect-ratio 4:3 |
| Название | Inter, 18px, weight 500, `#171717` |
| Порода | Inter, 13px, `#646464` |
| Цена | Inter, 24px, weight 600, `#0081c0` (cofounder-blue) |
| Hover | Тень `--shadow-subtle-3`, верхняя граница 2px `#C4A882` (wood-warm), подъём translateY(-4px) |

### 6.3. Gallery Grid (фото базы)

| Элемент | Спецификация |
|---------|--------------|
| Сетка | CSS Grid, `auto-fill`, `minmax(280px, 1fr)`, gap 16px |
| Фото | Radius 12px, overflow hidden |
| Hover | Масштабирование фото 1.05, overlay с подписью |
| Caption | Inter, 13px, `#ffffff` на градиенте |

### 6.4. Contact Map Block (контакты + карта)

| Элемент | Спецификация |
|---------|--------------|
| Левая колонка | Контакты в Elevated Content Card (`#fefffc`, radius 12px) |
| Правая колонка | Яндекс.Карта, тёмная тема, маркер `#0081c0` |
| Мобильно | Карта сверху (100% ширины, 300px высота), контакты под ней |

### 6.5. Sticky Mobile CTA (закреплённая панель на телефоне)

| Элемент | Спецификация |
|---------|--------------|
| Позиция | Fixed, bottom: 0, width: 100%, z-index: 100 |
| Фон | `#ffffff`, тень `--shadow-sm`, border-top 1px `#dee2de` |
| Кнопки | 2 кнопки: "Позвонить" (Solid Dark Button, `#1f1f29`) + "WhatsApp" (Outlined, border `#41a1cf`) |
| Паддинг | Безопасная зона `env(safe-area-inset-bottom)` для iPhone |

---

## 7. Адаптивная сетка — между всеми диагоналями

### Breakpoints (мягкие, не жёсткие)

| Название | Диапазон | Особенности |
|----------|----------|-------------|
| Mobile S | 320-360px | Телефоны старые, узкие |
| Mobile M | 361-480px | Современные телефоны |
| Mobile L | 481-768px | Большие телефоны, портрет планшета |
| Tablet | 769-1024px | Планшеты, маленькие ноутбуки |
| Laptop | 1025-1440px | Стандартные ноутбуки |
| Desktop | 1441px+ | Большие мониторы |

### Fluid типографика (без breakpoint-скачков)

```css
/* Заголовки плавно растут от 320px до 1920px */
--text-fluid-display: clamp(2.5rem, 5vw + 1rem, 3.375rem);
--text-fluid-heading: clamp(2rem, 3vw + 0.5rem, 2.5rem);
--text-fluid-subheading: clamp(1rem, 1vw + 0.5rem, 1.125rem);
```

### Сетка карточек товаров

```css
/* Одно правило работает на всех устройствах */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 16px;
}
```
- Mobile: 1 колонка (280px не влезет — берётся 100%)
- Tablet: 2 колонки
- Laptop+: 3-4 колонки

### Hero на разных экранах

| Диагональ | Высота Hero | Фото |
|-----------|-------------|------|
| < 768px (телефон) | 100vh (полный экран) | Портретная кадрировка, фокус на текстуру |
| 768-1024px (планшет) | 80vh | Сбалансированная композиция |
| > 1024px (ноутбук+) | 90vh | Широкая панорама базы |

### Галерея базы

| Диапазон | Колонки | Высота строк |
|----------|---------|--------------|
| < 480px | 1 | 250px |
| 480-768px | 2 | 200px |
| 768-1200px | 3 | 220px |
| > 1200px | 4 | 240px |

---

## 8. Правила композиции (Do's and Don'ts)

### Do
- Использовать Playfair Display для всех заголовков — придаёт вес и доверие даже простому тексту "Брус, доска, вагонка"
- Огромные фото — пусть дерево говорит само. Минимум текста рядом с фото пиломатериалов.
- Night Sky для Hero — тёмный фон делает фото дерева тёплее и выразительнее.
- Много воздуха (white space) между секциями. Комфортная плотность = доверие.
- Цены в Cofounder Blue — они должны быть первым, что видит глаз после фото товара.
- Wood-warm (#C4A882) только в микро-акцентах: линия под заголовком секции, hover-бордер карточки.

### Don't
- Не использовать таблицы для цен. Только карточки с фото. Таблицы убивают мобильную версию и выглядят дёшево.
- Не ставить больше 6 карточек товаров в ряд на десктопе — карточки сжимаются и фото мельчают.
- Не использовать градиенты (кроме hero-overlay). Система строится на плоскости и тенях.
- Не добавлять второй тёплый цвет. Дерево в фото уже даёт тепло — UI должен оставаться холодным и спокойным.
- Не делать цены красным, жёлтым или другим "акционным" цветом. Cofounder Blue (#0081c0) — это и есть акцент.
- Не использовать font-weight 700 в Playfair Display — выглядит грубо. Максимум 500.

---

## 9. Обновлённые CSS Custom Properties

```css
:root {
  /* === Оригинальная палитра (сохранена) === */
  --color-night-sky: #1f1f29;
  --color-cofounder-blue: #0081c0;
  --color-action-azure: #41a1cf;
  --color-pitch-black: #000000;
  --color-canvas-white: #ffffff;
  --color-off-white: #fefffc;
  --color-ash-gray: #f9faf7;
  --color-cool-gray: #eef1ed;
  --color-steel-gray: #dee2de;
  --color-dark-charcoal: #171717;
  --color-charcoal: #2c2c2c;
  --color-rich-black: #282834;
  --color-slate-gray: #444141;
  --color-medium-gray: #646464;
  --color-light-gray: #b4b8b4;

  /* === Новый тёплый акцент === */
  --color-wood-warm: #C4A882;
  --color-wood-deep: #8B5A2B;

  /* === Типографика (заменены шрифты) === */
  --font-display: 'Playfair Display', 'Georgia', serif;
  --font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;

  /* === Fluid типографика === */
  --text-fluid-display: clamp(2.5rem, 5vw + 1rem, 3.375rem);
  --text-fluid-heading-lg: clamp(2.25rem, 4vw + 0.5rem, 3rem);
  --text-fluid-heading: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  --text-fluid-subheading: clamp(1rem, 1vw + 0.5rem, 1.125rem);

  /* === Тени (сохранены) === */
  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 2px 6px 0px;
  --shadow-subtle: rgb(222, 226, 222) 0px 0px 0px 1px;
  --shadow-subtle-2: rgba(0, 0, 0, 0.08) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 4px 5px 0px;
  --shadow-subtle-3: rgba(0, 0, 0, 0.06) 0px 2px 2px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 5px;
  --shadow-sm-2: rgba(0, 0, 0, 0.05) 0px 1px 8px 0px;

  /* === Скругления (сохранены) === */
  --radius-buttons: 4px;
  --radius-navitemssmall: 8px;
  --radius-cardssmall: 12px;
  --radius-cardsmedium: 16px;
  --radius-cardslarge: 24px;
  --radius-nav: 50.496px;

  /* === Отступы (сохранены) === */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;

  /* === Layout === */
  --section-gap: 32px;
  --card-padding: 16px;
  --element-gap: 8px;
  --container-max-width: 1200px;
  --container-padding: clamp(16px, 4vw, 48px);
}
```

---

## 10. Бренды-референсы для ниши пиломатериалов

| Бренд | Что заимствовать |
|-------|------------------|
| **Linear** | Холодный hero + светлое тело, лаконичность |
| **Apple Product Pages** | Крупные фото товара, минимум текста, цена как акцент |
| **Aesop** | Натуральные материалы в фото, achromatic UI, доверие через минимализм |
| **Vipp** | Промышленная эстетика + теплые материалы |

---

## 11. Scroll-driven Animations & Приятный скролл

> Цель: сайт "дышит" при скролле. Секции появляются плавно, без рывков. Адаптивность учитывает мобильные браузеры с плавающими панелями.

### 11.1. Базовый плавный скролл

```css
html {
  scroll-behavior: smooth;
  /* Учёт фиксированного header при якорном переходе */
  scroll-padding-top: 80px;
}
```

### 11.2. Появление секций (IntersectionObserver)

Каждая секция по умолчанию `opacity: 0; transform: translateY(30px)`. При входе в viewport:

| Параметр | Значение |
|----------|----------|
| Trigger | IntersectionObserver, threshold 0.15 |
| Animation | opacity 0→1, translateY(30px)→0 |
| Duration | 0.6s |
| Easing | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out-quad) |
| Stagger карточек | 0.08s между элементами внутри секции |

### 11.3. Parallax Hero (лёгкий)

- Фон Hero сдвигается на 15% скорости скролла (`transform: translateY` через JS, не `background-attachment: fixed` — лагает на iOS)
- Контент Hero (текст) сдвигается на 30% скорости = эффект глубины
- На мобильном (> 768px) parallax отключается через `matchMedia` — экономим батарею

### 11.4. Адаптивность под мобильные устройства (качественно)

| Проблема | Решение |
|----------|---------|
| `100vh` на мобильном = под браузерной панелью | Использовать `min-height: 100svh` (small viewport height), fallback `100vh` |
| Safe area iPhone (чёлка, home indicator) | `env(safe-area-inset-*)` в padding header и Sticky CTA |
| Touch target слишком мал | Все кликабельные элементы минимум **48×48px** (Google Material guideline) |
| Горизонтальный скролл табов карт | `overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch` |
| Масштабирование форм на iOS | `meta viewport: width=device-width, initial-scale=1, maximum-scale=5` (не запрещаем zoom для доступности) |
| 300ms tap delay на старых Android | `touch-action: manipulation` |

### 11.5. `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 11.6. Lazy loading изображений

- Все фото базы и продукции: `loading="lazy"`, `decoding="async"`
- Hero-фото: `fetchpriority="high"`, `loading="eager"`
- Предзагрузка критических шрифтов: `<link rel="preload">` для Playfair Display 500 + Inter 400

---

## 12. Карты: Яндекс · Google · 2GIS (Embed iframe + Deep Links)

> **Без API-ключей, без JS SDK, без биллинга.** Только embed iframe по адресу + ссылки для маршрутов. Минимум зависимостей, максимум совместимости.

| Сервис | Способ встраивания | URL-формат | Сложность | Когда использовать |
|--------|-------------------|------------|-----------|-------------------|
| **Яндекс.Карты** | iframe embed по адресу | `https://yandex.ru/map-widget/v1/?ll=lon,lat&z=16&pt=lon,lat` или iframe из "Поделиться → Встроить" | Низкая | **Основная карта.** Лучшая детализация в РФ, привычный интерфейс |
| **Google Maps** | iframe embed по адресу | `https://www.google.com/maps/embed?pb=...` (из "Поделиться → Встроить карту") | Низкая | Fallback / международные клиенты. Привычный интерфейс |
| **2GIS** | iframe embed по адресу / ID фирмы | `https://widgets.2gis.com/...` или iframe из виджета 2GIS | Низкая | Если в вашем городе 2GIS детальнее (схемы проезда, фото зданий) |

### 12.1. Как получить embed-ссылку (инструкция для заказчика)

**Яндекс.Карты:**
1. Открыть https://yandex.ru/maps
2. Найти адрес базы
3. Нажать "Поделиться" → "Встроить карту"
4. Скопировать HTML-код с `<iframe>`
5. Извлечь из него `src="..."` — это embed-URL

**Google Maps:**
1. Открыть https://maps.google.com
2. Найти адрес базы
3. Нажать "Поделиться" → "Встроить карту"
4. Скопировать HTML `<iframe>`
5. Извлечь `src="..."`

**2GIS:**
1. Открыть https://2gis.ru
2. Найти фирму / адрес
3. Нажать "Виджет" или "Поделиться"
4. Скопировать iframe-код или ID фирмы для виджета

### 12.2. UX решение: табы над картой

**Desktop:**
- Горизонтальные табы: `[Яндекс] [Google] [2GIS]`
- Active tab: нижнее подчёркивание 2px `#0081c0` (Cofounder Blue), текст `#171717`
- Inactive tab: текст `#646464`, hover `#2c2c2c`
- Переключение без перезагрузки (JS меняет `src` у `<iframe>`)
- Fade-переход 0.2s opacity контейнера карты

**Mobile (< 768px):**
- Horizontal scroll tabs (`overflow-x: auto`, без scrollbar)
- Табы крупнее (padding 12px 20px) для пальца
- Высота карты **280px** (не 450px — экономим вертикальное пространство)
- Кнопка "Развернуть карту" открывает embed в новой вкладке (или deep link в приложение)

### 12.3. Fallback при проблемах с iframe

Если iframe не загрузился (блокировщик рекламы, медленный интернет, запрет вставки):
- Показываем placeholder с текстом "Карта загружается..."
- Кнопки-ссылки под placeholder:
  - "Открыть в Яндекс.Картах" → `https://yandex.ru/maps/?text=АДРЕС`
  - "Открыть в Google Maps" → `https://www.google.com/maps/search/?api=1&query=АДРЕС`
  - "Открыть в 2GIS" → `https://2gis.ru/search/АДРЕС`
- **Важно:** никаких API-ключей не требуется — это обычные URL.

### 12.4. Deep links (мобильные и десктоп)

При нажатии "Построить маршрут" открываем URL выбранного сервиса с адресом назначения:

| Сервис | URL-шаблон (заменить `АДРЕС` или `lat,lon`) |
|--------|--------------------------------------------|
| **Яндекс** | `https://yandex.ru/maps/?rtext=~АДРЕС&rtt=auto` |
| **Google** | `https://www.google.com/maps/dir/?api=1&destination=АДРЕС` |
| **2GIS** | `https://2gis.ru/dir?to=lon,lat` или `https://2gis.ru/search/АДРЕС` |

Если координаты неизвестны — используем адрес текстом, сервис сам геокодирует.

### 12.5. Пример структуры контейнера карт

```html
<div class="maps-wrapper">
  <div class="maps-tabs" role="tablist">
    <button class="maps-tab active" data-map="yandex">Яндекс</button>
    <button class="maps-tab" data-map="google">Google</button>
    <button class="maps-tab" data-map="2gis">2GIS</button>
  </div>
  <div class="map-panels">
    <!-- iframe загружается динамически при первом открытии таба (лениво) -->
    <div class="map-panel active" id="map-yandex">
      <iframe src="https://yandex.ru/map-widget/v1/?..." loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="map-panel" id="map-google">...</div>
    <div class="map-panel" id="map-2gis">...</div>
  </div>
  <a class="map-deep-link" href="https://yandex.ru/maps/?rtext=~АДРЕС" target="_blank">Построить маршрут</a>
</div>
```

---

## 13. Mobile-First адаптив: детальный план

### 13.1. Breakpoints (мягкие)

| Название | Диапазон | Ключевые изменения |
|----------|----------|-------------------|
| **Mobile S** | 320-360px | 1 колонка, шрифты минимальные, Sticky CTA обязателен |
| **Mobile M** | 361-480px | 1 колонка, Hero 100svh, карта 280px |
| **Mobile L** | 481-768px | Можно 2 колонки для преимуществ, табы карт horizontal scroll |
| **Tablet** | 769-1024px | 2 колонки товаров, навигация раскрывается полностью |
| **Laptop** | 1025-1440px | 3-4 колонки товаров, Hero 90vh, карта 450px |
| **Desktop** | 1441px+ | Максимальная ширина контейнера 1200px по центру, воздух по краям |

### 13.2. Container queries для карточек (прогрессивное улучшение)

```css
@container (min-width: 300px) {
  .product-card { /* стандарт */ }
}
@container (min-width: 400px) {
  .product-card { /* больше фото, цена справа */ }
}
```

Используем CSS Grid + `minmax()` как основу, container queries — для тонкой настройки внутри карточек.

### 13.3. Testing checklist адаптивности

| Устройство / Эмуляция | Что проверить |
|-----------------------|---------------|
| iPhone SE (375×667) | Влезает ли Hero текст, не перекрывает ли Sticky CTA |
| iPhone 14 Pro (393×852) | Safe area, чёткость шрифтов |
| Samsung S22 (360×780) | Touch targets, скорость скролла |
| iPad Air (820×1180) | 2 колонки товаров, не слишком растянуты ли карточки |
| Desktop 1920×1080 | Не растягивается ли контент > 1200px |
| Desktop 2560×1440 | Центрирование, не пусто ли по краям |
| Поворот телефона (landscape) | Hero не ломается, карта адекватной высоты |

