const mamaRomaCase = t => ({
  imageFormat: 'webp',
  imagePreviews: {'01_cover': 1800, '09_final': 1800},
  imageSizes: {
    '01_cover': [2100, 1113], '02_before': [1753, 1922], '03_after': [1753, 2311],
    '04_wireframe_a': [1754, 2314], '04_wireframe_b': [1754, 3093],
    '05_palette': [3900, 603], '06_hero': [1752, 1191], '07_vacancies': [1752, 1059],
    '08_team': [1755, 1173], '09_final': [5600, 5184], '11_month': [3900, 1477],
    '12_year': [3900, 1310], '13_old_form': [1725, 3363]
  },
  id: 'roma', title: t('МАМА РОМА', "MAMA ROMA"), eyebrow: 'hr / design & development',
  subtitle: t('Редизайн карьерного сайта ресторанной сети Mama Roma', "Redesigning the careers site for the Mama Roma restaurant group"),
  summary: t(
    'Сайт для молодых кандидатов: помогает быстро выбрать вакансию, познакомиться с командой и откликнуться без длинной анкеты.',
    "A careers site for young applicants that makes it easy to find a role, meet the team and apply without filling out a long form."
  ),
  metrics: [['937', t('заявок за годовой период', "applications over one year")], [t('56 024', '56,024'), t('сессии за годовой период', "sessions over one year")], [t('+1 238,57%', '+1,238.57%'), t('рост количества заявок', "increase in applications")], [t('3,83%', '3.83%'), t('конверсия за июнь 2026', "conversion rate in June 2026")]],
  cover: '01_cover', url: 'https://rabota.mamaroma.ru/', next: {id: 'zen', title: 'ZenSocial'},
  sections: [
    {title: t('О проекте и моя роль', "Project and role"), blocks: [{text: [
      t(
        'Mama Roma — сеть итальянских ресторанов. Карьерный сайт знакомит кандидатов с условиями работы, вакансиями и культурой команды.',
        "Mama Roma is an Italian restaurant group. Its careers site introduces applicants to open roles, working conditions and the team’s culture."
      ),
      t(
        'Моя роль: UX/UI-дизайн и разработка. Анализ конкурентов и аудитории, структура, прототипирование, визуальная концепция, тексты, адаптация, сборка на Tilda и запуск.',
        "**My role:** UX/UI design and development. I researched competitors and applicants, planned the site structure, prototyped, developed the visual direction, wrote the copy, adapted the design across devices and built and launched the site on Tilda."
      )
    ]}]},
    {title: t('Проблема и задача', "Challenge and goal"), blocks: [{text: [
      t(
        'Старый сайт напоминал информационную страницу: много текста, слабая визуальная иерархия, сгенерированные изображения сотрудников и длинная анкета. Он плохо справлялся с привлечением кандидатов.',
        "The old site read like an information page. It had dense copy, a weak visual hierarchy, AI-generated staff images and a long application form. It did little to encourage people to apply."
      ),
      t(
        'Задача — сделать карьерный сайт понятным и привлекательным для молодой аудитории, показать условия работы и возможность стать частью команды, упростить отклик. При этом важно было сохранить узнаваемый стиль сети.',
        "The goal was to make the careers site clear and appealing to young applicants, show them what working at Mama Roma would be like and make applying easier. The site also needed to stay recognisable as part of the brand."
      )
    ], compare: [['02_before', t('Старый карьерный сайт Mama Roma', "Previous Mama Roma careers site"), t('До', "Before")], ['03_after', t('Новая версия карьерного сайта Mama Roma', "Redesigned Mama Roma careers site"), t('После', "After")]]}]},
    {title: t('Исследование и проектирование', "Research and planning"), blocks: [
      {title: t('Что важно кандидатам', "What matters to applicants"), text: [t(
        'Я изучила карьерные сайты в разных отраслях, проанализировала конкурентов и провела интервью с представителями целевой аудитории. При проектировании учитывала зарплату, график, условия работы, простоту отклика и возможность найти друзей и стать частью коллектива.',
        "I reviewed careers sites across industries, analysed competitors and interviewed people in the target audience. The design took into account pay, schedules, working conditions, ease of applying and the chance to make friends and feel part of a team."
      )]},
      {title: t('От потребностей к структуре', "From needs to site structure"), text: [t(
        'Сценарий построен так, чтобы кандидат мог сразу оставить контакт или сначала узнать больше о работе: первый экран → выбор вакансии → преимущества → жизнь команды → информация о компании → отклик.',
        "Applicants can leave their number right away or learn more first. The page moves from the opening section to roles, benefits, team life, company information and the application form."
      )], compare: [['04_wireframe_a', t('Прототип: первый экран и выбор вакансии', "Wireframe showing the opening section and role selector")], ['04_wireframe_b', t('Прототип: преимущества, команда и отклик', "Wireframe showing benefits, the team and the application form")]]}
    ]},
    {title: t('Ключевые решения', "Key decisions"), blocks: [
      {title: t('01. Сократила путь до отклика', "01. Shortened the path to applying"), text: [t(
        'Вместо большой анкеты с персональными данными — одно поле для номера телефона. Кандидат может оставить контакт уже на первом экране, а остальные детали обсудить с рекрутером.',
        "I replaced the long form with a single phone number field. Applicants can leave their number on the first screen and discuss the remaining details with a recruiter."
      )], compare: [['13_old_form', t('Прежняя длинная анкета кандидата', "Previous multi-field application form"), t('До', "Before")], ['06_hero', t('Новый первый экран с одним полем телефона', "New opening screen with a single phone number field"), t('После', "After")]]},
      {title: t('02. Упростила выбор вакансии', "02. Made roles easier to compare"), text: [t(
        'Интерактивный список должностей позволяет переключаться между вакансиями, не покидая страницу. Зарплата, условия и преимущества выбранной позиции собраны в одном блоке.',
        "An interactive list lets applicants switch between roles on the same page. Pay, working conditions and benefits for the selected role appear together."
      )], image: ['07_vacancies', t('Интерактивный список вакансий и условия выбранной позиции', "Interactive role selector and details for the selected role")]},
      {title: t('03. Показала работу через людей', "03. Showed the people behind the work"), text: [
        t(
          'Для молодой аудитории важно не только найти работу, но и почувствовать себя частью команды. Вместо постановочных и сгенерированных изображений я использовала живые фотографии сотрудников: рабочие будни, эмоции и общение.',
          "For young applicants, finding a team they can see themselves in can matter as much as finding a job. I used candid photos of employees at work and spending time together in place of staged and AI-generated images."
        ),
        t(
          'Переработала Tone of Voice под целевую аудиторию: добавила лёгкий юмор и неформальную интонацию, сохранив понятную подачу информации об условиях работы и карьерных возможностях. Такой подход помогает сократить дистанцию между брендом и кандидатом.',
          "I rewrote the copy for a younger audience, using a touch of humour and a more relaxed voice while keeping job conditions and career opportunities clear. The aim was to help the brand feel more approachable."
        )
      ], image: ['08_team', t('Живые фотографии сотрудников в разделе о команде', "Candid staff photography in the team section")]}
    ]},
    {title: t('Визуальная концепция и интерфейс', "Visual direction and interface"), blocks: [
      {text: [t(
        'Хотелось сделать коммуникацию современной и близкой молодым кандидатам, не теряя узнаваемости Mama Roma. В основе — существующая фирменная палитра, тёплый фон, бордовые акценты, выразительная типографика, живые фотографии и графические детали.',
        "I wanted the site to feel current and welcoming to young applicants while keeping Mama Roma recognisable. The design uses the existing brand palette, a warm background, burgundy accents, expressive typography, candid photography and graphic details."
      ), t(
        'Типографика: FloraC Bold; Noto Sans Display Regular, Semibold, Bold.',
        "Typography uses FloraC Bold and Noto Sans Display in Regular, Semibold and Bold."
      )], image: ['05_palette', t('Палитра Mama Roma: тёплый белый, бордовый, тёмно-зелёный и графитовый', "Mama Roma palette with warm white, burgundy, dark green and charcoal")], wide: true},
      {kind: 'showcase', text: [t(
        'Сайт реализован на Tilda и адаптирован под разные экраны. В мобильной версии сохранены быстрый отклик, выбор вакансий и просмотр условий работы.',
        "I built the site on Tilda and adapted it across screen sizes. On mobile, applicants can still apply quickly, browse roles and check working conditions."
      )]}
    ]},
    {title: t('Результаты', "Results"), blocks: [
      {text: [t(
        'После запуска карьерный сайт стал рабочим каналом привлечения кандидатов. За выбранный годовой период получено 937 заявок при 56 024 сессиях. Количество заявок выросло на 1 238,57%, а количество сессий — на 1 373,15% относительно периода сравнения в аналитике.',
        "After launch, the site became a working recruitment channel. Over the year reviewed, it received 937 applications from 56,024 sessions. Compared with the reference period in analytics, applications increased by 1,238.57% and sessions by 1,373.15%."
      ), t(
        'Годовая конверсия составила 1,67%. На мобильные устройства пришлось 60,81% сессий. Данные на 19.11.2026.',
        "The annual conversion rate was 1.67%. Mobile accounted for 60.81% of sessions. Figures as of 19 November 2026."
      )], image: ['12_year', t(
        'Годовая статистика сайта: 56 024 сессии, 937 заявок, конверсия 1,67%',
        "Annual analytics showing 56,024 sessions, 937 applications and a 1.67% conversion rate"
      )], wide: true},
      {text: [t(
        'За июнь 2026 года (31.05–30.06) сайт получил 109 заявок при 2 846 сессиях. Конверсия — 3,83%, рост заявок относительно периода сравнения — 47,30%.',
        "The June 2026 reporting period (31 May to 30 June) recorded 109 applications from 2,846 sessions, a 3.83% conversion rate. Applications increased by 47.30% compared with the reference period."
      )], image: ['11_month', t(
        'Статистика за июнь: 2 846 сессий, 109 заявок, конверсия 3,83%',
        "June analytics showing 2,846 sessions, 109 applications and a 3.83% conversion rate"
      )], wide: true},
      {text: [t(
        'Проект прошёл весь путь от исследования до запуска. После редизайна количество заявок выросло, а сайт стал работающим инструментом привлечения новых сотрудников.',
        "The project went from research to launch. Applications increased after the redesign, and the site became a working recruitment channel."
      )]}
    ]}
  ]
});
