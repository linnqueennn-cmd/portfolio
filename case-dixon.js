const dixonDanceCase = t => ({
  id: 'dixon',
  title: 'DIXON DANCE',
  eyebrow: 'branding / visual identity',
  subtitle: '',
  summary: t(
    'Разработка визуальной айдентики для онлайн-платформы о танце и движении. Логотип, цветовая система, типографика и гайдлайн.',
    "Visual identity for an online dance and movement platform, including a logo, colour system, typography and brand guidelines."
  ),
  cover: 'page-01',
  coverAlt: t('Обложка гайдлайна Dixon Dance', "Dixon Dance brand guidelines cover"),
  imageFormat: 'webp',
  imagePreviews: {'page-01': 1440},
  zoom: true,
  imageSizes: {
    ...Object.fromEntries(Array.from({length: 14}, (_, index) => [`page-${String(index + 1).padStart(2, '0')}`, [1920, 1080]])),
    'dancer-merch': [1122, 1402],
    'social-media-mockup': [1122, 1402]
  },
  next: {id: 'choreo', title: 'Xoreokids'},
  sections: [
    {title: t('О проекте и моя роль', "Project and role"), blocks: [
      {text: [
        t(
          'Dixon Dance вырос из формата онлайн-занятий танцами: коротких видеоуроков с доступной хореографией, где главное — удовольствие от движения, физическая активность и свобода самовыражения.',
          "Dixon Dance started with short online dance lessons and approachable choreography. The focus was on enjoying movement, staying active and expressing yourself."
        ),
        t(
          'По мере развития проекта возникла необходимость в едином визуальном стиле для сайта, социальных сетей и других каналов коммуникации.',
          "As the project grew, it needed a consistent look across the website, social media and other brand materials."
        ),
        t(
          'Я разработала айдентику с нуля: логотип и его вариации, цветовую палитру, типографику и правила их применения.',
          "I developed the identity from scratch, including the logo and its variants, colour palette, typography and guidelines."
        )
      ], compare: [
        ['dancer-merch', t('Танцовщица в футболке Dixon Dance', "Dancer wearing a Dixon Dance T-shirt")],
        ['social-media-mockup', t('Макет социальных сетей Dixon Dance на телефоне', "Dixon Dance social media mockup on a phone")]
      ], compareClass: 'case-comparison-duo', image: ['page-03', t('Идея и ключевые ассоциации бренда Dixon Dance', "Dixon Dance brand idea and associations")], wide: true}
    ]},
    {title: t('Задача', "The challenge"), blocks: [
      {text: [
        t(
          'Создать узнаваемый визуальный стиль, который отражает движение, свободу и современный характер платформы.',
          "Create a recognisable visual identity that reflects movement, freedom and the platform’s contemporary character."
        ),
        t(
          'При этом айдентика должна была оставаться универсальной: одинаково хорошо работать в цифровых интерфейсах, социальных сетях и других материалах бренда.',
          "The identity needed to work across digital interfaces, social media and other brand materials."
        )
      ]}
    ]},
    {title: t('Визуальная концепция', "Visual direction"), blocks: [
      {title: t('Логотип', "Logo"), text: [
        t(
          'В процессе работы я предложила несколько концепций логотипа, в том числе варианты с графическими элементами, интегрированными в буквы.',
          "I explored several logo concepts, including versions that built graphic elements into the letterforms."
        ),
        t(
          'В итоге мы отказались от дополнительных символов и сосредоточились на самой типографике. Плавные округлые формы передают лёгкость и свободу движения, а эффект размытия добавляет ощущение динамики.',
          "We chose to focus on the typography. Soft, rounded forms suggest ease and freedom of movement, and the blur effect adds a sense of motion."
        ),
        t(
          'Я разработала полную и сокращённую версии логотипа, предусмотрев варианты для разных фонов и способов применения.',
          "I designed full and compact versions of the logo for different backgrounds and uses."
        )
      ], images: [
        ['page-04', t('Концепция основного логотипа Dixon Dance', "Primary Dixon Dance logo concept")],
        ['page-05', t('Светлая и тёмная версии основного логотипа', "Light and dark versions of the primary logo")],
        ['page-06', t('Светлая и тёмная версии упрощённого логотипа', "Light and dark versions of the compact logo")],
        ['page-07', t('Сетка построения основного логотипа', "Primary logo construction grid")],
        ['page-08', t('Векторная версия основного логотипа', "Primary logo in vector form")],
        ['page-09', t('Векторная версия упрощённого логотипа', "Compact logo in vector form")],
        ['page-10', t('Охранное поле основного логотипа', "Clear space for the primary logo")],
        ['page-11', t('Охранное поле упрощённого логотипа', "Clear space for the compact logo")]
      ]},
      {title: t('Цвет и типографика', "Colour and typography"), text: [
        t(
          'Цветовая палитра построена на спокойных природных оттенках: графитовом, сине-сером, тёплом молочном и приглушённом зелёном.',
          "The palette draws on muted natural tones: charcoal, blue-grey, warm off-white and soft green."
        ),
        t(
          'Такое сочетание поддерживает идею баланса между физической активностью, свободой и заботой о себе.',
          "The colours reflect the balance between physical activity, freedom and self-care."
        ),
        t(
          'Для заголовков выбран Unbounded Variable, для основного текста — AA Stetica. Вместе они формируют современную и узнаваемую типографическую систему.',
          "I chose Unbounded Variable for headings and AA Stetica for body copy. Together they give the brand a contemporary, recognisable typographic style."
        )
      ], images: [
        ['page-12', t('Основная цветовая палитра Dixon Dance', "Primary Dixon Dance colour palette")],
        ['page-13', t('Чёрно-белая палитра для текста и монохромных носителей', "Black-and-white palette for type and monochrome use")],
        ['page-14', t('Типографическая система Dixon Dance', "Dixon Dance type system")]
      ]}
    ]},
    {title: t('Результат', "Outcome"), blocks: [
      {text: [
        t(
          'Я разработала визуальную айдентику и гайдлайн с правилами использования логотипа, цветовой палитры и типографики.',
          "I delivered a visual identity and brand guidelines covering the logo, colour palette and typography."
        ),
        t(
          'Фирменный стиль стал основой оформления сайта, социальных сетей и других материалов платформы.',
          "The identity provided the visual foundation for the website, social media and other platform materials."
        )
      ]}
    ]}
  ]
});
