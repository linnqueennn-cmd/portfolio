const params = new URLSearchParams(location.search);
const en = params.get('lang') === 'en';
const t = (ru, english) => en ? english : ru;
const app = document.querySelector('#app');
const cv = 'assets/cv.pdf';
const behance = 'https://www.behance.net/';
const links = [
  ['work',t('Проекты','Work')], ['about',t('Обо мне','About')],
  ['services',t('Услуги','Services')], ['process',t('Процесс','Process')],
  ['pricing',t('Цены','Pricing')], ['contacts',t('Контакты','Contact')]
];
const home = en ? './?lang=en' : './';
const caseId = params.get('case');
document.documentElement.lang = t('ru','en');
document.querySelector('nav').ariaLabel = t('Навигация','Navigation');
document.querySelector('.logo').href = home;
document.querySelector('#nav').innerHTML = links.map(([id,label]) => `<a href="${caseId ? home : ''}#${id}">${label}</a>`).join('');
const language = document.querySelector('#language');
language.textContent = t('EN','RU');
language.ariaLabel = t('English version','Русская версия');
language.onclick = () => {
  if (en) params.delete('lang'); else params.set('lang','en');
  location.href = './?' + params + location.hash;
};

const projects = [
  ['roma','Mama Roma',t('HR-сайт · коммерческий проект','Careers website · Client project'),t('Карьерный сайт сети ресторанов. От исследования и структуры до адаптивного дизайна и запуска на Tilda. Форму отклика вынесла на первый экран, а фотографии команды помогли передать атмосферу работы.','A careers site for a restaurant group, from research and structure through responsive design and launch on Tilda. The application form sits above the fold, and photos of the team give a sense of the workplace.'),'251797875/HR-website'],
  ['choreo','Choreo Kids',t('Сайт танцевальной студии · превью готовится','Dance studio website · Preview pending'),t('Сайт студии танцев со страницами возрастных групп, тарифами и адаптивными версиями. Название и обложка предварительные.','A responsive dance studio site with age-group pages and pricing. The name and cover are provisional.')],
  ['vinyl','Vinyl Record Store',t('Интернет-магазин · концепт','E-commerce · Concept'),t('Концепция интернет-магазина винила с каталогом пластинок и визуальным языком, вдохновлённым музыкальной культурой.','An online record store concept with a vinyl catalogue and a visual language inspired by music culture.'),'177871633/dizajn-sajta-magazina-plastinok'],
  ['retail',t('Реклама и кампании','Retail & Campaign Design'),t('Подборка в подготовке','Collection in progress'),t('Рекламные кампании, товарная графика и промоматериалы.','Campaign design, product graphics and promotional materials.')],
  ['social',t('Графика для соцсетей','Social Media & Digital Graphics'),t('Подборка в подготовке','Collection in progress'),t('Digital-графика и визуальные системы для социальных сетей.','Digital graphics and visual systems for social media.')],
  ['brand',t('Айдентика и печать','Brand & Print Design'),t('Подборка в подготовке','Collection in progress'),t('Айдентика, печатные носители и коммерческая графика.','Visual identity, print and commercial graphics.')]
];
const services = [
  [t('Сайты под ключ','Web design & development'),t('Аналитика, структура, дизайн, адаптация и запуск лендингов и многостраничных сайтов. Подбираю технологии под задачу.','Research, structure, responsive design and launch for landing pages and multi-page sites. I choose the stack to suit the project.'),'roma'],
  [t('UX/UI-дизайн','UX/UI design'),t('Исследую пользовательские сценарии, проектирую структуру, прототипы, интерфейсы и дизайн-системы.','I research user journeys and design structures, prototypes, interfaces and design systems.'),'vinyl'],
  [t('Айдентика и графика','Visual identity & graphics'),t('Разрабатываю визуальные концепции, айдентику, рекламные материалы и digital-графику.','I create visual concepts, identities, campaign assets and digital graphics.'),'brand'],
  [t('Digital-проект под ключ','End-to-end digital project'),t('От стратегии и сайта до запуска. При необходимости подключаю партнёров по SEO, разработке и продвижению.','From strategy and website design to launch. I bring in SEO, development and marketing partners as needed.'),'retail']
];
const steps = [
  [t('Знакомство','Introduction'),t('Обсуждаем проект, задачу, сроки и ожидания.','We discuss the project, goals, timeline and expectations.')],
  [t('Погружение','Discovery'),t('Изучаю бизнес, аудиторию, конкурентов и материалы.','I study the business, audience, competitors and existing materials.')],
  [t('Структура','Structure'),t('Проектирую логику продукта, сценарии и прототипы.','I define the product structure, user journeys and prototypes.')],
  [t('Визуальная концепция','Visual direction'),t('Подбираю референсы и формулирую принципы интерфейса.','I gather references and define the core visual and UI principles.')],
  [t('Дизайн и адаптивы','Responsive design'),t('Разрабатываю финальные экраны, компоненты и версии для разных устройств.','I design final screens, components and layouts for different devices.')],
  [t('Реализация и запуск','Build & launch'),t('Передаю в разработку или организую сборку, тестирование и публикацию.','I hand off to developers or coordinate the build, testing and launch.')]
];
const prices = [
  [t('Лендинг под ключ','Landing page'),100,t('Структура, дизайн, адаптивы, запуск.','Structure, design, responsive layouts and launch.')],
  [t('Многостраничный сайт','Multi-page website'),160,t('Архитектура, ключевые страницы, адаптивы, запуск.','Architecture, key pages, responsive layouts and launch.')],
  [t('UX/UI-дизайн','UX/UI design'),60,t('Проектирование и интерфейсы.','Product structure and interface design.')],
  [t('Айдентика','Visual identity'),60,t('Визуальная система и базовые носители.','Visual system and core brand assets.')],
  [t('Digital и графический дизайн','Digital & graphic design'),15,t('Рекламные материалы или небольшой пакет графики.','Campaign assets or a small graphics package.')],
  [t('Комплексный digital-проект','End-to-end digital project'),0,t('Сайт, SEO и продвижение с партнёрами.','Website, SEO and marketing with specialist partners.')]
];
const cta = () => `<a class="cta" href="#contacts">${t('Обсудить проект','Discuss a project')} <span aria-hidden="true">↗</span></a>`;
const title = (id,label,heading,extra='') => `<div class="section-top"><div><p class="eyebrow">${label}</p><h2 id="${id}-title" class="heading" data-reveal>${heading}</h2></div>${extra}</div>`;
const cover = ([id,name]) => id === 'choreo'
  ? `<div class="cover mock">${name}<br>${t('Обложка готовится','Cover pending')}</div>`
  : `<img class="cover" src="assets/${id}.jpg" alt="" loading="lazy">`;
