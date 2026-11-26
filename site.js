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
const cover = ([id,name]) => id === 'choreo'
  ? `<div class="cover mock">${name}<br>${t('Обложка готовится','Cover pending')}</div>`
  : `<img class="cover" src="assets/${id}.jpg" alt="" loading="lazy">`;
const caseUrl = id => './?case=' + id + (en ? '&lang=en' : '');
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const person = t('Лина Ханнанова','Lina Khannanova');
document.title = 'linqueenn — ' + person;
document.querySelector('meta[name=description]').content = t('Лина Хананова — UX/UI, веб- и графический дизайнер.','Lina Khannanova — UX/UI, web and graphic designer.');

function renderHome() {
  document.body.classList.add('home-page');
  app.innerHTML = `
  ${homeScreen(t, person, cv)}
  ${projectsScreen(t, caseUrl)}
  ${aboutScreen(t, person)}
  ${remainingSections(t)}
  `;

  setupProjectsScreen(t, caseUrl);
  setupRemainingSections();
  document.querySelector('#home-language').onclick = language.onclick;
  setupPortraitArrival(setupHomeScramble());
  setupAboutScreen();
  setupMotion();
  const loadCrystal = () => import('./crystal.js?v=20261127-desktop-footer-restore').catch(error => console.warn('3D crystal unavailable', error));
  if ('requestIdleCallback' in window) requestIdleCallback(loadCrystal, {timeout: 1400});
  else setTimeout(loadCrystal, 500);
}

function setupMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting}) => {
    if (!isIntersecting) return;
    target.classList.add('enter');
    if (target.matches('.remaining-heading, .remaining-actions, .pricing-bottom')) createScrambleJobs(target).forEach(play => play());
    observer.unobserve(target);
  }), {threshold:.18, rootMargin:'0px 0px -12% 0px'});
  document.querySelectorAll('[data-reveal], #contacts .remaining-actions, #pricing .pricing-bottom').forEach(el => observer.observe(el));
}

const zen = webProjects(t)[1];
const project = projects.find(item => item[0] === caseId) || (caseId === 'zen' ? zen : null);
if (caseId === 'roma') {
  document.body.classList.add('case-page');
  document.documentElement.lang = 'ru';
  document.title = 'Мама Рома — UX/UI-кейс | linqueenn';
  document.querySelector('meta[name=description]').content = mamaRomaCase.summary;
  app.innerHTML = caseStudyPage(mamaRomaCase);
} else if (caseId === 'zen') {
  document.body.classList.add('case-page');
  document.documentElement.lang = 'ru';
  document.title = 'ZenSocial — UX/UI-кейс | linqueenn';
  document.querySelector('meta[name=description]').content = zenSocialCase.summary;
  app.innerHTML = zenSocialCasePage();
  setupZenSocialCase();
} else if (caseId === 'vinyl') {
  document.body.classList.add('case-page');
  document.documentElement.lang = 'ru';
  document.title = 'Vinyl Store — UX/UI-кейс | linqueenn';
  document.querySelector('meta[name=description]').content = vinylStoreCase.summary;
  app.innerHTML = caseStudyPage(vinylStoreCase);
} else if (caseId === 'choreo') {
  document.body.classList.add('case-page');
  document.documentElement.lang = 'ru';
  document.title = 'XoreoKids — UX/UI-кейс | linqueenn';
  document.querySelector('meta[name=description]').content = choreoKidsCase.summary;
  app.innerHTML = caseStudyPage(choreoKidsCase);
} else if (caseId === 'dixon') {
  document.body.classList.add('case-page');
  document.documentElement.lang = 'ru';
  document.title = 'Dixon Dance — айдентика | linqueenn';
  document.querySelector('meta[name=description]').content = dixonDanceCase.summary;
  app.innerHTML = caseStudyPage(dixonDanceCase);
} else if (project) {
  const back = './?' + (en ? 'lang=en&' : '') + (projects.indexOf(project) > 2 ? 'work=graphic' : '') + '#work';
  document.title = project[1] + ' — linqueenn';
  document.querySelector('meta[name=description]').content = project[3];
  app.innerHTML = `<section class="section case"><a class="note" href="${back}">← ${t('Все проекты','All projects')}</a><h1 class="heading">${project[1]}</h1><p class="meta">${project[2]}</p>${caseId === 'zen' ? '' : cover(project)}<p>${project[3]}</p>${project[4] ? `<a class="cta" href="${behance}gallery/${project[4]}">${t('Смотреть на Behance','View on Behance')} ↗</a>` : ''}</section>`;
} else renderHome();
if (['roma', 'zen', 'vinyl', 'choreo', 'dixon'].includes(caseId)) setupCasePage();
setupBackToTop();
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'}));
