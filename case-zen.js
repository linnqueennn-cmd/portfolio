// ZenSocial content v2; product artifacts adapted from the supplied prototype.
const zenSocialCase = {
  "summary": "ZenSocial — iOS-приложение для фильтрации контента Instagram. Пользователь может скрывать Reels, рекламу и рекомендации, сохраняя доступ к сообщениям, Stories и публикациям друзей.",
  "facts": [
    [
      "Продукт",
      "ZenSocial"
    ],
    [
      "Платформа",
      "iOS"
    ],
    [
      "Моя роль",
      "UX/UI-дизайнер"
    ],
    [
      "Статус",
      "опубликовано в App Store, продукт развивается"
    ]
  ],
  "about": [
    [
      "Задача",
      "Спроектировать интерфейс, который помогает ограничивать отвлекающий контент Instagram без полной блокировки приложения. Пользователь должен понимать, что изменится после включения фильтров, и самостоятельно управлять настройками."
    ],
    [
      "Мой вклад",
      "Проектирование пользовательских сценариев, разработка интерфейса и визуальной системы приложения. Позднее — UX-аудит расширенного онбординга и предложение по его оптимизации."
    ]
  ],
  "personaIntro": "Для анализа пользовательского сценария я описала персону человека, который использует Instagram для общения, но периодически отвлекается на Reels и рекомендованный контент.",
  "journeyIntro": "Карта пользовательского пути показывает, как простое действие — ответить на сообщение или посмотреть Stories — может перейти в незапланированный скроллинг.",
  "journey": [
    [
      "Уведомление",
      "Заходит в Instagram с конкретной целью — ответить на сообщение."
    ],
    [
      "Открытие приложения",
      "Замечает контент, который не связан с задачей."
    ],
    [
      "Просмотр Reels",
      "Переключается на короткие видео и продолжает листать."
    ],
    [
      "Осознание потраченного времени",
      "Возникает раздражение из-за незапланированного скроллинга."
    ],
    [
      "Попытка ограничить использование",
      "Лимиты экранного времени мешают пользоваться и нужными функциями."
    ],
    [
      "Поиск решения",
      "Нужен способ убрать отвлечения, сохранив доступ к сообщениям и Stories."
    ]
  ],
  "insight": "Пользователь хочет ограничить не Instagram целиком, а отдельные механики, которые отвлекают от первоначальной цели.",
  "hypotheses": [
    [
      "H1",
      "Избирательная фильтрация",
      "Если скрывать Reels и рекомендации, сохраняя Direct и Stories, пользователь сможет выполнять запланированные действия с меньшим количеством отвлечений."
    ],
    [
      "H2",
      "Сокращение онбординга",
      "Если убрать необязательные шаги до первого запуска, пользователь сможет быстрее перейти к настройке и использованию приложения."
    ],
    [
      "H3",
      "Прозрачные настройки",
      "Если заранее показывать результат выбора фильтров и разрешить менять настройки позднее, пользователю будет проще понять работу приложения."
    ]
  ],
  "solutions": [
    {
      "title": "Выбор контента для скрытия",
      "text": "Пользователь настраивает категории контента по отдельности. Предпросмотр показывает, как будет выглядеть лента с выбранными ограничениями.",
      "image": "source_filters.webp"
    },
    {
      "title": "Отображение скрытого контента",
      "text": "Пользователь выбирает, как показывать скрытые публикации: размывать или заменять короткими фактами. Доступен вариант по умолчанию; этот шаг можно пропустить, а настройки изменить позднее.",
      "image": "source_appearance.webp"
    },
    {
      "title": "Подтверждение настроек",
      "text": "Перед входом в Instagram пользователь видит итог выбранных ограничений и функции, которые останутся доступны. Итоговый список соответствует сделанному выбору.",
      "image": "source_summary.webp"
    }
  ],
  "visual": "Интерфейс построен на тёплой нейтральной палитре, контрастной типографике и простых компонентах. Основные действия и выбранные состояния выделены за счёт цвета, размера и визуальной иерархии.",
  "iteration": "В ходе дальнейшей разработки онбординг был расширен до 15 экранов. Я провела UX-аудит сценария и подготовила сокращённую версию.\n\n**Основные проблемы:** повторение информации о продукте, вопросы, не влияющие на настройки, и длинный путь до первого использования.\n\n**Предложенное решение:** пять экранов — знакомство с продуктом, оценка времени в Instagram, выбор фильтров, необязательная настройка отображения скрытого контента и итог выбранных ограничений.\n\n**Цель:** сократить путь к основной функции, сохранив необходимую информацию о работе приложения.\n\n*Сокращённый онбординг — проектное предложение, а не уже внедрённый сценарий. Его влияние на показатели приложения пока не измерено.*",
  "result": "ZenSocial опубликован в App Store. Для приложения были спроектированы пользовательские сценарии и интерфейс, а для следующей итерации — разработано предложение по оптимизации онбординга.\n\nСледующий этап — проверить сокращённый сценарий и оценить, как он влияет на завершение онбординга и первый запуск.",
  "persona": "<div class=\"persona-card\" id=\"zen-persona\">\n        <div class=\"persona-lead\">\n          <img class=\"zen-persona-photo\" src=\"assets/cases/zen/persona_anna.png\" alt=\"Анна, пользовательская персона\" width=\"493\" height=\"740\" loading=\"lazy\" decoding=\"async\">\n          <div class=\"persona-id\">ANNA / USER 01</div>\n          <h3>Анна, 27 лет</h3>\n          <p>Работает в digital. Регулярно пользуется Instagram, чтобы общаться с друзьями и смотреть Stories.</p>\n          <div class=\"pills\"><span>iPhone</span><span>Instagram</span><span>Digital</span></div>\n          <div class=\"persona-quote\">«Не хочу удалять Instagram. Хочу заходить туда по делу, а не зависать на час».</div>\n          \n        </div>\n        <div class=\"persona-body\">\n          <div class=\"persona-block\"><div class=\"mini-tag\">01 · ЦЕЛЬ</div><h4>Оставаться на связи</h4><p>Отвечать на сообщения, смотреть истории друзей и не пропускать важное.</p></div>\n          <div class=\"persona-block\"><div class=\"mini-tag\">02 · БОЛЬ</div><h4>«Зашла на минуту»</h4><p>Переход к Reels происходит почти автоматически. Запланированное действие теряется.</p></div>\n          <div class=\"persona-block\"><div class=\"mini-tag\">03 · БАРЬЕР</div><h4>Блокировка не подходит</h4><p>Лимит экранного времени ограничивает и полезные функции Instagram.</p></div>\n          <div class=\"persona-block\"><div class=\"mini-tag\">04 · ПОТРЕБНОСТЬ</div><h4>Гибкий контроль</h4><p>Самостоятельно скрывать отвлекающий контент и менять настройки позже.</p></div>\n        </div>\n        <div class=\"jtbd\"><span class=\"mini-tag\">JOB TO BE DONE</span><p>Когда я захожу в Instagram ради сообщений или Stories, я хочу не отвлекаться на рекомендации, <strong>чтобы сделать задуманное и вернуться к своим делам.</strong></p></div>\n      </div>",
  "mood": "<div class=\"mood-card\" role=\"img\" aria-label=\"Гипотетический эмоциональный путь: в начале спокойствие, затем падение при скроллинге и ограничениях, в конце надежда на решение\">\n          <div class=\"mood-head\"><span class=\"mini-tag\">ЭМОЦИОНАЛЬНЫЙ ПУТЬ</span><span class=\"muted-research\">схематично, не измеренные данные</span></div>\n          <svg viewBox=\"0 0 960 108\" preserveAspectRatio=\"none\" aria-hidden=\"true\">\n            <line x1=\"25\" y1=\"22\" x2=\"936\" y2=\"22\" stroke=\"#ded9d2\" stroke-width=\"1\" stroke-dasharray=\"4 6\"/><line x1=\"25\" y1=\"57\" x2=\"936\" y2=\"57\" stroke=\"#ded9d2\" stroke-width=\"1\" stroke-dasharray=\"4 6\"/><line x1=\"25\" y1=\"90\" x2=\"936\" y2=\"90\" stroke=\"#ded9d2\" stroke-width=\"1\" stroke-dasharray=\"4 6\"/>\n            <path d=\"M42 25 C95 28 145 36 205 51 S305 86 375 87 S515 104 560 89 S670 72 722 64 S835 42 925 27\" fill=\"none\" stroke=\"#8c664b\" stroke-width=\"3.4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>\n            <g fill=\"#4e3020\" stroke=\"#fff\" stroke-width=\"3\"><circle cx=\"42\" cy=\"25\" r=\"7\"/><circle cx=\"205\" cy=\"51\" r=\"7\"/><circle cx=\"375\" cy=\"87\" r=\"7\"/><circle cx=\"560\" cy=\"89\" r=\"7\"/><circle cx=\"722\" cy=\"64\" r=\"7\"/><circle cx=\"925\" cy=\"27\" r=\"7\"/></g>\n          </svg>\n          <div class=\"mood-labels\"><span>спокойствие</span><span>потеря контроля</span><span>поиск решения</span></div>\n        </div>",
  "colors": "<div class=\"color-system\"><div class=\"mini-tag\">ЦВЕТОВАЯ СИСТЕМА</div><div class=\"swatches\"><div><i style=\"background:#2e1d13\"></i><span>#2E1D13</span></div><div><i style=\"background:#4c3121\"></i><span>#4C3121</span></div><div><i style=\"background:#faf9f7\"></i><span>#FAF9F7</span></div><div><i style=\"background:#e5e0da\"></i><span>#E5E0DA</span></div><div><i style=\"background:#e7f4ec\"></i><span>АКЦЕНТ</span></div></div></div>",
  "sizes": {
    "cover_before_after.webp": [
      946,
      2048
    ],
    "source_filters.webp": [
      946,
      2048
    ],
    "source_appearance.webp": [
      946,
      2048
    ],
    "source_summary.webp": [
      946,
      2048
    ],
    "persona_anna.png": [
      493,
      740
    ],
    "auth_login.webp": [
      537,
      1134
    ],
    "before_01.webp": [
      538,
      1145
    ],
    "before_02.webp": [
      539,
      1145
    ],
    "before_03.webp": [
      538,
      1145
    ],
    "before_04.webp": [
      538,
      1145
    ],
    "before_05.webp": [
      538,
      1145
    ],
    "before_06.webp": [
      538,
      1145
    ],
    "before_07.webp": [
      539,
      1145
    ],
    "before_08.webp": [
      538,
      1145
    ],
    "before_09.webp": [
      538,
      1145
    ],
    "before_10.webp": [
      538,
      1145
    ],
    "before_11.webp": [
      538,
      1145
    ],
    "before_12.webp": [
      539,
      1145
    ],
    "before_13.webp": [
      538,
      1145
    ],
    "before_14.webp": [
      538,
      1145
    ],
    "before_15.webp": [
      538,
      1145
    ],
    "after_01.webp": [
      174,
      367
    ],
    "after_02.webp": [
      173,
      367
    ],
    "after_03.webp": [
      173,
      367
    ],
    "after_04.webp": [
      173,
      367
    ],
    "after_05.webp": [
      173,
      367
    ]
  }
};

