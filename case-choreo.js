const choreoKidsCase = t => ({
  id: 'choreo',
  title: 'Xoreokids',
  eyebrow: 'dance studio / design & development',
  subtitle: t('UX/UI-дизайн и разработка\nсайта танцевальной студии.', "UX/UI design and development\nfor a dance studio website."),
  summary: t(
    'Xoreokids — студия современной хореографии в Санкт-Петербурге. Сайт знакомит родителей с подходом к обучению, программой занятий и атмосферой студии, помогая выбрать группу и записать ребёнка на пробное занятие.',
    "Xoreokids is a contemporary dance studio in Saint Petersburg. The site introduces parents to its teaching approach, classes and atmosphere, and helps them choose a group and book a trial class."
  ),
  imageFormat: 'webp',
  zoom: true,
  imageSizes: {
    'hero-desktop': [1440, 855],
    'concept-one': [1280, 665], 'concept-two': [1280, 761],
    'booking-desktop': [1440, 840], 'booking-mobile': [780, 1680],
    'gallery-desktop': [1440, 828], 'gallery-mobile': [1170, 2110],
    'mentors-desktop': [1898, 1015], 'mentors-mobile': [780, 1240],
    'groups-desktop': [1900, 1079], 'groups-mobile': [780, 1404],
    'prices-desktop': [1899, 1080], 'prices-mobile': [780, 1905],
    'studios-desktop': [1900, 1080], 'studios-mobile': [780, 2193],
    'style-desktop': [1440, 875]
  },
  videoSizes: {
    'hero-desktop-refresh': [1266, 704], 'hero-phone-refresh': [810, 1460],
    'training-motion': [1170, 2110],
    'values-desktop-refresh': [1266, 594], 'values-motion-mobile': [1170, 2110],
  },
  deviceFrames: {laptop: [2599, 1528], phone: [726, 1420]},
  coverDevices: [
    ['hero-desktop-refresh', t('Анимация первого экрана Xoreokids на компьютере', "Animated Xoreokids hero on desktop"), '', 'laptop'],
    ['hero-phone-refresh', t('Анимация первого экрана Xoreokids на телефоне', "Animated Xoreokids hero on mobile"), '', 'phone']
  ],
  next: {id: 'vinyl', title: 'Vinyl Store'},
  sections: [
    {title: t('О проекте и моя роль', "Project and role"), blocks: [{text: [
      t(
        'Xoreokids — пространство, где дети не только учатся танцевать, но и участвуют в постановках, выступлениях, соревнованиях и совместных мероприятиях.',
        "At Xoreokids, children learn to dance and take part in productions, performances, competitions and group events."
      ),
      t('**Моя роль:** UX/UI-дизайнер и разработчик на Tilda.', "**My role:** UX/UI designer and Tilda developer."),
      t(
        'Я отвечала за структуру сайта, визуальную концепцию, проектирование интерфейсов, адаптивный дизайн и реализацию, включая анимации и интерактивные компоненты.',
        "I designed the site structure, visual direction, interfaces and responsive layouts. I also built the site, including its animations and interactive elements."
      ),
      t(
        '**Инструменты:** Figma, Tilda, Zero Block, HTML/CSS, JavaScript, AI-инструменты.',
        "**Tools:** Figma, Tilda, Zero Block, HTML/CSS, JavaScript and AI tools."
      )
    ]}]},
    {title: t('Задача', "The challenge"), blocks: [{text: [
      t(
        'Создать сайт, который передаёт творческую атмосферу студии и при этом помогает родителям быстро разобраться в программе, стоимости, возрастных группах и условиях записи.',
        "The site had to capture the studio’s creativity and help parents quickly find class information, prices, age groups and booking details."
      ),
      t(
        'Основная сложность заключалась в большом объёме информации. Её требовалось организовать так, чтобы сохранить выразительный дизайн, но не превратить страницу в длинную последовательность однотипных блоков.',
        "There was a lot of information to organise. The challenge was to keep the design expressive and give each section a clear purpose without letting the page become repetitive."
      )
    ]}]},
    {title: t('Проектирование и поиск визуального направления', "Site planning and visual exploration"), blocks: [
      {text: [
        t(
          'Работу начала с изучения материалов студии, обсуждения задач с командой и проектирования структуры сайта.',
          "I began by reviewing the studio’s materials, discussing goals with the team and planning the site structure."
        ),
        t(
          'Основной пользовательский сценарий выстроен от знакомства со студией и её подходом до выбора занятий и записи на пробное занятие.',
          "The main journey takes parents from learning about the studio and its approach to choosing a class and booking a trial."
        )
      ]},
      {title: t('Первые дизайн-концепции', "Early design concepts"), text: [
        t(
          'После брифа и подготовки мудборда я разработала два варианта главного экрана с разными визуальными подходами.',
          "After the brief and mood board, I designed two opening screens with different visual directions."
        ),
        t(
          'В ходе обсуждения стало понятно, что команда студии видит характер бренда несколько иначе. Поэтому мы пересмотрели первоначальное направление и продолжили работу над концепцией, которая точнее соответствовала ожиданиям заказчика.',
          "Feedback showed that the studio team had a different idea of the brand’s personality. We revisited the direction and developed an approach that better matched how the client wanted the studio to feel."
        ),
        t(
          'Этот этап помог определить визуальный язык будущего сайта и согласовать дальнейшие решения.',
          "That process helped us agree on a visual direction for the rest of the site."
        )
      ], visualLayout: 'choreo-concepts', visuals: [
        ['concept-one', t('Коллаж из архивных фотографий с лаймовым акцентом', "Collage of archival photographs with a lime accent"), t('Первая концепция', "First concept")],
        ['concept-two', t('Сетка из чёрно-белых фотографий и оранжевая кнопка', "Black-and-white photo grid with an orange button"), t('Вторая концепция', "Second concept")],
        ['hero-desktop', t('Первый экран с фотографиями учеников и рукописной типографикой', "Opening screen with student photography and handwritten type"), t('Финальный вариант', "Final direction")]
      ]}
    ]},
    {title: t('Ключевые UX/UI-решения', "Key UX/UI decisions"), blocks: [
      {title: t('01. Первый экран: эмоция и конкретика', "01. Opening screen: character and clarity"), text: [
        t(
          'Первый экран должен был передавать характер студии и одновременно объяснять родителям ценность занятий.',
          "The opening screen needed to show the studio’s personality and make the value of its classes clear to parents."
        ),
        t(
          'Я объединила крупную типографику, живые фотографии учеников и рукописные акценты. Дальше эмоциональная подача постепенно сменяется более подробной информацией о программе и условиях обучения.',
          "I combined large type, candid student photos and handwritten accents. The rest of the page builds on that introduction with practical details about the classes and programme."
        )
      ], visualLayout: 'choreo-hero', visuals: [
        ['hero-desktop-refresh', t('Анимация заголовка и фотоколлажа на первом экране', "Animated heading and photo collage on the opening screen")]
      ]},
      {title: t('02. Программа тренировок', "02. Training programme"), text: [
        t(
          'Чтобы показать составляющие занятий, я спроектировала интерактивный блок карточек.',
          "I designed interactive cards to explain what goes into a class."
        ),
        t(
          'При прокрутке карточки с описаниями постепенно собираются в компактную стопку. Это позволяет последовательно познакомиться с программой, не перегружая страницу статичными элементами.',
          "The cards collect into a compact stack as visitors scroll. Parents can read through the programme in order without facing a long grid of content all at once."
        )
      ], sideMedia: true, visualLayout: 'choreo-training', visuals: [
        ['training-motion', t('Карточки программы тренировок собираются в стопку при прокрутке', "Training programme cards stacking as the page scrolls")]
      ]},
      {title: t('03. Ценности студии', "03. Studio values"), text: [
        t(
          'Вместо семи отдельных текстовых секций я использовала переключаемый блок.',
          "I grouped the seven studio values into a single interactive section."
        ),
        t(
          'Каждая ценность сопровождается собственным текстом и фотографией. На мобильных устройствах навигация адаптирована под компактный формат.',
          "Each value has its own text and photo. The mobile version uses more compact navigation."
        )
      ], visualLayout: 'choreo-pair', visuals: [
        ['values-desktop-refresh', t('Переключение ценностей студии на компьютере', "Switching between studio values on desktop"), t('Десктоп', "Desktop")],
        ['values-motion-mobile', t('Переключение ценностей студии на телефоне', "Switching between studio values on a phone"), t('Мобильная версия', "Mobile")]
      ]},
      {title: t('04. Постановки и выступления', "04. Productions and performances"), text: [
        t(
          'Для знакомства с результатами обучения предусмотрена интерактивная видеогалерея.',
          "An interactive video gallery shows what students create and perform."
        ),
        t(
          'Посетитель может выбирать выступления и смотреть их непосредственно на странице, не переходя на внешние площадки.',
          "Visitors can choose a performance and watch it on the page."
        )
      ], visualLayout: 'choreo-pair choreo-equal-height', visuals: [
        ['gallery-desktop', t('Галерея постановок на компьютере', "Performance gallery on desktop"), t('Десктоп', "Desktop")],
        ['gallery-mobile', t('Галерея постановок на телефоне', "Performance gallery on mobile"), t('Телефон', "Mobile")]
      ]},
      {title: t('05. Запись на пробное занятие', "05. Booking a trial class"), text: [
        t(
          'Я предусмотрела два способа записи: короткую форму на сайте и переход в Telegram-бот.',
          "I designed two ways to book: a short form on the website and a Telegram bot."
        ),
        t(
          'После отправки формы пользователь получает подтверждение и может продолжить запись через Telegram. При этом переход в бот не является обязательным.',
          "After submitting the form, parents receive a confirmation. They can continue in Telegram if they choose."
        ),
        t('Так родители могут выбрать наиболее удобный способ связи со студией.', "This gives parents a choice of how to contact the studio.")
      ], visualLayout: 'choreo-pair', visuals: [
        ['booking-desktop', t('Форма записи на пробное занятие на компьютере', "Trial class booking form on desktop"), t('Десктоп', "Desktop")],
        ['booking-mobile', t('Форма записи на пробное занятие на телефоне', "Trial class booking form on mobile"), t('Мобильная версия', "Mobile")]
      ]}
    ]},
    {title: t('Визуальная концепция', "Visual direction"), blocks: [{text: [
      t(
        'Основой визуального языка стали редакционная композиция, живые фотографии и рукописная графика.',
        "Editorial layouts, candid photography and handwritten graphics shape the look of the site."
      ),
      t(
        'Я отказалась от типичных для детских сайтов чрезмерно ярких цветов и мультяшных элементов в пользу более современной и выразительной подачи.',
        "I chose a modern, expressive style in place of the bright colours and cartoon graphics common on children’s websites."
      ),
      t(
        'Тёплый светлый фон, графитовая типографика и приглушённые терракотовые акценты создают спокойную основу для эмоциональных фотографий.',
        "A warm, light background, charcoal type and muted terracotta accents give the photographs room to stand out."
      ),
      t(
        'Для студии заказчик отдельно разработал фирменный рукописный шрифт. На сайте он использован в заголовках и выносках.',
        "The client developed a custom handwritten typeface for the studio. I used it for headings and callouts."
      ),
      t(
        'Рукописные элементы, коллажи и анимации поддерживают ощущение движения и творческой атмосферы студии.',
        "Handwritten details, collages and animation bring a sense of movement to the site."
      )
    ], palette: [
      ['#F6F5F0', t('Тёплый фон', "Warm background")],
      ['#262626', t('Графит', "Charcoal")],
      ['#98403A', t('Терракота', "Terracotta")]
    ], visuals: [
      ['style-desktop', t(
        'Рукописный заголовок и фотоколлаж в разделе «Мы больше, чем тренировки»',
        "Handwritten heading and photo collage in the “More than training” section"
      )]
    ]}]},
    {title: t('Адаптив и реализация', "Responsive design and build"), blocks: [{text: [
      t(
        'Сайт разработан на Tilda с использованием Zero Block, кастомного CSS и JavaScript.',
        "I built the site on Tilda using Zero Block, custom CSS and JavaScript."
      ),
      t(
        'Мобильная версия потребовала отдельной работы с композицией: я перестраивала фотоколлажи, адаптировала интерактивные блоки под касания и оптимизировала анимации для небольших экранов.',
        "On mobile, I reworked the photo collages, adapted interactive sections for touch and optimised animations for smaller screens."
      ),
      t(
        'При разработке использовала AI-инструменты как вспомогательный инструмент для работы с кодом и поиска решений. Логику компонентов, настройку, интеграцию и проверку их работы выполняла самостоятельно.',
        "I used AI tools to explore solutions and assist with coding. I designed the component behaviour, configured and integrated the components, and tested them myself."
      )
    ]}]},
    {title: t('Результат', "Outcome"), blocks: [{text: [
      t(
        'Разработан адаптивный сайт Xoreokids с индивидуальной визуальной концепцией, интерактивными секциями, анимациями и несколькими сценариями записи.',
        "The result is a responsive Xoreokids site with a distinct visual direction, interactive sections, animations and multiple ways to book a trial."
      ),
      t(
        'Проект объединил эмоциональную подачу студии с практической информацией, необходимой родителям для выбора занятий.',
        "The site gives parents a feel for the studio while making the details they need to choose a class easy to find."
      )
    ]}, {title: t('Другие разделы сайта', "More of the website"), imageRails: {
      id: 'other-screens',
      rows: ['desktop', 'mobile'].map(device => [
        device, device === 'desktop' ? t('Десктоп', "Desktop") : t('Мобильная версия', "Mobile"),
        [
          ['mentors', t('Наши наставники', "Meet the instructors")],
          ['groups', t('Группы и расписание', "Groups and timetable")],
          ['prices', t('Стоимость занятий', "Class prices")],
          ['studios', t('Наши студии', "Our studios")]
        ].map(([name, label]) => [`${name}-${device}`, label, label]),
        device === 'desktop'
      ])
    }}]}
  ]
});
