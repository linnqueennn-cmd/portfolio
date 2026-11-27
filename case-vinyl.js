const vinylStoreCase = t => ({
  id: 'vinyl', title: 'Vinyl Store', eyebrow: 'e-commerce / design',
  summary: t(
    'Интернет-магазин виниловых пластинок, разработанный для запуска нового музыкального магазина. Проект охватывает весь путь покупателя: от знакомства с ассортиментом и поиска нужной пластинки до оформления заказа.',
    "An online record shop designed for a new music retailer. The project covers the full shopping journey, from exploring the catalogue and finding a record to placing an order."
  ),
  cover: 'cover', coverAlt: t('Vinyl Store: интернет-магазин на ноутбуке и телефоне', "Vinyl Store on desktop and mobile"),
  imageFormat: 'webp', zoom: true,
  imagePreviews: {cover: 1800, '07': 1800, '08': 1800, 'catalog-desktop': 1800, 'catalog-mobile': 900},
  imagePreviewSizes: {
    'catalog-desktop': '(max-width: 600px) calc(100vw - 32px), (max-width: 1080px) 71vw, 760px',
    'catalog-mobile': '(max-width: 600px) 24vw, (max-width: 1080px) 22vw, 218px'
  },
  imageSizes: {
    'cover': [4200,2226], '03': [3342,1352],
    '06': [4200,2685], '07': [4200,10830], '08': [4200,6993],
    'catalog-desktop': [2594,3031], 'catalog-mobile': [1413,5823],
    'cart-desktop': [1800,1134], 'cart-mobile': [900,2927],
    'checkout-desktop': [1800,1770], 'checkout-mobile': [900,4233],
    'success-desktop': [1800,933], 'success-mobile': [900,2061]
  },
  next: {id:'roma', title:t('Мама Рома', "Mama Roma")},
  sections: [
    {title:t('О проекте', "About the project"), blocks:[
      {text:[
        t(
          'Проект создавался для нового магазина виниловых пластинок, ориентированного как на любителей музыки, так и на коллекционеров редких изданий.',
          "The shop was designed for music fans and collectors looking for rare releases."
        ),
        t(
          'Аудитория магазина достаточно широкая: от молодых покупателей, которые только знакомятся с винилом, до опытных коллекционеров, ищущих конкретные альбомы.',
          "Its audience ranges from people buying their first records to experienced collectors looking for a specific album."
        ),
        t(
          'Поэтому сайт должен был быть понятным для разных пользователей и учитывать особенности покупки винила: поиск по исполнителям, интерес к редким изданиям и отслеживание новых поступлений.',
          "The site had to work for both. Key needs included searching by artist, finding rare releases and keeping track of new arrivals."
        )
      ]},
      {title:t('Мой вклад', "My contribution"), text:[
        t(
          'Я отвечала за полный цикл UX/UI-дизайна: изучила особенности ниши, продумала информационную архитектуру, пользовательские сценарии и разработала визуальную систему сайта.',
          "I led the UX/UI design, from researching the market to planning the information architecture, mapping user journeys and building the visual system."
        ),
        t(
          'Спроектировала главную страницу, каталог, корзину, оформление заказа и адаптивные версии интерфейсов.',
          "I designed the home page, catalogue, cart and checkout, including their responsive layouts."
        ),
        t('Также предложила дополнительные функции с учётом специфики аудитории магазина.', "I also proposed features tailored to the shop’s audience.")
      ]}
    ]},
    {title:t('Задача', "The challenge"), blocks:[{text:[
      t(
        'Разработать интернет-магазин с запоминающейся визуальной концепцией и простой, понятной структурой.',
        "The goal was to design an online store with a clear structure and a distinctive visual identity."
      ),
      t(
        'Мне было важно передать характер музыкальной культуры через дизайн, сохранив удобство основных сценариев: поиска пластинок, просмотра каталога и оформления покупки.',
        "I wanted the design to reflect music culture while making it easy to find records, browse the catalogue and check out."
      )
    ]}]},
    {title:t('Ключевые решения', "Key decisions"), blocks:[
      {title:t('01. Каталог и навигация', "01. Catalogue and navigation"), text:[
        t(
          'Каталог спроектирован с акцентом на сами пластинки: крупные обложки, минимум лишних деталей и вся необходимая информация для покупки.',
          "I put the records first with large cover art and kept product details focused on what shoppers need to buy."
        ),
        t(
          'Предусмотрены поиск по исполнителю или названию, сортировка и быстрые переключатели между популярными, новыми и редкими релизами.',
          "Shoppers can search by artist or title, sort results and jump between popular releases, new arrivals and rare records."
        ),
        t(
          'Это позволяет как целенаправленно искать нужную пластинку, так и просто изучать ассортимент.',
          "That works for people looking for a specific record and those who are just browsing."
        )
      ], compare: [
        ['catalog-desktop', t('Каталог пластинок на компьютере', "Record catalogue on desktop"), '', 'case-visual-desktop'],
        ['catalog-mobile', t('Каталог пластинок на телефоне', "Record catalogue on mobile"), '', 'case-visual-phone']
      ], compareClass: 'case-visual-step-pair vinyl-catalog-pair'},
      {title:t('02. Подписка на новые поступления', "02. New-arrival alerts"), text:[
        t(
          'Одна из задач заключалась в том, чтобы постоянные покупатели и коллекционеры могли вовремя узнавать о поступлении интересующих их пластинок.',
          "Regular shoppers and collectors needed a way to hear when records they care about come in."
        ),
        t(
          'Я разработала форму подписки с персональными настройками. Пользователь может выбрать музыкальные жанры, состояние пластинок (новые или раритетные) и периодичность уведомлений.',
          "I designed a sign-up form where shoppers can choose genres, new or rare records, and how often to receive updates."
        ),
        t(
          'В результате подписка ориентирована не на общую рассылку, а на конкретные музыкальные предпочтения.',
          "The alerts are tailored to the listener’s preferences."
        )
      ], image:['03',t('Персональная подписка на обновление каталога', "Sign-up form for personalised catalogue updates")], wide:true},
      {title:t('03. Сценарий покупки', "03. From cart to checkout"), text:[
        t(
          'Я спроектировала последовательный сценарий покупки с минимальным количеством отвлекающих элементов.',
          "I designed a checkout flow that guides shoppers through each step with few distractions."
        ),
        t(
          'В корзине пользователь может проверить состав заказа, изменить количество пластинок и увидеть итоговую стоимость.',
          "In the cart, shoppers can review their order, change quantities and see the total."
        ),
        t(
          'При оформлении заказа информация разделена на понятные блоки: контактные данные, доставка и оплата. Состав заказа и сумма остаются перед глазами пользователя.',
          "Checkout groups contact details, delivery and payment into clear steps. The order and total stay in view."
        ),
        t(
          'После оформления предусмотрен отдельный экран подтверждения с деталями покупки.',
          "After checkout, a confirmation screen shows the purchase details."
        )
      ], visualSteps: {id: 'purchase-flow', steps: [
        [t('Корзина', "Cart"), ['cart-desktop', t('Корзина на компьютере', "Shopping cart on desktop")], ['cart-mobile', t('Корзина на телефоне', "Shopping cart on mobile")]],
        [t('Оформление заказа', "Checkout"), ['checkout-desktop', t('Форма оформления заказа на компьютере', "Checkout form on desktop")], ['checkout-mobile', t('Форма оформления заказа на телефоне', "Checkout form on mobile")]],
        [t('Подтверждение оплаты', "Payment confirmation"), ['success-desktop', t('Подтверждение оплаты на компьютере', "Payment confirmation on desktop")], ['success-mobile', t('Подтверждение оплаты на телефоне', "Payment confirmation on mobile")]]
      ]}}
    ]},
    {title:t('Визуальная концепция', "Visual direction"), blocks:[
      {text:[
        t(
          'За основу я взяла контраст между тёмным интерфейсом и яркими обложками виниловых пластинок.',
          "The visual system pairs a dark interface with bright album covers."
        ),
        t(
          'Практически чёрный фон позволяет выделить альбомы и не конкурирует с их оформлением. Кислотно-зелёный используется для основных действий, а синий и оранжевый добавляют выразительности отдельным блокам.',
          "The near-black background gives the covers room to stand out. Acid green marks the primary actions, with blue and orange accents in selected sections."
        ),
        t(
          'Крупная типографика, простая геометрия и минимальное количество декоративных элементов формируют визуальный язык магазина.',
          "Large type, simple shapes and understated decoration define the shop’s visual style."
        )
      ], image:['06',t('Палитра и типографика Vinyl Store', "Vinyl Store palette and typography")]},
      {text:[
        t(
          'Мне хотелось, чтобы сайт имел собственный характер, но при этом главными визуальными элементами оставались сами пластинки.',
          "I wanted the site to have its own personality while keeping the records as the main visual focus."
        ),
        t(
          'Я добавила музыкальное сопровождение, которым пользователь может управлять через звуковой индикатор на главной странице: включать и отключать воспроизведение.',
          "I added an optional soundtrack that visitors can turn on or off from an audio control on the home page."
        ),
        t(
          'Элементы навигации стилизованы под управление музыкальным плеером, а в разделе редких пластинок предусмотрено взаимодействие с вращающимися виниловыми дисками.',
          "The navigation borrows from music-player controls, and the rare-records section features interactive spinning records."
        ),
        t(
          'Такие детали поддерживают тематику проекта и делают интерфейс более характерным.',
          "These details tie the interface back to the shop’s musical identity."
        )
      ], image:['07',t('Главная страница Vinyl Store и её музыкальные детали', "Vinyl Store home page and its music-inspired details")], wide:true}
    ]},
    {title:t('Адаптивный дизайн', "Responsive design"), blocks:[{text:[
      t(
        'Я разработала десктопные и мобильные версии интерфейсов, сохранив единую визуальную систему и основные пользовательские сценарии.',
        "I designed desktop and mobile layouts around the same visual system and core journeys."
      ),
      t(
        'Для мобильных устройств адаптировала навигацию, сетку товаров, корзину и форму оформления заказа.',
        "For mobile, I adapted the navigation, product grid, cart and checkout form."
      ),
      t(
        'Отдельное внимание уделила читаемости информации и доступности основных действий на небольших экранах.',
        "I focused on legibility and keeping essential actions easy to reach on small screens."
      )
    ], image:['08',t('Мобильные экраны главной страницы и каталога виниловых пластинок', "Mobile home page and record catalogue")], wide:true}]}
  ]
});