function zenSocialCasePage() {
  const d = zenSocialCase;
  const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const nbsp = text => text.replace(/(^|\s)([авикосу]|до|из|на|от|по|за|об|не|со|для|без)(?= ) /gi, '$1$2 ');
  const inline = text => esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^\*([^*]+)\*$/, '<em>$1</em>');
  const paragraphs = text => text.split(/\r?\n\r?\n/).filter(Boolean).map(p => '<p>' + inline(p) + '</p>').join('');
  const image = (name, alt, eager = false) => {
    const [width, height] = d.sizes[name];
    return '<img src="assets/cases/zen/' + name + '" alt="' + esc(alt) + '" width="' + width + '" height="' + height + '" loading="' + (eager ? 'eager' : 'lazy') + '" fetchpriority="' + (eager ? 'high' : 'low') + '" decoding="async">';
  };
  const phone = (name, alt, classes = '', eager = false) => '<div class="phone ' + classes + '">' + image(name, alt, eager) + '</div>';
  const chapter = (n, title, content) => '<section class="case-chapter" id="zen-' + n + '" aria-labelledby="zen-title-' + n + '"><h2 id="zen-title-' + n + '">' + n + ' / ' + title + '</h2>' + content + '</section>';
  const gallery = (kind, count) => '<div class="zen-gallery zen-gallery-' + kind + '" tabindex="0" role="region" aria-label="' + (kind === 'before' ? 'Исходный онбординг: 15 экранов' : 'Предложенная UX-итерация: 5 экранов') + '">' + Array.from({length: count}, (_, i) => {
    const number = String(i + 1).padStart(2, '0');
    const name = kind + '_' + number + '.webp';
    const title = (kind === 'before' ? 'Исходный онбординг' : 'Предложенная UX-итерация') + ', экран ' + (i + 1);
    return '<button type="button" class="zen-screen" data-zen-screen="' + name + '" data-caption="' + esc(title) + '" aria-label="Увеличить: ' + esc(title) + '">' + image(name, title) + '<span>' + number + ' / ' + String(count).padStart(2, '0') + '</span></button>';
  }).join('') + '</div>';
  const html = '<article class="case-study zen-case" aria-labelledby="case-title"><div class="case-content">' +
    '<section class="case-introduction"><a class="case-back" href="./#work">← Все проекты</a><h1 id="case-title"><span class="home-scramble" data-scramble>ZenSocial</span></h1>' +
    '<p class="case-summary">' + esc(d.summary) + '</p><dl class="zen-facts">' + d.facts.map(([label, value]) => '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>').join('') + '</dl>' +
    '<div class="hero-visual" id="zen-hero-visual" aria-label="Интерфейс ZenSocial в двух телефонах">' + phone('source_filters.webp', 'Настройка фильтров ZenSocial', 'hero-phone hero-phone-back', true) + phone('cover_before_after.webp', 'Сравнение ленты Instagram до и после фильтрации', 'hero-phone hero-phone-front', true) + '</div></section>' +
    chapter('02', 'О проекте', d.about.map(([title, text]) => '<div class="case-block"><h3>' + title + '</h3>' + paragraphs(text) + '</div>').join('')) +
    chapter('03', 'UX-анализ', '<div class="case-block"><h3>User Persona</h3>' + paragraphs(d.personaIntro) + '</div><div class="zen-product-artifact">' + d.persona + '</div>' +
      '<div class="case-block" id="zen-cjm"><h3>CJM</h3>' + paragraphs(d.journeyIntro) + '</div><div class="zen-product-artifact">' + d.mood + '</div>' +
      '<ol class="zen-journey">' + d.journey.map(([title, text], i) => '<li><span class="zen-index">0' + (i + 1) + '</span><div><h4>' + title + '</h4><p>' + text + '</p></div></li>').join('') + '</ol>' +
      '<aside class="zen-insight"><h3>Ключевой инсайт</h3><p>' + esc(d.insight) + '</p></aside>') +
    chapter('04', 'Продуктовые гипотезы', '<div class="zen-hypotheses">' + d.hypotheses.map(([id, title, text]) => '<article class="about-panel zen-hypothesis"><span class="zen-index">' + id + '</span><h3>' + title + '</h3><p>' + text + '</p></article>').join('') + '</div>') +
    chapter('05', 'Ключевые решения', d.solutions.map(item => '<div class="zen-solution"><div><h3>' + item.title + '</h3>' + paragraphs(item.text) + '</div><figure class="zen-product-artifact">' + phone(item.image, item.title, 'decision-phone') + '</figure></div>').join('')) +
    chapter('06', 'Визуальная система', '<div class="case-block">' + paragraphs(d.visual) + '</div><div class="zen-product-artifact">' + d.colors + '</div>') +
    chapter('07', 'Оптимизация онбординга', '<div class="case-block"><h3>15 экранов → 5 экранов</h3>' + paragraphs(d.iteration) + '</div>' +
      '<div class="zen-comparison"><h3>До — исходный онбординг</h3><p class="zen-gallery-hint">Листайте экраны. Нажмите, чтобы увеличить.</p>' + gallery('before', 15) + '</div>' +
      '<div class="zen-comparison"><h3>После — предложенная UX-итерация</h3><p class="zen-gallery-hint">5 экранов. Влияние на показатели пока не измерено.</p>' + gallery('after', 5) + '</div>') +
    chapter('08', 'Результат', '<div class="case-block">' + paragraphs(d.result) + '</div><a class="case-live" href="https://apps.apple.com/ru/app/zensocial-reels-blocker/id6745687265" target="_blank" rel="noopener noreferrer">Посмотреть приложение в App Store ↗</a>' +
      '<div class="zen-results"><figure class="zen-product-artifact">' + phone('auth_login.webp', 'Реальный экран авторизации ZenSocial', 'decision-phone') + '<figcaption>Авторизация в приложении</figcaption></figure>' +
      '<figure class="zen-placeholder"><div>Скриншот будет добавлен</div><figcaption>Лента Instagram с активными фильтрами</figcaption></figure><figure class="zen-placeholder"><div>Скриншот будет добавлен</div><figcaption>Изменение фильтров после входа</figcaption></figure></div>') +
    '<nav class="case-next" aria-label="Другие кейсы"><h2>Следующий кейс</h2><a class="case-next-link" href="./?case=choreo">XoreoKids →</a><a href="./#work">← Все проекты</a></nav>' +
    '<dialog class="zen-lightbox" aria-label="Увеличенный экран приложения"><button type="button" class="zen-lightbox-close" autofocus aria-label="Закрыть увеличенный экран">✕</button><figure><img alt=""><figcaption></figcaption></figure></dialog></div></article>';
  return html.replace(/>([^<>]+)</g, (_, text) => '>' + nbsp(text) + '<');
}

function setupZenSocialCase() {
  const root = document.querySelector('.zen-case');
  const chart = root.querySelector('.mood-card svg');
  chart.querySelectorAll('circle').forEach(circle => {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    dot.setAttribute('cx', circle.getAttribute('cx'));
    dot.setAttribute('cy', circle.getAttribute('cy'));
    circle.replaceWith(dot);
  });
  const chartObserver = new ResizeObserver(() => {
    const {width, height} = chart.getBoundingClientRect();
    if (!width || !height) return;
    const radius = width < 500 ? 4 : 6;
    chart.querySelectorAll('ellipse').forEach(dot => {
      dot.setAttribute('rx', radius * 960 / width);
      dot.setAttribute('ry', radius * 108 / height);
    });
  });
  chartObserver.observe(chart);
  const dialog = root.querySelector('.zen-lightbox');
  root.querySelectorAll('[data-zen-screen]').forEach(button => {
    button.addEventListener('click', () => {
      const image = dialog.querySelector('img');
      image.src = 'assets/cases/zen/' + button.dataset.zenScreen;
      image.alt = button.dataset.caption;
      dialog.querySelector('figcaption').textContent = button.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
