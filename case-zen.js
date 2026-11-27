// ZenSocial case study and product screens.
const zenSocialCase = t => ({
  "summary": t(
    "ZenSocial — iOS-приложение, в котором можно открыть Instagram и настроить, что показывать в ленте. Фильтры скрывают отвлекающий контент, а сообщения и Stories остаются доступны.",
    "ZenSocial is an iOS app that lets people open Instagram and choose what they see in their feed. Filters hide distractions while keeping messages and Stories available."
  ),
  "facts": [
    [
      t("Продукт", "Product"),
      "ZenSocial"
    ],
    [
      t("Платформа", "Platform"),
      "iOS"
    ],
    [
      t("Моя роль", "My role"),
      t("UX/UI-дизайнер", "UX/UI designer")
    ],
    [
      t("Статус", "Status"),
      t("опубликовано в App Store,\nпродукт развивается", "Available on the App Store,\nin active development")
    ]
  ],
  "about": [
    [
      t("Задача", "The task"),
      t(
        "Спроектировать настройку фильтров для людей, которые заходят в Instagram ради общения и публикаций друзей. До входа пользователь должен понимать, что скроется и что останется доступно, а позже — иметь возможность изменить выбор.",
        "Design feed controls for people who use Instagram to stay in touch and see friends’ posts. Before signing in, they should know what the filters will hide, what will stay available and how to change their choices later."
      )
    ],
    [
      t("Мой вклад", "My contribution"),
      t(
        "Я спроектировала пользовательские сценарии, интерфейс и визуальную систему ZenSocial. Позже провела UX-аудит расширенного онбординга и предложила сократить путь до первого запуска Instagram.",
        "I designed ZenSocial’s user flows, interface and visual system. I later audited the extended onboarding and proposed a shorter path to opening Instagram for the first time."
      )
    ]
  ],
  "personaIntro": t(
    "Анна — рабочая персона. Я описала её, чтобы сформулировать сценарий, в котором человек заходит в Instagram ради общения и отвлекается на Reels или рекомендации.",
    "Anna is a working persona. I used her to describe a scenario in which someone opens Instagram to keep in touch and gets sidetracked by Reels or suggested posts."
  ),
  "journeyIntro": t(
    "Я разложила этот гипотетический сценарий на шаги: от намерения ответить на сообщение до поиска способа ограничить скроллинг.",
    "I mapped this hypothetical journey from answering a message to looking for a way to cut down on scrolling."
  ),
  "journey": [
    [
      t("Уведомление", "Notification"),
      t("Получает уведомление и собирается ответить на сообщение.", "Gets a notification and plans to reply.")
    ],
    [
      t("Открытие приложения", "Opening Instagram"),
      t("Открывает Instagram и замечает публикации в ленте.", "Opens Instagram and notices posts in the feed.")
    ],
    [
      t("Просмотр Reels", "Watching Reels"),
      t("Переключается на короткие видео и продолжает листать.", "Switches to short videos and keeps scrolling.")
    ],
    [
      t("Осознание потраченного времени", "Realising how much time has passed"),
      t("Возникает раздражение из-за незапланированного скроллинга.", "Feels frustrated about scrolling longer than intended.")
    ],
    [
      t("Попытка ограничить использование", "Trying to set a limit"),
      t(
        "Пробует лимит экранного времени. Когда время истекает, он ограничивает и доступ к сообщениям.",
        "Tries a screen-time limit. Once time runs out, messages become harder to access too."
      )
    ],
    [
      t("Поиск решения", "Looking for a solution"),
      t(
        "Нужен способ убрать отвлечения, сохранив доступ к сообщениям и Stories.",
        "Wants fewer distractions while keeping messages and Stories available."
      )
    ]
  ],
  "insight": t(
    "Для такого сценария имеет смысл ограничивать отдельные источники отвлечения и сохранять доступ к общению.",
    "This scenario points to reducing specific distractions while keeping Instagram useful for staying in touch."
  ),
  "hypotheses": [
    [
      "H1",
      t("Избирательная фильтрация", "Selective filtering"),
      t(
        "Если скрывать Reels и рекомендации, сохраняя сообщения и Stories, пользователь будет реже отвлекаться от дела, ради которого открыл Instagram.",
        "Hiding Reels and suggestions while keeping messages and Stories available may help people stick to what they opened Instagram to do."
      )
    ],
    [
      "H2",
      t("Сокращение онбординга", "Shorter onboarding"),
      t(
        "Если убрать шаги, которые не влияют на настройки, пользователи будут быстрее доходить до первого открытия Instagram через ZenSocial.",
        "Removing steps that do not affect settings may help people reach Instagram through ZenSocial sooner."
      )
    ],
    [
      "H3",
      t("Прозрачные настройки", "Clear settings"),
      t(
        "Если перед включением фильтров перечислить, что скроется и что останется доступно, пользователю будет проще предсказать эффект своего выбора.",
        "Showing what will be hidden and what will stay available may help users anticipate the effect before turning on a filter."
      )
    ]
  ],
  "solutions": [
    {
      "title": t("Сводка перед первым входом", "A summary before the first sign-in"),
      "text": t(
        "В конце онбординга пользователь видит, какие ограничения будут действовать и что останется доступно. После этого он включает фильтры и может перейти в Instagram.",
        "At the end of onboarding, users see which restrictions will apply and what will stay available. They can then turn on the filters and continue to Instagram."
      ),
      "image": "iteration_05.webp",
      "caption": t("Сводка в предложенной итерации онбординга", "Summary screen from the proposed onboarding")
    },
    {
      "title": t("Четыре режима фильтрации", "Four filtering modes"),
      "text": t(
        "В настройках ZenSocial можно выбрать, к чему применить фильтр — к рекламе и рекомендациям или ко всей ленте. Для обоих вариантов доступны размытие и замена короткими фактами. Режим можно изменить позже.",
        "In ZenSocial’s settings, people can filter ads and suggestions or apply the filter to the whole feed. In either case, they can blur posts or replace them with short facts. The setting can be changed later."
      ),
      "image": "settings-filter.webp",
      "caption": t("Выбор режима в настройках ZenSocial", "Choosing a mode in ZenSocial’s settings")
    },
    {
      "title": t("Фильтрация в ленте Instagram", "Filtering the Instagram feed"),
      "text": t(
        "Instagram открывается внутри ZenSocial. В режиме размытия рекламы и рекомендаций контент из подписок остаётся видимым. Сообщения и Stories доступны при любом из четырёх режимов.",
        "Instagram opens inside ZenSocial. The mode that blurs ads and suggestions keeps posts from followed accounts visible. Messages and Stories are available in all four modes."
      ),
      "image": "feed-filtered.webp",
      "caption": t("Публикация из подписок рядом с размытой рекомендацией", "A post from a followed account next to a blurred suggestion")
    }
  ],
  "visual": t(
    "Интерфейс построен на тёплой нейтральной палитре, контрастной типографике и простых компонентах. Основные действия и выбранные состояния выделены за счёт цвета, размера и визуальной иерархии.",
    "The interface uses warm neutrals, strong typographic contrast and simple components. Colour, scale and hierarchy distinguish primary actions and selected states."
  ),
  "iteration": t(
    "В ходе разработки онбординг вырос до 15 экранов. При аудите я выделила повторные объяснения и вопросы, ответы на которые не влияли на фильтры.\n\nВ предложении осталось пять экранов: знакомство с продуктом, оценка времени в Instagram, выбор категорий, необязательный выбор режима и итог настроек. Оценка времени показывает годовой эквивалент введённого значения. В макете выбора категорий я показала идею демонстрации фильтра на примере ленты.\n\nЦель итерации — сократить путь к первому запуску Instagram через ZenSocial. Сценарий пока на этапе проектного предложения.",
    "During development, onboarding grew to 15 screens. My audit identified repeated explanations and questions whose answers did not affect the filters.\n\nI proposed five screens: an introduction, an estimate of time spent on Instagram, a choice of categories, an optional filter mode and a settings summary. The time estimate turns a daily figure into a yearly total. The category screen explores how a filter could be demonstrated with a sample feed.\n\nThe goal is to get people to Instagram through ZenSocial sooner. This version is a design proposal."
  ),
  "result": t(
    "ZenSocial опубликован в App Store. Ниже — как выглядит работа фильтров в Instagram, открытом через приложение, и как выбрать режим перед входом.\n\nДля предложенного онбординга следующий шаг — проверить, понимает ли пользователь, что скроется, и сравнить долю завершений и время до первого открытия Instagram.",
    "ZenSocial is available on the App Store. The screens below show filters in the Instagram feed and the settings people can choose before signing in.\n\nThe next step for the proposed onboarding is to test whether people understand what will be hidden, then compare onboarding completion and time to first open Instagram."
  ),
  "persona": `<div class="persona-card" id="zen-persona">
        <div class="persona-lead">
          <img class="zen-persona-photo" src="assets/cases/zen/persona_anna.png" alt="${t("Анна, пользовательская персона", "Anna, working user persona")}" width="493" height="740" loading="lazy" decoding="async">
          <div class="persona-id">ANNA / USER 01</div>
          <h3>${t("Анна, 27 лет", "Anna, 27")}</h3>
          <p>${t("Работает в digital. Регулярно пользуется Instagram, чтобы общаться с друзьями и смотреть Stories.", "Works in digital and regularly uses Instagram to keep up with friends and watch Stories.")}</p>
          <div class="pills"><span>iPhone</span><span>Instagram</span><span>Digital</span></div>
          <div class="persona-quote">${t("«Не хочу удалять Instagram. Хочу заходить туда по делу, а не зависать на час».", "“I want to keep Instagram. I just want to open it for what I need without losing an hour.”")}</div>

        </div>
        <div class="persona-body">
          <div class="persona-block"><div class="mini-tag">01 · ${t("ЦЕЛЬ", "GOAL")}</div><h4>${t("Оставаться на связи", "Stay in touch")}</h4><p>${t("Отвечать на сообщения, смотреть истории друзей и не пропускать важное.", "Reply to messages, watch friends’ Stories and keep up with what matters.")}</p></div>
          <div class="persona-block"><div class="mini-tag">02 · ${t("БОЛЬ", "FRICTION")}</div><h4>${t("«Зашла на минуту»", "“I only opened it for a minute”")}</h4><p>${t("Переход к Reels происходит почти автоматически. Запланированное действие теряется.", "Switching to Reels feels almost automatic. The original task gets forgotten.")}</p></div>
          <div class="persona-block"><div class="mini-tag">03 · ${t("БАРЬЕР", "BARRIER")}</div><h4>${t("Блокировка не подходит", "Blocking Instagram gets in the way")}</h4><p>${t("Лимит экранного времени ограничивает и полезные функции Instagram.", "A screen-time limit also restricts access to the features Anna uses.")}</p></div>
          <div class="persona-block"><div class="mini-tag">04 · ${t("ПОТРЕБНОСТЬ", "NEED")}</div><h4>${t("Гибкий контроль", "Flexible controls")}</h4><p>${t("Самостоятельно скрывать отвлекающий контент и менять настройки позже.", "Choose which distractions to hide and adjust the settings later.")}</p></div>
        </div>
        <div class="jtbd"><span class="mini-tag">JOB TO BE DONE</span><p>${t("Когда я захожу в Instagram ради сообщений или Stories, я хочу не отвлекаться на рекомендации, ", "When I open Instagram for messages or Stories, I want to avoid getting sidetracked by suggestions ")}<strong>${t("чтобы сделать задуманное и вернуться к своим делам.", "so I can do what I came for and get back to my day.")}</strong></p></div>
      </div>`,
  "mood": `<div class="mood-card" role="img" aria-label="${t("Гипотетический эмоциональный путь: в начале спокойствие, затем падение при скроллинге и ограничениях, в конце надежда на решение", "Illustrative emotional journey: calm at first, frustration while scrolling and trying limits, then hope for a solution")}">
          <div class="mood-head"><span class="mini-tag">${t("ЭМОЦИОНАЛЬНЫЙ ПУТЬ", "EMOTIONAL JOURNEY")}</span><span class="muted-research">${t("схематично, не измеренные данные", "Illustrative, not measured")}</span></div>
          <svg viewBox="0 0 960 108" preserveAspectRatio="none" aria-hidden="true">
            <line x1="25" y1="22" x2="936" y2="22" stroke="#ded9d2" stroke-width="1" stroke-dasharray="4 6"/><line x1="25" y1="57" x2="936" y2="57" stroke="#ded9d2" stroke-width="1" stroke-dasharray="4 6"/><line x1="25" y1="90" x2="936" y2="90" stroke="#ded9d2" stroke-width="1" stroke-dasharray="4 6"/>
            <path d="M42 25 C95 28 145 36 205 51 S305 86 375 87 S515 104 560 89 S670 72 722 64 S835 42 925 27" fill="none" stroke="#8c664b" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"/>
            <g fill="#4e3020" stroke="#fff" stroke-width="3"><circle cx="42" cy="25" r="7"/><circle cx="205" cy="51" r="7"/><circle cx="375" cy="87" r="7"/><circle cx="560" cy="89" r="7"/><circle cx="722" cy="64" r="7"/><circle cx="925" cy="27" r="7"/></g>
          </svg>
          <div class="mood-labels"><span>${t("спокойствие", "Calm")}</span><span>${t("потеря контроля", "Loss of control")}</span><span>${t("поиск решения", "Looking for a solution")}</span></div>
        </div>`,
  "colors": `<div class="color-system"><div class="mini-tag">${t("ЦВЕТОВАЯ СИСТЕМА", "COLOUR SYSTEM")}</div><div class="swatches"><div><i style="background:#2e1d13"></i><span>#2E1D13</span></div><div><i style="background:#4c3121"></i><span>#4C3121</span></div><div><i style="background:#faf9f7"></i><span>#FAF9F7</span></div><div><i style="background:#e5e0da"></i><span>#E5E0DA</span></div><div><i style="background:#e7f4ec"></i><span>${t("АКЦЕНТ", "ACCENT")}</span></div></div></div>`,
  "sizes": {
    "app-store-no-reels.webp": [705, 1445],
    "app-store-chats.webp": [649, 1383],
    "app-store-suggestions.webp": [642, 1477],
    "app-store-ads.webp": [659, 1381],
    "app-store-stories.webp": [666, 1407],
    "feed-facts.webp": [1178, 2560],
    "feed-explore.webp": [1177, 2560],
    "feed-filtered.webp": [1181, 2560],
    "settings-filter.webp": [591, 1280],
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
  },
  "iterationScreens": [
    t("Знакомство с ZenSocial", "Introduction to ZenSocial"),
    t("Оценка времени в Instagram", "Estimating time spent on Instagram"),
    t("Выбор категорий для скрытия", "Choosing which categories to hide"),
    t("Выбор режима фильтрации", "Choosing a filter mode"),
    t("Сводка настроек", "Settings summary")
  ]
});