const caseUrl = id => './?case=' + id + (en ? '&lang=en' : '');
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const person = t('Лина Ханнанова','Lina Khannanova');
document.title = 'linqueenn — ' + person;
document.querySelector('meta[name=description]').content = t('Независимый UX/UI, веб- и графический дизайнер.','Independent UX/UI, web and graphic designer.');

function renderHome() {
  document.body.classList.add('home-page');
  app.innerHTML = `
  ${homeScreen(t, person, cv)}
  ${projectsScreen(t, caseUrl)}
  ${aboutScreen(t, person)}
  <section id="services" class="section">
    ${title('services',t('Услуги','Services'),t('Чем могу помочь','How I can help'))}
    <div class="service-grid">
      <figure class="service-figure"><img class="cover" id="service-image" src="assets/roma.jpg" alt=""><figcaption class="meta" id="service-caption"></figcaption></figure>
      <div id="service-list">${services.map(([name,body],i) => `<article class="service-row"><button type="button" aria-expanded="false" aria-controls="service-${i}">${name}<span class="meta" aria-hidden="true">+</span></button><p id="service-${i}">${body}</p></article>`).join('')}</div>
    </div>
  </section>
  <section id="process" class="section dark">
    ${title('process',t('Процесс','Process'),t('Как я работаю','How I work'),`<div class="arrows"><button type="button" data-step="-1" aria-label="${t('Назад','Previous')}">←</button><button type="button" data-step="1" aria-label="${t('Вперёд','Next')}">→</button></div>`)}
    <div class="steps" tabindex="0" aria-labelledby="process-title">${steps.map(([name,body],i) => `<article class="step"><div class="orb" aria-hidden="true"></div><div><span class="meta">0${i+1} / 06</span><h3>${name}</h3><p>${body}</p></div></article>`).join('')}</div>
  </section>
  <section id="pricing" class="section">
    ${title('pricing',t('Цены','Pricing'),t('Стоимость','Starting rates'))}
    ${prices.map(([name,price,body]) => `<article class="price"><h3>${name}</h3><strong>${price ? t('от ','from ') + price + ' 000 ₽' : t('по запросу','on request')}</strong><p>${body}</p></article>`).join('')}
    <p class="price-note">${t('Стоимость зависит от задачи, объёма и сложности проекта. После короткого обсуждения подготовлю индивидуальное предложение.','The final quote depends on the scope and complexity. After a short discussion, I’ll prepare a proposal for your project.')}</p>
    ${cta()}
  </section>
  <section id="contacts" class="section contacts">
    ${title('contacts',t('Контакты','Contact'),t('Давайте сделаем что-то хорошее.','Let’s make something good together.'))}
    <p>${t('Есть идея, проект или предложение о сотрудничестве? Буду рада обсудить.','Have an idea, a project or a collaboration in mind? I’d love to talk.')}</p>
    <div class="contact-links"><a href="https://t.me/linqueenn">Telegram ↗</a><a href="mailto:linnqueenn@yandex.ru">Email ↗</a><a href="${behance}linnqueenn">Behance ↗</a><a href="https://instagram.com/lin.queenn">Instagram ↗</a></div>
    <footer class="footer meta"><a href="#">[linqueenn] ↑</a><span>${t('Веб · UX/UI · Графика','Web · UX/UI · Graphics')}</span></footer>
  </section>`;

  setupProjectsScreen();
  const rows = [...document.querySelectorAll('.service-row')];
  const activate = index => {
    rows.forEach((row,i) => {
      row.classList.toggle('active',i === index);
      const button = row.querySelector('button');
      button.setAttribute('aria-expanded',i === index);
      button.querySelector('span').textContent = i === index ? '−' : '+';
    });
    document.querySelector('#service-image').src = 'assets/' + services[index][2] + '.jpg';
    document.querySelector('#service-caption').textContent = services[index][0];
  };
  rows.forEach((row,i) => row.querySelector('button').onclick = () => activate(i));
  activate(0);
  const rail = document.querySelector('.steps');
  document.querySelectorAll('[data-step]').forEach(button => button.onclick = () =>
    rail.scrollBy({left:Number(button.dataset.step) * (rail.firstElementChild.offsetWidth + 12)}));
  document.querySelector('#home-language').onclick = language.onclick;
  setupPortraitArrival(setupHomeScramble());
  setupAboutScreen();
  setupMotion();
}

function setupMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting}) => {
    if (!isIntersecting) return;
    target.classList.add('enter');
    observer.unobserve(target);
  }), {threshold:.18});
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

const zen = webProjects(t)[1];
const project = projects.find(item => item[0] === caseId) || (caseId === 'zen' ? zen : null);
if (project) {
  const back = './?' + (en ? 'lang=en&' : '') + (projects.indexOf(project) > 2 ? 'work=graphic' : '') + '#work';
  document.title = project[1] + ' — linqueenn';
  document.querySelector('meta[name=description]').content = project[3];
  app.innerHTML = `<section class="section case"><a class="note" href="${back}">← ${t('Все проекты','All projects')}</a><h1 class="heading">${project[1]}</h1><p class="meta">${project[2]}</p>${caseId === 'zen' ? '' : cover(project)}<p>${project[3]}</p>${project[4] ? `<a class="cta" href="${behance}gallery/${project[4]}">${t('Смотреть на Behance','View on Behance')} ↗</a>` : ''}</section>`;
} else renderHome();
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'}));