function zenSocialCasePage(d) {
  const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const inline = text => esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^\*([^*]+)\*$/, '<em>$1</em>');
  const paragraphs = text => text.split(/\r?\n\r?\n/).filter(Boolean).map(p => '<p>' + inline(p) + '</p>').join('');
  const image = (name, alt, eager = false) => {
    const isIteration = name.startsWith('iteration_');
    const [width, height] = isIteration ? [640, 1351] : d.sizes[name];
    const file = isIteration ? name.replace('.webp', '-preview.webp') : name;
    return '<img src="assets/cases/zen/' + file + '" alt="' + esc(alt) + '" width="' + width + '" height="' + height + '" loading="' + (eager ? 'eager' : 'lazy') + '" fetchpriority="' + (eager ? 'high' : 'low') + '" decoding="async">';
  };
  const screenButton = (name, title, classes, label = '') => '<button type="button" class="' + classes + '" data-zen-screen="' + name + '" data-caption="' + esc(title) + '" aria-label="' + t("Увеличить: ", "Enlarge: ") + esc(title) + '">' + image(name, title) + label + '</button>';
  const screenFigure = ({image: name, caption}) => '<figure class="zen-product-artifact">' + screenButton(name, caption, 'phone decision-phone') + '<figcaption>' + esc(caption) + '</figcaption></figure>';
  const chapter = (n, title, content) => '<section class="case-chapter" id="zen-' + n + '" aria-labelledby="zen-title-' + n + '"><h2 id="zen-title-' + n + '">' + n + ' / ' + title + '</h2>' + content + '</section>';
  const gallery = (before, count) => '<div id="' + (before ? 'zen-before-track' : 'zen-after-track') + '" class="zen-gallery ' + (before ? 'zen-gallery-before case-image-rail' : 'zen-gallery-after') + '" tabindex="0" role="region" aria-labelledby="' + (before ? 'zen-before-title' : 'zen-after-title') + '">' + Array.from({length: count}, (_, i) => {
    const number = String(i + 1).padStart(2, '0');
    const name = (before ? 'before_' : 'iteration_') + number + '.webp';
    const title = before ? t("Исходный онбординг, экран ", "Original onboarding, screen ") + (i + 1) : d.iterationScreens[i];
    return screenButton(name, title, 'zen-screen', '<span>' + number + ' / ' + String(count).padStart(2, '0') + '</span>');
  }).join('') + '</div>';
  const coverMockups = [
    ['no-reels', t("Лента без вкладки Reels", "Feed without the Reels tab")],
    ['chats', t("Переписки остаются доступны", "Messages stay available")],
    ['suggestions', t("Размытая рекомендация", "Blurred suggested post")],
    ['ads', t("Размытая реклама", "Blurred ad")],
    ['stories', t("Истории остаются доступны", "Stories stay available")]
  ];
  const html = '<article class="case-study zen-case" aria-labelledby="case-title"><div class="case-content">' +
    '<section class="case-introduction"><a class="case-back" href="' + home + '#work">← ' + t("Все проекты", "All projects") + '</a><p class="case-eyebrow">mobile app / ux/ui design</p><h1 id="case-title"><span class="home-scramble" data-scramble>ZenSocial</span></h1>' +
    '<p class="case-summary">' + esc(d.summary) + '</p><dl class="zen-facts">' + d.facts.map(([label, value]) => '<div><dt>' + label + '</dt><dd>' + esc(value).replaceAll('\n', '<br>') + '</dd></div>').join('') + '</dl>' +
    '<div class="hero-visual" id="zen-hero-visual" tabindex="0" role="region" aria-label="' + t("Экраны ZenSocial", "ZenSocial screens") + '">' + coverMockups.map(([name, alt], index) =>
      '<div class="zen-cover-mockup zen-cover-' + name + '">' + image('app-store-' + name + '.webp', alt, index < 2) + '</div>'
    ).join('') + '</div></section>' +
    chapter('02', t("О проекте", "About the project"), d.about.map(([title, text]) => '<div class="case-block"><h3>' + title + '</h3>' + paragraphs(text) + '</div>').join('')) +
    chapter('03', t("UX-анализ", "UX analysis"), '<div class="case-block"><h3>User Persona</h3>' + paragraphs(d.personaIntro) + '</div><div class="zen-product-artifact">' + d.persona + '</div>' +
      '<div class="case-block" id="zen-cjm"><h3>CJM</h3>' + paragraphs(d.journeyIntro) + '</div><div class="zen-product-artifact">' + d.mood + '</div>' +
      '<ol class="zen-journey">' + d.journey.map(([title, text], i) => '<li><span class="zen-index">0' + (i + 1) + '</span><div><h4>' + title + '</h4><p>' + text + '</p></div></li>').join('') + '</ol>' +
      '<aside class="zen-insight"><h3>' + t("Вывод для проектирования", "Design takeaway") + '</h3><p>' + esc(d.insight) + '</p></aside>') +
    chapter('04', t("Продуктовые гипотезы", "Product hypotheses"), '<div class="zen-hypotheses">' + d.hypotheses.map(([id, title, text]) => '<article class="about-panel zen-hypothesis"><span class="zen-index">' + id + '</span><h3>' + title + '</h3><p>' + text + '</p></article>').join('') + '</div>') +
    chapter('05', t("Ключевые решения", "Key decisions"), d.solutions.map(item => '<div class="zen-solution"><div><h3>' + item.title + '</h3>' + paragraphs(item.text) + '</div>' + screenFigure(item) + '</div>').join('')) +
    chapter('06', t("Визуальная система", "Visual system"), '<div class="case-block">' + paragraphs(d.visual) + '</div><div class="zen-product-artifact">' + d.colors + '</div>') +
    chapter('07', t("Оптимизация онбординга", "Shortening onboarding"), '<div class="case-block"><h3>' + t("15 экранов → 5 экранов", "15 screens → 5 screens") + '</h3>' + paragraphs(d.iteration) + '</div>' +
      '<div class="zen-comparison case-image-rail-row"><div class="zen-gallery-header"><h3 id="zen-before-title">' + t("До — исходный онбординг", "Before: original onboarding") + '</h3>' +
      '<div class="zen-gallery-nav" role="group" aria-label="' + t("Листать исходный онбординг", "Browse original onboarding") + '"><button type="button" data-rail-step="-1" aria-label="' + t("Предыдущий экран", "Previous screen") + '" aria-controls="zen-before-track" disabled>←</button>' +
      '<button type="button" data-rail-step="1" aria-label="' + t("Следующий экран", "Next screen") + '" aria-controls="zen-before-track">→</button></div></div>' +
      '<p class="zen-gallery-hint">' + t("Нажмите на экран, чтобы увеличить.", "Select a screen to enlarge it.") + '</p>' + gallery(true, 15) + '</div>' +
      '<div class="zen-comparison"><h3 id="zen-after-title">' + t("После — предложенная UX-итерация", "After: proposed onboarding") + '</h3>' + gallery(false, d.iterationScreens.length) + '</div>') +
    chapter('08', t("Результат", "Outcome"), '<div class="case-block">' + paragraphs(d.result) + '</div><a class="case-live" href="https://apps.apple.com/us/app/zensocial-reels-blocker/id6745687265" target="_blank" rel="noopener noreferrer">' + t("Посмотреть приложение в App Store", "View the app on the App Store") + ' ↗</a>' +
      '<div class="zen-results">' + [
        {image: 'feed-facts.webp', caption: t("Короткая цитата поверх скрытой рекомендации", "Short quote over a hidden suggested post")},
        {image: 'feed-explore.webp', caption: t("Размытые рекомендации в разделе поиска", "Blurred suggestions in Explore")},
        {image: 'settings-filter.webp', caption: t("Настройки фильтра перед входом в Instagram", "Filter settings before opening Instagram")}
      ].map(screenFigure).join('') + '</div>') +
    '<nav class="case-next" aria-label="' + t("Другие кейсы", "More case studies") + '"><h2>' + t("Следующий кейс", "Next case study") + '</h2><a class="case-next-link" href="' + caseUrl('choreo') + '">XoreoKids →</a><a href="' + home + '#work">← ' + t("Все проекты", "All projects") + '</a></nav>' +
    '<dialog class="zen-lightbox" aria-label="' + t("Увеличенный экран приложения", "Enlarged app screen") + '"><button type="button" class="zen-lightbox-close" autofocus aria-label="' + t("Закрыть увеличенный экран", "Close enlarged screen") + '">✕</button><figure><img alt=""><figcaption></figcaption></figure></dialog></div></article>';
  return html.replace(/>([^<>]+)</g, (_, text) => '>' + joinRussianShortWords(text) + '<');
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
